import OpenAI from "openai";
import { tools } from "./tools.js";
import {
	CODER_SYSTEM_PROMPT,
	FIXER_SYSTEM_PROMPT,
} from "../prompts/coder-prompt.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const coder = {
	generateCode: async (taskDescription: string, filePath: string) => {
		console.log(`\nGenerating code for: ${filePath}...`);

		const typesContext = tools.readFile("src/types.ts");

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{ role: "system", content: CODER_SYSTEM_PROMPT },
				{
					role: "user",
					content: `Task: ${taskDescription}\nTarget File: ${filePath}\n\nContext (types.ts):\n${typesContext}\n\nWrite the complete code for this file.`,
				},
			],
		});

		const code = response.choices[0].message.content || "";

		const cleanCode = code.replace(/```typescript|```tsx|```/g, "").trim();

		tools.writeFile(filePath, cleanCode);

		console.log(`File ${filePath} written successfully.`);
		return cleanCode;
	},

	fixCode: async (filePath: string, errorMessage: string) => {
		console.log(`\n🔧 Attempting to fix: ${filePath}...`);

		const brokenCode = tools.readFile(filePath);

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{ role: "system", content: FIXER_SYSTEM_PROMPT },
				{
					role: "user",
					content: `File: ${filePath}\n\nBroken Code:\n${brokenCode}\n\nError Message:\n${errorMessage}\n\nPlease fix the error and return the full corrected code.`,
				},
			],
			response_format: { type: "text" },
		});

		const fixedCode = response.choices[0].message.content || "";
		const cleanCode = fixedCode.replace(/```typescript|```tsx|```/g, "").trim();

		tools.writeFile(filePath, cleanCode);

		return cleanCode;
	},
};
