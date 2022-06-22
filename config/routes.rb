Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope :api, defaults: { format: :json } do
    devise_for :users, controllers: { sessions: :sessions },
                       path_names: { sign_in: :login }

    resource :user, only: [:show, :update] do
      post '/send_invitation', to: "users#send_invitation"
    end
  end

  root "welcome#home"
  match '/login', to: "welcome#login", via: :get
  match '/registration', to: "welcome#registration", via: :get
  match '/dashboard', to: "welcome#dashboard", via: :get
end

