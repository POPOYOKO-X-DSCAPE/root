import type { SingleToken } from "@tokens-studio/types";

export type Variable<T = unknown> = {
	name: string;
	description?: string;
	value: T;
};

export interface Decision {
	name: string;
	timestamp: number;
	description?: string;
	children: Decision | null;
	owner?: string;
}

export interface ImplementedDecision extends Decision {
	variables: Variable[];
	pullRequestUrl?: string;
	status: "pending" | "approved" | "rejected";
}

export interface Brand extends Omit<Decision, "children"> {
	tokens: {
		brand: SingleToken;
		semantic: SingleToken;
		components: SingleToken;
	};
}

export interface Organisation extends Omit<Decision, "children"> {
	brands: Brand[];
}
