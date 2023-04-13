require 'auth0'

# Auth0クライアントのインスタンス作成
auth0_client = Auth0Client.new(
  domain: ENV['AUTH0_DOMAIN'],
  client_id: ENV['AUTH0_API_CLIENT_ID'],
  client_secret: ENV['AUTH0_API_CLIENT_SECRET']
)

# Auth0に存在する登録済みのユーザーを全て取得
auth_users = auth0_client.users

# Auth0の必要な情報のみを抽出して取得
users_data = auth_users.map do |user|
  {
    sub: user['user_id'],
    nickname: user['nickname'],
    created_at: user['created_at'],
    updated_at: user['updated_at']
  }
end

users_data.each do |user_data|

  # Auth0から抽出したデータをUserモデルを使用して、独自のDBに反映
  user = User.create!(
    sub: user_data[:sub],
    created_at: user_data[:created_at],
    updated_at: user_data[:updated_at]
  )

  # test_imagesに保存されている画像パスを配列に格納し、その配列の値を１つランダムで取り出す
  def get_images_path
    images_dir = File.join(Rails.root, 'public', 'test_images')
    image_path = Dir.glob("#{images_dir}/**/*.{jpg,jpeg,png}")
    image_urls = image_path.map { |path| "./#{path.split('app/').last}"}
    return image_urls.sample
  end

  # ユーザープロフィールを作成
  user.create_profile!(
    nickname: user_data[:nickname],
    gender: ["man", "woman"].sample,
    game_category: ["Apex", "Valorant"].sample,
    game_rank: ["Bronze","Silver", "Gold", "Platinum"].sample,
    discord_id: "#0000",
    image: File.open(get_images_path()),
    user_id: user[:id]
  )

  users_except_current = User.where.not(id: user.id)
  users_except_current.each do |other_user|
    Like.create!(
      from_user_id: user.id,
      to_user_id: other_user.id,
      is_like: [true, false].sample
    )
  end
end
