class Api::V1::UsersController < ApplicationController
  
  # ログインしているユーザー以外でプロフィールを登録済のユーザーを1つランダムで取得
  def random_user_with_profile
    user = User.joins(:profile).where.not(id: @current_user.id).order(Arel.sql('RANDOM()')).limit(1)
    profile = user[0].profile
    render json: { user: user[0], profile: profile }
  end

  def show
    user = User.find(params[:id])
    profile = user.profile
    render json: { user: user, profile: profile }
  end
end
