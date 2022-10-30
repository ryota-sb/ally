class RenameDescordIdColumnToProfiles < ActiveRecord::Migration[6.1]
  def change
    rename_column :profiles, :descord_id, :discord_id
  end
end
