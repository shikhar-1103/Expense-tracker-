# Full-Stack Expense Tracker

This is a minimal full-stack Expense Tracker built for the Fenmo assignment.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Database**: SQLite
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR (Client-side)

## Key Design Decisions
- **Monorepo Architecture**: I chose Next.js App Router to co-locate the backend API routes and the frontend React components in a single, easily deployable repository. This eliminates CORS issues and simplifies the build process.
- **SQLite + Prisma**: SQLite was chosen as the persistence layer because it runs locally without any extra installation steps (like Postgres or MySQL). Prisma provides a robust, type-safe interface to the database.
- **Idempotency**: To handle the requirement that "the API should behave correctly even if the client retries the same request," the frontend generates a UUID (`idempotencyKey`) on form submission. The backend checks this key before creating an expense, ensuring no duplicate charges occur during network retries or accidental double-clicks.
- **Money Handling**: Amounts are stored as integers (cents) in the database to prevent floating-point inaccuracies when calculating sums.

## Trade-offs and What I Intentionally Did Not Do
- **Automated Tests**: Given the timebox, I focused entirely on building a robust idempotency system, a clean UI, and a strongly-typed schema rather than setting up Jest/Vitest.
- **Pagination**: The `GET /expenses` endpoint currently returns all expenses matching the filter. In a real-world scenario with thousands of expenses, cursor-based pagination would be necessary.
- **Authentication**: Authentication and per-user data isolation were intentionally omitted to keep the app minimal.

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the database and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
