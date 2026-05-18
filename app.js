const STORAGE = {
  cookie: "emrtek_demo_cookie_consent",
  cart: "emrtek_demo_cart_v1",
};

/** @typedef {{id:string,title:string,subtitle?:string|string[],category:string,tags:string[],rating:number,now:number,was?:number,createdAt:string,featuredRank:number,video?:{poster:string,src:string},videoLabel?:string,image?:{src:string,alt?:string}}} Product */

/** @type {Product[]} */
const PRODUCTS = [
  {
    id: "firewave-compact",
    title: "Firewave コンパクトレッド&近赤外線ライトパネルデバイス",
    subtitle: "モバイル",
    category: "red",
    tags: ["mobile"],
    rating: 4.8,
    now: 40599,
    was: 64960,
    createdAt: "2025-08-18",
    featuredRank: 1,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/Updated_96cd362136c549429a4662e061c30348.thumbnail.0000000000_800x800_db7710b6-f652-43a4-b9f6-8ade5b25db20_800x.jpg?v=1774360286",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/96cd362136c549429a4662e061c30348/96cd362136c549429a4662e061c30348.HD-1080p-2.5Mbps-14442998.mp4?v=0",
    },
    videoLabel: "EMR-TEK Firewaveの3Dビデオ",
  },
  {
    id: "emr-light-stand",
    title: "ライトスタンド",
    category: "stands",
    tags: [],
    rating: 4.5,
    now: 65085,
    createdAt: "2024-03-01",
    featuredRank: 14,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/be613e9f9f424bafbb6ee8fc54f271b4.thumbnail.0000000000_800x.jpg?v=1683910033",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/be613e9f9f424bafbb6ee8fc54f271b4/be613e9f9f424bafbb6ee8fc54f271b4.SD-480p-0.9Mbps-14571487.mp4?v=0",
    },
    videoLabel: "EMR-TEKのライトスタンドの助けを借りてfiredragonを使用している女性",
  },
  {
    id: "eterno-mask",
    title: "ETERNO マスク - LED スキンケア マルチライト リジュビネーション",
    subtitle: "肌を滑らかにします",
    category: "mask",
    tags: ["smooths"],
    rating: 4.9,
    now: 40599,
    was: 64960,
    createdAt: "2025-09-12",
    featuredRank: 2,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/9bdb0c11db524a13b2f13b27dcdf7ca2.thumbnail.0000000000_800x.jpg?v=1774505318",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/9bdb0c11db524a13b2f13b27dcdf7ca2/9bdb0c11db524a13b2f13b27dcdf7ca2.HD-1080p-7.2Mbps-79515593.mp4?v=0",
    },
    videoLabel: "ETERNO マスク - LED スキンケア マルチライト リジュビネーション",
  },
  {
    id: "firedragon",
    title: "Firedragon - 赤色および近赤外線",
    subtitle: "マルチスペクトル",
    category: "red",
    tags: ["multispectrum"],
    rating: 4.8,
    now: 64981,
    was: 89349,
    createdAt: "2024-12-03",
    featuredRank: 3,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/Firedragon_-_Red_and_Near_Infrared_Light_Updated_800x.jpg?v=1774360509",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/24cc31ed3e334bd187b04c087c602968/24cc31ed3e334bd187b04c087c602968.HD-1080p-2.5Mbps-14442764.mp4?v=0",
    },
    videoLabel: "Firedragon の3Dビデオ",
  },
  {
    id: "freya-glasses",
    title: "Freya ブルーライトカット メガネ",
    category: "glasses",
    tags: [],
    rating: 4.3,
    now: 16276,
    was: 21159,
    createdAt: "2024-04-20",
    featuredRank: 4,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/682ee4ef473444b989182684f2ca9638.thumbnail.0000000000_800x.jpg?v=1774510507",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/682ee4ef473444b989182684f2ca9638/682ee4ef473444b989182684f2ca9638.HD-1080p-4.8Mbps-79521006.mp4?v=0",
    },
    videoLabel: "Freya Blue Light Blocking Glasses",
  },
  {
    id: "inferno-fullbody",
    title: "Inferno - 赤色および近赤外線（全身）",
    subtitle: "Full Body",
    category: "red",
    tags: ["fullbody"],
    rating: 4.9,
    now: 154632,
    was: 236019,
    createdAt: "2025-01-15",
    featuredRank: 5,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/0c541ec00b574833bcbb062c0807f996.thumbnail.0000000000_800x800_c56c3d66-221a-4b13-b852-4aa75c82f86c_800x.jpg?v=1774423306",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/0c541ec00b574833bcbb062c0807f996/0c541ec00b574833bcbb062c0807f996.HD-720p-4.5Mbps-51226301.mp4?v=0",
    },
    videoLabel: "Inferno - Red and Near Infrared Light",
  },
  {
    id: "firewave-pro",
    title: "Firewave Pro - 赤色および近赤外線光デバイス",
    subtitle: "モバイル",
    category: "red",
    tags: ["mobile"],
    rating: 5.0,
    now: 48830,
    was: 73246,
    createdAt: "2025-10-01",
    featuredRank: 6,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/1072d09c129f4d67b05dd65e8c9b95d6.thumbnail.0000000000_800x800_0cb0fe1e-730f-4648-87eb-db668af01fb8_800x.jpg?v=1774424836",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/1072d09c129f4d67b05dd65e8c9b95d6/1072d09c129f4d67b05dd65e8c9b95d6.HD-720p-1.6Mbps-26767939.mp4?v=0",
    },
    videoLabel: "Firewave Pro - Red and Near Infrared Light Device",
  },
  {
    id: "firefly-portable",
    title: "Firefly ポータブル赤色・近赤外線光デバイス",
    subtitle: ["モバイル", "ポータブル"],
    category: "red",
    tags: ["portable", "mobile"],
    rating: 5.0,
    now: 40614,
    was: 56861,
    createdAt: "2025-11-07",
    featuredRank: 7,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/1bedc3b7afc84fc2846b0aa46c416911.thumbnail.0000000000_800x800_800x800_196b85d6-97ab-4611-a121-7b1633827a00_800x.jpg?v=1774945704",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/f94f7805ef194849b62171076551eb02/f94f7805ef194849b62171076551eb02.HD-1080p-2.5Mbps-79887385.mp4?v=0",
    },
    videoLabel: "Firefly ポータブル赤色・近赤外線光デバイス",
  },
  {
    id: "nyx-glasses",
    title: "NYX ブルーライトブロッキンググラス",
    category: "glasses",
    tags: [],
    rating: 4.1,
    now: 16292,
    was: 21180,
    createdAt: "2023-10-29",
    featuredRank: 8,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/e355ac6a050a4f36b3b1eb5863e22c4c.thumbnail.0000000000_800x.jpg?v=1774510425",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/e355ac6a050a4f36b3b1eb5863e22c4c/e355ac6a050a4f36b3b1eb5863e22c4c.HD-1080p-4.8Mbps-79520902.mp4?v=0",
    },
    videoLabel: "NYX ブルーライトブロッキンググラス",
  },
  {
    id: "odin-magnesium-glasses",
    title: "オーディン マグネシウム ブルーライトブロッキングメガネ",
    category: "glasses",
    tags: [],
    rating: 4.5,
    now: 16292,
    was: 21180,
    createdAt: "2024-06-01",
    featuredRank: 9,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/f5fb32efcafa4ea48ee9cedbb9e02be5.thumbnail.0000000000_800x.jpg?v=1735929844",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/f5fb32efcafa4ea48ee9cedbb9e02be5/f5fb32efcafa4ea48ee9cedbb9e02be5.HD-1080p-7.2Mbps-40481061.mp4?v=0",
    },
    videoLabel: "オーディン マグネシウム ブルーライトブロッキングメガネ",
  },
  {
    id: "athena-24k-glasses",
    title: "アテナ 24Kゴールドメッキブルーライトブロッキングメガネ",
    category: "glasses",
    tags: [],
    rating: 4.6,
    now: 16292,
    was: 26068,
    createdAt: "2024-05-15",
    featuredRank: 10,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/169fe4636710461ba2e9f37fccf53fe7.thumbnail.0000000000_800x.jpg?v=1735929044",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/169fe4636710461ba2e9f37fccf53fe7/169fe4636710461ba2e9f37fccf53fe7.HD-1080p-7.2Mbps-40480652.mp4?v=0",
    },
    videoLabel: "アテナ 24Kゴールドメッキブルーライトブロッキングメガネ",
  },
  {
    id: "ares-aviator-glasses",
    title: "アレス 飛行士 ブルーライトブロッキングメガネ",
    category: "glasses",
    tags: [],
    rating: 4.5,
    now: 16292,
    was: 24439,
    createdAt: "2024-05-20",
    featuredRank: 11,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/6e3e2afa8d024af5978d72d6239e9944.thumbnail.0000000000_800x.jpg?v=1735928896",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/6e3e2afa8d024af5978d72d6239e9944/6e3e2afa8d024af5978d72d6239e9944.HD-1080p-7.2Mbps-40480560.mp4?v=0",
    },
    videoLabel: "アレス 飛行士 ブルーライトブロッキングメガネ",
  },
  {
    id: "apollo-glasses",
    title: "アポロ ブルーライトブロッキングメガネ",
    category: "glasses",
    tags: [],
    rating: 4.5,
    now: 12219,
    was: 21180,
    createdAt: "2024-05-25",
    featuredRank: 12,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/baea68b1ec78425c8b67d5f4a4a8668e.thumbnail.0000000000_800x.jpg?v=1774510596",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/baea68b1ec78425c8b67d5f4a4a8668e/baea68b1ec78425c8b67d5f4a4a8668e.HD-1080p-4.8Mbps-79521093.mp4?v=0",
    },
    videoLabel: "アポロ ブルーライトブロッキングメガネ",
  },
  {
    id: "firedragon-pro-panel",
    title: "ファイアドラゴンプロ レッドライトセラピーパネル — 288W COB",
    subtitle: "マルチスペクトル",
    category: "red",
    tags: ["multispectrum"],
    rating: 4.8,
    now: 89613,
    was: 130347,
    createdAt: "2025-02-01",
    featuredRank: 13,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/Firedragon_-_Red_and_Near_Infrared_Light_Updated_800x.jpg?v=1774360509",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/24cc31ed3e334bd187b04c087c602968/24cc31ed3e334bd187b04c087c602968.HD-1080p-2.5Mbps-14442764.mp4?v=0",
    },
    videoLabel: "ファイアドラゴンプロ レッドライトセラピーパネル（288W COB）",
  },
  {
    id: "anubis-glasses",
    title: "アヌビス ブルーライトブロッキングメガネ",
    category: "glasses",
    tags: [],
    rating: 4.4,
    now: 16270,
    was: 21152,
    createdAt: "2024-06-10",
    featuredRank: 15,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/b78a57e532474c43976d9eeab734b703.thumbnail.0000000000_800x.jpg?v=1735928618",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/b78a57e532474c43976d9eeab734b703/b78a57e532474c43976d9eeab734b703.HD-1080p-7.2Mbps-40480392.mp4?v=0",
    },
    videoLabel: "アヌビス ブルーライトブロッキングメガネ",
  },
  {
    id: "skoll-glasses",
    title: "スケル ブルーライトブロッキングメガネ",
    category: "glasses",
    tags: [],
    rating: 4.4,
    now: 32542,
    createdAt: "2024-06-12",
    featuredRank: 16,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/a24dd1e1b8d942978d29f3265e906158.thumbnail.0000000000_800x.jpg?v=1735588985",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/a24dd1e1b8d942978d29f3265e906158/a24dd1e1b8d942978d29f3265e906158.HD-1080p-7.2Mbps-40325074.mp4?v=0",
    },
    videoLabel: "スケル ブルーライトブロッキングメガネ",
  },
  {
    id: "inferno-pro-fullbody",
    title: "Inferno PRO – 赤色および近赤外線ライト",
    subtitle: "全身",
    category: "red",
    tags: ["fullbody"],
    rating: 4.9,
    now: 195259,
    was: 276618,
    createdAt: "2025-03-01",
    featuredRank: 17,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/0c541ec00b574833bcbb062c0807f996.thumbnail.0000000000_800x800_c56c3d66-221a-4b13-b852-4aa75c82f86c_800x.jpg?v=1774423306",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/0c541ec00b574833bcbb062c0807f996/0c541ec00b574833bcbb062c0807f996.HD-720p-4.5Mbps-51226301.mp4?v=0",
    },
    videoLabel: "Inferno PRO – 赤色および近赤外線ライト",
  },
  {
    id: "krypton-uv-606w",
    title: "クリプトン UV 606W — 赤、NIR + UVA/UVB ライトシステム",
    subtitle: ["フルスペクトル", "ポータブル"],
    category: "uv",
    tags: ["fullspectrum", "portable"],
    rating: 4.9,
    now: 292890,
    was: 406792,
    createdAt: "2025-04-01",
    featuredRank: 18,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/0d3add35dfce4f2aad2c00581a4e9019.thumbnail.0000000000_800x.jpg?v=1774506315",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/0d3add35dfce4f2aad2c00581a4e9019/0d3add35dfce4f2aad2c00581a4e9019.HD-1080p-4.8Mbps-79516591.mp4?v=0",
    },
    videoLabel: "クリプトン UV 606W — 赤、NIR + UVA/UVB ライトシステム",
  },
  {
    id: "electronic-premium-stand",
    title: "電子プレミアムスタンド",
    category: "stands",
    tags: [],
    rating: 4.5,
    now: 130006,
    createdAt: "2024-07-01",
    featuredRank: 19,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/c164226b04a44a71ab0a87ee3e1e7d6b.thumbnail.0000000000_800x.jpg?v=1703273427",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/c164226b04a44a71ab0a87ee3e1e7d6b/c164226b04a44a71ab0a87ee3e1e7d6b.HD-720p-4.5Mbps-22294214.mp4?v=0",
    },
    videoLabel: "電子プレミアムスタンド",
  },
  {
    id: "heavy-duty-stand",
    title: "ヘビーデューティースタンド",
    category: "stands",
    tags: [],
    rating: 4.4,
    now: 113901,
    createdAt: "2024-08-01",
    featuredRank: 20,
    image: {
      src: "https://emr-tek.com/cdn/shop/files/2.jpg?v=1750168496&width=900",
      alt: "ヘビーデューティースタンド",
    },
  },
  {
    id: "atlas-glasses",
    title: "アトラス ブルーライト ブロッキンググラス",
    category: "glasses",
    tags: [],
    rating: 4.4,
    now: 32381,
    createdAt: "2024-06-18",
    featuredRank: 21,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/7f77e90f523f489f9a95a1ca3745d07f.thumbnail.0000000000_800x.jpg?v=1735806369",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/7f77e90f523f489f9a95a1ca3745d07f/7f77e90f523f489f9a95a1ca3745d07f.HD-1080p-7.2Mbps-40405403.mp4?v=0",
    },
    videoLabel: "アトラス ブルーライトブロッキングメガネ",
  },
  {
    id: "valkyrie-glasses",
    title: "ヴァルキリー ブルーライト ブロッキンググラス",
    category: "glasses",
    tags: [],
    rating: 4.4,
    now: 32518,
    createdAt: "2024-06-20",
    featuredRank: 22,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/df0f463949a34d3784aec54fc145b5da.thumbnail.0000000000_800x.jpg?v=1735806563",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/df0f463949a34d3784aec54fc145b5da/df0f463949a34d3784aec54fc145b5da.HD-1080p-7.2Mbps-40405487.mp4?v=0",
    },
    videoLabel: "ヴァルキリー ブルーライトブロッキングメガネ",
  },
  {
    id: "krypton-uv-1612w",
    title: "クリプトン UV 1612W フルスペクトルライトシステム",
    subtitle: "プロ",
    category: "uv",
    tags: ["fullspectrum"],
    rating: 4.9,
    now: 520313,
    was: 731690,
    createdAt: "2025-05-01",
    featuredRank: 23,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/f20732db986440f783742406e923703c.thumbnail.0000000000_800x.jpg?v=1774506481",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/f20732db986440f783742406e923703c/f20732db986440f783742406e923703c.HD-1080p-4.8Mbps-79516690.mp4?v=0",
    },
    videoLabel: "クリプトン UV 1612W フルスペクトルライトシステム",
  },
  {
    id: "nova-kids-glasses",
    title: "Nova キッズ ブルーライト ブロッキンググラス",
    subtitle: "子供向け",
    category: "glasses",
    tags: [],
    rating: 4.5,
    now: 11380,
    was: 16258,
    createdAt: "2025-08-01",
    featuredRank: 24,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/534be42b3073429b8b86489b7febb3d4.thumbnail.0000000000_800x.jpg?v=1754143775",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/534be42b3073429b8b86489b7febb3d4/534be42b3073429b8b86489b7febb3d4.HD-1080p-7.2Mbps-53899425.mp4?v=0",
    },
    videoLabel: "ノヴァ キッズ ブルーライトブロッキングメガネ",
  },
  {
    id: "krypton-mini-pro",
    title: "Krypton Mini Pro 高密度赤色および近赤外線",
    category: "red",
    tags: ["mobile", "portable"],
    rating: 4.9,
    now: 154467,
    was: 195116,
    createdAt: "2025-09-01",
    featuredRank: 25,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/4ce9c07c9b904344acb5131838f46754.thumbnail.0000000000_800x800_61e6bab5-5f80-45a1-88e6-3fd9fe36e0e3_800x.jpg?v=1774423237",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/4ce9c07c9b904344acb5131838f46754/4ce9c07c9b904344acb5131838f46754.HD-1080p-7.2Mbps-54393499.mp4?v=0",
    },
    videoLabel: "Krypton Mini Pro 高密度赤色および近赤外線",
  },
  {
    id: "firestorm-pro",
    title: "Firestorm Pro 赤色および近赤外線ライトパネルデバイス",
    category: "red",
    tags: [],
    rating: 4.8,
    now: 146176,
    was: 162597,
    createdAt: "2025-10-01",
    featuredRank: 26,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/449510c85133454da0be9638fd56b297.thumbnail.0000000000_800x800_160c8880-1e8a-490f-a777-11d825d6cb40_800x.jpg?v=1774423030",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/449510c85133454da0be9638fd56b297/449510c85133454da0be9638fd56b297.HD-720p-2.1Mbps-22718444.mp4?v=0",
    },
    videoLabel: "Firestorm Pro 赤色および近赤外線ライトパネルデバイス",
  },
  {
    id: "krypton-micro-portable",
    title: "クリプトン マイクロ ポータブル 赤色および近赤外線デバイス",
    subtitle: ["ポータブル", "フルスペクトル"],
    category: "red",
    tags: ["portable", "fullspectrum"],
    rating: 4.9,
    now: 97504,
    createdAt: "2025-11-01",
    featuredRank: 27,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/2db3eeb1d3d043ccb47fab57f2ea379c.thumbnail.0000000000_800x.jpg?v=1774506643",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/2db3eeb1d3d043ccb47fab57f2ea379c/2db3eeb1d3d043ccb47fab57f2ea379c.HD-1080p-4.8Mbps-79516829.mp4?v=0",
    },
    videoLabel: "クリプトン マイクロ ポータブル 赤色および近赤外線デバイス",
  },
  {
    id: "krypton-floor-stand",
    title: "クリプトンフロアスタンド",
    category: "stands",
    tags: [],
    rating: 4.5,
    now: 73128,
    createdAt: "2025-05-15",
    featuredRank: 28,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/a5b29baea4d14f4bb012a7e1009056e2.thumbnail.0000000000_800x800_8ff3bbc4-5bee-4fda-b16e-53567baea653_800x.jpg?v=1774423424",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/a5b29baea4d14f4bb012a7e1009056e2/a5b29baea4d14f4bb012a7e1009056e2.HD-1080p-7.2Mbps-50428192.mp4?v=0",
    },
    videoLabel: "Krypton Floor Stand",
  },
  {
    id: "firehawk-fullbody",
    title: "ファイアホーク フルボディレッド&近赤外線ライトシステム（特許保留中）",
    subtitle: ["Full Body", "Multi Spectrum"],
    category: "red",
    tags: ["fullbody", "multispectrum"],
    rating: 5.0,
    now: 1625093,
    createdAt: "2025-05-01",
    featuredRank: 29,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/5afb4a284f89462faa4124f32e6f9f2a.thumbnail.0000000000_800x.jpg?v=1774510672",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/5afb4a284f89462faa4124f32e6f9f2a/5afb4a284f89462faa4124f32e6f9f2a.HD-1080p-7.2Mbps-79521192.mp4?v=0",
    },
    videoLabel: "ファイアホーク フルボディレッド&近赤外線ライトシステム（特許保留中）",
  },
  {
    id: "ultron-fullbody",
    title: "ウルトロン フルボディマルチスペクトルライトシステム（特許保留中）",
    subtitle: "Full Body",
    category: "red",
    tags: ["fullbody", "multispectrum"],
    rating: 5.0,
    now: 2437640,
    was: 2762659,
    createdAt: "2025-06-01",
    featuredRank: 31,
    video: {
      poster:
        "https://emr-tek.com/cdn/shop/files/preview_images/8af54a86c58f4f119467bdb2f4194aac.thumbnail.0000000000_800x800_b55cd186-05b9-431f-8fe5-e89a5c5ee1ab_800x.jpg?v=1774424597",
      src: "https://emr-tek.com/cdn/shop/videos/c/vp/8af54a86c58f4f119467bdb2f4194aac/8af54a86c58f4f119467bdb2f4194aac.HD-720p-2.1Mbps-39197658.mp4?v=0",
    },
    videoLabel: "ウルトロン フルボディマルチスペクトルライトシステム（特許保留中）",
  },
];

