class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  respond_to :json

  before_action :underscore_params!
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :bio])
  end

  def authenticate_user
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      jwt_payload = JWT.decode(header, Rails.application.secrets.secret_key_base).first

      @current_user_id = jwt_payload['id']
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
      head :unauthorized
    end
  end

  def authenticate_user!(options = {})
    head :unauthorized unless signed_in?
  end

  def current_user
    @current_user ||= super || User.find(@current_user_id)
  end

  def signed_in?
    @current_user_id.present?
  end

  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end
end
