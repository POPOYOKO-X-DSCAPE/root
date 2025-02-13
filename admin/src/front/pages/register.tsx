import { Button } from "@popoyoko/ui-kit";
import { useState } from "react";

export const Register = () => {
	const [user, setUser] = useState<string>("");
	const [pass, setPass] = useState<string>("");
	const [confirmPass, setConfirmPass] = useState<string>("");

	const logUser = () => {
		console.log("Logged in");
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
