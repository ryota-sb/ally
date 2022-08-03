class User < ApplicationRecord
  has_one :profile
  has_many :posts, dependent: :destroy
  
  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
