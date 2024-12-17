#!/bin/sh

my_dir="$(dirname "$0")"

npm install --omit=dev # Install dependecies (Production)
# npm install # Install dependecies (Production + devDependecies)

"$my_dir/create_env.sh" # Creates example environment variables
