require 'auth0'
require 'debug'

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
  # Auth0から抽出したデータで、ユーザーを作成し、独自DBに反映
  user = User.find_or_create_by(sub: user_data[:sub])

  # pubulic/test_image 保存されている画像パスを配列に格納し、その配列の値を１つランダムで取り出す
  def get_image_path
    images_dir = File.join(Rails.root, 'public', 'test_images')
    image_path = Dir.glob("#{images_dir}/**/*.{jpg,jpeg,png}")
    image_urls = image_path.map { |path| "./#{path.split('app/').last}" }
    image_urls.sample
  end

  # ユーザープロフィールを作成
  Profile.find_or_create_by(user_id: user.id) do |profile|
    profile.nickname = user_data[:nickname]
    profile.gender = %w[man woman].sample
    profile.game_category = %w[Apex Valorant].sample
    profile.game_rank = %w[Bronze Silver Gold Platinum].sample
    profile.discord_id = '#0000'
    profile.image = File.open(get_image_path)
  end
end

def create_like(from_user_id, to_user_id)
  is_matched = false

  # 自分がいいねしたユーザーのLikeレコードを作成
  active_like = Like.find_or_create_by(from_user_id: from_user_id, to_user_id: to_user_id) do |like|
    like.is_like = [true, false].sample
  end

  # 相手が自分をいいねしたレコードを探す
  passive_like = Like.find_or_create_by(from_user_id: to_user_id, to_user_id: from_user_id) do |like|
    like.is_like = [true, false].sample
  end

  # 相手がいいねしてくれていれば、ルームを作成し、マッチング
  return unless active_like.is_like && passive_like.is_like

  exist_chat_room = ChatRoom.joins(:chat_room_users).where(chat_room_users: { user_id: [from_user_id,
                                                                                        to_user_id] }).group(:id).having('COUNT(*)=2').first

  unless exist_chat_room
    chat_room = ChatRoom.create
    ChatRoomUser.find_or_create_by(chat_room_id: chat_room.id, user_id: active_like.from_user_id)
    ChatRoomUser.find_or_create_by(chat_room_id: chat_room.id, user_id: passive_like.from_user_id)
  end

  is_matched = true
end

users_data.first(10).each do |user_data|
  current_user = User.find_by(sub: user_data[:sub])
  other_users = User.where.not(id: current_user.id).first(10)

  other_users.each do |other_user|
    create_like(current_user.id, other_user.id)
  end
end
