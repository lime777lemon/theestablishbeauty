# frozen_string_literal: true
#
# Canonical Stripe Connect + Sinatra sample for this repo.
# The raw tutorial snippet often pasted in chat is broken: (1) parse_request_body uses
# `else request.content_type...` instead of `elsif`; (2) Product metadata uses
# stripe_account but Price.search used stripeAccount; (3) webhook handler uses Hash
# access on Stripe::Event when STRIPE_WEBHOOK_SECRET is set. Do not replace this file
# with that snippet—merge API changes here instead.

require "dotenv"
require "stripe"
require "sinatra"
require "sinatra/json"
require "json"

Dotenv.load

Stripe.api_key = ENV.fetch("STRIPE_SECRET_KEY")
stripe_client = Stripe::StripeClient.new(ENV.fetch("STRIPE_SECRET_KEY"))

# Must match create-product / create price metadata key (was stripeAccount in search vs stripe_account on create).
STRIPE_ACCOUNT_METADATA_KEY = "stripe_account"

# Stripe metadata: keys <= 40 chars, values <= 500 chars (strings only).
def checkout_analytics_metadata(connected_account_id, data, price_id: nil)
  h = { STRIPE_ACCOUNT_METADATA_KEY => connected_account_id.to_s }
  h["price_id"] = price_id.to_s[0, 500] if price_id && !price_id.to_s.strip.empty?
  {
    "order_id" => %w[orderId order_id],
    "brand_slug" => %w[brandSlug brand_slug],
    "lp_path" => %w[lpPath lp_path],
    "utm_source" => %w[utmSource utm_source],
    "utm_medium" => %w[utmMedium utm_medium],
    "utm_campaign" => %w[utmCampaign utm_campaign],
    "utm_content" => %w[utmContent utm_content],
    "utm_term" => %w[utmTerm utm_term],
  }.each do |stripe_key, json_keys|
    raw = json_keys.map { |k| data[k] }.find { |v| !v.nil? && v.to_s.strip != "" }
    next if raw.nil?

    h[stripe_key] = raw.to_s.strip[0, 500]
  end
  h
end

set :public_folder, File.dirname(__FILE__) + "/public"
enable :sessions

# Liveness / config sanity (no secrets in response)
get "/api/health" do
  content_type :json
  {
    ok: true,
    stripeKeyPresent: !ENV["STRIPE_SECRET_KEY"].to_s.strip.empty?,
    domain: ENV["DOMAIN"].to_s,
  }.to_json
end

# After Checkout redirect: ?session_id=cs_...
get "/api/checkout-session/:session_id" do
  session_id = params[:session_id].to_s
  unless session_id.match?(/\Acs_[A-Za-z0-9_]+\z/)
    content_type :json
    halt 400, { error: "Invalid session id" }.to_json
  end

  begin
    s = Stripe::Checkout::Session.retrieve({
      id: session_id,
      expand: ["line_items"],
    })

    content_type :json
    {
      id: s.id,
      status: s.status,
      paymentStatus: s.payment_status,
      customerEmail: s.customer_details&.email,
      amountTotal: s.amount_total,
      currency: s.currency,
      mode: s.mode,
    }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end

# Same as create-checkout-session but returns JSON { "url" } for SPA / fetch clients
post "/api/create-checkout-session-json" do
  data = parse_request_body
  price_id = data["priceId"]
  account_id = data["accountId"]

  unless price_id.to_s.match?(/\Aprice_[A-Za-z0-9]+\z/)
    content_type :json
    halt 400, { error: "Invalid priceId" }.to_json
  end
  unless account_id.to_s.match?(/\Aacct_[A-Za-z0-9]+\z/)
    content_type :json
    halt 400, { error: "Invalid accountId" }.to_json
  end

  begin
    price = Stripe::Price.retrieve(price_id)
    price_type = price.type
    mode = price_type == "recurring" ? "subscription" : "payment"

    domain = ENV.fetch("DOMAIN")

    session_params = {
      line_items: [{ price: price_id, quantity: 1 }],
      mode: mode,
      success_url: "#{domain}/done?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: domain.to_s,
    }

    meta = checkout_analytics_metadata(account_id, data, price_id: price_id)
    session_params[:metadata] = meta

    if mode == "subscription"
      session_params[:subscription_data] ||= {}
      session_params[:subscription_data][:transfer_data] = { destination: account_id }
      session_params[:subscription_data][:metadata] = meta
    else
      session_params[:payment_intent_data] = {
        transfer_data: { destination: account_id },
        metadata: meta,
      }
    end

    session = Stripe::Checkout::Session.create(session_params)

    content_type :json
    { url: session.url, id: session.id }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end

