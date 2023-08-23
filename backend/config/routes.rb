Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'login', to: 'secured#login'
      get 'logout', to: 'secured#logout'
      resources :tests, only: [:index]

      get 'random_user_with_profile', to: 'users#random_user_with_profile'
      resources :users, only: :show
      resources :profiles, only: %i[create update]
      resources :likes, only: %i[index create]
      resources :chat_rooms, only: %i[index show]
      resources :messages, only: :create
    end
  end
end
