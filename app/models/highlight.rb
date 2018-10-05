# frozen_string_literal: true

class Highlight < ApplicationRecord
  belongs_to :meeting

  validates :highlight_text, :start_time, :end_time, :meeting_id, presence: true
end
