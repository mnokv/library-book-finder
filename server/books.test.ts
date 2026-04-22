import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "oauth",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "oauth",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("books procedures", () => {
  it("lists all books", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    const books = await caller.books.list();
    expect(Array.isArray(books)).toBe(true);
  });

  it("searches books by query", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    const results = await caller.books.search({ query: "test" });
    expect(Array.isArray(results)).toBe(true);
  });

  it("rejects non-admin adding books", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.books.add({
        title: "Test Book",
        author: "Test Author",
        category: "Fiction",
        totalCopies: 1,
      });
      expect.fail("Should have thrown");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("rejects non-admin deleting books", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.books.delete({ id: 1 });
      expect.fail("Should have thrown");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });
});

describe("requests procedures", () => {
  it("rejects non-admin viewing all requests", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.requests.allRequests();
      expect.fail("Should have thrown");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("rejects non-admin updating request status", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.requests.updateStatus({ id: 1, status: "approved" });
      expect.fail("Should have thrown");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });
});
