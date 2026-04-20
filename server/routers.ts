import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  books: router({
    list: publicProcedure.query(async () => {
      console.log("[LOG] Fetching all books");
      return db.getAllBooks();
    }),

    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        console.log(`[LOG] Searching books with query: ${input.query}`);
        return db.searchBooks(input.query);
      }),

    detail: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        console.log(`[LOG] Fetching book details for ID: ${input.id}`);
        return db.getBookById(input.id);
      }),

    add: protectedProcedure
      .input(z.object({
        title: z.string().min(1, "Title is required"),
        author: z.string().min(1, "Author is required"),
        category: z.string().min(1, "Category is required"),
        description: z.string().optional(),
        isbn: z.string().optional(),
        totalCopies: z.number().min(1, "Must have at least 1 copy"),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can add books" });
        }
        console.log(`[LOG] Admin ${ctx.user.id} adding book: ${input.title}`);
        return db.addBook(input.title, input.author, input.category, input.description || "", input.isbn || "", input.totalCopies);
      }),

    edit: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1, "Title is required"),
        author: z.string().min(1, "Author is required"),
        category: z.string().min(1, "Category is required"),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can edit books" });
        }
        console.log(`[LOG] Admin ${ctx.user.id} editing book ID: ${input.id}`);
        return db.updateBook(input.id, input.title, input.author, input.category, input.description || "");
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can delete books" });
        }
        console.log(`[LOG] Admin ${ctx.user.id} deleting book ID: ${input.id}`);
        return db.deleteBook(input.id);
      }),
  }),

  requests: router({
    create: protectedProcedure
      .input(z.object({ bookId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        console.log(`[LOG] User ${ctx.user?.id} requesting book ID: ${input.bookId}`);
        const book = await db.getBookById(input.bookId);
        if (!book) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Book not found" });
        }
        if (book.availableCopies <= 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No copies available" });
        }
        return db.createBorrowRequest(ctx.user!.id, input.bookId);
      }),

    userRequests: protectedProcedure.query(async ({ ctx }) => {
      console.log(`[LOG] Fetching requests for user ${ctx.user?.id}`);
      return db.getUserBorrowRequests(ctx.user!.id);
    }),

    allRequests: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can view all requests" });
      }
      console.log(`[LOG] Admin ${ctx.user.id} viewing all requests`);
      return db.getAllBorrowRequests();
    }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "approved", "returned", "rejected"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can update request status" });
        }
        console.log(`[LOG] Admin ${ctx.user.id} updating request ${input.id} to ${input.status}`);
        return db.updateBorrowRequestStatus(input.id, input.status);
      }),
  }),
});

export type AppRouter = typeof appRouter;
