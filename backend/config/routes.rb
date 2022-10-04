Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'login', to: 'secured#login'
      get 'logout', to: 'secured#logout'
      resources :posts
      resources :profiles, only: [:show, :create, :update]
      resources :likes, only: [:index, :create]
    end
  end
end
