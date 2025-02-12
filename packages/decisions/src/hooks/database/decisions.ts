import type { Decision } from "../../../types";
import { db } from "../database";

export const listDecisions = () => {
	return db
		.query(
			`SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence';`,
		)
		.values();
};

export const createDecision = (
	{ name, timestamp, description, owner, parent_id }: Decision,
	orgName: string,
) => {
	console.log(
		db
			.query(
				`INSERT INTO ${orgName} (name, timestamp, description, owner, parent_id) VALUES ('${name}', ${timestamp}, '${description}', '${owner}', ${parent_id ?? "NULL"});`,
			)
			.run(),
	);
};