# Create a sample product and return a price for it
post "/api/create-product" do
  data = parse_request_body
  product_name = data["productName"]
  product_description = data["productDescription"]
  product_price = data["productPrice"]
  account_id = data["accountId"]

  begin
    product = Stripe::Product.create({
      name: product_name,
      description: product_description,
      metadata: { STRIPE_ACCOUNT_METADATA_KEY => account_id },
    })

    price = Stripe::Price.create({
      product: product.id,
      unit_amount: product_price,
      currency: "usd",
      metadata: { STRIPE_ACCOUNT_METADATA_KEY => account_id },
    })

    content_type :json
    {
      productName: product_name,
      productDescription: product_description,
      productPrice: product_price,
      priceId: price.id,
    }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end

# Create a Connected Account
post "/api/create-connect-account" do
  data = parse_request_body

  begin
    account = stripe_client.v2.core.accounts.create({
      display_name: data["email"],
      contact_email: data["email"],
      dashboard: "express",
      defaults: {
        responsibilities: {
          fees_collector: "application",
          losses_collector: "application",
        },
      },
      identity: {
        country: "US",
        entity_type: "company",
      },
      configuration: {
        recipient: {
          capabilities: {
            stripe_balance: {
              stripe_transfers: { requested: true },
            },
          },
        },
      },
    })

    content_type :json
    { accountId: account.id }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end

# Create Account Link for onboarding
post "/api/create-account-link" do
  data = parse_request_body
  account_id = data["accountId"]

  begin
    account_link = stripe_client.v2.core.account_links.create({
      account: account_id,
      use_case: {
        type: "account_onboarding",
        account_onboarding: {
          configurations: ["recipient"],
          refresh_url: "https://example.com",
          return_url: "https://example.com?accountId=#{account_id}",
        },
      },
    })

    content_type :json
    { url: account_link.url }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end

# Get Connected Account Status
get "/api/account-status/:account_id" do
  account_id = params[:account_id]

  begin
    account = stripe_client.v2.core.accounts.retrieve(account_id, {
      include: ["requirements", "configuration.recipient"],
    })

    payouts_enabled = account.configuration&.recipient&.capabilities&.stripe_balance&.payouts&.status == "active"
    charges_enabled = account.configuration&.recipient&.capabilities&.stripe_balance&.stripe_transfers&.status == "active"
    summary_status = account.requirements&.summary&.minimum_deadline&.status
    details_submitted = summary_status.nil? || summary_status == "eventually_due"

    content_type :json
    {
      id: account.id,
      payoutsEnabled: payouts_enabled,
      chargesEnabled: charges_enabled,
      detailsSubmitted: details_submitted,
      requirements: account.requirements&.entries,
    }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end

# Fetch products for a specific account
get "/api/products/:account_id" do
  account_id = params[:account_id].to_s
  unless account_id.match?(/\Aacct_[A-Za-z0-9]+\z/)
    content_type :json
    halt 400, { error: "Invalid account id" }.to_json
  end

  begin
    prices = Stripe::Price.search({
      query: "metadata['#{STRIPE_ACCOUNT_METADATA_KEY}']:'#{account_id}' AND active:'true'",
      expand: ["data.product"],
      limit: 100,
    })

    products = prices.data.map do |price|
      {
        id: price.product.id,
        name: price.product.name,
        description: price.product.description,
        price: price.unit_amount,
        priceId: price.id,
        image: "https://i.imgur.com/6Mvijcm.png",
      }
    end

    content_type :json
    products.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end

