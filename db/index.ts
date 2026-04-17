import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// We provide a dummy mock URL so build doesn't crash if DB is not wired up yet
const sql = neon(process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db');
export const db = drizzle(sql, { schema });
