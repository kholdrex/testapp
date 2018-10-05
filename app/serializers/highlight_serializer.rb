# frozen_string_literal: true

class HighlightSerializer < ActiveModel::Serializer
  attributes :id, :highlight_text, :start_time, :end_time
end
