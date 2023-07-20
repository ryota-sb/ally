class User < ApplicationRecord
  has_one :profile, dependent: :destroy

  has_many :likes_from, class_name: 'Like', foreign_key: :from_user_id, dependent: :destroy
  has_many :likes_to, class_name: 'Like', foreign_key: :to_user_id, dependent: :destroy
  has_many :active_likes, through: :likes_from, source: :to_user
  has_many :passive_likes, through: :likes_to, source: :from_user

  # is_likeがtrueのLikeレコード
  has_many :liked_from, -> { liked }, class_name: 'Like', foreign_key: :from_user_id, dependent: :destroy
  has_many :liked_to, -> { liked }, class_name: 'Like', foreign_key: :to_user_id, dependent: :destroy
  # is_likeがtrueのUserレコード
  has_many :active_liked_user, through: :liked_from, source: :to_user
  has_many :passive_liked_user, through: :liked_to, source: :from_user

  has_many :chat_room_users
  has_many :chat_rooms, through: :chat_room_users

  has_many :messages

  validates :sub, uniqueness: true

  scope :guest_users, ->(user) { where.not(id: user.id) } # ログインユーザー以外（ゲストユーザー）を取得
  scope :unliked,     ->(user) { where.not(id: user.likes_from.select(:to_user_id)) } # いいねしていないユーザーを取得

  # いいねしていないゲストユーザー取得
  def self.unliked_guest_users(user)
    unliked(user).guest_users(user)
  end

  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