/** 静的カタログ id → EMR-TEK 公式（日本語ストア）商品ハンドル。未指定時は id をそのまま使用（JP に未掲載の場合は 404 の可能性あり） */
const SHOP_JP_PRODUCT_HANDLE = {
  "firewave-compact": "firewave",
  "firefly-portable": "firefly-1",
  "eterno-mask": "eterno-mask",
  "inferno-fullbody": "inferno",
  "inferno-pro-fullbody": "inferno-pro-red-and-near-infrared-light",
  "firehawk-fullbody": "firehawk",
  "firedragon-pro-panel": "firedragon-pro-red-and-near-infrared-light",
  "firewave-pro": "firewave-pro-300-watts-red-and-near-infrared-light",
  "emr-light-stand": "stand",
  "heavy-duty-stand": "heavy-duty-stand",
  "electronic-premium-stand": "electronic-premium-stand",
  "freya-glasses": "freya",
  "nyx-glasses": "nyx",
  "odin-magnesium-glasses": "odin",
  "athena-24k-glasses": "athena",
  "ares-aviator-glasses": "ares",
  "apollo-glasses": "apollo",
  "anubis-glasses": "anubis",
  "skoll-glasses": "skoll",
  "atlas-glasses": "atlas",
  "valkyrie-glasses": "valkyrie",
  "nova-kids-glasses": "nova",
  "krypton-uv-606w": "krypton-uv-500w-1400w",
  "krypton-uv-1612w": "krypton-uv-1612w",
  "krypton-mini-pro": "krypton-mini-pro-cob-intergration",
  "krypton-micro-portable": "krypton-micro",
  "krypton-floor-stand": "krpyton-floor-stand",
  "ultron-fullbody": "ultron-patent-pending",
};

