class AddUserIdProfile < ActiveRecord::Migration[6.1]
  def change
    remove_column :profiles, :user_id, :integer
  end
end
