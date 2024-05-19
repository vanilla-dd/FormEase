import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { neon } from '@neondatabase/serverless';
const sql = neon(env.AUTH_DRIZZLE_URL);
export const db = drizzle(sql, { schema });
