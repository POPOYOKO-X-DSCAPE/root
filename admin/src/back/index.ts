import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { writeFileSync, readFileSync } from "node:fs";

import type { Decision } from "../../../packages/decisions/src/types/decisions";

const decision = () => {
	const decisionsFilePath = resolve(__dirname, "decisions.json");

	if (!existsSync(decisionsFilePath)) {
		console.log("Decisions file does not exist. Creating...");

		const initialRootDecision: Decision = {
			name: "Mon organisation",
			timestamp: 0,
			children: null,
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
	console.log(readFileSync(decisionsFilePath, "utf-8"));

	return readFileSync(decisionsFilePath, "utf-8");
};

Bun.serve({
	port: 8080,

	fetch(req) {
		const url = new URL(req.url);
		if (url.pathname === "/") {
			console.log("Decision fetched successfully.");
			return new Response(decision().toString(), {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
			});
		}
		return new Response("404!");
	},
});
