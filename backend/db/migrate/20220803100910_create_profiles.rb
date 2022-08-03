class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string "game_rank"
      t.string "game_category"
      t.string "descord_id"
      t.integer "gender"
      t.integer "user_id"
      t.timestamps
    end
  end
end
