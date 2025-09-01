import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:?@W?9pUHh)*j5ZY@db.nrzrxzdtbujblkgkyohv.supabase.co:5432/postgres',
  },
});
