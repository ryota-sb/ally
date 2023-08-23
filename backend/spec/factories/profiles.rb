FactoryBot.define do
  factory :profile do
    association :user
    sequence :nickname, 'test_user_1' # 末尾の1に対して、nextメソッドが呼ばれる(２回目に呼び出される場合、test_user_2）
    gender { 'man' }
    game_category { 'Apex' }
    game_rank { 'Master' }
    discord_id { '#1111' }
    image { { url: 'http://localhost:3000/uploads/profile/image/57/woman-sample.jpeg' } }
  end
end
