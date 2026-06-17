const fs = require('fs');
let html = fs.readFileSync('C:\\Users\\HP\\Desktop\\Main Research\\Research Proposal\\LR Matrix\\index.html', 'utf8');

const yFuncMatch = html.match(/function Y\(\)\{.*?\}/);
if (yFuncMatch) {
  const safeYFunc = yFuncMatch[0].replace('function Y(){', 'function Y(){ try { ').replace(/\}$/, ' } catch(e) { console.warn("PRISMA elements missing", e); } }');
  html = html.replace(yFuncMatch[0], safeYFunc);
  console.log('Patched Y()');
} else {
  console.log('Y() not found');
}

// Update the event listener array hook:
const listenerRegex = /\["prisma-identified"[^\]]+\]\.forEach\(r=>\{document\.getElementById\(r\)\.addEventListener\([^)]+\)\}\)/;
const listenerMatch = html.match(listenerRegex);
if (listenerMatch) {
  const safeListener = listenerMatch[0].replace('document.getElementById(r).addEventListener', 'const el = document.getElementById(r); if(el) el.addEventListener');
  html = html.replace(listenerMatch[0], safeListener);
  console.log('Patched listener');
} else {
  console.log('Listener not found');
  
  // Try another regex in case there's an extra parenthesis or something
  const altRegex = /\["prisma-identified"[^\]]+\]\.forEach\(r=>\{.*?\)\}\)/g;
  const match2 = html.match(altRegex);
  if (match2) {
      console.log('Found with alt regex:', match2[0].substring(0, 50));
      const safeListener = match2[0].replace('document.getElementById(r).addEventListener', 'const el = document.getElementById(r); if(el) el.addEventListener');
      html = html.replace(match2[0], safeListener);
      console.log('Patched listener with alt');
  }
}

fs.writeFileSync('C:\\Users\\HP\\Desktop\\Main Research\\Research Proposal\\LR Matrix\\index.html', html);
