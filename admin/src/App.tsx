import { Button, Header } from "@popoyoko/ui-kit";
import { AppContext, AppContextProvider } from "./contexts/app";
import { useContext, useState } from "react";
import type { anyToken } from "../../packages/tokens";

function App() {
	const context = useContext(AppContext);

	const [tokens, setTokens] = useState<anyToken | undefined>(undefined);

	console.log(context);

	return (
		<AppContextProvider>
			<Header>
				<h1>Admin</h1>
			</Header>
			{tokens ? (
				<div>{JSON.stringify(tokens)}</div>
			) : (
				<>
					no tokens for now
					<Button
						action={() =>
							setTokens({
								app: {
									type: "color",
									value: "#fff",
									description: "test",
									reason: "test",
								},
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
