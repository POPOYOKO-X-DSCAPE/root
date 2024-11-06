import { Button, Header } from "@popoyoko/ui-kit";
import { AppContext, AppContextProvider } from "./contexts/app";
import { useContext, useState } from "react";
import type { appToken } from "../../packages/tokens/src/types/singleTokens";

function App() {
	const context = useContext(AppContext);

	const [tokens, setTokens] = useState<appToken | undefined>(undefined);

	console.log(context);

	return (
		<AppContextProvider>
			<Header>
				<h1>Admin {tokens?.description}</h1>
			</Header>
			{tokens ? (
				<div>{tokens.description}</div>
			) : (
				<>
					no tokens for now
					<Button
						action={() =>
							setTokens({
								type: "app",
								value: {
									app: {
										type: "color",
										value: "#fff",
										description: "test",
										reason: "test",
									},
								},
								description: "Mon app",
								reason: "La raison pour laquelle mon app existe",
							})
						}
					>
						Create tokens
					</Button>
				</>
			)}
		</AppContextProvider>
	);
}

export default App;
