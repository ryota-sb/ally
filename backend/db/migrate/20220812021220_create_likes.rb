class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes do |t|
      t.integer :from_user_id, null: false
      t.integer :to_user_id, null: false
      t.timestamps
    end
  end
end
