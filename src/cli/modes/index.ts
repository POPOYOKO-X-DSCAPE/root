import prompts from "prompts";
import { listFolders } from "../common";
import { execSync } from "child_process";

export const UseMode = async (mode: "projects" | "packages") => {
	const output = (await listFolders(`./${mode}/`)).map((folderName) => ({
		title: folderName,
		value: folderName,
	}));

	const { workFolder } = await prompts({
		type: "select",
		name: "workFolder",
		message: `Select your ${mode.slice(0, -1)}`,
		choices: output,
	});

	execSync(`bun run ./${mode}/${workFolder}/index.ts`, { stdio: "inherit" });
};