function getShopJpProductUrl(productId) {
  const handle = SHOP_JP_PRODUCT_HANDLE[productId] ?? productId;
  return `https://emr-tek.com/en-jp/products/${handle}`;
}

/** このサイト内で用意している商品詳細ページ（存在するものだけ） */
const LOCAL_PRODUCT_PAGES = {
  "freya-glasses": "./product-freya.html",
  "firefly-portable": "./product-firefly.html",
  "eterno-mask": "./product-eterno.html",
  firedragon: "./product-firedragon.html",
  "firewave-compact": "./product-firewave-compact.html",
  "inferno-fullbody": "./product-inferno.html",
  "firewave-pro": "./product-firewave-pro.html",
  "firedragon-pro-panel": "./product-firedragon-pro.html",
  "inferno-pro-fullbody": "./product-inferno-pro.html",
  "firestorm-pro": "./product-firestorm-pro.html",
  "firehawk-fullbody": "./product-firehawk.html",
  "ultron-fullbody": "./product-ultron.html",
  "nyx-glasses": "./product-nyx.html",
  "odin-magnesium-glasses": "./product-odin-magnesium.html",
  "athena-24k-glasses": "./product-athena-24k.html",
  "ares-aviator-glasses": "./product-ares-aviator.html",
  "apollo-glasses": "./product-apollo.html",
  "anubis-glasses": "./product-anubis-glasses.html",
  "skoll-glasses": "./product-skoll-glasses.html",
  "atlas-glasses": "./product-atlas-glasses.html",
  "valkyrie-glasses": "./product-valkyrie-glasses.html",
  "nova-kids-glasses": "./product-nova-kids-glasses.html",
  "emr-light-stand": "./product-emr-light-stand.html",
  "krypton-uv-606w": "./product-krypton-uv-606w.html",
  "krypton-uv-1612w": "./product-krypton-uv-1612w.html",
  "krypton-mini-pro": "./product-krypton-mini-pro.html",
  "krypton-micro-portable": "./product-krypton-micro-portable.html",
  "electronic-premium-stand": "./product-electronic-premium-stand.html",
  "heavy-duty-stand": "./product-heavy-duty-stand.html",
  "krypton-floor-stand": "./product-krypton-floor-stand.html",
};

function getProductDetailUrl(productId) {
  // 個別に用意した紹介ページがあればそれを優先。無ければ汎用の商品紹介ページへ。
  return LOCAL_PRODUCT_PAGES[productId] ?? `./product.html?id=${encodeURIComponent(productId)}`;
}

function yen(n) {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(n);
}

function uiLang() {
  const si = window.siteI18n;
  return si && typeof si.getLang === "function" ? si.getLang() : "ja";
}

function uiT(key, fallback) {
  const si = window.siteI18n;
  if (si && typeof si.t === "function") {
    const v = si.t(uiLang(), key);
    if (v && v !== key) return v;
  }
  return fallback ?? key;
}

function safeText(s) {
  return typeof s === "string" ? s : "";
}

function productTagsForDisplay(p) {
  const tags = [];
  if (p.subtitle) {
    if (Array.isArray(p.subtitle)) tags.push(...p.subtitle);
    else tags.push(p.subtitle);
  } else {
    tags.push(categoryLabel(p.category));
  }
  return tags.filter(Boolean).slice(0, 4);
}

function productDescriptionJa(p) {
  if (p.category === "glasses") {
    return (
      "ブルーライト環境での作業や夜間の光刺激を意識する方向けのメガネです。日常のルーチンに取り入れやすいよう、軽さと装着感のバランスを重視しています。"
    );
  }
  if (p.category === "uv") {
    return "太陽光に近い体験を室内で。UV（紫外線）を含むライトシステムとして、目的に応じた運用を想定しています。";
  }
  if (p.category === "mask") {
    return "スキンケアと相性の良いLEDマスク。波長を使い分けながら、毎日のケアを継続しやすいプロトコルを想定しています。";
  }
  if (p.category === "stands") {
    if (p.id === "emr-light-stand") {
      return "EMR-TEK のライトスタンドを使用して赤色光療法の結果と快適さを最適化し、デバイスの位置を完璧にすることで、各セッションの有効性を簡単に最大化できます。";
    }
    return "ライトデバイスの設置・角度調整をサポートするアクセサリーです。使用シーンに合わせた安定性と取り回しを重視しています。";
  }
  if (p.category === "indoor") {
    return "室内の光環境を整えるための照明ソリューション。生活リズムに配慮し、自然光に近い体験を目指します。";
  }
  return "赤色光・近赤外線を中心としたライトデバイス。日々のルーチンに取り入れやすい運用を想定しています。";
}

function setMetaDescription(text) {
  const el = document.querySelector('meta[name="description"]');
  if (el) el.setAttribute("content", text);
}

function genericEyewearSafetyHtml() {
  return (
    "<p>本品は病気の診断、治療、治癒、予防を目的とした医療機器ではありません。装着中にかすみ・めまい・頭痛・吐き気などが続く場合は使用を中止し、眼科など専門家への相談を検討してください。</p><p>レンズの色味やコントラストの見え方は変わります。運転、工事現場での段差、精密機器の操作など、明暗や色相の判別が重要な場面では十分ご注意ください。</p><p>お子様、妊娠中の方、眼の疾患や手術歴、強い光への過敏症がある方は、自己判断での長時間装着を避け、必要に応じて医師の指示に従ってください。</p>"
  );
}

function genericEyewearUsageHtml() {
  return (
    "<ul class=\"list\"><li>ご注文時に選んだレンズ仕様（度数・レンズカラー・PDなど）に合わせ、普段の作業環境でお使いください。</li><li>色付きレンズを初めて使う場合は、短時間から試し、めまい・かすみ・頭痛などがあれば休憩してください。</li><li>公式ストアのサイズ表と瞳間距離（PD）を照らし、フィット感の目安を確認してください。</li><li>清拭は眼鏡用クロスで行い、レンズを傷つけないよう注意してください。</li></ul>"
  );
}

function freyaProductDescriptionHtml() {
  return (
    "<p>Freya（旧名: Angel）は、アセテート素材のフレームを用いたブルーライト対策メガネです。EMR-TEKの公式商品ページでは、<strong>日中向け（イエロー系）</strong>と<strong>夜間向け（レッド系）</strong>の二系統レンズに、生活シーンに合わせた使い分けが紹介されています。</p><p>ストア側の説明では、イエローレンズが<strong>およそ400〜450nm</strong>付近の青味の強い成分を抑える設計として位置づけられ、ディスプレイ中心の<strong>昼の作業</strong>向きとされています。レッドレンズは<strong>およそ400〜570nm</strong>まで視野を広げたフィルター設計として紹介され、<strong>夕方〜夜の室内光や画面</strong>での運用が想定されています（いずれも製品説明に基づく技術的な位置づけであり、体感や生活リズムへの影響には個人差があります）。</p><p><strong>フレームカラー</strong>：Black / Transparent。<strong>レンズカラー</strong>：Clear / Yellow / Red / Orange。<strong>Freyaのサイズ目安</strong>：レンズ幅49mm・レンズ高40mm・ブリッジ16mm・テンプル145mm（公式サイズ表の一行に基づく値）。</p><p><strong>度数・仕様</strong>：プレーン（非度数）、リーディング用+1.25 / +2.00に加え、単焦点（遠用・近用のカスタム）、累進、フラットトップ／ラウンドトップの二焦点などを選べます。処方レンズは個別製作のため、公式ではお届けに<strong>15〜20営業日程度</strong>かかる場合がある旨が案内されています。</p><p><strong>瞳間距離（PD）</strong>は注文時に指定でき、50〜75mmなど細かなステップで選べます（公式ストアの注文フローに準じます）。</p><p class=\"micro subtle\">※ 眠気・眼の不快感・生活リズムの改善を保証するものではありません。眼科受診中・医師から注意事項がある場合は事前にご相談ください。</p>"
  );
}

function freyaProductUsageHtml() {
  return (
    "<ul class=\"list\"><li><strong>日中（スクリーン中心の作業）</strong>：公式説明ではイエローレンズが想定されているケースが多いです。色味に慣れるまで、連続装着時間を短く分けてお試しください。</li><li><strong>夕方〜夜（就寝前の室内）</strong>：公式説明ではレッドレンズが短波長域を広く抑える設計と位置づけられています。就寝直前の明るい画面の見方とあわせ、ご自身のリズムに合わせて調整してください。</li><li><strong>運転・屋外</strong>：色付きレンズは信号や道路環境の見え方を変えることがあります。視界に不安がある場合は使用を避け、必要に応じて別の処方眼鏡をご検討ください。</li><li><strong>処方オーダー</strong>：検査値に基づく最終仕様が注文内容と一致しているか確認してください。製作には日数がかかることがあります。</li><li><strong>お手入れ</strong>：眼鏡用クロスでやさしく乾拭きし、硬い布や溶解性の強い溶剤は避けてください。</li></ul>"
  );
}

