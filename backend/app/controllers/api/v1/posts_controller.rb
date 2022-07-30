class Api::V1::PostsController < ApplicationController
  skip_before_action :authorize_request, only: [:index, :show]

  def index
    posts = Post.all
    render json: posts
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    post = @current_user.posts.build(post_params)

    if post.save
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.delete
  end

  private

  def post_params
    params.permit(:title, :caption)
  end
end