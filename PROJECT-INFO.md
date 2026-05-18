# WebTools - Multi-Tool SaaS Platform

## Project Overview

A production-ready all-in-one tools platform where users can access various utility tools from a beautifully designed website. Built with modern tech stack and scalable architecture for future expansion.

---

## Current Status

### Working Tools (9)
| Tool | Category | Type | Status |
|------|----------|------|--------|
| Image to PDF | PDF | Frontend | ✅ Working |
| PDF Merge | PDF | Frontend | ✅ Working |
| JSON to Markdown | Markdown | Frontend | ✅ Working |
| CSV to Markdown | Markdown | Frontend | ✅ Working |
| Paste to Markdown | Markdown | Frontend | ✅ Working |
| XML to Markdown | Markdown | Frontend | ✅ Working |
| AI SaaS Name Generator | AI | Backend | ✅ Working |
| AI Chatbot Name Generator | AI | Backend | ✅ Working |
| Email Signature Generator | Utility | Frontend | ✅ Working |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui patterns
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **PDF Processing**: pdf-lib, jspdf
- **Data Processing**: papaparse
- **Notifications**: sonner
- **Theme**: next-themes (dark/light mode)

---

## Project Structure

```
webtools/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── tools/
│   │   ├── page.tsx              # Tools listing
│   │   └── [slug]/page.tsx       # Dynamic tool pages
│   ├── categories/page.tsx       # Categories
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact page
│   ├── privacy/page.tsx          # Privacy policy
│   ├── terms/page.tsx            # Terms of service
│   ├── sitemap.ts                # SEO sitemap
│   ├── robots.ts                 # SEO robots
│   └── api/
│       └── ai/name/route.ts      # AI name generator API
│
├── components/
│   ├── providers.tsx             # Theme & toast providers
│   ├── layout/
│   │   ├── navbar.tsx             # Sticky navbar with search
│   │   └── footer.tsx             # Footer with links
│   ├── home/
│   │   ├── hero.tsx               # Hero section
│   │   ├── categories.tsx        # Categories showcase
│   │   ├── featured-tools.tsx    # Featured tools
│   │   ├── benefits.tsx          # Benefits section
│   │   ├── testimonials.tsx      # Testimonials
│   │   ├── faq.tsx               # FAQ section
│   │   └── cta.tsx               # Call to action
│   └── tools/
│       ├── tool-card.tsx          # Tool card component
│       ├── tool-interface.tsx    # Tool router
│       ├── tool-faq.tsx          # Tool FAQ component
│       └── tools/
│           ├── image-to-pdf.tsx
│           ├── pdf-merge.tsx
│           ├── json-to-markdown.tsx
│           ├── csv-to-markdown.tsx
│           ├── paste-to-markdown.tsx
│           ├── xml-to-markdown.tsx
│           ├── ai-saas-name-generator.tsx
│           ├── ai-chatbot-name-generator.tsx
│           ├── email-signature-generator.tsx
│           └── coming-soon.tsx
│
├── lib/
│   ├── utils.ts                  # Utility functions
│   └── tools/
│       └── config.ts              # Tool registry & config
│
├── public/                       # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## Architecture

### Tool Registry System
Tools are configured in `lib/tools/config.ts`:
- Each tool has metadata (name, slug, category, icon, color)
- Adding new tools = add config entry + create component + register in tool-interface.tsx
- Dynamic routing via `/tools/[slug]` page

### Processing Types
1. **Frontend Tools**: Run entirely in browser (PDF, Markdown converters)
2. **Backend Tools**: Use API routes (AI name generators)

---

## Future Roadmap

### Phase 1 - Immediate
- [ ] Fix remaining type warnings (img element)
- [ ] Add more working PDF tools (PDF split, PDF to images)
- [ ] Add more Markdown converters

### Phase 2 - Backend & AI
- [ ] Integrate real OpenAI API for name generators
- [ ] FAQ generators (docs, notion, webpage to FAQ)
- [ ] Document parsers (PDF text extraction)
- [ ] AI content generation tools

### Phase 3 - User System (v2)
- [ ] Supabase authentication
- [ ] User dashboard
- [ ] Tool history/favorites
- [ ] Save & bookmark tools

### Phase 4 - Monetization (v3)
- [ ] Subscription plans (free/premium)
- [ ] API credits system
- [ ] Team accounts
- [ ] Usage analytics

### Phase 5 - Scaling
- [ ] Additional tool categories
- [ ] Plugin/extension system
- [ ] White-label options
- [ ] Enterprise features

---

## Database Schema (Future)

When adding Supabase:

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tool History
CREATE TABLE tool_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tool_id TEXT NOT NULL,
  input_data JSONB,
  output_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tool_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- API Usage
CREATE TABLE api_usage (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tool_id TEXT NOT NULL,
  credits_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  expires_at TIMESTAMP
);
```

---

## API Endpoints (Current)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/name` | POST | Generate AI names |

**Request Body:**
```json
{
  "keyword": "project management",
  "industry": "saas",
  "tool": "saas"
}
```

**Response:**
```json
{
  "names": ["ProManager", "SwiftTask", "FlowSync", ...]
}
```

---

## SEO Setup

- Dynamic metadata per tool page
- `/sitemap.xml` - auto-generated
- `/robots.txt` - configured
- OpenGraph tags
- JSON-LD structured data ready
- Semantic HTML

---

## Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

---

## Design Guidelines

- **Typography**: Inter (body), Plus Jakarta Sans (headings)
- **Colors**: Neutral backgrounds, indigo accents, dark/light themes
- **Spacing**: 8px grid system
- **Border Radius**: 8px (sm), 12px (md), 16px (lg), 24px (xl)
- **Shadows**: Subtle, layered
- **Animations**: Framer Motion for smooth transitions

---

## Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check
npm run typecheck
```

---

## Notes

- Database is optional for MVP (tools work without it)
- Auth deferred to v2
- AI uses fallback generator (needs OpenAI key for production)
- All file processing is browser-based (no server storage)
- Tools are free for personal and commercial use