@echo off
echo ===========================================
echo Synchronizing Database and Types...
echo ===========================================
cd backend
echo Generating Prisma Client...
call npx prisma generate
echo.
echo Pushing schema changes to the TiDB database...
call npx prisma db push --accept-data-loss
echo.
echo ===========================================
echo ALL DONE! 
echo If the push was successful, the "Failed to fetch rules" errors will be gone.
echo IMPORTANT: Please RESTART your running backend server so it can use the new data!
echo ===========================================
pause
