class Api::V1::UsersController < ApplicationController

  # GET /api/v1/random_user_with_profile
  def random_user_with_profile
    other_user = User.excluding_user(@current_user).unliked_by(@current_user).order(Arel.sql('RANDOM()')).first

    if other_user
      render json: other_user
    else
      render json: { message: "これ以上ユーザーが存在しません" }
    end
  end

  # GET /api/v1/users/:id
  def show
    user = User.preload(:profile).find(params[:id])
    render json: user
  end
end

