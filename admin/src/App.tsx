import { Button } from "@popoyoko/ui-kit";
import "./App.scss";

function App() {
	return (
		<>
			<h1>Admin</h1>
			<Button action={() => console.log("test")}>Test</Button>
		</>
	);
}

export default App;
