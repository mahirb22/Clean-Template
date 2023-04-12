const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Set the project name and template
const projectName = process.argv[2] || "my-vite-react-ts-app";
const template = "react-ts";

console.log(`Creating a new Vite React TypeScript project: ${projectName}`);

// Execute the create-vite command to create a new Vite project
execSync(`create-vite ${projectName} --template ${template}`, {
  stdio: "inherit",
});

// Setting the project directory path
const projectDir = path.resolve(process.cwd(), projectName);

// List the files and folders to remove
const filesToRemove = [
  ".gitignore",
  "src/logo.svg",
  "src/App.css",
  "src/components/HelloWorld.module.css",
  "src/assets",
];

// Remove the files and folders listed in filesToRemove
filesToRemove.forEach((file) => {
  const filePath = path.resolve(projectDir, file);
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { recursive: true, force: true });
  }
});

// Update the content of App.tsx
const appFilePath = path.resolve(projectDir, "src/App.tsx");
const newAppContent = `

function App() {
  return (
    <div>
    Clean as f
    </div>
  );
}

export default App;
`;

// Write the new content to App.tsx
fs.writeFileSync(appFilePath, newAppContent, { encoding: "utf-8" });

// Clear the content of index.css
const indexCSSPath = path.resolve(projectDir, "src/index.css");
fs.writeFileSync(indexCSSPath, "", { encoding: "utf-8" });

// Install react and react-dom as dependencies
execSync(`cd ${projectName} && npm install react react-dom`);

// Install @types/react and @types/react-dom as development dependencies
execSync(
  `cd ${projectName} && npm install --save-dev @types/react @types/react-dom`
);
