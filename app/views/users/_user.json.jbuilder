json.(user, :id, :email, :username, :bio)
json.token user.generate_jwt
