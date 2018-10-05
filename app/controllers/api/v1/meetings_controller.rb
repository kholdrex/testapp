# frozen_string_literal: true

class Api::V1::MeetingsController < ApplicationController
  # GET /meetings
  def index
    @meetings = Meeting.all
    render json: @meetings, each_serializer: ::MeetingSerializer, root: :monthly
  end

  # POST /meetings
  def create
    @meeting = Meeting.create!(meeting_params)
    json_response(@meeting, :created)
  end

  # GET /meetings/:id
  def show
    json_response(meeting)
  end

  # PUT /meetings/:id
  def update
    meeting.update(meeting_params)
    head :no_content
  end

  # DELETE /meetings/:id
  def destroy
    meeting.destroy
    head :no_content
  end

  private

  def meeting_params
    params.require(:meeting).permit(:title, :organizer_email, :start_time, :end_time, :color)
  end

  def meeting
    @meeting ||= Meeting.find(params[:id])
  end
end
