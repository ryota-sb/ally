class Api::V1::ChatRoomsController < ApplicationController

  # GET /api/v1/chat_rooms
  def index
    chat_rooms = []

    @current_user.chat_rooms.order("created_at DESC").each do |chat_room|
      other_user = chat_room.users.where.not(id: @current_user)[0]
      chat_rooms << {
        chat_room: chat_room,
        other_user: other_user,
        other_user_profile: other_user.profile,
        last_message: chat_room.messages[-1]
      }
    end
    render json: chat_rooms
  end

  # GET /api/v1/chat_rooms/:id
  def show
    chat_room = ChatRoom.find(params[:id])
    other_user = chat_room.users.where.not(id: @current_user.id)[0]
    other_user_profile = other_user.profile
    messages = chat_room.messages.order("created_at ASC")

    render json: { status: 200, other_user: other_user, other_user_profile: other_user_profile, messages: messages }
  end
end
