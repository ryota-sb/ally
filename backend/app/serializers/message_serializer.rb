class MessageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :chat_room_id, :content, :created_at, :updated_at
end
