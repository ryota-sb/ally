class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize_request, only: :index

  def index
    # ログインしているユーザー以外のプロフィールレコードを1つランダムで取得する
    profile = Profile.where.not(user_id: 1).order(Arel.sql('RANDOM()')).limit(1)
    # user = User.find_by(id: profile[0].user_id)
    render json: { data: profile[0] }
  end
end
