class CreateMapPoints < ActiveRecord::Migration[5.0]
    def up
        create_table :map_points do |t|
            t.decimal "latitude", :limit => 30, :null => false
            t.decimal "longitude", :limit => 30, :null => false
            t.string "name", :limit => 80, :null => false
            t.string "description", :limit => 300
            t.timestamps
        end
    end

    def down
        drop_table :map_points
    end
end
