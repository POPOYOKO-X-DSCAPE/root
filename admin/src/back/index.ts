import {
	createDecision,
	createOrganization,
	deleteOrganization,
	getOrganizations,
	initializeDatabase,
	reinItializeDatabase,
} from "@popoyoko/decisions/src/hooks/database";

const ResponseInit: ResponseInit = {
	headers: {
		"Access-Control-Allow-Origin": "http://127.0.0.1:5173",
		"Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
	},
};

initializeDatabase();

const server = Bun.serve({
	port: 8080,

	async fetch(req) {
		const path = new URL(req.url).pathname;

		// Handle CORS preflight requests
		if (req.method === "OPTIONS") {
			const res = new Response("Departed", ResponseInit);
			return res;
		}

		if (path === "/") {
			try {
				return new Response(JSON.stringify(getOrganizations()), ResponseInit);
			} catch (error) {}
		}

		if (req.method === "PUT" && path === "/reinitialize/") {
			try {
				reinItializeDatabase();
				return new Response("Database successfully reinitialized", {
					headers: ResponseInit.headers,
					status: 201,
				});
			} catch (error) {
				return new Response(
					`Unable to reinitialize database: ${error}`,
					ResponseInit,
				);
			}
		}

		if (req.method === "POST" && path === "/create-org/") {
			const data = await req.json();
			try {
				createOrganization(data.name);
				return new Response("Success", ResponseInit);
			} catch (error) {
				return new Response(`Unable to create new org: ${error}`, {
					headers: ResponseInit.headers,
					status: 400,
				});
			}
		}

		if (req.method === "POST" && path === "/create-decision/") {
			const data = await req
				.json()
				.then((data) => createDecision(data.decision, data.orgName));
			return new Response(JSON.stringify(data), ResponseInit);
		}

		if (path === "/get-decision-by-id/") {
			const data = await req
				.json()
				.then((data) => createDecision(data.id, data.orgName));
			return new Response(JSON.stringify(data), ResponseInit);
		}

		if (req.method === "DELETE" && path === "/delete-org/") {
			try {
				await req.json().then((data) => deleteOrganization(data));
				return new Response("Sucessfully deleted", ResponseInit);
			} catch (error) {
				return new Response(`Error deleting: ${error}`, ResponseInit);
			}
		}

		return new Response("404!");
	},
});

console.info(`Listening on ${server.url}`);
