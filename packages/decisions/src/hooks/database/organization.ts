import { db } from "../database";

export const createOrganization = (organization: string) => {
	db.query(`
        INSERT INTO organizations (name, timestamp, description, owner, parent_id)
        VALUES (
            '${organization}', 
            '${Date.now()}', 
            'Test', 
            'LouiFi', 
            NULL
        );
    `).run();
};

export const getOrganization = (organization: string) => {
	db.query(`SELECT * FROM organizations WHERE name='${organization}'`).values();
};

export const getOrganizations = () => {
	return db.query("SELECT * FROM organizations").all();
};

export const deleteOrganization = (organizationId: number) => {
	db.query(`DELETE FROM organizations WHERE id='${organizationId}'`).run();
};
