class Profile < ApplicationRecord
  belongs_to :user, dependent: :destroy

  validates :gender, { presence: true }

  mount_uploader :image, ImageUploader
  enum gender: { man: 0, woman: 1 }
end
