import {bigint, pgTable, integer, text, boolean} from "drizzle-orm/pg-core";

export const listItem = pgTable("list_item", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    quantity: integer("quantity").notNull().default(1),
    purchased: boolean("purchased").notNull().default(false),
    priority: text("priority").notNull().default("medium"),
    updatedAt: bigint("updated_at", { mode: "number" }).notNull()
})