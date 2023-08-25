require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '関連付け' do
    let(:association) do
      described_class.reflect_on_association(target)
    end

    context 'Userモデル' do
      let!(:target) { :user }
      it '1対多で紐づいているか' do
        expect(association.macro).to eq :belongs_to
        expect(association.class_name).to eq "User"
      end
    end

    context 'ChatRoomモデル' do
      let!(:target) { :chat_room }
      it '1対多で紐づいているか' do
        expect(association.macro).to eq :belongs_to
        expect(association.class_name).to eq "ChatRoom"
      end
    end
  end
end
