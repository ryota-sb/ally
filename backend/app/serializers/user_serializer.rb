class UserSerializer < ActiveModel::Serializer
  attributes :id, :sub, :created_at, :updated_at

  has_one :profile
end
