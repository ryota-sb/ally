class AddUniqueIndexToLikes < ActiveRecord::Migration[6.1]
  def change
    add_index :likes, %i[to_user_id from_user_id], unique: true
  end
end
