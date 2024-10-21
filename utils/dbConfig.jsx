require('dotenv').config();

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://kb:wpBJZHsc7M4L@ep-dark-bar-a5fte3st.us-east-2.aws.neon.tech/expenses-tracker?sslmode=require');
export const db = drizzle(sql,{schema});