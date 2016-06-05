class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :uuid
      t.string :name
      t.string :ip

      t.timestamps null: false
    end
  end
end
