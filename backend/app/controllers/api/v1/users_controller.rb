class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize_request, only: :index

  def index
    users = User.all
    render json: users
  end
end
