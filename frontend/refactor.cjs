const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function processFile(filePath) {
  let originalContent = fs.readFileSync(filePath, 'utf8');
  let content = originalContent;

  // 1. Match wrapper <div> containing h1 and optionally p
  content = content.replace(/<div(?:[^>]*?)>\s*<h1(?:[^>]*?)className=["']page-title["'](?:[^>]*?)>(?:<[A-Za-z0-9]+[^>]*?\/>\s*)?([^<]+)<\/h1>\s*(?:<p(?:[^>]*?)className=["']page-subtitle["'](?:[^>]*?)>([^<]+)<\/p>\s*)?<\/div>/gs, (match, title, subtitle) => {
    let t = title.trim();
    let s = subtitle ? subtitle.trim() : null;
    const titleAttr = t.startsWith('{') && t.endsWith('}') ? `title=${t}` : `title="${t}"`;
    const subtitleAttr = s ? (s.startsWith('{') && s.endsWith('}') ? ` subtitle=${s}` : ` subtitle="${s}"`) : '';
    return `<PageTitle ${titleAttr}${subtitleAttr} />`;
  });

  // 2. Match standalone h1s
  content = content.replace(/<h1(?:[^>]*?)className=["']page-title["'](?:[^>]*?)>(?:<[A-Za-z0-9]+[^>]*?\/>\s*)?([^<]+)<\/h1>/gs, (match, title) => {
    let t = title.trim();
    const titleAttr = t.startsWith('{') && t.endsWith('}') ? `title=${t}` : `title="${t}"`;
    return `<PageTitle ${titleAttr} />`;
  });

  if (content !== originalContent) {
    // Add import statement if not exists
    if (!content.includes('import PageTitle')) {
      // Find depth to get to src folder
      const depth = filePath.split(path.sep).length - path.resolve('c:/Users/Ash/OneDrive/Desktop/MINE-HR/frontend/src/pages').split(path.sep).length;
      const prefix = depth === 0 ? '../' : '../'.repeat(depth + 1);
      const importStr = `import PageTitle from "${prefix}components/PageTitle";\n`;
      
      // insert after last import
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex + 1) + importStr + content.slice(nextLineIndex + 1);
      } else {
        content = importStr + content;
      }
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

const pagesDir = path.resolve('c:/Users/Ash/OneDrive/Desktop/MINE-HR/frontend/src/pages');
walkDir(pagesDir, (filePath) => {
  if (filePath.endsWith('.tsx')) {
    processFile(filePath);
  }
});