function initProductTemplatePage() {
  const page = document.querySelector("[data-product-template]");
  if (!page) return;

  const id = new URLSearchParams(window.location.search).get("id") || "";
  const p = PRODUCTS.find((x) => x.id === id);

  const notFound = document.querySelector("[data-product-notfound]");
  const panel = document.querySelector("[data-product-panel]");
  if (!p) {
    if (panel) panel.hidden = true;
    if (notFound) notFound.hidden = false;
    const nameEl = document.querySelector("[data-product-missing-id]");
    if (nameEl) nameEl.textContent = id ? `(${id})` : "";
    return;
  }

  if (notFound) notFound.hidden = true;
  if (panel) panel.hidden = false;

  document.title = `${p.title} – EMR-TEK`;
  const h1 = document.querySelector("[data-product-title]");
  if (h1) h1.textContent = p.title;
  const breadcrumb = document.querySelector("[data-product-breadcrumb]");
  if (breadcrumb) breadcrumb.textContent = p.title.split("–")[0].trim() || p.title;

  const ratingEl = document.querySelector("[data-product-rating]");
  if (ratingEl) ratingEl.textContent = p.rating.toFixed(1);
  const starsEl = document.querySelector("[data-product-stars]");
  if (starsEl) starsEl.textContent = "★★★★★";

  const nowEl = document.querySelector("[data-product-price-now]");
  if (nowEl) nowEl.textContent = yen(p.now);
  const wasEl = document.querySelector("[data-product-price-was]");
  const saveEl = document.querySelector("[data-product-price-save]");
  const onSale = Boolean(p.was && p.was > p.now);
  if (wasEl) {
    wasEl.textContent = onSale ? yen(p.was) : "";
    wasEl.hidden = !onSale;
  }
  if (saveEl) {
    saveEl.textContent = onSale ? `保存 ${yen(p.was - p.now)}` : "";
    saveEl.hidden = !onSale;
  }

  const tagsHost = document.querySelector("[data-product-tags]");
  if (tagsHost) {
    tagsHost.innerHTML = "";
    productTagsForDisplay(p).forEach((t) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = String(t);
      tagsHost.appendChild(span);
    });
  }

  const addBtn = document.querySelector("[data-product-add]");
  if (addBtn instanceof HTMLButtonElement) {
    addBtn.setAttribute("data-add-id", p.id);
  }

  const desc = document.querySelector("[data-product-desc]");
  const descTitle = document.querySelector("[data-product-desc-title]");
  const safetySummary = document.querySelector("[data-product-safety-summary]");
  const safetyBody = document.querySelector("[data-product-safety-body]");
  const usageSummary = document.querySelector("[data-product-usage-summary]");
  const usageBody = document.querySelector("[data-product-usage-body]");

  if (p.id === "freya-glasses") {
    setMetaDescription(
      "Freyaは昼夜の使い分けを想定したブルーライト対策メガネ。アセテートフレーム、二系統レンズ、PD指定や度数カスタムに対応。EMR-TEK公式情報を日本語で整理した紹介ページです。"
    );
    if (descTitle) descTitle.textContent = "Freyaについて";
    if (desc) desc.innerHTML = freyaProductDescriptionHtml();
  } else if (desc) {
    desc.textContent = productDescriptionJa(p);
  }

  if (p.category === "glasses") {
    if (safetySummary) safetySummary.textContent = "大切なご注意（アイウェア）";
    if (safetyBody) safetyBody.innerHTML = genericEyewearSafetyHtml();
    if (p.id === "freya-glasses") {
      if (usageSummary) usageSummary.textContent = "昼夜レンズの使い分け（目安）";
      if (usageBody) usageBody.innerHTML = freyaProductUsageHtml();
    } else {
      if (usageSummary) usageSummary.textContent = "使い方の目安";
      if (usageBody) usageBody.innerHTML = genericEyewearUsageHtml();
    }
  }

  // 公式ストアへの導線（任意）
  const shopLink = document.querySelector("[data-product-shop-link]");
  if (shopLink instanceof HTMLAnchorElement) {
    shopLink.href = getShopJpProductUrl(p.id);
  }

  // ギャラリーを構築（video要素は常に1つ置き、サムネで切替）
  const gallery = document.querySelector("[data-product-gallery]");
  const stage = document.querySelector("[data-product-media-stage]");
  const track = document.querySelector("[data-product-thumb-track]");
  if (!(gallery instanceof HTMLElement) || !(stage instanceof HTMLElement) || !(track instanceof HTMLElement)) return;

  stage.innerHTML = "";
  track.innerHTML = "";

  const video = document.createElement("video");
  video.className = "productPage__video";
  video.setAttribute("playsinline", "true");
  video.setAttribute("controls", "controls");
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.preload = "metadata";
  video.setAttribute("aria-label", safeText(p.videoLabel) || p.title);
  video.setAttribute("data-gallery-video", "");
  const poster = p.video?.poster || p.image?.src || "";
  if (poster) video.setAttribute("poster", poster);
  if (p.video?.src) {
    const src = document.createElement("source");
    src.src = p.video.src;
    src.type = "video/mp4";
    video.appendChild(src);
  }
  // 画像フォールバック
  if (poster) {
    const img = document.createElement("img");
    img.src = poster;
    img.alt = p.title;
    img.loading = "lazy";
    video.appendChild(img);
  }
  stage.appendChild(video);

  const addThumb = (btn) => track.appendChild(btn);
  const thumbImg = (src, alt) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    img.width = 98;
    img.height = 98;
    return img;
  };

  if (p.video?.src) {
    const b = document.createElement("button");
    b.className = "productThumbs__thumb";
    b.type = "button";
    b.setAttribute("aria-label", "メディア 1（動画）");
    b.setAttribute("aria-current", "true");
    b.setAttribute("data-media", "video");
    b.setAttribute("data-video-src", p.video.src);
    if (p.video.poster) b.setAttribute("data-poster", p.video.poster);
    b.appendChild(thumbImg(p.video.poster || poster, p.title));
    const play = document.createElement("span");
    play.className = "productThumbs__play";
    play.setAttribute("aria-hidden", "true");
    play.innerHTML =
      '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path fill="currentColor" d="M2 1.5 8.5 5 2 8.5z" /></svg>';
    b.appendChild(play);
    addThumb(b);
  }

  if (poster) {
    const b = document.createElement("button");
    b.className = "productThumbs__thumb";
    b.type = "button";
    b.setAttribute("aria-label", p.video?.src ? "メディア 2（画像）" : "メディア 1（画像）");
    b.setAttribute("aria-current", p.video?.src ? "false" : "true");
    b.setAttribute("data-media", "image");
    b.setAttribute("data-img-src", poster);
    b.appendChild(thumbImg(poster, p.title));
    addThumb(b);
  }

}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function readJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function openModal(modal) {
  if (!modal) return;
  if (typeof modal.showModal === "function") modal.showModal();
}

function closeModal(modal) {
  if (!modal) return;
  if (typeof modal.close === "function") modal.close();
}

function computeSave(now, was) {
  if (!was || was <= now) return 0;
  return was - now;
}

/** @typedef {{[productId:string]: number}} Cart */

function getCart() {
  /** @type {Cart} */
  const cart = readJSON(STORAGE.cart, {});
  for (const [k, v] of Object.entries(cart)) {
    if (typeof v !== "number" || !Number.isFinite(v) || v <= 0) delete cart[k];
  }
  return cart;
}

function setCart(cart) {
  writeJSON(STORAGE.cart, cart);
}

function cartCount(cart) {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function cartSubtotal(cart) {
  let sum = 0;
  for (const [id, qty] of Object.entries(cart)) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) continue;
    sum += p.now * qty;
  }
  return sum;
}

function updateCartUI() {
  const cart = getCart();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(cartCount(cart));
  });

  document.querySelectorAll("[data-cart]").forEach((root) => {
    const emptyEl = root.querySelector("[data-cart-empty]");
    const listEl = root.querySelector("[data-cart-list]");
    const summaryEl = root.querySelector("[data-cart-summary]");
    const subtotalEl = root.querySelector("[data-cart-subtotal]");

    if (!listEl || !emptyEl || !summaryEl || !subtotalEl) return;

    listEl.innerHTML = "";
    const entries = Object.entries(cart);
    if (entries.length === 0) {
      emptyEl.hidden = false;
      summaryEl.hidden = true;
      return;
    }

    emptyEl.hidden = true;
    summaryEl.hidden = false;

    for (const [id, qty] of entries) {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) continue;

      const li = document.createElement("li");
      li.className = "cartitem";
      li.innerHTML = `
      <div>
        <div class="cartitem__title"></div>
        <div class="cartitem__meta"></div>
      </div>
      <div class="cartitem__actions">
        <div class="qty" role="group" aria-label="数量">
          <button type="button" data-qty="-1" aria-label="減らす">−</button>
          <span data-qty-value>${qty}</span>
          <button type="button" data-qty="+1" aria-label="増やす">+</button>
        </div>
        <button type="button" class="btn btn--sm btn--ghost" data-remove>削除</button>
      </div>
    `;

      $(".cartitem__title", li).textContent = p.title;
      $(".cartitem__meta", li).textContent = `${yen(p.now)} / 個`;

      const bump = (delta) => {
        const next = clamp((getCart()[id] ?? 0) + delta, 0, 999);
        const cartNext = getCart();
        if (next === 0) delete cartNext[id];
        else cartNext[id] = next;
        setCart(cartNext);
        updateCartUI();
      };

      $all("button[data-qty]", li).forEach((b) => {
        b.addEventListener("click", () => bump(Number(b.getAttribute("data-qty"))));
      });
      $("[data-remove]", li).addEventListener("click", () => bump(-999));

      listEl.appendChild(li);
    }

    subtotalEl.textContent = yen(cartSubtotal(cart));
  });
}

let _cartToastHideTimer = 0;

