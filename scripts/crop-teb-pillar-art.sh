#!/usr/bin/env bash
# Regenerate pillar illustration crops from assets/teb-pillars-art-source.png
# - Horizontal thirds (341 | 341 | 342 px for 1024-wide source)
# - Vertical: top CROP_H px only (circle art; excludes English titles + Japanese copy below)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/assets"
SRC="teb-pillars-art-source.png"
H="${1:-400}"
if [[ ! -f "$SRC" ]]; then
  echo "Missing $ROOT/assets/$SRC" >&2
  exit 1
fi
sips --cropToHeightWidth "$H" 341 --cropOffset 0 0 "$SRC" --out teb-pillar-art-marketplace.png
sips --cropToHeightWidth "$H" 341 --cropOffset 0 341 "$SRC" --out teb-pillar-art-curated.png
sips --cropToHeightWidth "$H" 342 --cropOffset 0 682 "$SRC" --out teb-pillar-art-inventory.png
echo "Wrote teb-pillar-art-*.png (crop height=${H}px). Tweak H if titles still peek in: ./scripts/crop-teb-pillar-art.sh 360"
