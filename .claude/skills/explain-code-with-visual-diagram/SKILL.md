---
name: explain-code-with-visual-diagram
description: Explains code with a visual diagram plus explanations. Use whenever the user asks how code works, about architecture, data flow, how a function/component/module works, or "forklar koden", "hvordan fungerer", "arkitektur", "hva gjør denne funksjonen".
---

When explaining code, always include a visual diagram:

1. Read the relevant code first (files, functions, imports) so the diagram reflects the real code, not guesses.
2. Pick the diagram type that fits the question:
   - Architecture / how modules connect → box diagram of layers and dependencies
   - How a function works → flowchart of steps, branches and return values
   - Request / data flow → sequence diagram (who calls whom, in order)
   - Data model → tables and relations
3. Draw the diagram as ASCII art in a code block so it renders in the terminal:
   - Boxes: `┌─┐ │ └─┘`, arrows: `→ ↓ ←` or `──▶`
   - Label every box with the real file or function name (e.g. `src/lib/products.ts`)
   - Number the steps (①②③ or 1. 2. 3.) when order matters
   - Keep it under ~80 characters wide
4. Under the diagram, explain each numbered step or box in a short bullet, with `file_path:line_number` references.
5. End with a short summary (1–2 sentences) of the main idea.

Answer in the same language as the user's question.
