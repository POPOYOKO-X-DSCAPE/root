import type { Decision } from "@popoyoko/decisions";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { writeFileSync, readFileSync } from "node:fs";

const decisionsDirName = "../decisions.json";
const decisionsFilePath = resolve(__dirname, decisionsDirName);

export const getDecisions = (): string | null => {
	if (existsSync(decisionsFilePath)) {
		return readFileSync(decisionsFilePath, "utf-8");
	}
	return null;
};

export const createDecisionFile = () => {
	if (getDecisions() === null) {
		console.error("Decision file already exists. Skipping");
	}

	console.log("Creating the decisions.json file");

	const decisions: Decision = {
		name: "decisions",
		timestamp: Date.now(),
		children: null,
	};

	writeFileSync(decisionsFilePath, JSON.stringify(decisions, null, 2));

	console.info("Decisions file created successfully.");
};
