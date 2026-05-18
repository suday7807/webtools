# WebTools Agent Instructions

## Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Run ESLint
npm run typecheck  # Run TypeScript type check
```

## Adding a New Tool
The tool system requires 3 steps:

1. **Add config** in `lib/tools/config.ts` - defines metadata, category, SEO keywords, icons
2. **Create component** in `components/tools/tools/` - the actual tool UI
3. **Register** in `components/tools/tool-interface.tsx` - import and add to switch statement

Tool types:
- `frontend`: runs entirely in browser (PDF converters, text processors)
- `backend`: uses API routes (AI tools)

## Important Patterns
- Path alias `@/*` maps to project root (configured in `tsconfig.json`)
- Dynamic tool pages at `/tools/[slug]` use `app/tools/[slug]/page.tsx`
- ToolInterface component in `components/tools/tool-interface.tsx` handles routing to specific tools (export name: `ToolInterface`)

## Known Issues
- Some type warnings exist for `img` elements (not critical for build)
- No tests configured (the project doesn't have a test suite)

## AI Tools
- AI tools use a fallback name generator (no OpenAI API key required for demo)
- Backend tools require API routes in `app/api/[...]/route.ts`

## Tool Configuration
Tool icons are mapped in `lib/tools/config.ts`:
```typescript
const iconMap = { FileImage, Files, FileCode, Sparkles, Mail, ... }
```