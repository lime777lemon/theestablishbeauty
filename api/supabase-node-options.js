/**
 * Node 20 など WebSocket が未組み込みの環境で、@supabase/supabase-js の Realtime 初期化が落ちないようにする。
 * ブラウザでは使わない（api/*.js はサーバーのみ）。
 */

function getSupabaseJsOptions() {
  const base = {
    auth: { autoRefreshToken: false, persistSession: false },
  };
  try {
    const WebSocketImpl = require("ws");
    return { ...base, realtime: { transport: WebSocketImpl } };
  } catch {
    return base;
  }
}

module.exports = { getSupabaseJsOptions };
