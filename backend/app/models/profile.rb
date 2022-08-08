class Profile < ApplicationRecord
  belongs_to :user, dependent: :destroy

  enum gender: { man: 0, woman: 1 }
end
