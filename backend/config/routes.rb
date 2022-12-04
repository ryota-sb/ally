Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'login', to: 'secured#login'
      get 'logout', to: 'secured#logout'
      resources :tests, only: [:index]
      resources :users, only: [:index]
      resources :posts
      resources :profiles, only: [:index, :show, :create, :update]
      resources :likes, only: [:index, :create]
    end
  end
end
