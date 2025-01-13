import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { writeFileSync, readFileSync } from "node:fs";

import type { Organisation } from "../../../../packages/decisions/types";

const organisationDirName = "../organisation.json";
const organisationFilePath = resolve(__dirname, organisationDirName);
const organisationFileContent = () => {
	if (!existsSync(organisationFilePath)) {
		createOrganisation("Popoyoko");
	}
	return readFileSync(organisationFilePath, "utf-8");
};

export const getOrganisation = (): string | null => {
	if (readFileSync(organisationFilePath, "utf-8")) {
		return organisationFileContent();
	}

	return null;
};

export const createOrganisation = (orgName: string) => {
	console.log(
		`Organisation file does not exist. Creating the ${orgName} organisation file`,
	);

	const organisation: Organisation = {
		name: orgName,
		timestamp: Date.now(),
		brands: null,
	};

	writeFileSync(organisationFilePath, JSON.stringify(organisation, null, 2));

	console.log(`${orgName} organisation file created successfully.`);

	return readFileSync(organisationFilePath, "utf-8");
};
