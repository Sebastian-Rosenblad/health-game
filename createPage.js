const fs = require('fs');
const path = require('path');

const pageName = process.argv[2];
if (!pageName) {
  console.error('Please specify the page name, like this: NewPage');
  process.exit(1);
}

const kebabName = pageName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const srcPath = path.join(__dirname, 'src');
const dirPath = path.join(srcPath, 'pages', pageName);
const tsxFilePath = path.join(dirPath, `${pageName}P.tsx`);
const scssFilePath = path.join(dirPath, `${pageName}P.scss`);
const modelFilePath = path.join(srcPath, 'models', 'pages', `${kebabName}-props.model.tsx`);

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(tsxFilePath, `import React from "react";
import '${pageName}P.scss';
import { ${pageName}PropsM } from "../../models/pages/${kebabName}-props.model";

export function ${pageName}P(props: ${pageName}PropsM): JSX.Element {
  return <div className="${kebabName}"></div>;
}
`);
fs.writeFileSync(scssFilePath, `.${kebabName} {}
`);
fs.writeFileSync(modelFilePath, `export interface ${pageName}PropsM {}
`);

console.log(`Page ${pageName} created successfully.`);
