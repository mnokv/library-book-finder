# UML Diagrams - Library Book Finder

**Group 10 - CSC 1405**

Team: Nada Omar Alotaibi, Ashwaq Eid Al-Atawi, Fai Mofareh Alshmlani, Esra Naser Al-Fadlil, Nawal Mohammed Al-Yami

---

## 1. Use Case Diagram

The use case diagram shows what different types of users can do in the system.

**Students can:**
- Register and log in to their account
- Search for books by title, author, or category
- View detailed information about books
- Request books they want to borrow
- View their active requests and request status
- Cancel pending requests

**Admins can:**
- Do everything students can do
- Add new books to the catalog
- Edit existing book information
- Delete books from the catalog
- View all borrow requests from all students
- Approve or reject borrow requests
- Mark books as returned when students bring them back

**System provides:**
- Authentication and authorization
- Search functionality
- Request management
- Book catalog management

---

## 2. Class Diagram

The system has three main classes that represent the core data:

**User Class**
- id: integer (unique identifier)
- openId: string (OAuth identifier, unique)
- name: string (user's full name)
- email: string (user's email address)
- role: enum (either "admin" or "user")
- createdAt: timestamp (when account was created)
- updatedAt: timestamp (when account was last updated)
- lastSignedIn: timestamp (when user last logged in)

**Book Class**
- id: integer (unique identifier)
- title: string (book title)
- author: string (author name)
- category: string (book category like "Fiction", "Science", etc.)
- description: string (book summary)
- isbn: string (ISBN number, unique)
- totalCopies: integer (how many copies the library has)
- availableCopies: integer (how many copies are currently available)
- createdAt: timestamp (when added to catalog)
- updatedAt: timestamp (when last modified)

**BorrowRequest Class**
- id: integer (unique identifier)
- userId: integer (which user made the request)
- bookId: integer (which book is being requested)
- status: enum (one of: "pending", "approved", "rejected", "returned")
- requestDate: timestamp (when the request was made)
- approvalDate: timestamp (when admin approved it, null if not approved)
- returnDate: timestamp (when book was returned, null if not returned)
- createdAt: timestamp (when record was created)
- updatedAt: timestamp (when record was last updated)

**Relationships:**
- One User can have many BorrowRequests (one-to-many)
- One Book can have many BorrowRequests (one-to-many)
- Each BorrowRequest connects one User to one Book (many-to-one from both sides)

---

## 3. Entity Relationship Diagram

```
┌─────────────────────┐
│      users          │
├─────────────────────┤
│ id (PK)             │
│ openId (UNIQUE)     │
│ name                │
│ email               │
│ role                │
│ createdAt           │
│ updatedAt           │
│ lastSignedIn        │
└─────────────────────┘
         │
         │ 1
         │
         ├──────────────────────┐
         │                      │
         │ many                 │ many
         │                      │
┌─────────────────────────────────────────────┐
│      borrowRequests                         │
├─────────────────────────────────────────────┤
│ id (PK)                                     │
│ userId (FK → users.id)                      │
│ bookId (FK → books.id)                      │
│ status                                      │
│ requestDate                                 │
│ approvalDate                                │
│ returnDate                                  │
│ createdAt                                   │
│ updatedAt                                   │
└─────────────────────────────────────────────┘
         │
         │ many
         │
         │ 1
         │
┌─────────────────────┐
│      books          │
├─────────────────────┤
│ id (PK)             │
│ title               │
│ author              │
│ category            │
│ description         │
│ isbn (UNIQUE)       │
│ totalCopies         │
│ availableCopies     │
│ createdAt           │
│ updatedAt           │
└─────────────────────┘
```

**Key Relationships:**
- users → borrowRequests: One user can have many requests
- books → borrowRequests: One book can have many requests
- borrowRequests connects users and books

**Constraints:**
- userId must reference an existing user
- bookId must reference an existing book
- openId in users table must be unique
- isbn in books table must be unique

---

## 4. Sequence Diagram: Student Requesting a Book

```
Student          Frontend         Backend        Database
   │                │                │               │
   │─ Click Book ──>│                │               │
   │                │─ Get Details ─>│               │
   │                │                │─ Query Book ─>│
   │                │                │<─ Book Data ──│
   │                │<─ Book Details─│               │
   │<─ Show Page ───│                │               │
   │                │                │               │
   │─ Click Request>│                │               │
   │                │─ Create Request>               │
   │                │                │─ Insert ────>│
   │                │                │<─ Success ───│
   │                │<─ Success ─────│               │
   │<─ Confirmation─│                │               │
   │                │                │               │
   │─ Go to Dashboard               │               │
   │                │─ Get Requests ─>               │
   │                │                │─ Query ─────>│
   │                │                │<─ Requests ──│
   │                │<─ Requests ────│               │
   │<─ Show Requests│                │               │
```

---

## 5. Sequence Diagram: Admin Approving a Request

```
Admin            Frontend         Backend        Database
   │                │                │               │
   │─ Go to Admin ──>│                │               │
   │                │─ Get Requests ─>               │
   │                │                │─ Query ─────>│
   │                │                │<─ Requests ──│
   │                │<─ Show List ───│               │
   │<─ Show Requests│                │               │
   │                │                │               │
   │─ Click Approve>│                │               │
   │                │─ Update Status>                │
   │                │                │─ Update ────>│
   │                │                │<─ Success ───│
   │                │<─ Confirmation─│               │
   │<─ Status Changed                │               │
   │                │                │               │
```

---

## 6. State Diagram: Borrow Request Lifecycle

```
                    ┌─────────────┐
                    │   Created   │
                    └──────┬──────┘
                           │
                           │ (Admin reviews)
                           ▼
                    ┌─────────────┐
                    │   Pending   │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        ┌──────────┐            ┌──────────┐
        │ Approved │            │ Rejected │
        └────┬─────┘            └──────────┘
             │
             │ (Student returns book)
             ▼
        ┌──────────┐
        │ Returned │
        └──────────┘
```

**State Descriptions:**
- **Created:** Request just made, waiting for admin review
- **Pending:** Request submitted and visible to admin
- **Approved:** Admin approved the request, student can pick up book
- **Rejected:** Admin rejected the request, book not available
- **Returned:** Student returned the book, request complete

---

## 7. Activity Diagram: Book Search Flow

```
                    ┌─────────────┐
                    │   Start     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Enter Search│
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Submit Query│
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Search Books│
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        ┌──────────┐            ┌──────────┐
        │  Results │            │ No Match │
        │  Found   │            │  Found   │
        └────┬─────┘            └────┬─────┘
             │                       │
             ▼                       ▼
        ┌──────────┐            ┌──────────┐
        │  Display │            │  Display │
        │  Results │            │ No Results
        └────┬─────┘            └────┬─────┘
             │                       │
             └───────────┬───────────┘
                         │
                         ▼
                    ┌─────────────┐
                    │   End       │
                    └─────────────┘
```

---

## 8. Component Diagram

```
┌────────────────────────────────────────┐
│         User Interface Layer           │
├────────────────────────────────────────┤
│  Home │ Catalog │ Dashboard │ Admin   │
└────────────────────┬───────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│      Business Logic Layer (tRPC)       │
├────────────────────────────────────────┤
│  Books Router │ Requests Router │ Auth │
└────────────────────┬───────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│       Data Access Layer (Drizzle)      │
├────────────────────────────────────────┤
│  Book Queries │ Request Queries │ User │
└────────────────────┬───────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│         Database Layer (MySQL)         │
├────────────────────────────────────────┤
│  users │ books │ borrowRequests tables │
└────────────────────────────────────────┘
```

This diagram shows how the application is organized into layers. Each layer has a specific responsibility and communicates with the layer below it.
