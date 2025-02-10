import {
	createDecision,
	createDecisionTable,
	db,
	isDecisionTable,
} from "@popoyoko/decisions/src/hooks/database";

export const getDecisions = () => {
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

	const decisions = db.query("SELECT * FROM decisions;").get();

	return decisions;
};
