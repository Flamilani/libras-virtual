const { version } = require('./package.json');
const fs = require('fs');
const path = './src/environments/version.ts';

const date = new Date();
const buildDate = date.toLocaleString('pt-BR');

const content = `
export const appVersion = '${version}';
export const buildDate = '${buildDate}';
`;

fs.writeFileSync(path, content, { encoding: 'utf8' });
console.log(`✔️ Gerado ${path} com versão ${version} e data ${buildDate}`);
