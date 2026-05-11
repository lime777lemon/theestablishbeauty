#!/usr/bin/env bash
# Run from anywhere: ./run.sh (must be executable: chmod +x run.sh)
set -e
cd "$(dirname "$0")"

echo "==> bundle install"
bundle install

export DOMAIN="${DOMAIN:-http://localhost:5173}"

if [ -z "${STRIPE_SECRET_KEY:-}" ] && [ ! -f .env ]; then
  echo "ERROR: STRIPE_SECRET_KEY is not set and no .env file found."
  echo "  export STRIPE_SECRET_KEY=sk_test_xxxxxxxx"
  echo "  or create .env with STRIPE_SECRET_KEY=..."
  exit 1
fi

echo "==> starting http://127.0.0.1:4242 (use: bundle exec)"
exec bundle exec ruby app.rb
