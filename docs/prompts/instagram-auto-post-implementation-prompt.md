# Claude 向け実装プロンプト：商品紹介の完全自動投稿（theestablishbeauty.com）

以下をそのまま（または `[選択]` だけ埋めて）実装エージェントに渡す。

---

## 依頼

`theestablishbeauty.com`（Vercel ホスティング）に、**既存の静的サイトを壊さず**、商品紹介記事・画像・リールの **完全自動投稿システム** を追加してください。

### 実際の技術スタック（重要・誤り訂正）

次は **誤り** です。採用しないでください。

- ❌ 「フレームワークは Next.js」

次が正しい現状です。

- ✅ 静的 HTML（`*.html`）+ クライアント JS（`app.js` 等）
- ✅ Vercel Serverless Functions（`/api/*.js`）
- ✅ `vercel.json` は `"framework": null`
- ✅ 既存の日次 Cron 例: `/api/beauty-column-daily`（`0 0 * * *`）
- ✅ Supabase（Postgres）をデータ保存に利用している
- ✅ アフィリエイトは A8.net バナー／リンクをサイト内で利用
- ✅ SEO は `seo.mjs` / `seo-config.js` / `sitemap.xml` / `robots.txt`
- ✅ Instagram / Facebook / YouTube フッターは `snowball-affiliate.mjs`

**Next.js への全面移行はしない。** 既存の `api/` + Cron + Supabase パターンに合わせて追加する。必要なら将来 Next.js 化は別タスクとする。

### 役割分担（最重要・用語の誤りを防ぐ）

| 項目 | 役割 | 今回使うか |
|------|------|------------|
| **Claude AI**（Anthropic / Vercel AI Gateway） | 商品紹介文・SEO 文・キャプション、許可された範囲での画像／リール**素材制作** | ✅ 使う |
| **Meta AI** | Meta の生成 AI アシスタント | ❌ **使わない**（今回の構成では不要） |
| **Meta 公式 Instagram API**（Instagram Platform / Graph API） | プログラムから Instagram に**正規投稿**する公式インターフェース | ✅ 使う |

**結論（必須）:**  
Claude にコンテンツを作らせ、**Instagram への投稿だけを Meta 公式 API に担当させる。**

```
Claude API（生成）
    ↓
Vercel Cron + /api（スケジュール・検証・DB）
    ↓
サイト公開（静的 / DB 記事）
    ↓
Meta 公式 Instagram API（投稿実行）
    ↓
Instagram ビジネスアカウント（毎日画像 or リール 1 件）
```

#### 垢 BAN・ポリシー上の違い（実装制約）

- ❌ **Claude／Playwright／Puppeteer 等による Instagram のブラウザ直接操作**は禁止。無許可の自動アクセスとして制限リスクがある。
- ✅ **Meta 公式 API**は Meta が認める投稿手段。ブラウザ操作に伴うリスクは避けられる。
- ⚠️ それでも BAN を完全に防げるわけではない。スパム、著作権侵害、広告ポリシー違反、過度な投稿頻度などがあれば制限され得る。案件表記・権利・品質チェックをパイプラインに入れること。

