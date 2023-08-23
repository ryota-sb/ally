class LikeUserSerializer < ActiveModel::Serializer
  attributes :active_liked_user, :passive_liked_user
  attribute(:active_liked_user_length) { object.active_liked_user.length }
  attribute(:passive_liked_user_length) { object.passive_liked_user.length }

  def active_liked_user
    ActiveModel::SerializableResource.new(object.active_liked_user, each_serializer: UserSerializer)
  end

  def passive_liked_user
    ActiveModel::SerializableResource.new(object.passive_liked_user, each_serializer: UserSerializer)
  end
end