function showCartAddedToast(productTitle, qty) {
  const title = productTitle || "商品";
  const q = Math.max(1, Math.floor(Number(qty)) || 1);
  const msg =
    q > 1 ? `${title} を ${q} 点カートに追加しました` : `${title} をカートに追加しました`;

  let el = document.getElementById("cart-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "cart-toast";
    el.className = "cartToast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }

  window.clearTimeout(_cartToastHideTimer);
  el.textContent = msg;
  el.hidden = false;
  requestAnimationFrame(() => {
    el.classList.add("cartToast--visible");
  });

  _cartToastHideTimer = window.setTimeout(() => {
    el.classList.remove("cartToast--visible");
    _cartToastHideTimer = window.setTimeout(() => {
      el.hidden = true;
    }, 280);
  }, 3200);
}

/**
 * @param {string} productId
 * @param {number} [qty=1] 追加する個数
 */
function addToCart(productId, qty = 1) {
  const q = Math.max(1, Math.min(999, Math.floor(Number(qty)) || 1));
  const cart = getCart();
  cart[productId] = (cart[productId] ?? 0) + q;
  setCart(cart);
  updateCartUI();
  const p = PRODUCTS.find((x) => x.id === productId);
  showCartAddedToast(p?.title ?? "商品", q);
}

function clearCart() {
  setCart({});
  updateCartUI();
}

/** @returns {{categories:Set<string>, tags:Set<string>, q:string, min?:number, max?:number}} */
function readFilters() {
  const categories = new Set($all('input[data-filter="category"]:checked').map((i) => i.value));
  const tags = new Set($all('input[data-filter="tag"]:checked').map((i) => i.value));
  const q = (document.querySelector("[data-search]")?.value ?? "").trim().toLowerCase();

  const minRaw = document.querySelector("[data-filter-min]")?.value?.trim() ?? "";
  const maxRaw = document.querySelector("[data-filter-max]")?.value?.trim() ?? "";
  const min = minRaw ? Number(minRaw) : undefined;
  const max = maxRaw ? Number(maxRaw) : undefined;

  return {
    categories,
    tags,
    q,
    min: Number.isFinite(min) ? min : undefined,
    max: Number.isFinite(max) ? max : undefined,
  };
}

function matchesFilters(p, f) {
  if (f.categories.size > 0 && !f.categories.has(p.category)) return false;
  if (f.tags.size > 0) {
    for (const t of f.tags) {
      if (!p.tags.includes(t)) return false;
    }
  }
  if (f.q) {
    const sub = Array.isArray(p.subtitle) ? p.subtitle.join(" ") : (p.subtitle ?? "");
    const hay = `${p.title} ${sub}`.toLowerCase();
    if (!hay.includes(f.q)) return false;
  }
  if (typeof f.min === "number" && p.now < f.min) return false;
  if (typeof f.max === "number" && p.now > f.max) return false;
  return true;
}

function sortProducts(items, sortKey) {
  const copy = [...items];
  switch (sortKey) {
    case "bestselling":
      return copy.sort((a, b) => a.featuredRank - b.featuredRank);
    case "az":
      return copy.sort((a, b) => a.title.localeCompare(b.title, "ja"));
    case "za":
      return copy.sort((a, b) => b.title.localeCompare(a.title, "ja"));
    case "price_asc":
      return copy.sort((a, b) => a.now - b.now);
    case "price_desc":
      return copy.sort((a, b) => b.now - a.now);
    case "new_desc":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "old_asc":
      return copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    case "best":
    default:
      return copy.sort((a, b) => a.featuredRank - b.featuredRank);
  }
}

function categoryLabel(cat) {
  const keys = {
    red: "emr.index.shop.cat.red",
    mask: "emr.index.shop.cat.mask",
    uv: "emr.index.shop.cat.uv",
    glasses: "emr.index.shop.cat.glasses",
    cosmetics: "emr.index.shop.cat.cosmetics",
    indoor: "emr.index.shop.cat.indoor",
    stands: "emr.index.shop.cat.stands",
    emf: "emr.index.shop.cat.emf",
  };
  const fallbacks = {
    red: "赤色光・近赤外",
    mask: "LEDマスク",
    uv: "UV",
    glasses: "ブルーライトカット",
    cosmetics: "コスメ",
    indoor: "室内照明",
    stands: "スタンド",
    emf: "EMF対策",
  };
  if (keys[cat]) return uiT(keys[cat], fallbacks[cat]);
  return uiT("emr.index.shop.cat.default", "商品");
}

function renderGrid() {
  const grid = document.querySelector("[data-grid]");
  if (!grid) return;
  grid.setAttribute("aria-busy", "true");

  const f = readFilters();
  const sortKey = document.querySelector("[data-sort]")?.value ?? "best";
  const filtered = PRODUCTS.filter((p) => matchesFilters(p, f));
  const items = sortProducts(filtered, sortKey);

  const meta = document.querySelector("[data-results-meta]");
  if (meta) {
    meta.textContent = uiT("emr.index.shop.resultsMeta", `${items.length}件 / 全${PRODUCTS.length}件`)
      .replace("{shown}", String(items.length))
      .replace("{total}", String(PRODUCTS.length));
  }

  const isShopAllGrid = grid.classList.contains("shopAll__grid");
  const isUniformProductGrid =
    grid.classList.contains("productGrid--uniform") || isShopAllGrid;

  grid.innerHTML = "";
  for (const p of items) {
    const card = document.createElement("article");
    card.className = isShopAllGrid ? "product product--shopCardHit" : "product";

    const save = computeSave(p.now, p.was);
    const tagLabel = p.subtitle
      ? Array.isArray(p.subtitle)
        ? p.subtitle[0]
        : p.subtitle
      : categoryLabel(p.category);

    const collectionRow = isShopAllGrid
      ? `<p class="product__collection">
          <span class="sr-only">${uiT("emr.index.shop.collectionSr", "コレクション名：")}</span>
          <a class="product__collectionLink" href="./collection-all.html">${uiT("emr.index.shop.collectionAll", "全商品")}</a>
        </p>`
      : "";

    const mediaHtml = p.video || p.image
      ? ""
      : `
      <div class="product__media">
        <div class="pilltag"></div>
      </div>`;

    const onSale = Boolean(p.was && p.was > p.now);
    const addLabel = uiT("emr.index.btn.addToCart", "カートに追加");
    const detailsLabel = uiT("emr.index.btn.details", "詳細");
    const actionsHtml = isUniformProductGrid
      ? `<div class="product__actions">
          <button class="btn" type="button" data-add>${addLabel}</button>
        </div>`
      : `<div class="product__actions">
          <button class="btn" type="button" data-add>${addLabel}</button>
          <button class="btn btn--ghost" type="button" data-view>${detailsLabel}</button>
        </div>`;
    const priceInner = onSale
      ? `<span class="sr-only">${uiT("emr.index.price.sale", "販売価格")}</span>
          <span class="price__now"></span>
          <span class="sr-only">${uiT("emr.index.price.regular", "通常価格")}</span>
          <span class="price__was"></span>
          <span class="save"></span>`
      : `<span class="sr-only">${uiT("emr.index.price.label", "価格")}</span>
          <span class="price__now"></span>
          <span class="price__was" hidden></span>
          <span class="save" hidden></span>`;

    card.innerHTML = `
      ${mediaHtml}
      <div class="product__body">
        ${collectionRow}
        <div class="product__tags" data-product-tags></div>
        <h3 class="product__title"></h3>
        <div class="stars" aria-label="${uiT("emr.index.aria.ratingValue", "評価 ${p.rating.toFixed(1)} / 5").replace("{rating}", p.rating.toFixed(1))}">
          <span class="stars__dots" aria-hidden="true">★★★★★</span>
          <span>${p.rating.toFixed(1)}</span>
        </div>
        <div class="price ${onSale ? "price--sale" : ""}" data-price-root>
          ${priceInner}
        </div>
        ${actionsHtml}
      </div>
    `;

    const mediaSlot = mediaHtml ? null : $(".product__media", card);
    if (p.video && p.video.src) {
      const wrap = document.createElement("div");
      wrap.className = "product__media product__media--video";
      const v = document.createElement("video");
      v.className = "product__mediaVideo";
      v.setAttribute("playsinline", "");
      v.muted = true;
      v.autoplay = true;
      v.loop = true;
      v.preload = "metadata";
      v.poster = p.video.poster;
      v.setAttribute("aria-label", p.videoLabel || `${p.title}の紹介動画`);
      const src = document.createElement("source");
      src.src = p.video.src;
      src.type = "video/mp4";
      v.appendChild(src);
      const fallback = document.createElement("img");
      fallback.alt = "";
      fallback.src = p.video.poster;
      fallback.decoding = "async";
      fallback.loading = "lazy";
      v.appendChild(fallback);
      wrap.appendChild(v);
      card.insertBefore(wrap, card.firstChild);
    } else if (p.image && p.image.src) {
      const wrap = document.createElement("div");
      wrap.className = "product__media product__media--video";
      const img = document.createElement("img");
      img.className = "product__mediaVideo";
      img.alt = p.image.alt ?? p.title;
      img.src = p.image.src;
      img.loading = "lazy";
      img.decoding = "async";
      wrap.appendChild(img);
      card.insertBefore(wrap, card.firstChild);
    } else if (mediaSlot) {
      $(".pilltag", card).textContent = tagLabel;
    }

    const tagsEl = $("[data-product-tags]", card);
    if (tagsEl) {
      tagsEl.innerHTML = "";
      if (p.subtitle) {
        const labels = Array.isArray(p.subtitle) ? p.subtitle : [p.subtitle];
        for (const text of labels) {
          const span = document.createElement("span");
          span.className = "product__tag";
          span.textContent = text;
          tagsEl.appendChild(span);
        }
      } else {
        tagsEl.hidden = true;
      }
    }

    const titleHost = $(".product__title", card);
    if (isUniformProductGrid && !isShopAllGrid) {
      const shopUrl = getProductDetailUrl(p.id);
      titleHost.innerHTML = "";
      const a = document.createElement("a");
      a.className = "product__titleLink";
      a.href = shopUrl;
      if (shopUrl.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.textContent = p.title;
      titleHost.appendChild(a);
    } else {
      titleHost.textContent = p.title;
    }

    if (isShopAllGrid) {
      const shopUrl = getProductDetailUrl(p.id);
      const hit = document.createElement("a");
      hit.className = "product__cardHit";
      hit.href = shopUrl;
      if (shopUrl.startsWith("http")) {
        hit.target = "_blank";
        hit.rel = "noopener noreferrer";
      }
      hit.setAttribute("aria-label", `${p.title}の公式商品ページを開く`);
      card.appendChild(hit);
    }
    $(".price__now", card).textContent = yen(p.now);

    const wasEl = $(".price__was", card);
    const saveEl = $(".save", card);
    if (onSale) {
      wasEl.textContent = yen(p.was);
      saveEl.textContent = uiT("emr.index.saveDeal", `${yen(save)} お得`).replace("{amount}", yen(save));
    } else if (wasEl && saveEl) {
      wasEl.textContent = "";
      saveEl.textContent = "";
    }

    $("[data-add]", card).addEventListener("click", () => addToCart(p.id, 1));
    const viewBtn = $("[data-view]", card);
    if (viewBtn) {
      viewBtn.addEventListener("click", () => {
        alert(`詳細ページは未実装です。\n\n${p.title}\n価格：${yen(p.now)}`);
      });
    }

    grid.appendChild(card);
  }

  grid.setAttribute("aria-busy", "false");
}

function initCookieBanner() {
  const wrap = document.querySelector("[data-cookie]");
  if (!wrap) return;
  const consent = localStorage.getItem(STORAGE.cookie);
  if (!consent) wrap.hidden = false;

  document.querySelector('[data-action="cookie-accept"]')?.addEventListener("click", () => {
    localStorage.setItem(STORAGE.cookie, "accepted");
    wrap.hidden = true;
  });
  document.querySelector('[data-action="cookie-decline"]')?.addEventListener("click", () => {
    localStorage.setItem(STORAGE.cookie, "declined");
    wrap.hidden = true;
  });
}

function initModals() {
  const cartModal = document.querySelector("[data-cart-modal]");
  const searchModal = document.querySelector("[data-search-modal]");

  document.querySelector('[data-action="open-cart"]')?.addEventListener("click", () => {
    updateCartUI();
    openModal(cartModal);
  });

  document.querySelector('[data-action="open-search"]')?.addEventListener("click", () => {
    const input = document.querySelector("[data-search-modal-input]");
    const mainQ = document.querySelector("[data-search]");
    if (input && mainQ) input.value = mainQ.value;
    openModal(searchModal);
    setTimeout(() => input?.focus(), 60);
  });

  document.querySelector('[data-action="search-apply"]')?.addEventListener("click", () => {
    const input = document.querySelector("[data-search-modal-input]");
    const mainQ = document.querySelector("[data-search]");
    if (input && mainQ) mainQ.value = input.value;
    renderGrid();
    closeModal(searchModal);
  });

  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    if (e.target.closest('[data-action="checkout"]')) {
      e.preventDefault();
      const cart = getCart();
      if (cartCount(cart) === 0) {
        alert("カートに商品がありません。");
        return;
      }
      if (cartModal && typeof cartModal.close === "function") cartModal.close();
      window.location.assign("./checkout.html");
      return;
    }
    if (e.target.closest('[data-action="clear-cart"]')) {
      e.preventDefault();
      clearCart();
    }
  });
}

