class Api::V1::SecuredController < ApplicationController
  def login
    render json: {
      status: 200,
      message: "SUB: #{@current_user.sub}でログインしました。",
      data: @current_user
    }
  end

  def logout
    render json: {
      status: 200,
      message: "SUB: #{@current_user.sub}でログアウトしました。",
      data: @current_user
    }
  end
end