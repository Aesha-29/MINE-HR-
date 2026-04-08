@echo off
cd backend
echo Generating Prisma Client...
call npx prisma generate
echo Pushing schema changes to the TiDB database...
call npx prisma db push --accept-data-loss
echo DONE
