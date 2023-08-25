require 'rails_helper'

RSpec.describe ChatRoom, type: :model do
  describe '関連付け' do
    let!(:association) do
      described_class.reflect_on_association(target)
    end

    context 'Userモデル' do
      let!(:target) { :users }
      it '多対多で紐づいているか' do
        expect(association.macro).to eq :has_many
        expect(association.options[:through]).to eq :chat_room_users
        expect(association.class_name).to eq "User"
      end
    end

    context 'Messageモデル' do
      let!(:target) { :messages }
      it '1対多で紐づいているか' do
        expect(association.macro).to eq :has_many
        expect(association.class_name).to eq "Message"
      end
    end
  end
end