公式: [Meta Instagram Platform Documentation](https://developers.facebook.com/docs/instagram-platform/)

### ビジネス目標

1. 未投稿商品を毎日自動選択
2. Claude（または Vercel AI Gateway）で日英の商品紹介文・SEO タイトル／説明を生成（**Meta AI は使わない**）
3. 商品画像から Instagram 用静止画・リール素材を用意（生成／加工は許可範囲内）
4. 商品情報・A8 広告表示・掲載条件を自動検証
5. サイト側に「商品紹介記事」を公開（静的生成または DB 駆動ページ）
6. **Meta 公式 Instagram API のみ**で画像／リール投稿（ブラウザ自動操作は禁止）
7. 結果・エラーを DB に保存
8. 管理・個人情報ページは検索に出さず、認証で保護（既存 `middleware.js` / API Bearer と整合）

### Instagram 連携状態（必須の前提）

**[選択: A / B / C のいずれかを記入]**

- **A：Facebook ページと連携している**
- **B：連携していない**
- **C：わからない（調査手順も含めて実装ガイドを書く）**

#### 選択に応じた API 方針

| 選択 | 採用するログイン／API 方針 |
|------|---------------------------|
| **A** | **ビジネス向け Facebook ログイン（Login for Business）+ config_id + Instagram Graph API**。下記「公式セットアップ手順」に従う。 |
| **B** | まず Instagram プロアカウントを Facebook ページ／ビジネスポートフォリオへ連携。未完了なら本番投稿 Cron を無効のまま。連携後は A と同じ config_id フロー。 |
| **C** | Meta Business Suite で Page ↔ IG の紐付けを確認するチェックリストを先に書く。確定するまで本番投稿を有効化しない。 |

リールは Media Container（`media_type=REELS` 等）の最新仕様。画像は `IMAGE`。Instagram が取得できる **公開 HTTPS メディア URL** が必須。

#### Meta 公式セットアップ手順（ビジネス向けログイン / config_id）

アプリダッシュボードでの入口（公式 UI）:

1. アプリを開く  
2. **ユースケース** → **Instagramでメッセージとコンテンツを管理** → **カスタマイズ**  
3. **統合ログインのAPIの設定**

##### ステップ1: 設定（Configuration）を作成する

- **設定** = クライアントに求めるアクセス許可とアセットのリスト。ビジネス向け Facebook ログイン用で、**`config_id`** が付与される。
- **Create new configuration** で作成。デフォルトに含まれ得るもの:
  - Instagram アカウント
  - 広告アカウント（クライアントはスキップ可）
  - 権限例: `instagram_basic`, `instagram_manage_messages` に加え `instagram_manage_comments`, **`instagram_content_publish`**, `ads_management`, `ads_read`
- **今回の自動投稿（画像・リール）に必須寄り**: `instagram_basic`, **`instagram_content_publish`**
- **今回必須ではない（メッセージ自動返信をやらないなら外してよい）**: `instagram_manage_messages`、コメント管理、広告系（`ads_*`）はユースケースに応じて削除／追加
- 追加候補: `instagram_manage_insights`, `instagram_manage_events`（必要なら）
- 設定プレビュー → **アクセス許可を編集** → **この設定を使用**
- **リダイレクト URL** に HTTPS を入力して保存（本番: `https://theestablishbeauty.com/api/auth/meta/callback`）
- **ログイン URL をコピー**（ステップ4で使用）
- `config_id` は秘密ではない（設定の識別子。データアクセス権限そのものではない）

##### ステップ2: テスト用アクセストークン

- 開発モード中は **アクセストークンを生成** から自アカウントでテスト
- **アカウントを追加** → Instagram プロをテスター招待
- Instagram Web: **設定 → ウェブサイトのアクセス許可 → アプリとウェブサイト → テスターの招待** で承認
- **トークンを生成**（**一度だけ表示** → サーバー／Vercel env または暗号化ストアへ。Git 禁止）

##### ステップ3: Webhooks（任意だが公式フローに含まれる）

- メッセージ／コメント通知が必要ならコールバック URL・検証トークン・フィールド購読を設定
- **毎日の商品投稿だけが目的なら、初期は Webhooks なしでも投稿 API は動かし得る**。ただし公式オンボーディングに合わせてエンドポイント骨格（検証応答）を用意しておくとよい
- クライアント接続後、各 IG アカウントをアプリにサブスクライブ

##### ステップ4: ログインボタン／管理画面リンク

ログイン URL 形式:

```text
https://www.facebook.com/dialog/oauth?
  client_id=<META_APP_ID>
  &config_id=<CONFIG_ID>
  &redirect_uri=<REDIRECT_URI>
  &response_type=code
  &display=popup
  &prompt=login
```

| パラメータ | 説明 |
|------------|------|
| `client_id` | 必須。**Meta アプリ ID**（Instagram アプリ ID ではない） |
| `config_id` | 必須。ステップ1の設定 ID |
| `redirect_uri` | 必須。ステップ1で保存した HTTPS と一致 |
| `response_type` | 必須。`code` |
| `display` | 任意。`popup` |
| `prompt` | 任意。`login` で FB/IG 両方の選択肢を出しやすくする |

クライアントは Instagram または Facebook でログインし、ビジネスポートフォリオと共有アセット・権限を承認する。

##### ステップ5: code → アクセストークン（サーバーのみ）

ブラウザはトークンを直接受け取らない。リダイレクトの `code` をサーバーで交換:

```http
GET https://graph.facebook.com/v26.0/oauth/access_token?
  client_id=<META_APP_ID>
  &client_secret=<META_APP_SECRET>
  &code=<CODE>
```

- **Meta の App ID / App Secret を使う**（Instagram 専用アプリ ID／シークレットではない）
- **client_secret をフロントに出さない**
- 成功時はビジネス連携システムユーザーのアクセストークン等を受け取る → サーバー側に安全保存

実装: `/api/auth/meta/callback`（HTTPS）で code 交換 → DB 更新 → 管理 UI（`/meta-instagram-connect.html`）に成功／再試行を表示。開始は `/api/auth/meta/start`（CSRF state）。

##### ステップ6: クライアント／アカウント ID の取得と保存

ビジネス連携システムユーザートークンでは `/me` は IG 本人ではない点に注意。

1. **クライアントビジネス ID**

```bash
curl -G \
  -d 'fields=client_business_id' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v26.0/me
```

→ `client_business_id` をトークンと一緒に保管（トークン更新 API に必要）。

2. **Instagram アカウント ID**（`instagram_basic` 必要）

```bash
curl -G \
  -d 'fields=id,username' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v26.0/me/assigned_instagram_accounts
```

→ 各 `id` を IG プロアカウント ID として API パスに使用。複数アカウント可。

3. **広告アカウント**（広告管理する場合のみ）

```bash
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v26.0/me/adaccounts
```

→ パスでは `id`（`act_` 付き）を使用。今回の「商品紹介の自動投稿」だけでは省略可。

環境変数／DB に最低限保存するもの:

- `META_APP_ID`, `META_APP_SECRET`
- `META_LOGIN_CONFIG_ID`（config_id）
- `INSTAGRAM_ACCESS_TOKEN`（または更新可能なストア）
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`（assigned の id）
- `CLIENT_BUSINESS_ID`（更新フロー用）

##### ステップ7: 統合テスト（クライアント招待前）

- ログインで IG/FB オプションが出る
- ビジネスポートフォリオと IG アカウント一覧が出る
- **必要なアセット・権限だけ**を要求（投稿用途なら content_publish 中心）
- サーバーが `code` → トークン交換に成功
- Webhooks を使う場合はテスト通知を受信

##### ステップ8: アプリレビュー

- 設定保存後は対象権限の **Standard Access**（アプリ役割ユーザーのテスト用）
- 他クライアント接続や本番規模には各権限の **Advanced Access** + アプリ **ライブモード** とアプリービューが必要
- 既に同権限の Advanced Access がある場合は再申請不要なことがある（公式の「アクセス許可とアプリレビュー」に従う）

**自社アカウントだけの自動投稿**でも、開発モード制限・テスター・トークン期限を踏まえ、本番前にレビュー要否を公式ドキュメントで確認すること。

---

## 実装してほしいもの

### 1. データモデル（Supabase migration）

テーブル案（名前は既存命名に合わせてよい）:

- `affiliate_products` … 商品名、説明、画像 URL、A8 アフィリエイト URL、掲載条件メモ、言語、有効フラグ、最終検証日時
- `auto_post_jobs` … 予定日、商品 ID、ステータス（queued/generating/validating/publishing_site/publishing_ig/done/failed）、エラー文言
- `auto_post_contents` … 生成された日英本文、SEO title/description、ハッシュタグ、画像／リール素材 URL
- `instagram_publications` … IG media id、permalink、投稿種別（image/reel）、投稿時刻、raw response

RLS: サービスロールのみ書き込み。anon には公開記事用の読み取りだけ必要なら最小権限。

### 2. 設定

- `seo-config.js` / `.env.example` に追加する環境変数を文書化:
  - `ADMIN_BASIC_*`（既存管理保護と共存）
  - `CRON_SECRET`（既存 beauty-column と同様）
  - `AI_GATEWAY_API_KEY` または既存 OIDC
  - `META_APP_ID`, `META_APP_SECRET`（Instagram 専用 ID ではなく Meta アプリのもの）
  - `META_LOGIN_CONFIG_ID`（ビジネス向けログインの config_id）
  - `META_OAUTH_REDIRECT_URI`（HTTPS、ダッシュボード登録と一致。既定: `https://theestablishbeauty.com/api/auth/meta/callback`）
  - `INSTAGRAM_ACCESS_TOKEN`（または DB／Vercel に保存する更新可能なトークン）
  - `INSTAGRAM_BUSINESS_ACCOUNT_ID`（`/me/assigned_instagram_accounts` の id）
  - `CLIENT_BUSINESS_ID`（トークン更新用）
  - A8／コンプライアンス用フラグや必須開示文

**トークンを Git に置かない。**

### 3. API エンドポイント（`/api/`）

既存スタイル（CommonJS、Bearer `CRON_SECRET`）に合わせる。

例:

- `POST/GET /api/auto-post-daily` … Cron 起動。未投稿を 1 件選ぶ → 生成 → 検証 → サイト公開 → IG 投稿 → DB 記録
- `POST /api/auto-post-preview` … 管理用ドライラン（投稿しない）
- `GET /api/auto-post-status` … 直近ジョブ（管理トークン保護）

`vercel.json` の `crons` に日次を追加（既存 beauty-column と時刻がぶつからないようずらす）。

### 4. 生成パイプライン

1. DB から「有効かつ未投稿」の商品を選択（優先度・ランダム・輪番のいずれか。設定可能に）
2. Claude / AI Gateway で:
   - 日本語紹介文
   - 英語紹介文
   - SEO title / description（サイト用）
   - IG キャプション（日英どちらか設定、免責・広告表記を必ず含める）
3. 画像:
   - 原則は登録済み公式／許可済み商品画像をリサイズ
   - AI 生成や過度な加工は、商品ごとの「二次利用・加工可否」フラグが OK のときだけ
4. リール:
   - 許可された素材のみ。未準備ならその日は静止画のみ投稿し、リールはスキップ（失敗扱いにしない／ジョブに理由を残す）
5. 検証:
   - A8 URL が設定どおりか
   - 必須の広告表記（例: `#PR` / 「アフィリエイトリンクを含みます」等、案件条件に合わせ設定可能に）
   - 禁止表現チェックの簡易ルール
6. サイト公開:
   - 既存 `beauty-column` に近い「DB 記事 → 一覧／詳細 HTML or JSON 配信」方式を踏襲
   - `sitemap.xml` 更新または動的 sitemap 方針を提案し、公開 URL を index 可能に（管理 URL は noindex）
7. **Meta 公式 Instagram API のみ**で投稿（Graph API / Instagram Platform）:
   - container 作成 → status 待ち → publish
   - 失敗時リトライ方針（429 / OAuth 期限）とアラート（ログ＋ DB）
   - Selenium / Playwright / 非公式ライブラリでの投稿は実装しない

### 5. 管理 UI（最小）

- 既存管理保護（Basic Auth + 必要なら管理トークン）の内側に、ジョブ一覧・失敗理由・再実行ボタンのある静的 HTML 1 ページ
- 個人情報やトークン全文は表示しない

### 6. コンプライアンス（必須コメント）

実装 README に明記:

- Instagram／Meta のプラットフォームポリシー
- A8.net 各プログラムの表記・禁止事項は **案件ごとに確認**（自動では最終責任を負えない）
- 商品画像の権利・加工可否
- 医療・効能表現の誇大禁止（EMR-TEK／ウェルネス文言の既存トーンに合わせる）

### 7. 受け入れ条件

- [ ] Facebook/Instagram の選択（A/B/C）に沿ったセットアップ手順書がある
- [ ] Cron が秘密ヘッダーなしで呼べない
- [ ] ドライランで文章・SEO・検証まで通る
- [ ] 本番フラグ ON のときだけ IG に投稿される
- [ ] 既存の商品ページ SEO（index 許可）・管理 Basic 認証を壊さない
- [ ] `.env.example` 更新、マイグレーション追加、手動テスト手順あり

### 8. やらないこと

- サイト全体の Next.js 移行
- **Meta AI の利用**（生成は Claude、投稿は Meta 公式 API）
- Instagram へのブラウザ自動操作・非公式スクレイピング投稿
- robots.txt で商品ページを再び Disallow すること
- アクセストークンをフロントに露出すること
- 権利未確認の画像での勝手なリール量産

---

## 最初の成果物の出し方

1. 調査結果（現状ファイルとの接続点: `beauty-column-daily`, Supabase, `middleware.js`）
2. マイグレーション SQL
3. API スケルトン + Cron 設定
4. Meta アプリ設定チェックリスト（選択 A/B/C 分岐）
5. 段階的ロールアウト: 検証のみ → サイトのみ公開 → IG 画像 → IG リール

質問が必要なら、実装を止めて短く聞いてください。ただし **[選択 A/B/C]** が未記入の場合は、C として「確認手順を先に書く」方針で進めてください。
