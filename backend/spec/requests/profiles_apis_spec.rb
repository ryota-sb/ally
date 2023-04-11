require 'rails_helper'

RSpec.describe 'ProfilesApis', type: :request do

  describe 'GET /api/v1/profiles' do
    it "プロフィール全権取得" do
      FactoryBot.create(:profile, user: FactoryBot.create(:user))
      get '/api/v1/profiles'
      json = JSON.parse(response.body)
      expect(response.status).to have_http_status(200)
    end
  end
end
