class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :game_rank
      t.string :game_category, null: false
      t.string :discord_id
      t.integer :gender, default: 0, null: false
      t.bigint :user_id, null: false
      t.string :image
      t.string :nickname, null: false
      t.index ["user_id"], name: "index_profiles_on_user_id"

      t.timestamps
    end
  end
end
