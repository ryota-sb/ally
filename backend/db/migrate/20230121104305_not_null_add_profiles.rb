class NotNullAddProfiles < ActiveRecord::Migration[6.1]
  def change
    change_column :profiles, :user_id, :bigint, null: false
  end
end
