class AddNullProfilesGender < ActiveRecord::Migration[6.1]
  def change
    change_column_null :profiles, :gender, false
  end
end
