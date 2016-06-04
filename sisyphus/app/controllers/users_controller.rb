class UsersController < ApplicationController
  def index
    @users = Device.all
  end

  def show
    @user = Device.find(params[:id])
  end
end
