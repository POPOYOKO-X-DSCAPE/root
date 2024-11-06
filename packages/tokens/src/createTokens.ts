import type { anyToken } from "./types/tokens";

interface ICreateTokensArgs {
	type: "app" | "primitive";
	token: anyToken;
}

const createTokens = (): anyToken => {
	return {};
};
