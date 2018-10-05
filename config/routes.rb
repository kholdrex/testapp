# frozen_string_literal: true

Rails.application.routes.draw do
  resources :meetings, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :meetings do
        resources :highlights
      end
    end
  end

  root to: 'welcome#index'
end
