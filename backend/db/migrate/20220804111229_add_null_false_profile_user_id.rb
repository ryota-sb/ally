class AddNullFalseProfileUserId < ActiveRecord::Migration[6.1]
  def change
    change_column_null :profiles, :user_id, false
  end
end
