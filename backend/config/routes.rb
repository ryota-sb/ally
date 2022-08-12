Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :profiles, only: [:create, :update]
      resources :likes, only: [:index, :create]
    end
  end
end
