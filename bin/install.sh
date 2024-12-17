#!/bin/sh

my_dir="$(dirname "$0")"

echo "Installing NPM packages..."

npm install --omit=dev # Install dependecies (Production)
# npm install # Install dependecies (Production + devDependecies)

echo "NPM packages instaled."

"$my_dir/create_env.sh" # Creates example environment variables

echo "Environment variables created."

echo -e "ALL SET !\n Now you can start the server running 'npm start'"
echo -e "\n"
echo -e "TUDO PRONTO !\n Agora você pode iniciar o servidor com 'npm start'"