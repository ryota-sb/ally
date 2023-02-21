class Profile < ApplicationRecord
  belongs_to :user

  mount_uploader :image, ImageUploader

  validates :user_id, uniqueness: true
  validates :nickname, presence: true
  validates :gender, presence: true
  validates :game_category, presence: true
  enum gender: { man: 0, woman: 1 }
end
