class LikeSerializer < ActiveModel::Serializer
  attributes :id, :from_user_id, :to_user_id, :is_like, :created_at, :updated_at
end
