import prompts from "prompts";
import { UseMode } from "./modes";
import { createProject } from "./modes/create-project";
import { execSync } from "child_process";

export const CLI = async () => {
	const { selectedActivity } = await prompts({
		type: "select",
		name: "selectedActivity",
		message: "What is your goal?",
		choices: [
			{
				title: "📈 Admin",
				value: "admin",
			},
			{
				title: "👀 Read the documentation",
				value: "documentation",
			},
			{
				title: "📈 Work on a project",
				value: "project",
			},
			{
				title: "💼 Work on a package",
				value: "package",
			},
			{
				title: "✨ Create a new project",
				value: "create-project",
			},
			{
				title: "🎥 Run the demo",
				value: "demo",
			},
		],
	});

	switch (selectedActivity) {
		case "admin":
			// execSync("bun run vite admin", {
			// 	stdio: "inherit",
			// });
			execSync(
				'concurrently "bun run admin/src/back/index.ts" "bun run vite admin"',
				{
					stdio: "inherit",
				},
			);
			break;
		case "documentation":
			console.log("Not implemented yet");
			break;
		case "project":
			UseMode("projects");
			break;
		case "package":
			UseMode("packages");
			break;
		case "demo":
			console.log("Not implemented yet");
			break;
		case "create-project":
			createProject();
			break;
	}
};
