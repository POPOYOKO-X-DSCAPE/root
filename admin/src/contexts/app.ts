
import {
	createContext,	
} from "react";

import type {anyToken} from "@popoyoko/tokenizer"

interface IAppContext {
	tokens: anyToken;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider= (
	children: React.ReactNode
) => {

	return (
<div>{children}</div>
		// <AppContext.Provider value={{ appTokens }}>
		// 	{children}
		// </AppContext.Provider>
	);
};