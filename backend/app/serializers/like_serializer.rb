class LikeSerializer < ActiveModel::Serializer
  attributes :id, :from_user_id, :to_user_id, :is_like, :created_at, :updated_at
end

create_table "likes", force: :cascade do |t|
  t.integer "from_user_id", null: false
  t.integer "to_user_id", null: false
  t.datetime "created_at", precision: 6, null: false
  t.datetime "updated_at", precision: 6, null: false
  t.boolean "is_like"
  t.index ["to_user_id", "from_user_id"], name: "index_likes_on_to_user_id_and_from_user_id", unique: true
end