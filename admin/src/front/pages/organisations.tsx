import type { Decision } from "@popoyoko/decisions/types";
import { Button, Card } from "@popoyoko/ui-kit";
import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "http://localhost:8080";

export const Organizations = () => {
	const [organizations, setOrganizations] = useState<Decision[] | undefined>(
		undefined,
	);
	const [newOrgName, setNewOrgName] = useState<string>("");
	const [currentOrg, setCurrentOrg] = useState<Decision | undefined>(undefined);

	const reinit = () => {
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

	const getOrganizations = () => {
		axios
			.get(`${baseURL}/`)
			.then((response) => {
				setOrganizations(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const createOrganization = (orgName: string) => {
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

	const createDecision = () => {
		axios
			.post(`${baseURL}/create-decision/`, {
				orgId: currentOrg?.id,
				decision: {
					name: "test",
					timestamp: Date.now(),
					description: "test",
					owner: "LouiFi",
					parent_id: null,
				},
			})
			.then((response) => {
				if (response.status === 201) {
					getOrganizations();
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const deleteOrganization = (orgId: number) => {
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getOrganizations();
	}, []);

	if (currentOrg?.id) {
		return (
			<>
				<Button action={() => reinit()}>REINIT</Button>
				<h1>{currentOrg.name}</h1>
				<Button action={() => createDecision()}>Create new decision</Button>
				<Button action={() => setCurrentOrg(undefined)}>
					Close organization
				</Button>
				<Button action={() => deleteOrganization(currentOrg.id)}>
					Delete organization
				</Button>
			</>
		);
	}

	if (organizations === undefined) {
		return <h1>Loading</h1>;
	}
	return (
		<>
			<Button action={() => reinit()}>REINIT</Button>
			{organizations && organizations.length > 0 ? (
				organizations?.map((organization, index: number) => (
					<Card
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						onClick={() => setCurrentOrg(organization)}
					>
						{organization.name}
					</Card>
				))
			) : (
				<>
					<p>No organization found</p>
				</>
			)}

			<Card>
				<input
					type="text"
					placeholder="Organization name"
					value={newOrgName}
					onChange={(e) => setNewOrgName(e.target.value)}
				/>
				<Button action={() => createOrganization(newOrgName)}>
					Add organization
				</Button>
			</Card>
		</>
	);
};
