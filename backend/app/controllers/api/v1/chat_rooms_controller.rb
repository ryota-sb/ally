class Api::V1::ChatRoomsController < ApplicationController
  # GET /api/v1/chat_rooms
  def index
    chat_rooms = []

    @current_user.chat_rooms.order('created_at DESC').each do |chat_room|
      other_user = chat_room.users.where.not(id: @current_user)[0]
      chat_rooms << {
        chat_room: chat_room,
        other_user: other_user,
        last_message: chat_room.messages[-1]
      }
    end
    render json: chat_rooms, each_serializer: ChatRoomUserSerializer
  end

  # GET /api/v1/chat_rooms/:id
  def show
    chat_room = ChatRoom.find(params[:id])
    other_user = chat_room.users.where.not(id: @current_user.id).includes(:profile).first
    messages = chat_room.messages.order('created_at ASC')

    chat_room_data = {
      chat_room: chat_room,
      other_user: other_user,
      messages: messages
    }

    render json: chat_room_data, serializer: ChatRoomDataSerializer
  end
end
