import { Button } from "@popoyoko/ui-kit";
import { useState } from "react";

export const Login = () => {
	const [user, setUser] = useState<string>("");
	const [pass, setPass] = useState<string>("");

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser(e.target.value);
	};
	const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPass(e.target.value);
	};

	const logUser = () => {
		console.log("Logged in");
	};

	return (
		<>
			<h1>Login Page</h1>
			<input
				type="text"
				placeholder="username"
				value={user}
				onChange={(e) => handleUserChange(e)}
			/>
			<input
				type="password"
				placeholder="password"
				value={pass}
				onChange={(e) => handlePassChange(e)}
			/>
			<Button action={() => logUser()}>Login</Button>
			<p>
				Not registered? <a href="/register">Register</a>
			</p>
			<p>
				Forgot password? <a href="/forgot-password">Reset Password</a>
			</p>
		</>
	);
};
