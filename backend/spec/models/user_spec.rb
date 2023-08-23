require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'アソシエーション' do
    let(:association) do
      described_class.reflect_on_association(target)
    end

    context 'Profileモデル' do
      let(:target) { :profile }
      it '1対1で紐づいているか' do
        expect(association.macro).to eq :has_one
        expect(association.class_name).to eq 'Profile'
      end
    end

    context 'ChatRoomUserモデル' do
      let(:target) { :chat_room_users }
      it '1対多で紐づいているか' do
        expect(association.macro).to eq :has_many
        expect(association.class_name).to eq 'ChatRoomUser'
      end
    end

    context 'Messageモデル' do
      let(:target) { :messages }
      it '1対多で紐づいているか' do
        expect(association.macro).to eq :has_many
        expect(association.class_name).to eq 'Message'
      end
    end

    context 'Likeモデル' do
      shared_examples 'like association' do
        it '1対多で紐づいているか' do
          expect(association.macro).to eq :has_many
          expect(association.class_name).to eq 'Like'
        end
      end

      let(:target) { :likes_from }
      it_behaves_like 'like association'

      let(:target) { :likes_to }
      it_behaves_like 'like association'

      let(:target) { :liked_from }
      it_behaves_like 'like association'

      let(:target) { :liked_to }
      it_behaves_like 'like association'
    end
  end

  describe '一意性の検証' do
    let!(:current_user) { create(:user) }
    let!(:other_user) { create(:user) }

    it 'subが重複していなければ保存できる' do
      expect(other_user).to be_valid
    end

    it 'subが重複していたら保存できない' do
      duplicate_user = build(:user, sub: current_user.sub)
      duplicate_user.save
      expect(duplicate_user).not_to be_valid
      expect(duplicate_user.errors[:sub]).to include('はすでに存在します')
    end
  end

  describe 'スコープ' do
    let!(:current_user) { create(:user) }
    let!(:other_user) { create(:user) }

    context 'guest_users' do
      it 'ログインユーザー以外のユーザーを取得する' do
        guest_users = User.guest_users(current_user)
        expect(guest_users).to include(other_user)
        expect(guest_users).not_to include(current_user)
      end
    end
  end
end
