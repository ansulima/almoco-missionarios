Rails.application.routes.draw do
  root 'home#index'

  get '/calendar/:year/:month', to: 'home#index', as: 'calendar_month'
  # Rotas para agendamento
  post '/schedule', to: 'home#schedule'
  delete '/schedule/:id', to: 'home#cancel', as: 'cancel_schedule'
end
