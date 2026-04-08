const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Ash/OneDrive/Desktop/MINE-HR/frontend/src/pages/Assets';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // Container & Header
  { regex: /className="p-[0-9]+ .*?pb-24[^"]*"/g, replace: 'className="p-6"' },
  { regex: /<div className="flex flex-col md:flex-row md:items-center justify-between gap-[0-9]+ mb-[0-9]+"[^>]*>[\s\S]*?<h1 className=".*?">[\s\S]*?<div className="p-3 bg-.*? rounded-xl shadow-lg.*?">[\s\S]*?<.*? className=".*? text-white" \/>[\s\S]*?<\/div>\s*([^<]+)\s*<\/h1>\s*<p className=".*?".*?>([^<]+)<\/p>\s*<\/div>/g, 
    replace: `<div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
             $1
          </h2>
          <p className="text-gray-500 mt-1">$2</p>
        </div>` 
  },
  
  // Table head
  { regex: /<th className="bg-(slate|gray)-50[^"]*">/g, replace: '<th className="px-6 py-4 bg-gray-50 text-left text-sm font-semibold text-gray-600">' },

  // Table body cells
  { regex: /className="px-[0-9]+ py-[0-9]+([^"]*)"/g, replace: 'className="px-6 py-4$1"' },
  
  // Cards and Panels
  { regex: /className="bg-white border border-(slate|gray)-100 rounded-xl p-10 mb-10 shadow-xl overflow-visible"/g, replace: 'className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"' },
  { regex: /className="p-10 /g, replace: 'className="p-6 ' },
  
  // Slate to Gray mappings for typical tailwind usage
  { regex: /text-slate-900/g, replace: 'text-gray-900' },
  { regex: /text-slate-800/g, replace: 'text-gray-800' },
  { regex: /text-slate-700/g, replace: 'text-gray-700' },
  { regex: /text-slate-600/g, replace: 'text-gray-600' },
  { regex: /text-slate-500/g, replace: 'text-gray-500' },
  { regex: /text-slate-400/g, replace: 'text-gray-400' },
  { regex: /bg-slate-50/g, replace: 'bg-gray-50' },
  { regex: /bg-slate-100/g, replace: 'bg-gray-100' },
  { regex: /border-slate-100/g, replace: 'border-gray-100' },
  { regex: /border-slate-200/g, replace: 'border-gray-200' },

  // Font styling fixes
  { regex: /font-outfit/g, replace: '' },
  { regex: /font-inter/g, replace: '' },
  { regex: /font-mono/g, replace: '' },

  // Clean empty classes that might have been left
  { regex: /className="\s+"/g, replace: '' },
  { regex: / className=""/g, replace: '' },
];


for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let original = content;
  for (const r of replacements) {
    content = content.replace(r.regex, r.replace);
  }

  // A couple more specific tweaks:
  // For standard buttons in headers, etc.
  content = content.replace(
    /className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium cursor-pointer"/g,
    'className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md"'
  );

  content = content.replace(
    /className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium border border-gray-200 cursor-pointer"/g,
    'className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"'
  );

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}
console.log('Pass 2 complete.');
