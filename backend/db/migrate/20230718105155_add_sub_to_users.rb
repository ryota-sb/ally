class AddSubToUsers < ActiveRecord::Migration[6.1]
  def change
    add_index :users, :sub, unique: true
  end
end
