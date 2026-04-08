const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Ash/OneDrive/Desktop/MINE-HR/frontend/src/pages/Assets';
if (!fs.existsSync(dir)) process.exit(1);

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // Layouts & Modals
  { regex: /className="asset-dashboard-grid"/g, replace: 'className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"' },
  { regex: /className="asset-stat-card[^"]*"/g, replace: 'className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden"' },
  { regex: /className="icon-bg[^"]*"/g, replace: 'className="w-12 h-12 opacity-10 absolute top-4 right-4"' },
  { regex: /className="label"/g, replace: 'className="text-sm font-medium text-gray-500"' },
  { regex: /className="value[^"]*"/g, replace: 'className="text-3xl font-bold text-gray-900 mt-2"' },
  { regex: /className="asset-chart-container[^"]*"/g, replace: 'className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"' },
  { regex: /className="asset-table-wrap"/g, replace: 'className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"' },
  
  { regex: /className="asset-modal-overlay"/g, replace: 'className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"' },
  { regex: /className="asset-modal[^"]*"/g, replace: 'className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"' },
  { regex: /className="asset-form-section[^"]*"/g, replace: 'className="mb-6 p-4 border border-gray-100 rounded-xl bg-gray-50"' },
  { regex: /className="asset-form-header"/g, replace: 'className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"' },
  { regex: /className="asset-grid-3"/g, replace: 'className="grid grid-cols-1 md:grid-cols-3 gap-5"' },
  { regex: /className="asset-grid-2"/g, replace: 'className="grid grid-cols-1 md:grid-cols-2 gap-5"' },

  // Tables
  { regex: /className="table-modern[^"]*"/g, replace: 'className="w-full whitespace-nowrap"' },
  
  // Inputs / Buttons
  { regex: /className="input-modern[^"]*"/g, replace: 'className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"' },
  { regex: /className="select-modern[^"]*"/g, replace: 'className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"' },
  { regex: /className="btn btn-primary[^"]*"/g, replace: 'className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium cursor-pointer"' },
  { regex: /className="btn btn-secondary[^"]*"/g, replace: 'className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium border border-gray-200 cursor-pointer"' },
  { regex: /className="input-label[^"]*"/g, replace: 'className="block text-sm font-medium text-gray-700 mb-1"' },

  // Typography cleanup (reducing black/italics)
  { regex: /font-black/g, replace: 'font-bold' },
  { regex: /italic/g, replace: '' },
  { regex: /uppercase tracking-tighter/g, replace: '' },
  { regex: /tracking-widest/g, replace: '' },
  { regex: /rounded-2xl/g, replace: 'rounded-xl' },
  { regex: /rounded-3xl/g, replace: 'rounded-xl' },
  { regex: /rounded-\[.*?\]/g, replace: 'rounded-xl' },
  { regex: /!bg-/g, replace: 'bg-' },
  { regex: /!py-/g, replace: 'py-' },
  { regex: /!px-/g, replace: 'px-' },
  { regex: /!border-/g, replace: 'border-' },
  { regex: /!rounded-/g, replace: 'rounded-' },
  { regex: /!flex/g, replace: 'flex' },
  { regex: /!w-/g, replace: 'w-' }
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove CSS import
  content = content.replace(/import '\.\.\/\.\.\/assets\.css';\n?/g, '');

  let original = content;
  for (const r of replacements) {
    content = content.replace(r.regex, r.replace);
  }

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}

console.log('Refactoring complete.');
