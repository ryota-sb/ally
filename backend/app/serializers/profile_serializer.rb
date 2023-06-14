class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :game_rank, :game_category, :discord_id, :gender, :image, :nickname, :created_at, :updated_at, :user_id
end