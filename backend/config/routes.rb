Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'login', to: 'secured#login'
      get 'logout', to: 'secured#logout'
      resources :tests, only: [:index]
      resources :posts

      get 'random_user_with_profile', to: 'users#random_user_with_profile'
      resources :users, only: [:show]
      resources :profiles, only: [:index, :show, :create, :update]
      resources :likes, only: [:index, :create]
      resources :chat_rooms, only: [:index, :show]
      resources :messages, only: [:create]
    end
  end
end
