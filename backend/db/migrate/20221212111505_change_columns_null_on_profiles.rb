class ChangeColumnsNullOnProfiles < ActiveRecord::Migration[6.1]
  def change
    change_column_null :profiles, :game_category, false
  end
end
