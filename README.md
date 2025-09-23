This is a Next.js 13 app (App Router) with Prisma and Tailwind.

## Setup

1. Install dependencies

```bash
npm install
```

2. Environment variables

- Copy `.env.example` to `.env` and set values.
- Provide a `DATABASE_URL` using your Prisma Accelerate connection string (e.g. the Neon Accelerate URL).
- Provide a `DIRECT_URL` using the standard Neon connection string so Prisma can run migrations (`db push`, `migrate`, etc.).

3. Prisma

```bash
npx prisma generate
## If the database is empty and you want to create tables:
npx prisma db push
```

4. Run the app

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Lint with Next.js ESLint config
- `npm run lint:fix`: Auto-fix lint issues
- `npm run format`: Format with Prettier
- `npm run format:check`: Check formatting

## Notes

- `.env` is now git-ignored. If a real secret was ever committed, rotate it and remove from history.
- Large generated/build folders like `.next/` and `node_modules/` are not tracked.

## Learn More

- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
