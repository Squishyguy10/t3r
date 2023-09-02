@echo off
cd /d %~dp0

start /b /wait cmd /c npm install

cd client
start cmd /k "npm start"

cd ../server
start cmd /k "node index.js"

cd /d %~dp0
