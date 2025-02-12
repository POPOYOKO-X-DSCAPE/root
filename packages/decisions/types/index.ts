export type Variable<T = unknown> = {
	name: string;
	description?: string;
	value: T;
};

export interface Decision {
	id: number;
	name: string;
	timestamp: number;
	description: string;
	owner: string;
	parent_id?: number | null;
}

export interface ImplementedDecision extends Decision {
	variables: Variable[];
	pullRequestUrl?: string;
	status: "pending" | "approved" | "rejected";
}

export interface Brand extends Omit<Decision, "children"> {
	projects: Decision[] | null;
}

export interface Organization extends Omit<Decision, "children"> {
	brands: Brand[] | null;
}
