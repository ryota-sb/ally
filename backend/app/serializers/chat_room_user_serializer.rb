class ChatRoomUserSerializer < ActiveModel::Serializer
  type 'chat_room_users'
  attributes :chat_room, :other_user, :last_message

  def chat_room
    serialized_chat_room = ChatRoomSerializer.new(object[:chat_room])
    serialized_chat_room.attributes
  end

  def other_user
    serialized_other_user = UserSerializer.new(object[:other_user])
    serialized_other_user.attributes.merge(profile: profile_attributes)
  end

  def last_message
    return nil if object[:last_message].nil?

    serialized_message = MessageSerializer.new(object[:last_message])
    serialized_message.attributes
  end

  private

  def profile_attributes
    serialized_profile = ProfileSerializer.new(object[:other_user].profile)
    serialized_profile.attributes
  end
end
