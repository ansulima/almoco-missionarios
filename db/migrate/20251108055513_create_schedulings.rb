class CreateSchedulings < ActiveRecord::Migration[8.1]
  def change
    create_table :schedulings do |t|
      t.date :date, null: false
      t.string :name, null: false
      t.string :phone, null: false

      t.timestamps
    end

    add_index :schedulings, :date, unique: true
  end
end
