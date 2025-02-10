export type Variable<T = unknown> = {
	name: string;
	description?: string;
	value: T;
};

export interface Decision {
	name: string;
	timestamp: number;
	description?: string;
	children: Decision[] | null;
	owner?: string;
}

export interface ImplementedDecision extends Decision {
	variables: Variable[];
	pullRequestUrl?: string;
	status: "pending" | "approved" | "rejected";
}

export interface Brand extends Omit<Decision, "children"> {
	projects: Decision[] | null;
}

export interface Organisation extends Omit<Decision, "children"> {
	brands: Brand[] | null;
}
