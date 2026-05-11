#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# Supabase Postgres へ対話的に接続（ダッシュボードの SQL Editor と同じ DB に psql で入る）
#
# 準備:
#   1. Dashboard 上部の「Connect」または Settings → Database → Connection string
#   2. 接続タイプで「Session pooler」（共有プーラの Session モード）を選び URI をコピー
#      （ホストは *.pooler.supabase.com、ユーザーは postgres.<project-ref>、ポートは通常 5432。
#       「Not IPv4 compatible」の直接接続 db.*.supabase.co:5432 とは別ホストです）
#   3. リポジトリ直下の .env.local に保存（.gitignore 想定）:
#        export SUPABASE_DATABASE_URL='postgresql://postgres.xxxxx:...@....pooler.supabase.com:5432/postgres'
#      パスワードに記号があり URI が壊れる／認証だけ失敗するときは SUPABASE_DB_PASSWORD を併用（下の処理で URI の user:pass を外し PGPASSWORD を使います）。
#
# 使い方:
#   ./scripts/sql-shell.sh              # 対話モード（psql）
#   ./scripts/sql-shell.sh -c 'SELECT 1'
#
# 前提: PostgreSQL クライアント `psql` が PATH にあること（macOS: brew install libpq && brew link --force libpq）
#
# 「遠隔操作」: このスクリプトはローカル/SSH 先のターミナルで DB に接続するだけです。
#   ブラウザ上の SQL Editor UI を操作するわけではありません。
#   Cursor から DB を触るなら Supabase MCP の execute_sql も利用できます。
# -----------------------------------------------------------------------------

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_LOCAL="$ROOT/.env.local"

if [[ -f "$ENV_LOCAL" ]]; then
  # KEY=value 形式のみ想定。値にスペースがある場合は export 行をクォートしてください。
  set -a
  # shellcheck disable=SC1090
  source "$ENV_LOCAL" || true
  set +a
fi

if [[ -z "${SUPABASE_DATABASE_URL:-}" ]]; then
  echo "SUPABASE_DATABASE_URL が未設定です。.env.local に Postgres の URI を書くか、先に export してください。" >&2
  echo "取得場所: Dashboard の「Connect」→ Connection string で「Session pooler」を選択してコピー" >&2
  exit 1
fi

if [[ -z "${SUPABASE_DB_PASSWORD:-}" ]] && { [[ "${SUPABASE_DATABASE_URL}" == *'[YOUR-PASSWORD]'* ]] || [[ "${SUPABASE_DATABASE_URL}" == *'YOUR_PASSWORD'* ]]; }; then
  echo "接続 URI にダッシュボードのプレースホルダ（[YOUR-PASSWORD] など）が残っています。" >&2
  echo "Supabase → Connect → Session pooler でパスワード欄に「Database のパスワード」を入力し、表示された URI をそのままコピーして .env.local に貼り付けてください。" >&2
  echo "または SUPABASE_DB_PASSWORD に実パスワードを書き、URI の user:pass 部分はダミーでも構いません（スクリプトが PGPASSWORD に切り替えます）。" >&2
  exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "psql が見つかりません。PostgreSQL クライアントをインストールしてください（例: brew install libpq）。" >&2
  exit 1
fi

CONN="${SUPABASE_DATABASE_URL}"
if [[ -n "${SUPABASE_DB_PASSWORD:-}" ]]; then
  export PGPASSWORD="${SUPABASE_DB_PASSWORD}"
  # URI に user:password@ があるときは password を捨て、PGPASSWORD を使う（記号の URL エンコードミスを避ける）
  if [[ "${CONN}" =~ ^postgres(ql)?://([^:]+):([^@]+)@(.+)$ ]]; then
    CONN="postgresql://${BASH_REMATCH[2]}@${BASH_REMATCH[4]}"
  fi
fi

if [[ "${CONN}" != *sslmode=* ]]; then
  if [[ "${CONN}" == *\?* ]]; then
    CONN="${CONN}&sslmode=require"
  else
    CONN="${CONN}?sslmode=require"
  fi
fi

exec psql "${CONN}" "$@"
