
import { $ } from "bun";

const createFolder = (folderName: string) => {
	$`mkdir ${folderName}`;
};

createFolder("mon_dossier");

// Ajoutons une fonction pour copier un fichier
const copyFile = async (src: string, dest: string) => {
	await $`cp ${src} ${dest}`;
};

// Exemple d'utilisation
copyFile("path/to/file.txt", "mon_dossier/file.txt");

// Maintenant, ajoutons une fonction pour créer une structure de dossier par défaut
const createDefaultTemplate = async () => {
	await $`mkdir mon_dossier`;
	await copyFile("default-template/README.md", "mon_dossier/README.md");
	await copyFile("default-template/index.ts", "mon_dossier/index.ts");
	// Ajoutez d'autres fichiers et dossiers selon la structure de votre template par défaut
};

// Exemple d'utilisation
createDefaultTemplate();

