import type { appToken, colorToken, layoutToken } from "./singleTokens";

export type singleToken = colorToken | layoutToken;
export type compositionToken = appToken;

export interface anyToken {
	[key: string]: singleToken | compositionToken;
}
