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
  discordId?: string;
  gameRank?: string;
  gameCategory?: string;
  image?: { url: string };
};

// プロフィールのデータ
export type ProfileData = ProfileInputs & {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

// ライクのデータ
export type Like = {
  id?: number;
  formUserId: number | undefined | null;
  toUserId: number | undefined | null;
};

// チャットルームのデータ
export type ChatRoomData = {
  chatRoom: { id: number };
  otherUser: User;
  otherUserProfile: ProfileData;
  messages: Message[];
};

// メッセージのフォーム入力データ
export type MessageInputs = {
  content: string;
};

// メッセージのデータ
export type Message = MessageInputs & {
  userId: number;
  chatRoomId: number;
  createdAt: Date;
};
