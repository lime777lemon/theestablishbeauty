#!/usr/bin/env bash
# Google Search Console setup helper for theestablishbeauty.com
#
# Usage:
#   1. Open https://search.google.com/search-console
#   2. Add property → URL prefix → https://theestablishbeauty.com/
#   3. Choose "HTML tag" verification and copy the content="..." value
#   4. Run: ./scripts/setup-search-console.sh YOUR_VERIFICATION_CODE
#   5. Commit, push, deploy, then click Verify in Search Console
#   6. Submit sitemap: https://theestablishbeauty.com/sitemap.xml

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG="$ROOT/seo-config.js"
CODE="${1:-}"

if [[ -z "$CODE" ]]; then
  echo "Usage: $0 <google-site-verification-content>"
  echo ""
  echo "Get the code from Search Console → Ownership verification → HTML tag method."
  echo "Example: $0 abc123XYZ..."
  exit 1
fi

python3 - "$CONFIG" "$CODE" <<'PY'
import re
import sys
from pathlib import Path

path = Path(sys.argv[1])
code = sys.argv[2].replace('"', "")
text = path.read_text(encoding="utf-8")
text, n = re.subn(
    r'googleSiteVerification:\s*"[^"]*"',
    f'googleSiteVerification: "{code}"',
    text,
    count=1,
)
if n != 1:
    raise SystemExit("Could not update googleSiteVerification in seo-config.js")
path.write_text(text, encoding="utf-8")
print("Updated seo-config.js with googleSiteVerification.")
PY

python3 "$ROOT/scripts/inject_seo.py" >/dev/null || true

echo ""
echo "Next steps:"
echo "  1. git add seo-config.js && git commit -m 'Add Google Search Console verification'"
echo "  2. git push && wait for deploy"
echo "  3. Search Console → Verify"
echo "  4. Sitemaps → submit https://theestablishbeauty.com/sitemap.xml"
