import { Database } from "bun:sqlite";

export * from "./database/decisions";
export * from "./database/organization";

export const db = new Database("decisions.sqlite");

export const reinItializeDatabase = () => {
	db.query("DROP TABLE IF EXISTS organizations").run();
	initializeDatabase();
};

export const initializeDatabase = () => {
	db.query(`CREATE TABLE IF NOT EXISTS organizations (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT UNIQUE NOT NULL,
		timestamp INTEGER NOT NULL,
		description TEXT NOT NULL,
		owner TEXT NOT NULL,
		parent_id INTEGER DEFAULT NULL
	);`).run();
};
