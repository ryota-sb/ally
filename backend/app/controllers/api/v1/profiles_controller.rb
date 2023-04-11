class Api::V1::ProfilesController < ApplicationController
  
  # POST /api/v1/porofiles
  def create
    profile = Profile.new(profile_params)
    profile.user_id = @current_user.id

    if profile.save
      render json: profile
    else
      render json: profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH /api/v1/profiles/:id
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
    params.require(:profile).permit(:game_rank, :game_category, :discord_id, :gender, :image, :nickname)
  end
end
