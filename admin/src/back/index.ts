import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";

import type { Decision } from "../../../packages/decisions/src/types/decisions";

const decisionsFilePath = resolve(__dirname, "decisions.json");

if (!existsSync(decisionsFilePath)) {
	console.log("Decisions file does not exist. Creating...");

	const initialRootDecision: Decision = {
		name: "Mon organisation",
		timestamp: 0,
		parent: null,
		history: [],
	};

	writeFileSync(
		decisionsFilePath,
		JSON.stringify(initialRootDecision, null, 2),
	);
	console.log("Decisions file created successfully.");
} else {
	console.log("Decisions file already exists.");
}
