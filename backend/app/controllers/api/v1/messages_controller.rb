class Api::V1::MessagesController < ApplicationController
  def create
    message = Message.new(message_params)

    if message.save
      render json: { status: 200, message: message }
    else
      render json: { status: 500, message: "作成に失敗しました" }
    end
  end

  private

  def message_params
    params.permit(:user_id, :chat_room_id, :content)
  end
end
