import prompts from "prompts";
import { UseMode } from "./modes";
import { createProject } from "./modes/create-project";

export const CLI = async () => {
	const { selectedActivity } = await prompts({
		type: "select",
		name: "selectedActivity",
		message: "What is your goal?",
		choices: [
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
