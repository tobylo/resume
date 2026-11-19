@AGENTS.md

## Claude Code and T3

AGENTS.md, imported above, holds the rules for every harness. These add what is specific to Claude Code and T3.

- **Runs in T3.** Sessions usually run as T3 Code threads on the dev box. When you need the owner, ask with `AskUserQuestion`; T3 pushes it to the owner's phone. Your final message reaches the owner the same way.
- **Paper.** Use the Paper MCP tools for anything visual: read the guide (`get_guide`, topic `paper-mcp-instructions`) once per session, take values with `get_jsx`, `get_computed_styles` and `get_tokens` (`format: "tailwind"` for the theme), and use screenshots only to check results. When a design change is agreed, make it in Paper first and keep the "Build notes — decisions" artboard current.
- **Preview.** Check UI changes in the running app (`bun run dev`) at desktop and mobile widths, in both themes, before calling them done.
- **Attribution.** `.claude/settings.json` turns off commit and PR attribution; keep it that way.
