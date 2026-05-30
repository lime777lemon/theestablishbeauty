#!/usr/bin/env python3
"""Replace emr-tek.com product URLs with Social Snowball tracking links."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# product id → snwbl.io affiliate URL (from snowball-config.js)
SNWBL = {
    "firewave-compact": "https://email.noreply.snwbl.io/c/eJw0ybFuxCAMANCvgTEyhjs7A8N1yH_E4AhOKESBturfVx06vxy9puQyWY2OGBwQ0GpLZL9mTIdwIhI-nM_hIewQ8v58BkBbY5adgEHzHyGsEALvCgxJwbOQCXD2W6_2s4zzW9pSu22xzHkN418GN4PbPxjc-uc0uIWPl7zpMe0d63l0E2AW1TF3aXWU5X3Zr4i_AQAA__9lJTZ4",
    "firewave-pro": "https://email.noreply.snwbl.io/c/eJw0yTFuwyAUBuDTwGj9foY-MjBkqNW5Ug9g4CGokLECbZXbd8r8Jb9JjGtiLX5lhxUMvuniidaADBOzlcSBBDE5ImPxZjNnq6tP4WA4SErGBsINxrhD4BAFmwusDM7-kKs9l3H-hbbUrpsvc15DbXdFu6L9BYr2_jMV7fHjmd-_Pu_64euZuzKYRWTMI7Q6yvJ96V9P_wEAAP__gMM28A",
    "eterno-mask": "https://email.noreply.snwbl.io/c/eJw0ybFOwCAQANCvgbE5DlpgYHDp4OwPAHcIhpSmoMa_Nw6u71HQnLMiKzko60CBBetlDbh7JiaDdBTt1aG1PUoiRCwQszOyBUrRggMmMntC8GCMiwwOMoN2yQoD13j47j_bvL5T39qQPdS17in0i8BT4PkfAs_xuf6A3l9LXW_yCe0qQxhYlXmumHqbdfu45VfA3wAAAP__laQ3Zg",
    "firefly-portable": "https://email.noreply.snwbl.io/c/eJw0ybtOxiAUAOCngbE53HrowFAH4iO4cjkIhpSmoMa3d_rnLztFKYmMnJxACwIQ8ODVYdG0H0WJAhQJdyLMEaRQJplg0PDmcgwIFihnbaKEA7S2gcBCIlA2ItNwjYfu_rfN6zf2rQ3eXV3rnkydTHom_QuY9ON7MenD5_P-9tFO_rh2lcE0rEo0V4i9zbp93fzHyf8AAAD__6rPN0I",
    "eterno-bundle": "https://email.noreply.snwbl.io/c/eJw0yUFOxSAQANDTwLIZBlqGBQtjwgm8AJSpYEghH_xGT-_qr1_2ms9TZSvZK0ugwIJ1snh2RjFfSId2xw6ktFIH8rVDhEjWyOpzihYIOGezJwQHxlBkIDgZNCUrDNz9waP9bvP-SW2rXTZf1hpT6DeBQWB4gcDQv5fA8DmeH6n_vcuHr_fVhYFVmOeKqdVZtq8hnx7_AwAA__8vETa2",
    "firedragon": "https://email.noreply.snwbl.io/c/eJw0ybFOxiAQAOCngbE5DhAYGFyYfAHHwh0BQ0rzgza-vZPzR1FzKYqc5KicBwUOXJAtumrBWFsrE7z5wqwIgyZbK1ouJsgeKZ8OPDCRsRkhgDH-ZPBQGLTPThi45ovv8Xus68nj6FOO2Pa-l9DvApPA9A8C0_zeAtMnQ_jYz5Sv2K86hYHdmNc-8-irHV-3_In4FwAA___EBTeD",
    "firestorm-pro": "https://email.noreply.snwbl.io/c/eJw0yTFuxSAMANDTwBgZYr5hYPhL7hGMI6hQQIG2ak_fqfPLcRdmk0lLNOTBAAEFXaLQKyHaZNBwIEeMO3gXXPDOsfCla8zpJPAgOaNLFgIg-lPAAwvsPpFCuPsjo_1s8_5Obatdt1jWGlPtb2UPZY9_UPbon0vZ45df1_keWT-x3ldXCKuIzHWmVmfZPob-ivYvAAD__0QzNrc",
    "inferno-fullbody": "https://email.noreply.snwbl.io/c/eJw0yTFuxCAQBdDTQGl9j9kdXFBs4yo5hMcMgggZy5BEuX2qrV8Mix7HHNlqmNljBoNXm4PDQ1NawfsqvHBieUZNIDrwZKjaEqLsDA-N0T2EsMI5vys8DsXihY3D2W696t_Uz1-pU2m2hjzG1c3yMrQZ2t5gaGvfw9Ammj76K37aO5QzNeMwsmofu9TS8_R12Z9A_wEAAP__p5s3WQ",
    "inferno-pro-fullbody": "https://email.noreply.snwbl.io/c/eJw0ya1yxCAQAOCnAZlZNoQfgThRRPWJWha2Ax0mZA76-_RVp78Sds5ZFSs5KOtAgQXrZQ3ZK-uQnPGMSMYQKKPw8LumhNocsoVCyYIDLkUfhOBBa5cYHGSG3ZEVGs7x4Kv_bvP8pr61IXuoa11T7DeBUWB8gsA4PpfAeH_5eX37u9_kI7TzfQgNqzLPlai3WbePS34F_A8AAP__BNM2Fw",
}

# emr-tek product path fragments → product id
PATH_TO_ID = {
    "/products/firewave?snowball=": "firewave-compact",
    "/products/firewave?": "firewave-compact",
    "/products/firewave-pro-300-watts-red-and-near-infrared-light": "firewave-pro",
    "/products/eterno-mask": "eterno-mask",
    "/products/firefly-1": "firefly-portable",
    "/products/firedragon?snowball=": "firedragon",
    "/products/firedragon?": "firedragon",
    "/products/firedragon-pro-red-and-near-infrared-light": "firedragon-pro-panel",
    "/products/firestorm-pro": "firestorm-pro",
    "/products/inferno-pro-red-and-near-infrared-light": "inferno-pro-fullbody",
    "/products/inferno?snowball=": "inferno-fullbody",
    "/products/inferno?": "inferno-fullbody",
    "/products/firehawk": "firehawk-fullbody",
}


def patch(text: str) -> tuple[str, int]:
    count = 0
    for path, product_id in PATH_TO_ID.items():
        url = SNWBL.get(product_id)
        if not url:
            continue
        pattern = rf'https://www\.emr-tek\.com{re.escape(path)}[^"]*'
        new_text, n = re.subn(pattern, url, text)
        if n:
            count += n
            text = new_text
    return text, count


def main() -> None:
    total = 0
    for path in sorted(ROOT.glob("*.html")):
        original = path.read_text(encoding="utf-8")
        updated, n = patch(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"{path.name}: {n}")
            total += n
    print(f"done ({total} replacements)")


if __name__ == "__main__":
    main()
