# BIMM Agentic Workflow: Car Inventory Challenge

This project features an Agentic Software Development Loop designed to autonomously plan, execute, and validate a React 19 application based on professional specifications.

![IMAGE](https://res.cloudinary.com/resume-builder-2025/image/upload/v1776866732/Screenshot_2026-04-22_at_10.02.09_AM_ks2ky7.png)

## Agent Architecture

The agent follows a Plan-and-Execute pattern with a Self-Correction feedback loop. It is divided into three distinct roles:

#### 1. The Architect (Planner)

- Role: Analyzes the spec.txt and the existing boilerplate (mocks).
- Process: Decomposes the high-level requirements into a sequence of atomic, file-based tasks.
- Goal: Ensures a logical build order (Types -> GraphQL -> Hooks -> Components -> App).

#### 2. The Senior Developer (Coder)

- Role: Generates and refactors TypeScript/TSX code.
- Context-Awareness: Before writing, the Coder checks the entire project structure to ensure type consistency and prop-alignment across files.
- Refactoring: Capable of modifying existing files (like App.tsx) to integrate new components while preserving the original theme.

#### 3. The Quality Assurance (Validator)

- Role: Verifies the output using real-world tools.
- Process: Executes npm run typecheck via a shell command to capture compiler errors.
- Retry Mechanism: If errors are found, the agent triggers a Fixer Mode, passing the broken code and the terminal error back to the LLM for autonomous repair.

## Technical Decisions & Constraints

1. State Management: Lifting State Up
   The agent is strictly instructed to manage shared states (searchTerm, sortBy) within App.tsx. All child components (SearchBar, SortActions, CarList) are designed as stateless functional components, receiving their data and handlers via props.

2. Data Integrity & Responsive Logic
   Data-First Alignment: The agent prioritizes the existing src/mocks/data.ts structure over the verbal specification to ensure the application doesn't crash at runtime due to mismatched schemas.

3. Responsive Images: Implemented a responsive strategy for the CarCard component, handling image switching at 640px and 1024px breakpoints as required.

## Agentic Robustness

1. Global Project Memory: The Coder uses a "Full Project Context" window. This prevents the issue where logic is often lost through processes, allowing the agent to remember exported types and interfaces from previous tasks.

2. Protected Boilerplate: A security layer in the file-system tools prevents the agent from overwriting critical infrastructure like Apollo Client configurations or Mock data.

## How to Run the Agent

### Install Dependencies:

1. Navigate to the /agent directory and run: `npm install`

2. Configure Environment:

- The agent is currently optimized for OpenAI's GPT-4o model to ensure high-fidelity code generation and strict adherence to JSON schema planning.
- Create a .env file in the /agent directory and add your key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Execute the Loop:

1. In the /agent directory run: `npm start`

### Note for Evaluators:

This repository contains both the final React application (in /src) and the autonomous agent used to build it (in /agent). You can review the functional app immediately by running npm run dev, or you can explore the agentic workflow and re-run the generation process by following the instructions in the /agent directory.

#### Evaluation Criteria

- Agent Design: Fully autonomous loop with error recovery.
- Output Quality: Functional React 19 app with filtering, sorting, and modal forms.
- Error Handling: Graceful recovery from TypeScript compilation failures via terminal feedback loops.
