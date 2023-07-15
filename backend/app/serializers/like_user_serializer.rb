class LikeUserSerializer < ActiveModel::Serializer
  attributes :active_likes, :passive_likes
  attribute(:active_likes_length) { object.active_likes.length }
  attribute(:passive_likes_length) { object.passive_likes.length }

  def active_likes
    ActiveModel::SerializableResource.new(object.active_likes, each_serializer: UserSerializer)
  end

  def passive_likes
    ActiveModel::SerializableResource.new(object.passive_likes, each_serializer: UserSerializer)
  end
end