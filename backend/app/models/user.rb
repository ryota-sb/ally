class User < ApplicationRecord
  has_one :profile, dependent: :destroy

  has_many :likes_from, -> { liked }, class_name: 'Like', foreign_key: :from_user_id, dependent: :destroy
  has_many :likes_to, class_name: 'Like', foreign_key: :to_user_id, dependent: :destroy
  has_many :active_likes, through: :likes_from, source: :to_user
  has_many :passive_likes, through: :likes_to, source: :from_user

  has_many :chat_room_users
  has_many :chat_rooms, through: :chat_room_users

  has_many :messages

  scope :excluding_user, ->(user) { where.not(id: user.id) } # 利用者（ログインユーザー）以外を取得
  scope :unliked_by, ->(user) { excluding_user(user).where.not(id: user.likes_from.select(:to_user_id)) } # 利用者がlikeしていないユーザーを取得

  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
