@echo off
echo Starting Backend...
cd backend
start /B npx tsx index.ts
echo Starting Frontend...
cd ..
cd frontend
start /B npx vite
echo Servers started in background!
pause
