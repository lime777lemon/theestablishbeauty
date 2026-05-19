/**
 * Vercel Web Analytics — static HTML equivalent of Next.js `<Analytics />`.
 * @see https://vercel.com/docs/analytics
 *
 * This site is not Next.js; use `inject()` from @vercel/analytics (not @vercel/analytics/next).
 * On Vercel production deploys, inject() loads /_vercel/insights/script.js automatically.
 */
import { inject } from "./vendor/vercel-analytics/index.mjs";

inject();
