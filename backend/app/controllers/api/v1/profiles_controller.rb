class Api::V1::ProfilesController < ApplicationController
  skip_before_action :authorize_request, only: [:index, :show]

  def index
    profiles = Profile.all
    render json: profiles
  end

  def show
    profile = Profile.find(params[:id])
    render json: profile
  end

  def create
    profile = Profile.new(profile_params)
    profile.user_id = @current_user.id
    
    if profile.save
      render json: profile
    else
      render json: profile.errors, status: :unprocessable_entity
    end
  end

  def update
    profile = Profile.find(params[:id])
    if profile.update(profile_params)
      render json: profile
    else
      render json: profile.errors, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.permit(:gender, :game_rank, :game_category, :descord_id, :image, :nickname)
  end
end
