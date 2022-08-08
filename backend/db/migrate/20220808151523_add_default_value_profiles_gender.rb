class AddDefaultValueProfilesGender < ActiveRecord::Migration[6.1]
  def change
    change_column_default :profiles, :gender, from: nil, to: 0
  end
end
