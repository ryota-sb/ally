class AddIsLikeToLikes < ActiveRecord::Migration[6.1]
  def change
    add_column :likes, :is_like, :boolean
  end
end
