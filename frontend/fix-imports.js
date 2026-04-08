const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = walk(pagesDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('../../../components/PageTitle')) {
    content = content.replace(/\.\.\/\.\.\/\.\.\/components\/PageTitle/g, '../../components/PageTitle');
    fs.writeFileSync(file, content);
    console.log(`Updated: ${file}`);
  }
});
