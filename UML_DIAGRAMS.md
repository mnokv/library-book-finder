# UML Diagrams - Library Book Finder

## 1. Use Case Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Library System                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐                  ┌──────────────┐        │
│  │   Student    │                  │    Admin     │        │
│  └──────┬───────┘                  └──────┬───────┘        │
│         │                                 │                │
│         ├─ Register/Login                 ├─ Add Book      │
│         ├─ Search Books                   ├─ Edit Book     │
│         ├─ View Book Details              ├─ Delete Book   │
│         ├─ Request Book                   ├─ View Requests │
│         ├─ View My Requests               ├─ Approve Req   │
│         └─ Cancel Request                 ├─ Reject Req   │
│                                           └─ Mark Returned │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 2. Class Diagram

```
┌──────────────────────────────┐
│          User                │
├──────────────────────────────┤
│ - id: int                    │
│ - openId: string             │
│ - name: string               │
│ - email: string              │
│ - role: enum (user/admin)    │
│ - createdAt: timestamp       │
├──────────────────────────────┤
│ + login()                    │
│ + logout()                   │
│ + getRequests()              │
└──────────────────────────────┘
         │
         │ creates
         ▼
┌──────────────────────────────┐
│      BorrowRequest           │
├──────────────────────────────┤
│ - id: int                    │
│ - userId: int (FK)           │
│ - bookId: int (FK)           │
│ - status: enum               │
│ - requestDate: timestamp     │
│ - approvalDate: timestamp    │
│ - returnDate: timestamp      │
├──────────────────────────────┤
│ + create()                   │
│ + updateStatus()             │
│ + cancel()                   │
└──────────────────────────────┘
         │
         │ references
         ▼
┌──────────────────────────────┐
│         Book                 │
├──────────────────────────────┤
│ - id: int                    │
│ - title: string              │
│ - author: string             │
│ - category: string           │
│ - description: text          │
│ - isbn: string               │
│ - totalCopies: int           │
│ - availableCopies: int       │
│ - createdAt: timestamp       │
├──────────────────────────────┤
│ + search()                   │
│ + getDetails()               │
│ + updateAvailability()       │
└──────────────────────────────┘
```

## 3. Entity Relationship Diagram (ER)

```
┌─────────────────────┐
│      users          │
├─────────────────────┤
│ PK id               │
│    openId (UNIQUE)  │
│    name             │
│    email            │
│    role             │
│    createdAt        │
│    updatedAt        │
└─────────────────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────────┐
│  borrowRequests     │
├─────────────────────┤
│ PK id               │
│ FK userId           │
│ FK bookId           │
│    status           │
│    requestDate      │
│    approvalDate     │
│    returnDate       │
│    createdAt        │
│    updatedAt        │
└─────────────────────┘
         │
         │ N:1
         │
         ▼
┌─────────────────────┐
│      books          │
├─────────────────────┤
│ PK id               │
│    title            │
│    author           │
│    category         │
│    description      │
│    isbn (UNIQUE)    │
│    totalCopies      │
│    availableCopies  │
│    createdAt        │
│    updatedAt        │
└─────────────────────┘
```

## Diagram Explanations

**Use Case Diagram:** Shows the main actors (Student and Admin) and their interactions with the system. Students can search, view, and request books, while admins manage the catalog and approve requests.

**Class Diagram:** Defines the three main entities and their relationships. Users create BorrowRequests for Books. Each class has attributes and methods representing core functionality.

**ER Diagram:** Illustrates the database relationships. One user can have many borrow requests (1:N), and many borrow requests reference many books (N:1). The isbn and openId fields are unique constraints.
