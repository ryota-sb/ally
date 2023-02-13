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

// ユーザー情報
export type User = {
  id: number;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: ProfileData;
};

export type Like = {
  id?: number;
  form_user_id: number | undefined | null;
  to_user_id: number | undefined | null;
};

export type ChatRoom = {
  chat_room: { id: number };
  other_user: User;
  other_user_profile: ProfileData;
  last_message: Message;
};

export type Message = {
  user_id: number;
  chat_room_id: number;
  content: string;
  created_at: Date;
};
