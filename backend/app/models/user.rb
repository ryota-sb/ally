class User < ApplicationRecord
  has_one :profile, dependent: :destroy
  has_many :posts, dependent: :destroy

  has_many :likes_from, class_name: 'Like', foreign_key: :from_user_id, dependent: :destroy
  has_many :likes_to, class_name: 'Like', foreign_key: :to_user_id, dependent: :destroy
  has_many :active_likes, through: :likes_from, source: :to_user
  has_many :passive_likes, through: :likes_to, source: :from_user

  has_many :chat_room_users
  has_many :chat_room, through: :chat_room_users

  has_many :messages

  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
