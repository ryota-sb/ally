class Api::V1::TestsController < ApplicationController
  skip_before_action :authorize_request, only: :index

  def index
    render json: { status: 'success', message: 'API接続確認' }
  end
end
