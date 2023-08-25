require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe 'バリデーション' do
    let(:profile_without_nickname) { build(:profile, nickname: '') }
    let(:profile_without_game_category) { build(:profile, game_category: '') }

    it '無効な名前' do
      expect(profile_without_nickname).to be_invalid
      expect(profile_without_nickname.errors[:nickname]).to eq ["を入力してください"]
    end

    it '無効なゲームカテゴリ' do
      expect(profile_without_game_category).to be_invalid
      expect(profile_without_game_category.errors[:game_category]).to eq ["を入力してください"]
    end
  end

  describe '関連付け' do
    let(:association) do
      described_class.reflect_on_association(target)
    end

    context 'Userモデル' do
      let!(:target) { :user }
      it '1対1で紐づいているか' do
        expect(association.macro).to eq :belongs_to
        expect(association.class_name).to eq "User"
      end
    end
  end
end
