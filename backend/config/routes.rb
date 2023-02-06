Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'login', to: 'secured#login'
      get 'logout', to: 'secured#logout'
      resources :tests, only: [:index]
      resources :posts
      resources :users, only: [:index]
      resources :profiles, only: [:index, :show, :create, :update]
      resources :likes, only: [:index, :create]
      resources :chat_rooms, only: [:index, :show]
      resources :messages, only: [:create]
    end
  end
end
