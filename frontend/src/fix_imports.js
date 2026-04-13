const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'pages');
const appTsxPath = path.join(__dirname, 'App.tsx');

// Get all .tsx files recursively
function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

const allTsxFiles = getAllFiles(baseDir);

let appTsx = fs.readFileSync(appTsxPath, 'utf8');

// Regex to match imports from ./pages/...
const importRegex = /import\s+(?:{[^}]+}|[^{\s]+)\s+from\s+["']\.\/pages\/([^"']+)["']/g;

let matches;
const replacements = [];
while ((matches = importRegex.exec(appTsx)) !== null) {
  const fullMatch = matches[0];
  const importPath = matches[1]; // e.g., "addEmployee" or "Assets/ManageAssets"

  // Only try to fix if it's currently a direct child OR if it might be wrong in case
  const expectedName = importPath.split('/').pop().toLowerCase();
  
  // Find the right file
  const foundFile = allTsxFiles.find(f => {
    const baseName = path.basename(f, '.tsx').toLowerCase();
    const baseNameTs = path.basename(f, '.ts').toLowerCase();
    return baseName === expectedName || baseNameTs === expectedName;
  });

  if (foundFile) {
    // build relative path
    let relPath = path.relative(__dirname, foundFile);
    // replace backslashes
    relPath = relPath.replace(/\\/g, '/');
    // remove extension
    relPath = relPath.replace(/\.tsx?$/, '');
    
    // ensure starts with ./
    if (!relPath.startsWith('.')) relPath = './' + relPath;

    let newImport = fullMatch.replace(/\.\/pages\/[^"']+/, relPath.substring(2)); // strip leading ./
    // The relative string already brings "pages/..."
    if (!newImport.includes('"./pages')) {
      newImport = fullMatch.replace(/\.\/pages\/[^"']+/, relPath);
    }

    if (fullMatch !== `import ${matches[0].split('from')[0].replace('import ','').trim()} from "${relPath}"` &&
        fullMatch !== `import ${matches[0].split('from')[0].replace('import ','').trim()} from '${relPath}'`) {
      
      const toReplace = `from "${'./pages/' + importPath}"`;
      const toReplaceQuote = `from './pages/${importPath}'`;
      replacements.push({
        old: fullMatch,
        new: fullMatch.replace(`"./pages/${importPath}"`, `"${relPath}"`).replace(`'./pages/${importPath}'`, `'${relPath}'`)
      });
    }
  } else {
    console.log("Could not find file for:", importPath);
  }
}

let modifiedAppTsx = appTsx;
replacements.forEach(r => {
  modifiedAppTsx = modifiedAppTsx.replace(r.old, r.new);
});

fs.writeFileSync(appTsxPath, modifiedAppTsx);
console.log("Done fixing imports.");
