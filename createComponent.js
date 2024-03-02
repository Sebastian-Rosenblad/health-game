const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
if (!componentName) {
  console.error('Please specify the component name, like this: NewComponent');
  process.exit(1);
}

const kebabName = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const srcPath = path.join(__dirname, 'src');
const dirPath = path.join(srcPath, 'components', componentName);
const tsxFilePath = path.join(dirPath, `${componentName}C.tsx`);
const scssFilePath = path.join(dirPath, `${componentName}C.scss`);
const modelFilePath = path.join(srcPath, 'models', 'components', `${kebabName}-props.model.tsx`);

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(tsxFilePath, `import React from "react";
import '${componentName}C.scss';
import { ${componentName}PropsM } from "../../models/components/${kebabName}-props.model";

export function ${componentName}C(props: ${componentName}PropsM): JSX.Element {
  return <div className="${kebabName}"></div>;
}
`);
fs.writeFileSync(scssFilePath, `.${kebabName} {}
`);
fs.writeFileSync(modelFilePath, `export interface ${componentName}PropsM {}
`);

console.log(`Component ${componentName} created successfully.`);
