import { format } from "date-fns";
import type { Organisation } from "../../../packages/decisions/types";
import { Button } from "@popoyoko/ui-kit";

const res = await fetch("http://localhost:8080");
const organisation = (await res.json()) as Organisation;

console.log(organisation);

const App = () => {
	const { name, description, brands, timestamp, owner } = organisation;

	if (organisation) {
		return (
			<>
				<h1>{name}</h1>
				<p>{description}</p>
				<ul>
					{brands.map((brand, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<li key={index}>{brand.name}</li>
					))}
				</ul>
				<p>Timestamp: {format(timestamp, "yyyy-MM-dd HH:mm:ss")}</p>
				<p>Owner: {owner}</p>
				<Button action={() => console.log("test")}>Edit</Button>
			</>
		);
	}
	return <h1>Loading</h1>;
};

export default App;
