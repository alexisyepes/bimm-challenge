import { tools } from "./tools.js";

export const validator = {
	validateTypes: (): { isValid: boolean; errorLog: string } => {
		console.log("Checking TypeScript types...");

		const result = tools.runShellCommand("npm run typecheck");

		if (result.success) {
			return { isValid: true, errorLog: "" };
		} else {
			return { isValid: false, errorLog: result.output };
		}
	},

	validateTests: (): { isValid: boolean; errorLog: string } => {
		console.log("Running unit tests...");

		const result = tools.runShellCommand("npm run test");

		return {
			isValid: result.success,
			errorLog: result.output,
		};
	},
};
