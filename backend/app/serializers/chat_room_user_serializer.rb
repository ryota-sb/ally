class ChatRoomUserSerializer < ActiveModel::Serializer
  attributes :id, :chat_room_id, :user_id, :created_at, :updated_at
end
