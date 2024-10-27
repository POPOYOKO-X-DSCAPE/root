#!/usr/bin/env node
import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import prompts from "prompts";
import { blue, green, red } from "kolorist";

export const createProject = async () => {
	const { projectName } = await prompts({
		type: "text",
		name: "projectName",
		message: "Please specify the project directory:",
		initial: "my-amazing-app",
	});

	const appContent = `
  import { useState } from 'react'
  import './App.css'
  
  import { Button } from 'popoyoko-ui'
  
  function App() {
  
    return (
      <>
        <h1>${projectName}</h1>
        <Button><a href="https://github.com/Popoyoko/popoyoko-ui">Get Started !</a></Button>
      </>
    )
  }
  
  export default App
  `;

	process.chdir("projects");

	const projectPath = path.resolve(process.cwd(), projectName);

	if (fs.existsSync(projectPath)) {
		console.log(`Directory ${projectName} already exists.`);
		const { deleteOldFolder } = await prompts({
			type: "confirm",
			name: "deleteOldFolder",
			message: "Delete folder ?",
		});

		if (deleteOldFolder) {
			execSync(`rm -rf ${projectName}`, { stdio: "inherit" });
		} else {
			process.exit(1);
		}
	}

	console.log("Creating Vite app...");
	execSync(`bun create vite ${projectName} --template react-ts`, {
		stdio: "inherit",
	});

	process.chdir(projectPath);

	execSync(
		`sed -i '/"dependencies": {/a    "@popoyoko/ui-kit": "workspace:*",' package.json`,
	);

	console.log(`Installing ${blue("popoyoko-ui")}...`);
	execSync("bun i", {
		stdio: "inherit",
	});

	const appTsxPath = path.join(projectPath, "src", "App.tsx");

	fs.writeFileSync(appTsxPath, appContent);

	console.log("TODO => Migrating from eslint & Prettier to Biome...");

	const { installStorybook } = await prompts({
		type: "select",
		name: "installStorybook",
		message: "Do you want to install Storybook?",
		choices: [
			{ title: green("Yes"), value: "yes" },
			{ title: red("No"), value: "no" },
		],
		initial: 1,
	});

	if (installStorybook === "yes") {
		console.log("Installing Storybook...");
		execSync("bunx sb init --skip-install", { stdio: "inherit" });
		console.log("Storybook installed successfully.");
		console.log("To start Storybook: bunx storybook");
	}

	console.log(`Project ${projectName} created successfully!`);
	console.log("To get started:");
	console.log(`cd ${projectName}`);
	console.log("bun run dev");

	createProject().catch((error) => {
		console.error(
			"Error creating project, removing the project folder:",
			error,
		);
		execSync(`rm -rf ${projectName}`, { stdio: "inherit" });
	});
};
