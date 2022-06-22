class RegistrationsController < Devise::RegistrationsController
  def create
    super
    if resource.save
      render
    else
      render json: { errors: resource.errors }, status: :unprocessable_entity
    end
  end

  private

    def sign_up_params
      params.require(:user).permit(:username, :bio, :email, :password, :password_confirmation)
    end
end
