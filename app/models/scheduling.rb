class Scheduling < ApplicationRecord
  validates :date, :name, :phone, presence: true
  validates :date, uniqueness: true
  validate :date_cannot_be_in_the_past

  private

  def date_cannot_be_in_the_past
    if date.present? && date < Date.today
      errors.add(:date, "não pode ser no passado")
    end
  end
end
