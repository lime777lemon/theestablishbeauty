#!/usr/bin/env python3
"""Generate rounded favicons (delegates to Node + sharp)."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    script = ROOT / "scripts" / "generate-favicons.mjs"
    try:
        subprocess.run(["npm", "run", "favicons"], cwd=ROOT, check=True)
    except FileNotFoundError:
        subprocess.run(["node", str(script)], cwd=ROOT, check=True)
    except subprocess.CalledProcessError as exc:
        print(
            "Favicon generation failed. Run once:\n"
            "  npm install\n"
            "Then:\n"
            "  npm run favicons",
            file=sys.stderr,
        )
        raise SystemExit(exc.returncode) from exc


if __name__ == "__main__":
    main()
