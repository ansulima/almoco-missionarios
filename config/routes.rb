Rails.application.routes.draw do
  root 'home#index'

  # Rotas para agendamento
  post '/schedule', to: 'home#schedule'
  delete '/schedule/:id', to: 'home#cancel', as: 'cancel_schedule'
end
