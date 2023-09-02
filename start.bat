@echo off
cd /d %~dp0

start /b /wait cmd /c npm install

cd client
start cmd /k "mode con: cols=100 lines=30 & npm start"

cd ../server
start cmd /k "mode con: cols=100 lines=30 & node index.js"

cd /d %~dp0
