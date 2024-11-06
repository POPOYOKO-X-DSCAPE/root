import type { anyToken } from "./tokens";

export type anySingleToken = {
	type: tokenTypes;
	description: string;
	reason: string;
};

export type tokenTypes = "color" | "layout" | "app";

export interface colorToken extends anySingleToken {
	type: "color";
	value: string;
}
export interface layoutToken extends anySingleToken {
	type: "layout";
	value: {
		display: "flex";
		direction: "row" | "column";
	};
}

export interface appToken extends anySingleToken {
	type: "app";
	value: anyToken;
}
