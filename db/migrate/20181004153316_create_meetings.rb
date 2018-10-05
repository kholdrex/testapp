# frozen_string_literal: true

class CreateMeetings < ActiveRecord::Migration[5.2]
  def change
    create_table :meetings do |t|
      t.string :title
      t.string :organizer_email
      t.string :audio_file_location
      t.string :color, default: '#007ACE'
      t.datetime :start_time
      t.datetime :end_time
      t.timestamps
    end
  end
end
