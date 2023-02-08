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
  formUserId: number | undefined | null;
  toUserId: number | undefined | null;
};

export type ChatRoom = {
  chatRoom: { id: number };
  otherUser: User;
  otherUserProfile: ProfileData;
  lastMessage: Message;
};

export type Message = {
  userId: number;
  chatRoomId: number;
  content: string;
  createdAt: Date;
};
