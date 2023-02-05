// プロフィールのフォーム入力データ
export type ProfileInputs = {
  nickname?: string;
  gender?: string;
  discord_id?: string;
  game_rank?: string;
  game_category?: string;
  image?: { url: string };
};

// プロフィールのデータ
export type ProfileData = ProfileInputs & {
  id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: ProfileData;
};
