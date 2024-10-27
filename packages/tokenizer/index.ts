import { tokenizer } from "./src/tokenizer";

console.log(
	tokenizer({
		button: {
			value: {
				display: "flex",
				direction: "row",
			},
			type: "layout",
			description: "test",
			reason: "test",
		},
	}),
);
