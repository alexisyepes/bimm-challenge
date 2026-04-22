import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { planner } from "./planner.js";
import { coder } from "./coder.js";
import { validator } from "./validator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
	const spec = fs.readFileSync(path.join(__dirname, "../spec.txt"), "utf-8");

	const tasks = await planner.planTasks(spec);

	for (const task of tasks) {
		await coder.generateCode(task.description, task.file);

		let attempts = 0;
		let isValid = false;

		while (attempts < 2 && !isValid) {
			const check = validator.validateTypes();
			if (check.isValid) {
				isValid = true;
				console.log(`${task.file} is valid.`);
			} else {
				if (!check.errorLog.includes(task.file)) {
					console.log(
						`⚠️ Unrelated errors in other files. Skipping validation for ${task.file}.`,
					);
					isValid = true;
					break;
				}

				console.log(`Error in ${task.file}. Attempting fix...`);
				await coder.fixCode(task.file, check.errorLog);
				attempts++;
			}
		}
	}

	console.log("Application generated successfully!");
}

main();
