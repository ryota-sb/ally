class Api::V1::LikesController < ApplicationController
  # GET /api/v1/likes
  def index
    render json: @current_user, serializer: LikeUserSerializer
  end

  # POST /api/v1/likes
  def create
    is_matched = false

    # 自分がいいねした場合のレコード作成
    active_like = Like.find_or_initialize_by(like_params)
    # 相手が自分のことをいいねしているかのレコードを探す
    passive_like = Like.find_by(
      from_user_id: active_like.to_user_id,
      to_user_id: active_like.from_user_id,
      is_like: true
    )

    # 相手が自分をいいねしていれば、ルーム作成し、is_matchedのフラグをtrueにする
    if passive_like
      chat_room = ChatRoom.create

      ChatRoomUser.find_or_create_by(
        chat_room_id: chat_room.id,
        user_id: active_like.from_user_id
      )

      ChatRoomUser.find_or_create_by(
        chat_room_id: chat_room.id,
        user_id: passive_like.from_user_id
      )

      is_matched = true
    end

    if active_like.save
      render json: { status: 200, like: active_like, is_matched: is_matched }
    else
      render json: { status: 500, message: '作成に失敗しました' }
    end
  end

  private

  def like_params
    params.permit(:from_user_id, :to_user_id, :is_like)
  end
end
