import axios from "axios";

const baseURL = "http://localhost:8080";

export const useReinitializeDatabase = () => {
	axios
		.put(`${baseURL}/reinitialize/`)
		.then((response) => {
			if (response.status === 200) {
				getOrganizations();
			}
		})
		.catch((error) => {
			console.error(error);
		});
};

export const useGetOrganizations = () => {
	axios
		.get(`${baseURL}/`)
		.then((response) => {
			setOrganizations(response.data);
		})
		.catch((error) => {
			console.error(error);
		});
};

export const useCreateOrganization = (orgName: string) => {
	axios
		.post(`${baseURL}/create-org/`, { name: orgName })
		.then((response) => {
			if (response.status === 200) {
				getOrganizations();
			}
		})
		.catch((error) => {
			console.error(error.response.data);
		});
};

export const useDeleteOrganization = (orgId: number) => {
	axios
		.delete(`${baseURL}/delete-org/`, { data: orgId })
		.then((response) => {
			if (response.status === 200) {
				setCurrentOrg(undefined);
				getOrganizations();
			}
		})
		.catch((error) => {
			console.error(error);
		});
};
