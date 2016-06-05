class TimeOtsController < ApplicationController

  def create
    time = Device.find_by(uuid: params["device_id"])
    respond_to do |format|
      if time
        @time_ot = TimeOt.create(device_id: time.id, present: params["present"])
        if @time_ot.save
          format.json { render json: "success" }
        else
          format.json { render json: "falses" }
        end
      else
        format.json { render json: "falses" }
      end
    end
  end
end
