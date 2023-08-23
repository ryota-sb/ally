class ChatRoomDataSerializer < ActiveModel::Serializer
  type 'chat_room_data'
  attributes :chat_room, :other_user, :messages

  def chat_room
    serialized_chat_room = ChatRoomSerializer.new(object[:chat_room])
    serialized_chat_room.attributes
  end

  def other_user
    serialized_other_user = UserSerializer.new(object[:other_user])
    serialized_other_user.attributes.merge(profile: profile_attributes)
  end

  def messages
    object[:messages].map { |message| MessageSerializer.new(message).attributes }
  end

  private

  def profile_attributes
    serialized_profile = ProfileSerializer.new(object[:other_user].profile)
    serialized_profile.attributes
  end
end
