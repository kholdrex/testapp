# frozen_string_literal: true

class Api::V1::HighlightsController < ApplicationController
  # GET /meetings/:meeting_id/highlights
  def index
    @highlights = meeting.highlights
    render json: @highlights, each_serializer: ::HighlightSerializer, root: :data
  end

  # POST /meetings
  def create
    @highlight = meeting.highlights.create!(highlight_params)
    json_response(@highlight, :created)
  end

  # GET /meetings/:meeting_id/highlights/:id
  def show
    json_response(highlight)
  end

  # PUT /meetings/:meeting_id/highlights/:id
  def update
    highlight.update(highlight_params)
    head :no_content
  end

  # DELETE /meetings/:meeting_id/highlights
  def destroy
    highlight.destroy
    head :no_content
  end

  private

  def highlight_params
    params.require(:highlight).permit(:highlight_text, :start_time, :end_time)
  end

  def meeting
    @meeting ||= Meeting.find(params[:meeting_id])
  end

  def highlight
    @highlight ||= meeting.highlights.find(params[:id])
  end
end