function initFilters() {
  const reRenderOn = (sel) => {
    $all(sel).forEach((el) => el.addEventListener("change", renderGrid));
  };
  reRenderOn('input[data-filter="category"]');
  reRenderOn('input[data-filter="tag"]');

  document.querySelector("[data-sort]")?.addEventListener("change", renderGrid);
  document.querySelector("[data-search]")?.addEventListener("input", () => {
    window.clearTimeout(initFilters._t);
    initFilters._t = window.setTimeout(renderGrid, 120);
  });

  document.querySelector('[data-action="apply-price"]')?.addEventListener("click", renderGrid);
  document.querySelector('[data-action="clear-filters"]')?.addEventListener("click", () => {
    $all('input[data-filter="category"]').forEach((i) => (i.checked = false));
    $all('input[data-filter="tag"]').forEach((i) => (i.checked = false));
    const min = document.querySelector("[data-filter-min]");
    const max = document.querySelector("[data-filter-max]");
    if (min) min.value = "";
    if (max) max.value = "";
    const q = document.querySelector("[data-search]");
    if (q) q.value = "";
    renderGrid();
  });
}
initFilters._t = 0;

function initForms() {
  document.querySelector("[data-newsletter]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = /** @type {HTMLFormElement} */ (e.currentTarget);
    const email = new FormData(form).get("email");
    const out = document.querySelector("[data-newsletter-result]");
    if (out) out.textContent = `登録しました：${email}`;
    form.reset();
  });

  document.querySelector("[data-track-form]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = /** @type {HTMLFormElement} */ (e.currentTarget);
    const fd = new FormData(form);
    const order = String(fd.get("order") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const out = document.querySelector("[data-track-result]");
    const trackKey = form.getAttribute("data-i18n-track-result");
    const si = window.siteI18n;
    const lang = si && typeof si.getLang === "function" ? si.getLang() : "ja";
    const tpl =
      trackKey && si && typeof si.t === "function"
        ? si.t(lang, trackKey)
        : `注文 ${order}（${email}）は「発送準備中」です。`;
    if (out) {
      out.textContent = tpl.replace("{order}", order).replace("{email}", email);
    }
  });

  // お問い合わせは contact-form.js が担当（app.js の他初期化が失敗しても送信できるようにする）
}

function initHeaderStubs() {
  const toast = (msg) => alert(msg);
  document.querySelector('[data-action="open-language"]')?.addEventListener("click", () => {
    const si = window.siteI18n;
    if (si && typeof si.getLang === "function" && typeof si.setLang === "function") {
      si.setLang(si.getLang() === "ja" ? "en" : "ja");
      return;
    }
    toast("言語を切り替えられませんでした。ページを再読み込みしてください。");
  });
  document.querySelector('[data-action="open-currency"]')?.addEventListener("click", () => {
    toast("通貨切り替えは未実装です（JPY固定）。");
  });
  const openFiltersBtn = document.querySelector('[data-action="open-filters"]');
  const closeFiltersBtn = document.querySelector('[data-action="close-filters"]');
  const filters = document.querySelector("[data-filters]");

  const openFilters = () => {
    document.body.classList.add("filters-open");
    const first = filters?.querySelector(
      'input,button,select,textarea,[tabindex]:not([tabindex="-1"])'
    );
    if (first && typeof first.focus === "function") first.focus();
  };

  const closeFilters = () => {
    document.body.classList.remove("filters-open");
    if (openFiltersBtn && typeof openFiltersBtn.focus === "function") openFiltersBtn.focus();
  };

  openFiltersBtn?.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1020px)").matches) openFilters();
    else filters?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  closeFiltersBtn?.addEventListener("click", closeFilters);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFilters();
  });

  window.addEventListener("click", (e) => {
    if (!document.body.classList.contains("filters-open")) return;
    if (!(e.target instanceof Element)) return;
    if (filters?.contains(e.target)) return;
    closeFilters();
  });
}

function initProductBuyQty() {
  document.querySelectorAll("[data-product-qty]").forEach((root) => {
    if (!(root instanceof HTMLElement)) return;
    const valEl = root.querySelector("[data-product-qty-value]");
    const bump = (d) => {
      let n = Number.parseInt(valEl?.textContent?.trim() ?? "1", 10);
      if (!Number.isFinite(n)) n = 1;
      n = clamp(n + d, 1, 99);
      if (valEl) valEl.textContent = String(n);
    };
    root.addEventListener("click", (e) => {
      const btn = e.target instanceof Element ? e.target.closest("[data-product-qty-delta]") : null;
      if (!(btn instanceof HTMLButtonElement) || !root.contains(btn)) return;
      bump(Number(btn.getAttribute("data-product-qty-delta")));
    });
  });
}

function initQuickActions() {
  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    const addBtn = e.target.closest("button[data-add-id]");
    if (addBtn) {
      const id = addBtn.getAttribute("data-add-id");
      if (id) {
        const buy = addBtn.closest(".productPage__buy");
        const valEl = buy?.querySelector("[data-product-qty-value]");
        let n = 1;
        if (valEl) {
          const v = Number.parseInt(valEl.textContent?.trim() ?? "1", 10);
          if (Number.isFinite(v) && v > 0) n = clamp(v, 1, 99);
        }
        addToCart(id, n);
      }
      return;
    }

    const viewBtn = e.target.closest("button[data-view-id]");
    if (viewBtn) {
      const id = viewBtn.getAttribute("data-view-id");
      if (!id) return;
      const p = PRODUCTS.find((x) => x.id === id);
      const title = p?.title ?? "商品";
      const price = p ? yen(p.now) : "";
      alert(`詳細ページは未実装です。\n\n${title}${price ? `\n価格：${price}` : ""}`);
    }
  });
}

function initProductGallery() {
  const root = document.querySelector("[data-product-gallery]");
  if (!root) return;

  const video = root.querySelector("[data-gallery-video]");
  const track = root.querySelector("[data-thumb-track]");
  const mainPrev = root.querySelector("[data-main-prev]");
  const mainNext = root.querySelector("[data-main-next]");
  const thumbPrev = root.querySelector("[data-thumb-prev]");
  const thumbNext = root.querySelector("[data-thumb-next]");

  if (!(video instanceof HTMLVideoElement)) return;
  if (!(track instanceof HTMLElement)) return;

  const defaultVideoAriaLabel = video.getAttribute("aria-label") ?? "";

  const thumbs = Array.from(track.querySelectorAll("button[data-media]")).filter((b) => b instanceof HTMLButtonElement);
  if (!thumbs.length) return;

  let activeIndex = Math.max(
    0,
    thumbs.findIndex((b) => b.getAttribute("aria-current") === "true"),
  );
  if (!Number.isFinite(activeIndex) || activeIndex < 0) activeIndex = 0;

  const setCurrentIndex = (idx) => {
    activeIndex = Math.max(0, Math.min(idx, thumbs.length - 1));
    thumbs.forEach((b, i) => b.setAttribute("aria-current", String(i === activeIndex)));
  };

  const thumbAlt = (btn) => {
    const img = btn.querySelector("img");
    return img?.getAttribute("alt") ?? "";
  };

  const showVideo = (src, poster) => {
    video.hidden = false;
    video.setAttribute("controls", "controls");
    if (defaultVideoAriaLabel) video.setAttribute("aria-label", defaultVideoAriaLabel);
    if (poster) video.setAttribute("poster", poster);
    const source = video.querySelector("source");
    if (!source || !src) {
      void video.play().catch(() => {});
      return;
    }
    source.setAttribute("src", src);
    // Always load: with preload="none" on static pages, skipping load() when src was unchanged
    // left the element in NETWORK_EMPTY and play() never fetched the file.
    video.load();
    const tryPlay = () => {
      void video.play().catch(() => {});
    };
    tryPlay();
    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      video.addEventListener("canplay", tryPlay, { once: true });
    }
  };

  const showImage = (src, alt) => {
    video.pause();
    video.removeAttribute("controls");
    const source = video.querySelector("source");
    if (source) source.removeAttribute("src");
    video.setAttribute("poster", src);
    video.load();
    video.hidden = false;
    if (alt) video.setAttribute("aria-label", alt);
  };

  const applyMediaForButton = (btn) => {
    const kind = btn.getAttribute("data-media");
    if (kind === "video") {
      const src = btn.getAttribute("data-video-src") ?? "";
      const poster = btn.getAttribute("data-poster") ?? "";
      if (src) showVideo(src, poster);
      return;
    }
    if (kind === "image") {
      const src = btn.getAttribute("data-img-src") ?? "";
      if (src) showImage(src, thumbAlt(btn));
    }
  };

  const scrollActiveThumbIntoView = () => {
    const btn = thumbs[activeIndex];
    if (!(btn instanceof HTMLElement)) return;
    const left = btn.offsetLeft - (track.clientWidth - btn.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  const getThumbStepPx = () => {
    const first = thumbs[0];
    if (!(first instanceof HTMLElement)) return Math.max(120, Math.floor(track.clientWidth * 0.85));
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return Math.max(1, Math.round(first.getBoundingClientRect().width + gap));
  };

  const updateThumbNav = () => {
    if (!(thumbPrev instanceof HTMLButtonElement) || !(thumbNext instanceof HTMLButtonElement)) return;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    const left = track.scrollLeft;
    thumbPrev.disabled = left <= 1;
    thumbNext.disabled = left >= max - 1;
  };

  const updateMainNav = () => {
    if (!(mainPrev instanceof HTMLButtonElement) || !(mainNext instanceof HTMLButtonElement)) return;
    mainPrev.disabled = activeIndex <= 0;
    mainNext.disabled = activeIndex >= thumbs.length - 1;
  };

  const goToIndex = (idx, { scrollThumb } = { scrollThumb: true }) => {
    setCurrentIndex(idx);
    applyMediaForButton(thumbs[activeIndex]);
    updateMainNav();
    if (scrollThumb) scrollActiveThumbIntoView();
    queueMicrotask(updateThumbNav);
  };

  root.addEventListener("click", (e) => {
    const btn = e.target instanceof Element ? e.target.closest("button[data-media]") : null;
    if (btn instanceof HTMLButtonElement && track.contains(btn)) {
      const idx = thumbs.indexOf(btn);
      if (idx >= 0) goToIndex(idx);
    }
  });

  if (mainPrev instanceof HTMLButtonElement) {
    mainPrev.addEventListener("click", () => goToIndex(activeIndex - 1));
  }
  if (mainNext instanceof HTMLButtonElement) {
    mainNext.addEventListener("click", () => goToIndex(activeIndex + 1));
  }

  if (thumbPrev instanceof HTMLButtonElement) {
    thumbPrev.addEventListener("click", () => {
      track.scrollBy({ left: -getThumbStepPx(), behavior: "smooth" });
    });
  }
  if (thumbNext instanceof HTMLButtonElement) {
    thumbNext.addEventListener("click", () => {
      track.scrollBy({ left: getThumbStepPx(), behavior: "smooth" });
    });
  }

  track.addEventListener("scroll", () => updateThumbNav(), { passive: true });
  window.addEventListener("resize", () => updateThumbNav());

  let touchStartX = 0;
  let touchStartY = 0;
  const stage = root.querySelector(".mediaMainSlider__stage");
  if (stage instanceof HTMLElement) {
    stage.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches[0]) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true },
    );
    stage.addEventListener(
      "touchend",
      (e) => {
        if (!e.changedTouches[0]) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx < 0) goToIndex(activeIndex + 1);
        else goToIndex(activeIndex - 1);
      },
      { passive: true },
    );
  }

  const mainSlider = root.querySelector("[data-main-slider]");
  if (mainSlider instanceof HTMLElement) {
    mainSlider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToIndex(activeIndex - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToIndex(activeIndex + 1);
      }
    });
  }

  goToIndex(activeIndex, { scrollThumb: false });
  updateThumbNav();
}

