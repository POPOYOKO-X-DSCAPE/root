import type { Decision } from "../../../packages/decisions/src/types/decisions";

const res = await fetch("http://localhost:8080");
const rootDecision = (await res.json()) as Decision;

console.log(rootDecision);

const App = () => {
	if (rootDecision) {
		return <h1>{rootDecision.name}</h1>;
	}
	return <h1>Loading</h1>;
};

export default App;
