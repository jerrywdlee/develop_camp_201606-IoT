class CreateTimeOts < ActiveRecord::Migration
  def change
    create_table :time_ots do |t|
      t.int :device_id
      t.float :present

      t.timestamps null: false
    end
  end
end