function initTestimonials() {
  const root = document.querySelector("[data-testimonials]");
  if (!root) return;
  const scroller = root.querySelector("[data-t-scroller]");
  const prevBtn = root.querySelector("[data-t-prev]");
  const nextBtn = root.querySelector("[data-t-next]");
  const dotsHost = root.querySelector("[data-t-dots]");
  if (!(scroller instanceof HTMLElement) || !(dotsHost instanceof HTMLElement)) return;

  const slides = Array.from(scroller.querySelectorAll(":scope > .testimonial"));
  if (!slides.length) return;

  const initialIndex = Math.min(8, slides.length - 1);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  dotsHost.replaceChildren();
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "testimonials__dot";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `レビュー ${i + 1} / ${slides.length}`);
    b.setAttribute("aria-selected", i === initialIndex ? "true" : "false");
    b.addEventListener("click", () => goTo(i));
    dotsHost.appendChild(b);
  });

  const dots = () => Array.from(dotsHost.querySelectorAll(".testimonials__dot"));

  function slideWidth() {
    return scroller.clientWidth;
  }

  function getIndex() {
    const w = slideWidth();
    if (w <= 0) return 0;
    return Math.max(0, Math.min(slides.length - 1, Math.round(scroller.scrollLeft / w)));
  }

  function goTo(i) {
    const idx = Math.max(0, Math.min(slides.length - 1, i));
    const left = idx * slideWidth();
    if (reduceMotion) scroller.scrollLeft = left;
    else scroller.scrollTo({ left, behavior: "smooth" });
  }

  function syncDots() {
    const i = getIndex();
    dots().forEach((d, j) => {
      const on = j === i;
      d.classList.toggle("is-selected", on);
      d.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  let raf = 0;
  scroller.addEventListener(
    "scroll",
    () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        syncDots();
      });
    },
    { passive: true },
  );

  if (prevBtn instanceof HTMLButtonElement) prevBtn.addEventListener("click", () => goTo(getIndex() - 1));
  if (nextBtn instanceof HTMLButtonElement) nextBtn.addEventListener("click", () => goTo(getIndex() + 1));

  scroller.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(getIndex() - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(getIndex() + 1);
    }
  });

  const setInitial = () => {
    scroller.scrollLeft = initialIndex * slideWidth();
    syncDots();
  };
  requestAnimationFrame(() => requestAnimationFrame(setInitial));
  window.addEventListener("resize", () => {
    const i = getIndex();
    scroller.scrollLeft = i * slideWidth();
    syncDots();
  });
}

function initCollectionSort() {
  const grid = document.querySelector("[data-collection-grid]");
  const sortSelect = document.querySelector("[data-collection-sort]");
  const countEl = document.querySelector("[data-collection-count]");
  if (!grid || !sortSelect) return;

  function items() {
    return Array.from(grid.querySelectorAll("[data-collection-item]"));
  }

  function applySort() {
    const key = sortSelect.value;
    const arr = items().map((el) => ({
      el,
      price: Number(el.getAttribute("data-price") || "0"),
      title: el.getAttribute("data-title") || "",
      date: el.getAttribute("data-date") || "",
      rank: Number(el.getAttribute("data-rank") || "999"),
    }));

    arr.sort((a, b) => {
      switch (key) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "title-asc":
          return a.title.localeCompare(b.title, "ja");
        case "title-desc":
          return b.title.localeCompare(a.title, "ja");
        case "date-desc":
          return b.date.localeCompare(a.date);
        case "date-asc":
          return a.date.localeCompare(b.date);
        case "bestselling":
        default:
          return a.rank - b.rank;
      }
    });

    arr.forEach(({ el }) => grid.appendChild(el));
    if (countEl) countEl.textContent = String(arr.length);
  }

  sortSelect.addEventListener("change", applySort);
  applySort();
}

const CHECKOUT_FREE_SHIPPING_MIN = 15000;
const CHECKOUT_SHIPPING_FEE = 880;

/**
 * @param {{
 *   emptyEl: HTMLElement | null;
 *   panelEl: HTMLElement | null;
 *   successEl: HTMLElement | null;
 *   linesEl: HTMLElement | null;
 *   subtotalEl: HTMLElement | null;
 *   shippingEl: HTMLElement | null;
 *   totalEl: HTMLElement | null;
 *   shipNoteEl: HTMLElement | null;
 * }} els
 */
function renderCheckoutOrderSummary(els) {
  const { emptyEl, panelEl, successEl, linesEl, subtotalEl, shippingEl, totalEl, shipNoteEl } = els;

  const cart = getCart();
  const entries = Object.entries(cart).filter(([, q]) => q > 0);

  if (entries.length === 0) {
    if (emptyEl) emptyEl.hidden = false;
    if (panelEl) panelEl.hidden = true;
    if (successEl) successEl.hidden = true;
    return;
  }

  if (emptyEl) emptyEl.hidden = true;
  if (panelEl) panelEl.hidden = false;
  if (successEl) successEl.hidden = true;

  let subtotal = 0;
  if (linesEl) {
    linesEl.innerHTML = "";
    for (const [id, qty] of entries) {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) continue;
      const lineTotal = p.now * qty;
      subtotal += lineTotal;

      const li = document.createElement("li");
      li.className = "checkoutLine";

      const row = document.createElement("div");
      row.className = "checkoutLine__row";

      const left = document.createElement("div");
      const title = document.createElement("div");
      title.className = "checkoutLine__title";
      title.textContent = p.title;
      const meta = document.createElement("div");
      meta.className = "checkoutLine__meta";
      meta.textContent = `${yen(p.now)} × ${qty}`;
      left.appendChild(title);
      left.appendChild(meta);

      const price = document.createElement("div");
      price.className = "checkoutLine__price";
      price.textContent = yen(lineTotal);

      row.appendChild(left);
      row.appendChild(price);
      li.appendChild(row);
      linesEl.appendChild(li);
    }
  }

  const shipping = subtotal >= CHECKOUT_FREE_SHIPPING_MIN ? 0 : CHECKOUT_SHIPPING_FEE;
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = yen(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? yen(0) : yen(shipping);
  if (totalEl) totalEl.textContent = yen(total);
  if (shipNoteEl) {
    shipNoteEl.textContent =
      subtotal >= CHECKOUT_FREE_SHIPPING_MIN
        ? "¥15,000以上のご注文のため、送料無料です。"
        : `あと ${yen(CHECKOUT_FREE_SHIPPING_MIN - subtotal)} で送料無料`;
  }
}

function digitsOnly(s) {
  return String(s).replace(/\D/g, "");
}

function formatCardNumberDisplay(value) {
  const d = digitsOnly(value).slice(0, 19);
  const parts = [];
  for (let i = 0; i < d.length; i += 4) {
    parts.push(d.slice(i, i + 4));
  }
  return parts.join(" ");
}

