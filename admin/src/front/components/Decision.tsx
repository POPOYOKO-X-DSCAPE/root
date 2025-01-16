import type { Decision } from "@popoyoko/decisions/types/";
import { Button } from "@popoyoko/ui-kit";

interface DecisionCardProps {
	decision: Decision;
}

export const DecisionCard = ({ decision }: DecisionCardProps) => {
	const { name, description, timestamp, owner, children } = decision;

	return (
		<div className="card">
			<b>{name}</b>
			<ul>
				<span>Timestamp: {timestamp}</span>
				{description && <span>{description}</span>}
				{children && (
					<ul>
						{children.map((child) => (
							// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
							<li>
								<DecisionCard decision={child} />
							</li>
						))}
					</ul>
				)}
				{owner && <span>Owner: {owner}</span>}
			</ul>
			<Button>Edit</Button>
			<Button>Add child decision</Button>
			<Button>Delete</Button>
		</div>
	);
};
