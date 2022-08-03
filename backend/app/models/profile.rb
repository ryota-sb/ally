class Profile < ApplicationRecord
  belongs_to :user

  enum gender: { man: 0, woman: 1 }
end
