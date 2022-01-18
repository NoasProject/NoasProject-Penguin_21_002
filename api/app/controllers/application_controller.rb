class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  skip_before_action :verify_authenticity_token, if: :devise_controller? # APIではCSRFチェックをしない
  before_action :get_user

  def get_user
    @user = User.find_by(email: request.headers[:uid])
  end
end
