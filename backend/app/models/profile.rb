class Profile < ApplicationRecord
  belongs_to :user
  validates :user_id, uniqueness: true
  
  mount_uploader :image, ImageUploader

  validates :gender, { presence: true }
  enum gender: { man: 0, woman: 1 }
end
