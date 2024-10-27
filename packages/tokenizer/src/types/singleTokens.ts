export type anySingleToken = {
	type: tokenTypes;
	description: string;
	reason: string;
};

export type tokenTypes = "layout" | "color";

export interface layoutToken extends anySingleToken {
	type: "layout";
	value: {
		display: "flex";
		direction: "row" | "column";
	};
}

export interface colorToken extends anySingleToken {
	type: "color";
	value: string;
}
