# frozen_string_literal: true

class MeetingSerializer < ActiveModel::Serializer
  attributes :id, :name, :startdate, :enddate, :starttime, :endtime, :color, :url

  def name
    object.title
  end

  def startdate
    object.start_time.strftime('%Y-%m-%d')
  end

  def enddate
    object.end_time.strftime('%Y-%m-%d')
  end

  def starttime
    object.start_time.strftime('%H:%M')
  end

  def endtime
    object.end_time.strftime('%H:%M')
  end

  def url
    Rails.application.routes.url_helpers.meeting_path(object)
  end
end
