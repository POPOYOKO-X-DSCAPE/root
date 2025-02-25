import { Button } from "@popoyoko/ui-kit";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import { baseURL } from "../App";

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
		axios
			.post(`${baseURL}/login/`, { user: user, password: pass })
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
				}
			})
			.catch((error) => {
				console.error(error);
			});
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
				Not registered? <Link to="/register">Register</Link>
			</p>
			<p>
				Forgot password? <Link to="/forgot-password">Reset Password</Link>
			</p>
		</>
	);
};
