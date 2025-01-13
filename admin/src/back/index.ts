import { getOrganisation } from "./hooks";

const CORS_HEADERS = {
	headers: {
		"Access-Control-Allow-Origin": "http://127.0.0.1:5173",
		"Access-Control-Allow-Methods": "OPTIONS, POST, PUT, DELETE",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	},
};

Bun.serve({
	port: 8080,

	async fetch(req) {
		const path = new URL(req.url).pathname;

		// Handle CORS preflight requests
		if (req.method === "OPTIONS") {
			const res = new Response("Departed", CORS_HEADERS);
			return res;
		}

		if (path === "/") {
			const organisation = getOrganisation();

			if (organisation !== null) {
				return new Response(organisation.toString(), CORS_HEADERS);
			}
			return new Response("No organisation found.", {
				status: 404,
			});
		}

		if (req.method === "POST" && path === "/brand/create") {
			const data = await req.json();
			console.log("Received JSON:", data);
			return new Response(JSON.stringify(data), CORS_HEADERS);
		}

		return new Response("404!");
	},
});
