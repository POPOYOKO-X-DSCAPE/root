import { Button } from "@popoyoko/ui-kit";
import { useState } from "react";
import { Link } from "react-router";

export const Register = () => {
	const [user, setUser] = useState<string>("");
	const [pass, setPass] = useState<string>("");
	const [confirmPass, setConfirmPass] = useState<string>("");

	const registerUser = () => {
		if (pass !== confirmPass) {
			console.log("Passwords do not match");
		} else {
			console.log("Registering user");
		}
	};

	return (
		<>
			<h1>Register Page</h1>
			<input
				type="text"
				placeholder="username"
				value={user}
				onChange={(e) => setUser(e.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				value={pass}
				onChange={(e) => setPass(e.target.value)}
			/>
			<input
				type="password"
				placeholder="confirm password"
				value={confirmPass}
				onChange={(e) => setConfirmPass(e.target.value)}
			/>
			<Button action={() => registerUser()}>Register</Button>
			<p>
				Already an accompte? <Link to="/login">Login</Link>
			</p>
		</>
	);
};
