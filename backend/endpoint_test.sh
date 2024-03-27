#!/usr/bin/bash 

# Test create user 

curl -H 'Content-Type: application/json' 0:5000/api/v1/users --data-raw '{"firstname": "john", "lastname": "doe", "password": "johnDoe12#", "email": "john@gmail.com" }'

# Test login user 

token=`curl -XPOST -H 'Content-Type: application/json' 0:5000/api/v1/login --data-raw '{"email": "john@gmail.com", "password": "johnDoe12#" }' | jq .token`

echo $token 

# Test post category 

category_id=`curl -XPOST -H 'Authorization: Bearer $token' -H 'Content-Type: application/json' --data-raw '{"name": "category1"}' 0:5000/api/v1/categories | jq .category.id`

echo $category_id 

# Test add chat to category

response=`curl -XPOST -H 'Content-Type: application/json' -H 'Authorization: Bearer $token' --data-raw '{"prompt": "hello gpt", "response": "I am fine"}' '0:5000/api/v1/categories/${category_id}/chats'` 

userId=`echo $response | .chat.user`
chatId=`echo $response | .chat.id`

# Test delete a category 

curl -XDELETE -H 'Authorization: Bearer $token' '0:5000/api/v1/category/${category_id}'

# Test chat in category was deleted 

not_found=`curl -XGET -H 'Authorization: Bearer $token' '0:5000/api/v1/chats/${chatId}' | jq .error`

test "$not_found" = "Chat not found"; 

echo "$not_found" 

# Test update categories 

# Test post category 

category_id=`curl -XPOST -H 'Authorization: Bearer $token' -H 'Content-Type: application/json' --data-raw '{"name": "category1"}' 0:5000/api/v1/categories | jq .category.id`

echo $category_id 

# Test add chat to category

response=`curl -XPOST -H 'Content-Type: application/json' -H 'Authorization: Bearer $token' --data-raw '{"prompt": "hello gpt", "response": "I am fine"}' '0:5000/api/v1/categories/${category_id}/chats'` 

userId=`echo $response | .chat.user`
chatId=`echo $response | .chat.id`

curl -XPUT -H 'Content-Type: application/json' -H 'Authorization: Bearer $token' '0:5000/api/v1/categories/$categoryId' --data-raw '{"name": "category2"}' 