function formatExpiryDisplay(value) {
  const d = digitsOnly(value).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)} / ${d.slice(2)}`;
}

function luhnValid(numDigits) {
  if (numDigits.length < 13 || numDigits.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = numDigits.length - 1; i >= 0; i--) {
    let n = Number(numDigits[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function initCheckoutPage() {
  const page = document.querySelector("[data-checkout-page]");
  if (!page) return;

  const emptyEl = document.querySelector("[data-checkout-empty]");
  const panelEl = document.querySelector("[data-checkout-panel]");
  const successEl = document.querySelector("[data-checkout-success]");
  const linesEl = document.querySelector("[data-checkout-order-lines]");
  const subtotalEl = document.querySelector("[data-checkout-subtotal]");
  const shippingEl = document.querySelector("[data-checkout-shipping]");
  const totalEl = document.querySelector("[data-checkout-total]");
  const shipNoteEl = document.querySelector("[data-checkout-ship-note]");
  const form = document.querySelector("[data-checkout-form]");

  const els = { emptyEl, panelEl, successEl, linesEl, subtotalEl, shippingEl, totalEl, shipNoteEl };

  function renderOrder() {
    renderCheckoutOrderSummary(els);
  }

  renderOrder();

  const cardFieldsEl = document.querySelector("[data-checkout-card-fields]");
  const cardNumberInput = document.querySelector("[data-checkout-card-number]");
  const cardNameInput = document.querySelector("[data-checkout-card-name]");
  const cardExpiryInput = document.querySelector("[data-checkout-card-expiry]");
  const cardCvcInput = document.querySelector("[data-checkout-card-cvc]");
  const agreeCardInput = document.querySelector("[data-checkout-agree-card]");
  const checkoutPreviewNum = document.querySelector("[data-checkout-preview-number]");
  const checkoutPreviewExp = document.querySelector("[data-checkout-preview-exp]");
  const orderActionsEl = document.querySelector("[data-checkout-actions-order]");

  function updateCheckoutCardPreview() {
    if (cardNumberInput instanceof HTMLInputElement) {
      const formatted = formatCardNumberDisplay(cardNumberInput.value);
      cardNumberInput.value = formatted;
      const d = digitsOnly(formatted).slice(0, 19);
      if (!checkoutPreviewNum) return;
      if (d.length === 0) {
        checkoutPreviewNum.textContent = "•••• •••• •••• ••••";
      } else {
        let vis = "";
        for (let i = 0; i < d.length; i++) {
          vis += d.length > 4 && i < d.length - 4 ? "•" : d[i];
        }
        const pad16 = vis.slice(0, 16).padEnd(16, "•");
        const parts = [];
        for (let i = 0; i < 16; i += 4) parts.push(pad16.slice(i, i + 4));
        checkoutPreviewNum.textContent = parts.join(" ");
      }
    }
  }

  function updateCheckoutExpiryPreview() {
    if (!(cardExpiryInput instanceof HTMLInputElement)) return;
    cardExpiryInput.value = formatExpiryDisplay(cardExpiryInput.value);
    const d = digitsOnly(cardExpiryInput.value);
    if (!(checkoutPreviewExp instanceof HTMLElement)) return;
    if (d.length === 0) checkoutPreviewExp.textContent = "MM / YY";
    else if (d.length <= 2) checkoutPreviewExp.textContent = `${d} / ••`;
    else checkoutPreviewExp.textContent = `${d.slice(0, 2)} / ${d.slice(2)}`;
  }

  function syncCheckoutCardFields() {
    const cardSelected =
      form?.querySelector('input[name="payment"]:checked')?.value === "card";
    if (cardFieldsEl) cardFieldsEl.hidden = !cardSelected;
    if (orderActionsEl) orderActionsEl.hidden = !!cardSelected;

    const setReq = (el, on) => {
      if (el instanceof HTMLInputElement) {
        el.required = !!on;
        if (!on) el.value = "";
      }
    };
    setReq(cardNumberInput, cardSelected);
    setReq(cardNameInput, cardSelected);
    setReq(cardExpiryInput, cardSelected);
    setReq(cardCvcInput, cardSelected);
    if (agreeCardInput instanceof HTMLInputElement) {
      agreeCardInput.required = !!cardSelected;
      if (!cardSelected) agreeCardInput.checked = false;
    }

    if (!cardSelected) {
      if (checkoutPreviewNum) checkoutPreviewNum.textContent = "•••• •••• •••• ••••";
      if (checkoutPreviewExp) checkoutPreviewExp.textContent = "MM / YY";
    }
  }

  form?.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", syncCheckoutCardFields);
  });
  syncCheckoutCardFields();

  if (cardNumberInput instanceof HTMLInputElement) {
    cardNumberInput.addEventListener("input", updateCheckoutCardPreview);
  }
  if (cardExpiryInput instanceof HTMLInputElement) {
    cardExpiryInput.addEventListener("input", updateCheckoutExpiryPreview);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cartCount(getCart()) === 0) return;

      const payMethod = form.querySelector('input[name="payment"]:checked')?.value;
      if (payMethod === "card") {
        const num = digitsOnly(cardNumberInput instanceof HTMLInputElement ? cardNumberInput.value : "");
        const exp = digitsOnly(cardExpiryInput instanceof HTMLInputElement ? cardExpiryInput.value : "");
        const cvc = digitsOnly(cardCvcInput instanceof HTMLInputElement ? cardCvcInput.value : "");
        const name = cardNameInput instanceof HTMLInputElement ? cardNameInput.value.trim() : "";
        let err = "";
        if (!luhnValid(num)) err = "カード番号をご確認ください。";
        else if (exp.length !== 4) err = "有効期限を MM / YY 形式で入力してください。";
        else {
          const mm = Number(exp.slice(0, 2));
          if (mm < 1 || mm > 12) err = "有効期限の月は 01〜12 で入力してください。";
        }
        if (!err && (cvc.length < 3 || cvc.length > 4)) err = "セキュリティコード（3〜4桁）を入力してください。";
        if (!err && name.length < 2) err = "カード名義を入力してください。";
        if (!err && agreeCardInput instanceof HTMLInputElement && !agreeCardInput.checked) {
          err = "カードお支払いに関する同意にチェックを入れてください。";
        }
        if (err) {
          alert(err);
          return;
        }
      }

      clearCart();
      updateCartUI();
      if (panelEl) panelEl.hidden = true;
      if (emptyEl) emptyEl.hidden = true;
      if (successEl) successEl.hidden = false;
      form.reset();
      syncCheckoutCardFields();
      updateCheckoutCardPreview();
      updateCheckoutExpiryPreview();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function initPaymentCardPage() {
  const page = document.querySelector("[data-payment-card-page]");
  if (!page) return;

  const emptyEl = document.querySelector("[data-payment-card-empty]");
  const panelEl = document.querySelector("[data-payment-card-panel]");
  const successEl = document.querySelector("[data-payment-card-success]");
  const linesEl = document.querySelector("[data-payment-card-order-lines]");
  const subtotalEl = document.querySelector("[data-payment-card-subtotal]");
  const shippingEl = document.querySelector("[data-payment-card-shipping]");
  const totalEl = document.querySelector("[data-payment-card-total]");
  const shipNoteEl = document.querySelector("[data-payment-card-ship-note]");
  const form = document.querySelector("[data-card-payment-form]");
  const errEl = document.querySelector("[data-card-payment-error]");
  const numberInput = document.querySelector("[data-card-number-input]");
  const expiryInput = document.querySelector("[data-card-expiry-input]");
  const previewNum = document.querySelector("[data-card-preview-number]");
  const previewExp = document.querySelector("[data-card-preview-exp]");

  const els = { emptyEl, panelEl, successEl, linesEl, subtotalEl, shippingEl, totalEl, shipNoteEl };

  function renderOrder() {
    renderCheckoutOrderSummary(els);
  }

  renderOrder();

  if (numberInput instanceof HTMLInputElement) {
    numberInput.addEventListener("input", () => {
      const formatted = formatCardNumberDisplay(numberInput.value);
      numberInput.value = formatted;
      const d = digitsOnly(formatted).slice(0, 19);
      if (!previewNum) return;
      if (d.length === 0) {
        previewNum.textContent = "•••• •••• •••• ••••";
        return;
      }
      let vis = "";
      for (let i = 0; i < d.length; i++) {
        vis += d.length > 4 && i < d.length - 4 ? "•" : d[i];
      }
      const pad16 = vis.padEnd(16, "•");
      const parts = [];
      for (let i = 0; i < 16; i += 4) parts.push(pad16.slice(i, i + 4));
      previewNum.textContent = parts.join(" ");
    });
  }

  if (expiryInput instanceof HTMLInputElement) {
    expiryInput.addEventListener("input", () => {
      expiryInput.value = formatExpiryDisplay(expiryInput.value);
      const d = digitsOnly(expiryInput.value);
      if (!(previewExp instanceof HTMLElement)) return;
      if (d.length === 0) previewExp.textContent = "MM / YY";
      else if (d.length <= 2) previewExp.textContent = `${d} / ••`;
      else previewExp.textContent = `${d.slice(0, 2)} / ${d.slice(2)}`;
    });
  }

  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cartCount(getCart()) === 0) return;

      const numEl = form.querySelector('[name="cardNumber"]');
      const nameEl = form.querySelector('[name="cardName"]');
      const expEl = form.querySelector('[name="cardExpiry"]');
      const cvcEl = form.querySelector('[name="cardCvc"]');
      const agreeEl = form.querySelector('[name="agree"]');

      if (
        !(numEl instanceof HTMLInputElement) ||
        !(nameEl instanceof HTMLInputElement) ||
        !(expEl instanceof HTMLInputElement) ||
        !(cvcEl instanceof HTMLInputElement) ||
        !(agreeEl instanceof HTMLInputElement)
      ) {
        return;
      }

      const cardDigits = digitsOnly(numEl.value);
      const cvcDigits = digitsOnly(cvcEl.value);
      const expDigits = digitsOnly(expEl.value);
      const nameOk = nameEl.value.trim().length >= 2;

      let msg = "";
      if (!luhnValid(cardDigits)) {
        msg = "カード番号が正しくない可能性があります（チェックディジット）。入力内容をご確認ください。";
      } else if (expDigits.length !== 4) {
        msg = "有効期限を MM / YY 形式で入力してください。";
      } else {
        const mm = Number(expDigits.slice(0, 2));
        if (mm < 1 || mm > 12) {
          msg = "有効期限の月は 01〜12 で入力してください。";
        }
      }
      if (!msg && (cvcDigits.length < 3 || cvcDigits.length > 4)) {
        msg = "セキュリティコード（3〜4桁）を入力してください。";
      }
      if (!msg && !nameOk) {
        msg = "カード名義を入力してください。";
      }
      if (!msg && !agreeEl.checked) {
        msg = "内容の確認と同意にチェックを入れてください。";
      }

      if (errEl) {
        errEl.textContent = msg;
        errEl.hidden = !msg;
      }
      if (msg) return;

      if (errEl) {
        errEl.textContent = "";
        errEl.hidden = true;
      }

      clearCart();
      updateCartUI();
      if (panelEl) panelEl.hidden = true;
      if (emptyEl) emptyEl.hidden = true;
      if (successEl) successEl.hidden = false;
      form.reset();
      if (numberInput instanceof HTMLInputElement) numberInput.value = "";
      if (expiryInput instanceof HTMLInputElement) expiryInput.value = "";
      if (previewNum) previewNum.textContent = "•••• •••• •••• ••••";
      if (previewExp) previewExp.textContent = "MM / YY";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function initPortfolioProfiles() {
  const buttons = document.querySelectorAll("button[data-profile-dialog]");
  buttons.forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    const id = btn.getAttribute("aria-controls");
    const dialog = id ? document.getElementById(id) : null;
    if (!(dialog instanceof HTMLDialogElement)) return;
    btn.addEventListener("click", () => openModal(dialog));
  });

  document.querySelectorAll("dialog.profileDialog").forEach((dialog) => {
    if (!(dialog instanceof HTMLDialogElement)) return;
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) closeModal(dialog);
    });
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeModal(dialog);
    });
    dialog.querySelectorAll("[data-profile-dialog-close]").forEach((b) => {
      b.addEventListener("click", () => closeModal(dialog));
    });
  });
}

function main() {
  initCookieBanner();
  initModals();
  initCheckoutPage();
  initPaymentCardPage();
  initCollectionSort();
  initPortfolioProfiles();
  initTestimonials();
  initProductTemplatePage();
  initFilters();
  initForms();
  initHeaderStubs();
  initQuickActions();
  initProductBuyQty();
  initProductGallery();
  updateCartUI();
  renderGrid();
  document.addEventListener("site-lang-change", () => {
    if (document.querySelector("[data-grid]")) renderGrid();
  });
}

document.addEventListener("DOMContentLoaded", main);
