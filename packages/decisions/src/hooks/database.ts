import { Database } from "bun:sqlite";

export const db = new Database("decisions.sqlite");

interface Decision {
	id?: number;
	name: string;
	timestamp: number;
	description: string;
	owner: string;
	parent_id?: number | null;
}

export const createDecision = ({
	name,
	timestamp,
	description,
	owner,
	parent_id,
}: Decision) => {
	console.log(
		db
			.query(
				`INSERT INTO decisions (name, timestamp, description, owner, parent_id) VALUES ('${name}', ${timestamp}, '${description}', '${owner}', ${parent_id ?? "NULL"});`,
			)
			.run(),
	);
};

export const createDecisionTable = () => {
	db.query(`CREATE TABLE decisions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            timestamp BIGINT NOT NULL,
            description TEXT,
            owner VARCHAR(255),
            parent_id INT,
            FOREIGN KEY (parent_id) REFERENCES decisions(id) ON DELETE CASCADE
            );`).run();
};

export const isDecisionTable = () => {
	if (
		db
			.query(`SELECT name
	            FROM sqlite_master
	            WHERE type = 'table' AND name = 'decisions';
                  `)
			.get()
	) {
		return true;
	}
	return false;
};
