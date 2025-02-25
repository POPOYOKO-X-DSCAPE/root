import { compareSync, hashSync } from "bcryptjs";
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

	db.query(`CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL
	);`).run();
};

export const deleteUsers = async (users: string[] | "*") => {
	if (users === "*") {
		await db.query("DELETE FROM users").run();
	} else {
		for (let i = 0; i < users.length; i++) {
			await db.query(`DELETE FROM users WHERE name = '${users[i]}';`).run();
		}
	}
};

export const listUsers = async () => {
	const query = await db.query("SELECT * FROM users;");
	console.log(query.values());

	return query.values();
};

export const createUser = async (name: string, password: string) => {
	const hashedPassword = hashSync(password, 10);

	await db
		.query(
			`INSERT INTO users (name, password) VALUES ('${name}', '${hashedPassword}');`,
		)
		.run();
};

export const loginUser = async (name: string, password: string) => {
	const user = (await db
		.query(`SELECT * FROM users WHERE name = '${name}';`)
		.get()) as { password?: string };

	if (user.password && compareSync(password, user.password)) {
		return true;
	}
	return false;
};

export const verifyUserExistance = async (username: string) => {
	const query = await db.query("SELECT * FROM users WHERE name = $username");
	return query.get();
};
