require 'rails_helper'

RSpec.describe "Api::V1::UsersController", type: :request do
  let!(:current_user) { create(:user) }
  let!(:profile) { create(:profile, user: current_user) }

  # 認証処理をスキップ
  before do
    authorization_stub
  end

  describe "GET /api/v1/random_user_with_profile" do
    context "他のユーザーも存在する場合" do
      let!(:other_user) { create(:user) }
      let!(:profile) { create(:profile, user: other_user) }
      before do
        allow(User).to receive_message_chain(:unliked_guest_users, :order, :first).and_return(other_user)
      end

      it "他のユーザーがJSONで1つ返ること" do
        get api_v1_random_user_with_profile_path
        expect(response).to have_http_status(:ok)
        expect(response.body).to eq(UserSerializer.new(other_user).to_json)
      end
    end

    context "他のユーザーが存在しない場合" do
      before do
        allow(User).to receive_message_chain(:unliked_guest_users, :order, :first).and_return(nil)
      end

      it "メッセージがJSONで返ること" do
        get api_v1_random_user_with_profile_path
        expect(response).to have_http_status(:ok)
        expect(response.body).to eq({ message: "これ以上ユーザーが存在しません" }.to_json)
      end
    end
  end

  describe "GET /api/v1/users" do
    context "ユーザーが存在する場合" do
      it "ユーザーとプロフィールがJSONで返ること" do
        get api_v1_user_path(current_user.id)
        expect(response).to have_http_status(:ok)
        expect(response.body).to eq(UserSerializer.new(current_user).to_json)
      end
    end
  end
end
