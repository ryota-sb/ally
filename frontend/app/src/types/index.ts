// ユーザーのデータ
export type User = {
  id: number;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: ProfileData;
};

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

// ライクのデータ
export type Like = {
  id?: number;
  form_user_id: number | undefined | null;
  to_user_id: number | undefined | null;
};

// チャットルームのデータ
export type ChatRoomData = {
  chat_room: { id: number };
  other_user: User;
  other_user_profile: ProfileData;
  messages: Message[];
};

// メッセージのフォーム入力データ
export type MessageInputs = {
  content: string;
};

// メッセージのデータ
export type Message = MessageInputs & {
  user_id: number;
  chat_room_id: number;
  created_at: Date;
};
