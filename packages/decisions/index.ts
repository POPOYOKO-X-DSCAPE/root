import {
	createDecision,
	createDecisionTable,
	db,
	isDecisionTable,
} from "./src/hooks/database";

export type { Brand, Decision, Organisation } from "./types/index";

if (!isDecisionTable()) {
	createDecisionTable();
	createDecision({
		name: "root decision",
		timestamp: Date.now(),
		description: "this is your first decision",
		owner: "LouiFi",
		parent_id: null,
	});
}

console.log(db.query("SELECT * FROM decisions;").get());
