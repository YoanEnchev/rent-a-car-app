if [ ! -d "node_modules" ]; then
    # There is no node_modules folder. So install modules.
    npm install
fi

npm run start:debug