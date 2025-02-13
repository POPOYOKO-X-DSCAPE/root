import { Route, Routes } from "react-router";
import { Login } from "./pages/login";
import { Organizations } from "./pages/organizations";
import { Register } from "./pages/register";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Organizations />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default App;
