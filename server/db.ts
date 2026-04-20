import { eq, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, books, borrowRequests, Book, BorrowRequest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllBooks(): Promise<Book[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(books).orderBy(books.title);
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(books).where(eq(books.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function searchBooks(query: string): Promise<Book[]> {
  const db = await getDb();
  if (!db) return [];
  if (!query) return getAllBooks();
  return db.select().from(books).where(
    or(
      like(books.title, `%${query}%`),
      like(books.author, `%${query}%`),
      like(books.category, `%${query}%`)
    )
  );
}

export async function createBorrowRequest(userId: number, bookId: number): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(borrowRequests).values({
    userId,
    bookId,
    status: "pending",
  });
}

export async function getUserBorrowRequests(userId: number): Promise<BorrowRequest[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(borrowRequests).where(eq(borrowRequests.userId, userId));
}

export async function getAllBorrowRequests(): Promise<BorrowRequest[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(borrowRequests);
}

export async function updateBorrowRequestStatus(id: number, status: string): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: any = { status };
  if (status === "approved") {
    updateData.approvalDate = new Date();
  } else if (status === "returned") {
    updateData.returnDate = new Date();
  }
  return db.update(borrowRequests).set(updateData).where(eq(borrowRequests.id, id));
}

export async function addBook(title: string, author: string, category: string, description: string, isbn: string, totalCopies: number): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(books).values({
    title,
    author,
    category,
    description,
    isbn,
    totalCopies,
    availableCopies: totalCopies,
  });
}

export async function updateBook(id: number, title: string, author: string, category: string, description: string): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(books).set({ title, author, category, description }).where(eq(books.id, id));
}

export async function deleteBook(id: number): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(books).where(eq(books.id, id));
}
