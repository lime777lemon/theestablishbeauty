# EMR-TEK 日本語版（全商品）

静的HTMLで作った「全商品」ページです。

## サイト全体の情報設計

親ブランド **The Establish Beauty**（`theestablishbeauty.com`）および **Beauty Marketplace** との関係、本リポジトリを **EMR-TEK 専用のまま維持する**方針は、次の説明書にまとめています。

- **[情報設計（説明書）](./docs/information-architecture.md)**

親ブランドの**短いマーケティング入口**は `establish-beauty.html`。**旧ルートの長文ランディング**は [私たちについて](./about-us.html)（`about-us.html`）に置いています。**ドメインの `/`（`index.html`）は EMR-TEK 公式ストアのホーム**です。ブックマーク用の `emr-tek.html` は `index.html` へリダイレクトします。

## 起動方法

### 1) そのまま開く（最短）

- `index.html` をブラウザで開いてください（EMR-TEK ストアのトップ）。

### 2) npm でローカルサーバー起動

- **静的ページのみ**（`POST /api/*` は使えません）: `npm run dev` → `http://localhost:5173`
- **お問い合わせ API 込み**（`vercel dev`）: `npm run dev:vercel` → 同じく `http://localhost:5173`（ルートに `.env.local` が必要）

```bash
cd /Users/ikedayuunoriko/redlight
npm run dev:vercel
```

静的だけ試す場合は `npm run dev` で十分です。起動後 `http://localhost:5173` を開きます。

## お問い合わせ通知メール（Resend を変えた・送信元を変えたとき）

サイト上の `mailto:` と文言はリポジトリ内で **`info@theestablishbeauty.com`** に揃えています。通知の From/To は **環境変数**なので、次だけ手元で合わせてください。

| 場所 | 変える？ | 内容 |
|------|----------|------|
| **Vercel**（Production など） | **はい** | `CONTACT_NOTIFY_FROM=info@theestablishbeauty.com`（Resend でドメイン検証済みであること）<br>`CONTACT_NOTIFY_TO=info@theestablishbeauty.com`<br>Resend のチーム／API キーを変えたら **`RESEND_API_KEY` も新しいキー**に更新。保存後 **再デプロイ**。 |
| **Supabase**（Database Webhook） | **基本いいえ** | URL・`Authorization: Bearer …`（`CONTACT_WEBHOOK_SECRET`）はそのままでよい。メールアドレスは Webhook に書かない。 |
| **Resend** | **確認** | 新しい workspace なら **API キー発行**と **theestablishbeauty.com の verified** をダッシュボードで確認。 |

`.env.example` に同名の変数例があります（実値はコミットしない）。

## 収録ページ

- `establish-beauty.html`: 親ブランドのホーム（`/brands/…` 専用LP・**共通アカウント/カート/Checkout**・split fulfillment、**Beauty Commerce Infrastructure**、英語ピッチ、3 柱、Marketplace・取引先、EMR-TEK への導線）
- `about-us.html`: The Establish Beauty の**私たちについて**（旧 `index.html` にあった長文のインフラ・マーケット説明）
- `index.html`: **EMR-TEK ストアのホーム**（全商品・並び替え・検索・フィルタ・簡易カート・Cookieバナー）。`emr-tek.html` はここへリダイレクト
- **認証（UI のみ・バックエンド未接続）**: `auth-consumer-register.html` / `auth-consumer-login.html`（個人・EMR ヘッダ）、`auth-business-register.html` / `auth-business-login.html`（法人・TEB ロゴ）。**Google（Gmail）** ボタンは OAuth 接続後に `href` または API へ接続してください。

