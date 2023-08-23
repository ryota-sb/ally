class AuthorizationService
  def initialize(headers = {})
    @headers = headers
  end

  def current_user
    @auth_payload, @auth_header = verify_token
    @user = User.from_token_payload(@auth_payload)
  end

  private

  def http_token
    @headers['Authorization'].split(' ').last if @headers['Authorization'].present?
  end

  def verify_token
    JsonWebToken.verify(http_token)
  end
end
