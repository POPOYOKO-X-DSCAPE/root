import { format } from "date-fns";
import type { Organisation, Brand } from "../../../packages/decisions/types";
import { Button } from "@popoyoko/ui-kit";

const res = await fetch("http://localhost:8080");
const organisation = (await res.json()) as Organisation;

const createBrand = async (brand: Brand) => {
	const body = JSON.stringify(brand);
	await fetch("http://localhost:8080/brand/create", {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body,
	}).then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	});
};

const App = () => {
	const { name, description, brands, timestamp, owner } = organisation;

	if (organisation) {
		return (
			<>
				<h1>{name}</h1>
				<p>{description}</p>
				{brands && (
					<>
						<h2>Brands:</h2>
						<ul>
							{brands.map((brand, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<li key={index}>{brand.name}</li>
							))}
						</ul>
					</>
				)}
				<p>Timestamp: {format(timestamp, "yyyy-MM-dd HH:mm:ss")}</p>
				<p>Owner: {owner}</p>
				<Button action={() => console.log("test")}>Edit Organization</Button>
				<Button
					action={() =>
						createBrand({
							projects: null,
							name: "Ma marque",
							timestamp: new Date().getTime(),
						})
					}
				>
					CreateBrand
				</Button>
			</>
		);
	}
	return <h1>Loading</h1>;
};

export default App;
