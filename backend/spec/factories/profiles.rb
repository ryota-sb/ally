FactoryBot.define do
  factory :profile do
    nickname { "テストユーザー" }
    gender { "man" }
    game_category { "Apex" }
    game_rank { "Master" }
    discord_id { "#0000" }
    image { "http://localhost:3000/uploads/profile/image/57/woman-sample.jpeg" } 
  end
end