class HomeController < ApplicationController
  def index
    @year = params[:year]&.to_i || Date.today.year
    @month = params[:month]&.to_i || Date.today.month

    @current_month = Date.new(@year, @month, 1)
    @current_month = Date.today.beginning_of_month if @current_month > 1.year.from_now
    @current_month = Date.today.beginning_of_month if @current_month < Date.today.beginning_of_month

    @schedulings = Scheduling.where(date: @current_month..@current_month.end_of_month)
                            .index_by(&:date)
  end

  def schedule
    @scheduling = Scheduling.new(scheduling_params)
    if @scheduling.save
      render json: { success: true, scheduling: @scheduling }
    else
      render json: { success: false, errors: @scheduling.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def cancel
    @scheduling = Scheduling.find(params[:id])
    @scheduling.destroy
    redirect_to root_path, notice: "Agendamento cancelado."
  end

  private

  def scheduling_params
    params.require(:scheduling).permit(:date, :name, :phone)
  end
end
