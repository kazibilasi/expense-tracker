import { pgTable, varchar, integer } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
  id: integer('id').primaryKey(),   // Use integer for primary key
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(),
  icon: varchar('icon'),
  createdBy: varchar('createdBy').notNull()
});
