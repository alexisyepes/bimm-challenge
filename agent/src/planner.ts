import OpenAI from "openai";
import { PLANNER_SYSTEM_PROMPT } from "../prompts/planner-prompt.js";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const planner = {
	planTasks: async (spec: string) => {
		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{ role: "system", content: PLANNER_SYSTEM_PROMPT }, // Usas el prompt separado
				{ role: "user", content: `Esta es la especificación: ${spec}` },
			],
			response_format: { type: "json_object" },
		});

		const content = response.choices[0].message.content || "{}";
		return JSON.parse(content).tasks;
	},
};
