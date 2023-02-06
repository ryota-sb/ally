class CreateChatRoomUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_room_users do |t|
      t.integer :chat_room_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
