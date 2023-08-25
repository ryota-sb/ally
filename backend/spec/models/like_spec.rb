require 'rails_helper'

RSpec.describe Like, type: :model do
  describe '関連付け' do
    let(:association) do
      described_class.reflect_on_association(target)
    end

    context 'Userモデル(to_user)' do
      let!(:target) { :to_user }

      it '多対多で紐づいているか' do
        expect(association.macro).to eq :belongs_to
        expect(association.class_name).to eq "User"
      end
    end

    context 'Userモデル(from_user)' do
      let!(:target) { :from_user }

      it '多対多で紐づいているか' do
        expect(association.macro).to eq :belongs_to
        expect(association.class_name).to eq "User"
      end
    end
  end

  describe 'スコープ' do
    let!(:current_user) { create(:user) }
    let!(:other_user) { create(:user) }
    let!(:other_user_2) { create(:user) }
    
    context 'liked' do
      let!(:like) { create(:like, from_user: current_user, to_user: other_user, is_like: true) }
      let!(:not_like) { create(:like, from_user: current_user, to_user: other_user_2, is_like: false) }

      it 'is_likeがtrueのデータを取得する' do
        liked_instance = Like.liked
        expect(liked_instance).to include(like)
        expect(liked_instance).not_to include(not_like)
      end
    end
  end
end
