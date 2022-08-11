class Add < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :image, :string
  end
end
