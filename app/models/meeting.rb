# frozen_string_literal: true

class Meeting < ApplicationRecord
  has_many :highlights, dependent: :destroy

  validates :title, :start_time, :end_time, :color, presence: true
end
