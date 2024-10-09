import { execSync } from "node:child_process";
import { argv } from "node:process";
import { blue } from "kolorist";
import { CLI } from "./cli";

export const Start = () => {
	console.log(blue("Starting script execution..."));

	const cleanFlag = argv.includes("--clean-start");

	if (cleanFlag) {
		try {
			execSync("bun run clean");
		} catch (error) {
			console.error(`Error running 'bun run clean':`, error);
		}
	}

	try {
		execSync("bun i", { stdio: "inherit" });
	} catch (error) {
		console.error(`Error running 'bun i':`, error);
	}

	CLI();
};
