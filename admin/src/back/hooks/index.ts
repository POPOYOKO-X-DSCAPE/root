import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { writeFileSync, readFileSync } from "node:fs";

import type { Organisation } from "../../../../packages/decisions/types";

const organisationDirName = "../organisation.json";

export const getOrganisation = (): string | null => {
	const organisationFilePath = resolve(__dirname, organisationDirName);

	if (!existsSync(organisationFilePath)) {
		createOrganisation("Popoyoko", "ui-kit");
	}

	const organisationFileContent = readFileSync(organisationFilePath, "utf-8");

	if (readFileSync(organisationFilePath, "utf-8")) {
		return organisationFileContent;
	}

	return null;
};

export const createOrganisation = (orgName: string, brandName: string) => {
	const decisionsFilePath = resolve(__dirname, organisationDirName);

	console.log(
		`Organisation file does not exist. Creating the ${orgName} organisation file`,
	);

	const organisation: Organisation = {
		name: orgName,
		timestamp: Date.now(),
		brands: [
			{
				name: brandName,
				timestamp: 0,
				tokens: {
					brand: { name: brandName, value: brandName },
					semantic: { name: brandName, value: brandName },
					components: { name: brandName, value: brandName },
				},
			},
		],
	};

	writeFileSync(decisionsFilePath, JSON.stringify(organisation, null, 2));

	console.log(`${orgName} organisation file created successfully.`);

	return readFileSync(decisionsFilePath, "utf-8");
};
