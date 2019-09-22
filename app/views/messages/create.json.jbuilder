json.id @message.id
json.user_name @message.user.name
json.time @message.created_at.to_s(:default)
json.body @message.body
json.image @message.image.url