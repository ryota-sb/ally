class Api::V1::LikesController < ApplicationController
  def index
    render json: { status: 200, active_likes: @current_user.active_likes, passive_likes: @current_user.passive_likes }
  end
  
  def create
    is_matched = false
    
    active_like = Like.find_of_initialize_by(like_params)

    if active_like.save
      render json: { status: 200, like: active_like, is_matched: is_matched }
    else
      render json: { status: 500, message: active_like.errors }
  end
  private

  def like_params
    params.permit(:from_user_id, :to_user_id)
  end
end
