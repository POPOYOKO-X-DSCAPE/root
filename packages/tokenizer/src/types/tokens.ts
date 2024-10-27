import type { colorToken, layoutToken } from "./singleTokens";

export type singleToken = colorToken | layoutToken;
export type compositionToken = singleToken[];

export interface anyToken {
	[key: string]: singleToken | compositionToken;
}
