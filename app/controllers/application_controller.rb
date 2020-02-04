class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, raise: false

  helper_method :current_user, :logged_in?

  private
  def login!(user)
    session[:session_token] = user.session_token
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!

    session[:session_token] = nil
  end

  def current_user
    return nil unless session[:session_token]

    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end
  
  # def require_logged_out
  #   redirect_to user_url(current_user) if logged_in?
  # end

  def require_logged_in
    unless current_user
      render json: { base: ['invalid credentials'] }, status: 401
    end
    # Prevent logged-out users from seeing certain pages
    # redirect_to new_session_url unless current_user
    # redirect_to new_session_url unless logged_in?
  end
end
