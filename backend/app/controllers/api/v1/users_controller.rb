class Api::V1::UsersController < ApplicationController
  def index
    # ログインしているユーザー以外のプロフィールレコードを1つランダムで取得する
    profile = Profile.where.not(user_id: @current_user.id).order(Arel.sql('RANDOM()')).limit(1)
    render json: profile[0]
  end
end
