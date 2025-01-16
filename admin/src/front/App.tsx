import axios from "axios";

import { Button } from "@popoyoko/ui-kit";

import { useEffect, useState } from "react";
import { DecisionCard } from "./components/Decision";
import type { Decision } from "@popoyoko/decisions";

const baseURL = "http://localhost:8080";

const App = () => {
	const [decisions, setDecisions] = useState<Decision | undefined | false>(
		undefined,
	);

	const getDecisions = () => {
		axios
			.get(`${baseURL}/`)
			.then((response) => {
				console.log("response", response.data);

				setDecisions(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const createDecisions = () => {
		axios
			.get(`${baseURL}/init/`)
			.then((response) => {
				if (response) {
					getDecisions();
				}
			})
			.catch((error) => {
				console.log("not working");
				console.error(error);
			});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getDecisions();
	}, []);

	if (decisions === false) {
		return (
			<>
				<p>Error reading decisions</p>
				<Button action={() => createDecisions()}>ReInitialize decisions</Button>
			</>
		);
	}

	if (decisions === null) {
		return (
			<>
				<p>No decisions found</p>
				<Button action={() => createDecisions()}>Initialize decisions</Button>
			</>
		);
	}

	if (decisions !== undefined) {
		return <DecisionCard decision={decisions} />;
	}

	return <h1>Loading</h1>;
};

export default App;
