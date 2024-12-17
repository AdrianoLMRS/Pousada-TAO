#!/bin/sh

my_dir="$(dirname "$0")"

echo "Installing NPM packages..."

npm install --omit=dev # Install dependecies (Production)
# npm install # Install dependecies (Production + devDependecies)

echo "NPM packages instaled."

"$my_dir/create_env.sh" # Creates example environment variables
