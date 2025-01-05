import { getOrganisation } from "../hooks";

const headers = {
	"Access-Control-Allow-Origin": "*",
	"Content-Type": "application/json",
};

export const Api = () => {
	Bun.serve({
		port: 8080,

		fetch(req) {
			const url = new URL(req.url);
			if (url.pathname === "/") {
				const organisation = getOrganisation();

				if (organisation !== null) {
					console.log(organisation);

					return new Response(organisation.toString(), {
						headers,
					});
				}
				return new Response("No organisation found.", {
					status: 404,
				});
			}
			return new Response("404!");
		},
	});
};
