class Api::V1::ProfilesController < ApplicationController
  skip_before_action :authorize_request, only: [:index]
  before_action :set_params, only: [:create, :update]

  def index
    profiles = User.profiles
  end

  def create
    profile = User.profiles
  end

  def update
  end

  private

  def set_params
    params.permit(:gender, :game_rank, :game_category, :descord_id)
  end
end
