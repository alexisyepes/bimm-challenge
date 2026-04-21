import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "../../");

export const tools = {
	readFile: (relativePath: string): string => {
		try {
			const fullPath = path.join(PROJECT_ROOT, relativePath);
			return fs.readFileSync(fullPath, "utf-8");
		} catch (error) {
			return `Error leyendo archivo: ${relativePath}`;
		}
	},

	writeFile: (relativePath: string, content: string): void => {
		const fullPath = path.join(PROJECT_ROOT, relativePath);
		const dir = path.dirname(fullPath);

		console.log(`[File System] Trying to write in: ${fullPath}`);

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		fs.writeFileSync(fullPath, content, "utf-8");
		console.log(`[File System] Escrito: ${relativePath}`);
	},

	runShellCommand: (command: string): { success: boolean; output: string } => {
		try {
			const output = execSync(command, { cwd: PROJECT_ROOT, stdio: "pipe" });
			return { success: true, output: output.toString() };
		} catch (error: any) {
			return {
				success: false,
				output:
					error.stderr?.toString() || error.stdout?.toString() || error.message,
			};
		}
	},
};
