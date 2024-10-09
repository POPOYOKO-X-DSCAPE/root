import { execSync } from "child_process";

export const listFolders = async (basefodler: string) => {
	try {
		const output = await execSync(`ls -d ./${basefodler}/**/`)
			.toString()
			.split("\n")
			.map((folder) => folder.trim().split("/")[4])
			.filter((folder) => folder !== undefined && folder !== "");

		console.log("output : ", output);

		return output;
	} catch (error) {
		console.error("Error listing folders:", error);
		return [];
	}
};
