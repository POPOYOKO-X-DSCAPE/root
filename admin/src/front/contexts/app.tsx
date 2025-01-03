import type { anyToken } from "../../../packages/decisions";
import { createContext, type ReactNode } from "react";

interface IAppContext {
	tokens: anyToken;
}

interface IAppContextProviderProps {
	children: ReactNode;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: IAppContextProviderProps) => {
	return (
		<AppContext.Provider
			value={{
				tokens: {
					app: {
						value: "#fff",
						type: "color",
						description: "Test",
						reason: "Parce que",
					},
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