# Create checkout session
post "/api/create-checkout-session" do
  data = parse_request_body
  price_id = data["priceId"]
  account_id = data["accountId"]

  price = Stripe::Price.retrieve(price_id)
  price_type = price.type
  mode = price_type == "recurring" ? "subscription" : "payment"

  domain = ENV.fetch("DOMAIN")

  session_params = {
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    mode: mode,
    success_url: "#{domain}/done?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: domain.to_s,
  }

  meta = checkout_analytics_metadata(account_id, data, price_id: price_id)
  session_params[:metadata] = meta

  if mode == "subscription"
    session_params[:subscription_data] ||= {}
    session_params[:subscription_data][:transfer_data] = {
      destination: account_id,
    }
    session_params[:subscription_data][:metadata] = meta
  else
    session_params[:payment_intent_data] = {
      transfer_data: {
        destination: account_id,
      },
      metadata: meta,
    }
  end

  session = Stripe::Checkout::Session.create(session_params)

  redirect session.url, 303
end

post "/api/webhook" do
  request.body.rewind
  payload = request.body.read

  endpoint_secret = ENV["STRIPE_WEBHOOK_SECRET"].to_s

  event =
    if endpoint_secret != ""
      signature = request.env["HTTP_STRIPE_SIGNATURE"]
      begin
        Stripe::Webhook.construct_event(payload, signature, endpoint_secret)
      rescue StandardError => e
        puts "Webhook signature verification failed. #{e.message}"
        halt 400
      end
    else
      JSON.parse(payload, symbolize_names: true)
    end

  type = event.is_a?(Hash) ? event[:type] : event.type
  case type
  when "checkout.session.completed"
    stripe_object = event.is_a?(Hash) ? event.dig(:data, :object) : event.data.object
    status_val = stripe_object.is_a?(Hash) ? stripe_object[:status] : stripe_object.status
    puts "Checkout Session status is #{status_val}."
  when "checkout.session.async_payment_failed"
    stripe_object = event.is_a?(Hash) ? event.dig(:data, :object) : event.data.object
    status_val = stripe_object.is_a?(Hash) ? stripe_object[:status] : stripe_object.status
    puts "Checkout Session status is #{status_val}."
  else
    puts "Unhandled event type #{type}."
  end

  status 200
end

post "/api/thin-webhook" do
  request.body.rewind
  payload = request.body.read

  thin_endpoint_secret = ENV["STRIPE_THIN_WEBHOOK_SECRET"]
  signature = request.env["HTTP_STRIPE_SIGNATURE"]
  begin
    event_notif = stripe_client.parse_event_notification(payload, signature, thin_endpoint_secret)
  rescue StandardError => e
    puts "Webhook signature verification failed. #{e.message}"
    halt 400
  end

  if event_notif.type == "v2.account.created"
    event_notif.fetch_related_object
    event_notif.fetch_event
  else
    puts "Unhandled event type #{event_notif.type}."
  end
  status 200
end

# Supports JSON and application/x-www-form-urlencoded
def parse_request_body
  request.body.rewind
  ct = request.content_type.to_s

  if ct.include?("application/json")
    body = request.body.read
    return {} if body.strip.empty?

    JSON.parse(body)
  elsif ct.include?("application/x-www-form-urlencoded")
    params.to_h
  else
    {}
  end
rescue JSON::ParserError => e
  puts "parse_request_body: #{e.message}"
  {}
end

# Local sample default 4242; production often uses PORT from the host (e.g. Heroku/Fly).
set :port, Integer(ENV.fetch("PORT", "4242"))
puts "Server running on port #{settings.port}"
