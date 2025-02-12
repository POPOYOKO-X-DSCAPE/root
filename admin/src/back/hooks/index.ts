import { db } from "@popoyoko/decisions/src/hooks/database";

export const getDecisions = () => {
	const decisions = db.query("SELECT * FROM decisions;").get();

	return decisions;
};
