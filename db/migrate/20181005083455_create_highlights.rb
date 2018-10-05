# frozen_string_literal: true

class CreateHighlights < ActiveRecord::Migration[5.2]
  def change
    create_table :highlights do |t|
      t.bigint :meeting_id, index: true
      t.datetime :start_time
      t.datetime :end_time
      t.text :highlight_text

      t.timestamps
    end
  end
end
