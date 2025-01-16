import { createDecisionFile, getDecisions } from "./hooks";

const CORS_HEADERS = {
	headers: {
		"Access-Control-Allow-Origin": "http://localhost:5173",
		"Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
	},
};

const server = Bun.serve({
	port: 8080,

	fetch(req) {
		const path = new URL(req.url).pathname;

		// Handle CORS preflight requests
		if (req.method === "OPTIONS") {
			const res = new Response("Departed", CORS_HEADERS);
			return res;
		}

		if (path === "/") {
			return new Response(JSON.stringify(getDecisions()), CORS_HEADERS);
		}

		if (path === "/init/") {
			if (getDecisions() === null) {
				createDecisionFile();
				return new Response(JSON.stringify(true), CORS_HEADERS);
			}
			return new Response(JSON.stringify(false), CORS_HEADERS);
		}

		if (req.method === "POST" && path === "/brand/create/") {
			const data = req.json();
			console.log("Received JSON:", data);
			return new Response(JSON.stringify(data), CORS_HEADERS);
		}

		return new Response("404!");
	},
});

console.log(`Listening on ${server.url}`);
