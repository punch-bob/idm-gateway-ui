#!/usr/bin/env sh

find './src/api' -name 'index.js' -exec sed -i -e 's,_API_BASE_URL,'"$API_BASE_URL"',g' {} \;
npm start