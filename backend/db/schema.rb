# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_230_718_105_155) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'chat_room_users', force: :cascade do |t|
    t.integer 'chat_room_id', null: false
    t.integer 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'chat_rooms', force: :cascade do |t|
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'likes', force: :cascade do |t|
    t.integer 'from_user_id', null: false
    t.integer 'to_user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.boolean 'is_like'
    t.index %w[to_user_id from_user_id], name: 'index_likes_on_to_user_id_and_from_user_id', unique: true
  end

  create_table 'messages', force: :cascade do |t|
    t.integer 'user_id', null: false
    t.integer 'chat_room_id', null: false
    t.string 'content', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'profiles', force: :cascade do |t|
    t.string 'game_rank'
    t.string 'game_category', null: false
    t.string 'discord_id'
    t.integer 'gender', default: 0, null: false
    t.string 'image'
    t.string 'nickname', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'user_id', null: false
    t.index ['user_id'], name: 'index_profiles_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'sub', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['sub'], name: 'index_users_on_sub', unique: true
  end

  add_foreign_key 'profiles', 'users'
end
