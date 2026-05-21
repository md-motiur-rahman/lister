import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/server/db/client";
import { listItem } from "@/lib/server/db/scema";

export const getListItems = async () => {
  const rows = await db
    .select()
    .from(listItem)
    .orderBy(desc(listItem.updatedAt));
  return rows;
};

export const createListItem = async (input: {
  name: string;
  category: string;
  quantity?: number;
  priority?: "low" | "medium" | "high";
}) => {
  const row = await db
    .insert(listItem)
    .values({
      id: crypto.randomUUID(),
      name: input.name,
      category: input.category,
      quantity: Math.max(input.quantity ?? 1, 1),
      priority: input.priority ?? "medium",
      purchased: false,
      updatedAt: Date.now(),
    })
    .returning();

  return row[0];
};

export const updatePurchasedStatus = async (id: string, purchased: boolean) => {
  const row = await db
    .update(listItem)
    .set({ purchased, updatedAt: Date.now() })
    .where(eq(listItem.id, id))
    .returning();

  if (row.length === 0) {
    return null;
  }

  return row[0];
};

export const updateListItemQuantity = async (id: string, quantity: number) => {
  const row = await db
    .update(listItem)
    .set({ quantity: Math.max(1, Math.floor(quantity)), updatedAt: Date.now() })
    .where(eq(listItem.id, id))
    .returning();

  if (row.length === 0) {
    return null;
  }

  return row[0];
};

export const deleteListItem = async (id: string) => {
  await db.delete(listItem).where(eq(listItem.id, id));
};

export const clearPurchasedItems = async () => {
  await db.delete(listItem).where(eq(listItem.purchased, true));
};
