export type Profile = {
  nickname: string;
  gender: string;
  discord_id?: string;
  game_rank?: string;
  game_category?: string;
  image?: string;
};

export type User = {
  id: number;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile;
};
