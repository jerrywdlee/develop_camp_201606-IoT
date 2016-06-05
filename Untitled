class UsersController < ApplicationController

  def index
    @users = Device.all
  end

  def show
    @user = Device.find params[:id]
  end

  def create
    respond_to do |format|
      if Device.find_by(uuid: params["uuid"]) == nil
        @user = Device.create(uuid: params["uuid"], name: params["name"], ip: params["ip"])
        if @user.save
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
