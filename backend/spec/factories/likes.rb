FactoryBot.define do
  factory :like do
    association :to_user, class: User
    association :from_user, class: User
  end
end
