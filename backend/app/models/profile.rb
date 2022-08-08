class Profile < ApplicationRecord
  belongs_to :user, dependent: :destroy

  enum gender: [:man, :woman]
end
