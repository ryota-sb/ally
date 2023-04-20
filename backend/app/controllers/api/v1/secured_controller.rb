class Api::V1::SecuredController < ApplicationController

  # GET /api/v1/login
  def login
    render json: {
      status: 200,
      message: "SUB: #{@current_user.sub}でログインしました。",
      user: @current_user,
      profile: @current_user.profile || ""
    }
  end

  # GET /api/v1/logout
  def logout
    render json: {
      status: 200,
      message: "SUB: #{@current_user.sub}でログアウトしました。",
      data: @current_user
    }
  end
end