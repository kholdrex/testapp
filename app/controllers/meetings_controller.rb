# frozen_string_literal: true

class MeetingsController < ApplicationController
  before_action :set_meeting

  def show; end

  private

  def set_meeting
    @meeting = Meeting.find(params[:id])
  end
end
