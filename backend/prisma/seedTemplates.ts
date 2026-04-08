
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding templates...');

  // 1. Work Report
  const workReport = await prisma.template.create({
    data: {
      name: 'Work Report',
      description: 'Daily activity and work status report',
      templateType: 'Work Report',
      allowMultiplePerShift: false,
      requiredOnPunchIn: false,
      requiredOnPunchOut: 'Required',
      needReportingPerson: true,
      questions: {
        create: [
          { questionTitle: 'Today Work Title', questionType: 'Description', isRequired: 'Yes' },
          { questionTitle: 'Work Description', questionType: 'Description', isRequired: 'Yes' },
          { questionTitle: 'Status', questionType: 'Radio Button', isRequired: 'Yes', options: ['Completed', 'Pending', 'In Progress'] }
        ]
      }
    }
  });

  // 2. Visit Report
  const visitReport = await prisma.template.create({
    data: {
      name: 'Visit Report',
      description: 'Client or site visit report',
      templateType: 'Visit',
      allowMultiplePerShift: true,
      requiredOnPunchIn: false,
      requiredOnPunchOut: 'Optional',
      needReportingPerson: false,
      questions: {
        create: [
          { questionTitle: 'Client Name', questionType: 'Description', isRequired: 'Yes' },
          { questionTitle: 'Purpose of Visit', questionType: 'Description', isRequired: 'Yes' },
          { questionTitle: 'Location', questionType: 'Google Map Location', isRequired: 'Yes' },
          { questionTitle: 'Outcome', questionType: 'Description', isRequired: 'No' }
        ]
      }
    }
  });

  // 3. Expense Report
  const expenseReport = await prisma.template.create({
    data: {
      name: 'Expense Report',
      description: 'Reporting business expenses',
      templateType: 'Expense',
      allowMultiplePerShift: true,
      requiredOnPunchIn: false,
      requiredOnPunchOut: 'Optional',
      needReportingPerson: true,
      questions: {
        create: [
          { questionTitle: 'Expense Type', questionType: 'Dropdown', isRequired: 'Yes', options: ['Travel', 'Food', 'Lodging', 'Other'] },
          { questionTitle: 'Amount', questionType: 'Number', isRequired: 'Yes' },
          { questionTitle: 'Receipt Upload', questionType: 'File Upload', isRequired: 'Yes' },
          { questionTitle: 'Remarks', questionType: 'Description', isRequired: 'No' }
        ]
      }
    }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
