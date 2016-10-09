Rails.application.routes.draw do
    root 'home#index'

    get 'MapPoint/all' => 'home#getPoints'
    get 'MapPoint/create' => 'home#makePoint'
    resources :map_points

    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
