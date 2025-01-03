export type Variable<T = unknown> = {
	name: string;
	value: T;
	description?: string;
};

export interface Decision {
	name: string;
	timestamp: number;
	description?: string;
	parent: Decision | null;
	history: Decision[];
	owner?: string;
}

export interface ImplementedDecision extends Decision {
	variables: Variable[];
	pullRequestUrl?: string;
	status: "pending" | "approved" | "rejected";
}
