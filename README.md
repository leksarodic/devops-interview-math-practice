# DevOps Interview Math Practice Platform

A complete, no-auth math practice app for infrastructure / AWS / operations interview prep.

## What it includes

- Next.js + TypeScript web app
- Tailwind CSS v4 styling setup
- 112 local questions across 16 topics
- Multiple choice and numeric answer support
- Topic filtering + mixed practice
- Configurable number of questions per session
- Instant answer feedback with explanations
- Progress bar + session timer
- End-of-quiz summary (score + weak topics)
- Full result history for multiple quiz attempts
- Review mistakes mode (stored in browser)
- Study mode (browse all questions and answers)
- Static question library and per-question SEO pages (`/questions/:id`)
- Optional per-question comments via Giscus
- Footer with Privacy Policy and Terms of Use pages
- Favicon + web manifest + robots.txt + sitemap.xml support
- localStorage tracking for mistakes/history/last result
- Dockerfile and docker-compose for production-style runs

## Architecture (brief)

- Framework: Next.js App Router, client-side quiz logic
- Data layer: static local file [`data/questions.ts`](./data/questions.ts)
- Domain utilities:
  - [`lib/types.ts`](./lib/types.ts): shared types
  - [`lib/topics.ts`](./lib/topics.ts): topic labels and keys
  - [`lib/quiz.ts`](./lib/quiz.ts): shuffling, session build, answer validation
  - [`lib/storage.ts`](./lib/storage.ts): localStorage persistence
- Pages:
  - [`app/page.tsx`](./app/page.tsx): landing
  - [`app/practice/page.tsx`](./app/practice/page.tsx): topic + session setup
  - [`app/quiz/page.tsx`](./app/quiz/page.tsx): quiz runtime
  - [`app/results/page.tsx`](./app/results/page.tsx): session summary
  - [`app/review/page.tsx`](./app/review/page.tsx): mistakes review
  - [`app/study/page.tsx`](./app/study/page.tsx): study mode
  - [`app/questions/page.tsx`](./app/questions/page.tsx): SEO question hub
  - [`app/questions/[id]/page.tsx`](./app/questions/[id]/page.tsx): static per-question page

No external APIs, no DB, and no authentication are used.

## Run locally

Prerequisites: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production local run:

```bash
npm run build
npm run start
```

Optional production env:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Optional comments (Giscus):

```bash
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=...
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=...
```

## Docker

Build image:

```bash
docker build -t math-practice .
```

Run container:

```bash
docker run -p 3000:3000 math-practice
```

Or with compose:

```bash
docker compose up --build
```

## How to add more questions

1. Open [`data/questions.ts`](./data/questions.ts).
2. Add a new question object to the `QUESTIONS` array with required fields:
   - `id`
   - `topic`
   - `difficulty`
   - `question`
   - `answerType`
   - `options` (for multiple choice)
   - `correctAnswer`
   - `explanation`
   - `tolerance` (optional for numeric answers)
3. Keep `id` unique (for example `q113`, `q114`, ...).
4. Rebuild and run tests:

```bash
npm run build
```

## Project structure

```text
app/
  page.tsx
  practice/page.tsx
  quiz/page.tsx
  results/page.tsx
  review/page.tsx
  study/page.tsx
  layout.tsx
  globals.css
data/
  questions.ts
lib/
  quiz.ts
  storage.ts
  topics.ts
  types.ts
Dockerfile
docker-compose.yml
.dockerignore
README.md
```

## Future improvement checklist

- [ ] Add per-topic and per-difficulty analytics charts
- [ ] Add optional timed question mode (per-question countdown)
- [ ] Add import/export for local progress backup
- [ ] Add unit tests for answer validation and session generation
- [ ] Add optional PWA/offline install support
