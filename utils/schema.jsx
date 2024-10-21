import { integer, numeric, pgTable, varchar,} from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
  id: varchar("id").primaryKey().notNull(),
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(),
  icon: varchar('icon'),
  createdBy: varchar('createdBy').notNull()
});

export const Expenses = pgTable('expenses', {
  id: varchar('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  amount: integer('amount').notNull(),
  budgetId: varchar('budgetId').references(() => Budgets.id), // Change from integer to varchar
  createdAt: varchar('createdAt').notNull(),
});
