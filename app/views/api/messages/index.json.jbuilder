json.array! @messages do |message|
  json.body message.body
  json.image message.image.url
<<<<<<< Updated upstream
  json.time message.created_at.to_s(:datetime) 
=======
  json.time message.created_at.to_s
>>>>>>> Stashed changes
  json.user_name message.user.name
  json.id message.id
end