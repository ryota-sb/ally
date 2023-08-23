class Api::V1::MessagesController < ApplicationController
  # POST /api/v1/messages
  def create
    message = Message.new(message_params)
    message.chat_room_id = params[:message][:chat_room_id]

    if message.save
      render json: { status: 200, message: message }
    else
      render json: { status: 500, message: message.errors.full_messages.join(', ') }
    end
  end

  private

  def message_params
    params.require(:message).permit(:chat_room_id, :content).merge(user_id: @current_user.id)
  end
end
