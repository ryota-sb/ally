FactoryBot.define do
  factory :like do
    association :to_user, class: User
    association :from_user, class: User
    to_user_id { 1 }
    from_user_id { 2 }
  end
end