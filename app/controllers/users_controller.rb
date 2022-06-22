class UsersController < ApplicationController
  before_action :authenticate_user

  def send_invitation
    UserMailer.invitation_email(current_user, params[:email]).deliver
    render json: {message: "Invitation has sent successfully"}
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :bio, :image)
  end
end
