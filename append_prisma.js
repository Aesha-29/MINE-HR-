const fs = require('fs');

const models = `
// -------------------------------------------------------------
// Employees Nominee Module
// -------------------------------------------------------------

model NominationType {
  id              Int       @id @default(autoincrement())
  name            String    @unique // PF, Insurance, Salary, Bonus
  description     String?   @db.Text
  allowMultiple   Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  nominees        EmployeeNominee[]
}

model EmployeeNominee {
  id              Int       @id @default(autoincrement())
  employeeId      Int
  employee        Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  nominationTypeId Int
  nominationType  NominationType @relation(fields: [nominationTypeId], references: [id], onDelete: Cascade)
  
  nomineeName     String
  relation        String    // Father / Mother / Spouse / Child / Other
  dob             DateTime? @db.Date
  aadharNumber    String    // Making this non-unique at DB level to prevent errors if husband/wife nominate same child, but we'll validate. Actually, user asked for it to be unique.
  mobileNo        String
  email           String?
  address         String?   @db.Text
  nomineePercentage Float

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([aadharNumber, employeeId]) // making sure same employee cannot add same person twice, but keeping global unique could be problematic.
}
`;

fs.appendFileSync('backend/prisma/schema.prisma', models);
console.log('Appended models');
