#!/bin/bash

echo "Criando o arquivo .env..."

echo "NODE_ENV='test'
STRIPE_SECRET_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc
STRIPE_TEST_KEY=pk_test_TYooMQauvdEDq54NiTphc6z8JtX0H6KqX2zH64p7J8E4x9gJbC
STRIPE_WEBHOOK_SECRET=whsec_77d4f33db34638b0ef4ad4699e4fa5ea4e01ef266ecf0845b036c9f4359da10e
DB_PASS=mydbpassword
EMAIL_DB=myemail@example.com
TEST_EMAIL_PASS=testemailpassword
TWILIO_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH=your_twilio_auth_token
TWILIO_NUMBER=+1234567890
MY_PHONE_NUMBER=+55119987654321
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority
SECRET_HASH=mysecretkey
JWT_SECRET=myjwtsecretkey
PORT=3000
BASE_URL=http://localhost:3000" > ../app/src/.env.example

echo ".env com váriaveis de exemplo criado com sucesso em app/src/.env"
