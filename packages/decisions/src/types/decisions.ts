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
	history: Decision[];
	owner?: string;
}

export interface ImplementedDecision extends Decision {
	variables: Variable[];
	pullRequestUrl?: string;
	status: "pending" | "approved" | "rejected";
}
