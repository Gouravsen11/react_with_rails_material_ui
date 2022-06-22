class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def invitation_email(user, email)
    @user = user
    mail(to: email, subject: 'Welcome to My Awesome Site')
  end
end
