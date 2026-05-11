# EMR-TEK 日本語版（全商品）

静的HTMLで作った「全商品」ページです。

## サイト全体の情報設計

親ブランド **The Establish Beauty**（`theestablishbeauty.com`）および **Beauty Marketplace** との関係、本リポジトリを **EMR-TEK 専用のまま維持する**方針は、次の説明書にまとめています。

- **[情報設計（説明書）](./docs/information-architecture.md)**

親ブランドの**メインのたたき台**は `establish-beauty.html`。**既存の EMR-TEK 向けページ（`index.html` ほか）はすべて従来どおり残します。** 本番で `theestablishbeauty.com` の `/` にするかはホスティング設定次第です。

## 起動方法

### 1) そのまま開く（最短）

- `index.html` をブラウザで開いてください。

### 2) npm でローカルサーバー起動

```bash
cd /Users/ikedayuunoriko/redlight
npm run dev
```

起動後 `http://localhost:5173` を開きます。

## 収録ページ

- `establish-beauty.html`: 親ブランドのホーム（`/brands/…` 専用LP・**共通アカウント/カート/Checkout**・split fulfillment、**Beauty Commerce Infrastructure**、英語ピッチ、3 柱、Marketplace・取引先、EMR-TEK への導線）
- `index.html`: EMR-TEK ストアホーム（全商品・並び替え・検索・フィルタ・簡易カート・Cookieバナー）

