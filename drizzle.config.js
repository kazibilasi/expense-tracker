import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://kb:wpBJZHsc7M4L@ep-dark-bar-a5fte3st.us-east-2.aws.neon.tech/expenses-tracker?sslmode=require',
  },
});