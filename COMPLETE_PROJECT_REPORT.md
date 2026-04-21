# Library Book Finder - Complete Project Report

## Cover Page

**Project Title:** Library Book Finder

**Course:** CSC 1405 - Advanced Software Engineering

**Group:** Group 10

**Team Members:**
- Nada Omar Alotaibi (431001389)
- Ashwaq Eid Al-Atawi (431006908)
- Fai Mofareh Alshmlani (441001934)
- Esra Naser Al-Fadlil (441006275)
- Nawal Mohammed Al-Yami (431007547)

**Submission Date:** April 2026

---

## Table of Contents

1. Executive Summary
2. Introduction and Problem Statement
3. Project Overview and Objectives
4. User Stories and Requirements
5. System Architecture
6. UML Diagrams
7. Database Design
8. Implementation Details
9. Features and Functionality
10. Security and Dependability
11. Testing and Quality Assurance
12. Sprint Reports
13. Challenges and Solutions
14. Conclusion and Future Work

---

## 1. Executive Summary

The Library Book Finder is a web-based application designed to streamline book borrowing in a university library. The system allows students to search for books, check availability, and request them for borrowing. Administrators can manage the book catalog and approve or reject borrow requests. We built a fully functional application with a clean, student-friendly interface using React and Express.js with a MySQL database. All core features are implemented and tested. The system includes secure authentication, role-based access control, comprehensive input validation, and user-friendly error handling. This report documents the complete development process, architecture, testing, and deployment readiness.

---

## 2. Introduction and Problem Statement

### The Problem

University libraries face challenges with manual book management. Students spend time looking for books, checking availability, and waiting for requests to be processed. Library staff manage the catalog manually and process requests one by one. This creates inefficiencies and frustration for both students and staff.

### The Solution

We developed the Library Book Finder to bring all library operations together in one digital platform. Students can instantly search for books, see availability, and request them online. Admins can manage the catalog and process requests efficiently. The system eliminates paper-based processes and provides real-time information to all users.

### Project Goals

Our objectives were to create a system that is easy to use, secure, and reliable. Students should be able to find books quickly and track their requests. Admins should have tools to manage the catalog and requests efficiently. The system should validate all input, provide clear error messages, and maintain data integrity.

---

## 3. Project Overview and Objectives

### What We Built

A complete web application with the following components:

**Frontend:** React application with pages for browsing books, viewing details, requesting books, tracking requests, and managing the catalog (admin only).

**Backend:** Express.js server with tRPC procedures for all business logic including authentication, book management, and request handling.

**Database:** MySQL database storing users, books, and borrow requests with proper relationships and constraints.

### Key Objectives Met

- Students can register and log in securely using OAuth
- Students can search books by title, author, or category
- Students can view book details and request available books
- Students can track their requests and see status updates
- Students can cancel pending requests
- Admins can add, edit, and delete books
- Admins can approve, reject, or mark requests as returned
- All input is validated on frontend and backend
- Error messages are clear and user-friendly
- System logs important events for debugging

---

## 4. User Stories and Requirements

### Essential Features

**US-1: User Registration and Login**
As a student, I want to register and log into the system so I can access my personal account and manage my book requests. The system uses OAuth for secure authentication without storing passwords.

**US-2: Search Books by Title**
As a student, I want to search for books by title so I can find what I'm looking for quickly. The search works across the entire catalog and returns matching results instantly.

**US-3: Search Books by Author**
As a student, I want to search for books by author name so I can find all books by a specific author. The search is case-insensitive and returns all matching results.

**US-4: Search Books by Category**
As a student, I want to search for books by category so I can browse books in my area of interest. Categories include Fiction, Science, History, and others.

**US-5: View Book Details**
As a student, I want to see detailed information about a book including how many copies are available so I can decide if I want to request it. The detail page shows title, author, category, description, and availability.

**US-6: Request a Book**
As a student, I want to request a book so I can borrow it from the library. When I find a book I want, I click the request button and my request appears in my dashboard.

**US-7: View Request Status**
As a student, I want to see all my book requests and their current status so I can track what I've requested. My dashboard shows all requests with clear status labels (pending, approved, returned, rejected).

**US-8: Cancel Pending Request**
As a student, I want to cancel my pending requests if I change my mind about borrowing a book. I can click cancel on any pending request to remove it.

**US-9: Admin Add Book**
As an admin, I want to add new books to the catalog so the library collection stays current. The admin panel has a form where I enter book details and submit.

**US-10: Admin Edit Book**
As an admin, I want to edit book information so I can correct or update details when needed. I can click edit on any book and update its information.

**US-11: Admin Delete Book**
As an admin, I want to delete books from the catalog so outdated or damaged books are removed. I can click delete and confirm to remove a book.

**US-12: Admin View Requests**
As an admin, I want to see all pending borrow requests so I can manage them. The admin requests page shows all pending requests with book titles and student IDs.

**US-13: Admin Approve Request**
As an admin, I want to approve borrow requests so students can pick up books. I click approve and the student sees the status change in their dashboard.

**US-14: Admin Reject Request**
As an admin, I want to reject borrow requests if the book isn't available. I click reject and the student sees the status change.

**US-15: Admin Mark as Returned**
As an admin, I want to mark books as returned so the availability count updates correctly. When a student returns a book, I mark the request as returned.

---

## 5. System Architecture

### Architecture Overview

The application follows a three-tier client-server architecture with clear separation of concerns:

**Presentation Tier (Frontend):** React application running in the browser. Pages are organized by feature (catalog, dashboard, admin panel). All user interactions happen here.

**Business Logic Tier (Backend):** Express.js server running tRPC procedures. All business logic lives here including validation, authorization, and data processing. The server communicates with the database and returns results to the frontend.

**Data Tier (Database):** MySQL database storing all persistent data. Tables include users, books, and borrow requests with proper relationships and constraints.

### Technology Stack

**Frontend:**
- React 19 for UI components
- Tailwind CSS for styling
- tRPC for type-safe server communication
- Wouter for routing

**Backend:**
- Express.js for HTTP server
- tRPC for RPC procedures
- Drizzle ORM for database access
- Zod for input validation

**Database:**
- MySQL for data persistence
- Drizzle migrations for schema management

### Communication Flow

1. User interacts with frontend
2. Frontend calls tRPC procedure on backend
3. Backend validates input using Zod schemas
4. Backend checks user authorization
5. Backend executes business logic
6. Backend queries database using Drizzle ORM
7. Backend returns result to frontend
8. Frontend updates UI with result

---

## 6. UML Diagrams

### Use Case Diagram

**Students can:**
- Register and log in
- Search for books
- View book details
- Request books
- View their requests
- Cancel pending requests

**Admins can:**
- Do everything students can do
- Add books to catalog
- Edit book information
- Delete books
- View all requests
- Approve requests
- Reject requests
- Mark books as returned

### Class Diagram

**User Class**
- id: integer
- openId: string (unique)
- name: string
- email: string
- role: enum (admin | user)
- createdAt: timestamp
- updatedAt: timestamp
- lastSignedIn: timestamp

**Book Class**
- id: integer
- title: string
- author: string
- category: string
- description: string
- isbn: string (unique)
- totalCopies: integer
- availableCopies: integer
- createdAt: timestamp
- updatedAt: timestamp

**BorrowRequest Class**
- id: integer
- userId: integer (foreign key)
- bookId: integer (foreign key)
- status: enum (pending | approved | rejected | returned)
- requestDate: timestamp
- approvalDate: timestamp
- returnDate: timestamp
- createdAt: timestamp
- updatedAt: timestamp

### Entity Relationship Diagram

```
users (1) ----< (many) borrowRequests
books (1) ----< (many) borrowRequests
```

**Relationships:**
- One user can have many borrow requests
- One book can have many borrow requests
- Each borrow request connects one user to one book

---

## 7. Database Design

### Schema Overview

The database consists of three main tables:

**users table**
- Stores user account information
- openId is unique per user (from OAuth)
- role determines if user is admin or regular user
- Timestamps track account creation and last login

**books table**
- Stores book catalog information
- isbn is unique per book
- availableCopies tracks how many copies are currently available
- Timestamps track when book was added and last modified

**borrowRequests table**
- Stores all borrow requests
- userId and bookId are foreign keys
- status tracks request lifecycle (pending → approved/rejected → returned)
- Timestamps track request dates and approval dates

### Data Integrity

- Foreign key constraints ensure referential integrity
- Unique constraints prevent duplicate entries
- NOT NULL constraints ensure required fields are always present
- Enum types restrict status values to valid options
- Timestamps are automatically managed by database

---

## 8. Implementation Details

### Backend Procedures

**Book Procedures:**
- `listBooks()` - Get all books with pagination
- `searchBooks(query)` - Search books by title, author, or category
- `getBook(id)` - Get single book details
- `addBook(data)` - Add new book (admin only)
- `editBook(id, data)` - Edit book details (admin only)
- `deleteBook(id)` - Delete book (admin only)

**Request Procedures:**
- `createRequest(bookId)` - Create borrow request
- `getUserRequests()` - Get user's requests
- `getAllRequests()` - Get all requests (admin only)
- `updateRequestStatus(id, status)` - Update request status (admin only)
- `cancelRequest(id)` - Cancel pending request (user only)

**Auth Procedures:**
- `me()` - Get current user info
- `logout()` - Log out user

### Frontend Pages

**Home.tsx** - Landing page with project overview and navigation

**Catalog.tsx** - Book catalog with search functionality and book list

**BookDetail.tsx** - Single book detail page with request button

**Dashboard.tsx** - User dashboard showing their requests with status

**AdminPanel.tsx** - Admin page for managing books (add, edit, delete)

**AdminRequests.tsx** - Admin page for managing borrow requests

### Input Validation

All inputs are validated using Zod schemas:

```typescript
// Book schema
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  isbn: z.string().min(1, "ISBN is required"),
  totalCopies: z.number().int().positive("Copies must be positive")
});

// Search schema
const searchSchema = z.object({
  query: z.string().optional()
});
```

---

## 9. Features and Functionality

### Student Features

**Book Discovery**
- Browse complete catalog of books
- Search by title, author, or category
- View detailed book information including availability
- See how many copies are available

**Book Requests**
- Request available books with one click
- Receive confirmation of request
- Track request status in personal dashboard
- Cancel pending requests if needed

**Request Tracking**
- View all requests in one place
- See clear status labels (pending, approved, returned, rejected)
- Know which book each request is for
- See request dates and approval dates

### Admin Features

**Catalog Management**
- Add new books with full details
- Edit existing book information
- Delete books from catalog
- View complete book list

**Request Management**
- View all pending requests
- See which book is requested and by whom
- Approve requests to allow borrowing
- Reject requests if book unavailable
- Mark books as returned when students bring them back

**Authorization**
- Only admins can access admin panel
- Only admins can manage books and requests
- Regular users can only see their own requests
- System enforces role-based access control

---

## 10. Security and Dependability

### Security Features

**Authentication**
- OAuth-based login (no passwords stored)
- Secure session cookies (HTTP-only, secure flag)
- Session expiration and re-authentication

**Authorization**
- Role-based access control (admin vs user)
- Backend checks user role before sensitive operations
- Frontend hides admin features from non-admins

**Input Validation**
- Frontend validation for immediate feedback
- Backend validation before database operations
- Zod schemas define exact data formats
- Prevents SQL injection and data corruption

**Database Security**
- Parameterized queries prevent SQL injection
- Foreign key constraints maintain referential integrity
- Unique constraints prevent duplicates
- Proper data types and constraints

### Dependability Features

**Error Handling**
- User-friendly error messages
- Clear explanation of what went wrong
- Suggestions for how to fix problems
- No technical details exposed to users

**Data Validation**
- Required fields must be filled
- Data types must match expectations
- Values must be in valid ranges
- Invalid data is rejected with clear messages

**Logging**
- User login/logout events logged
- Book management operations logged
- Request status changes logged
- Errors logged with stack traces

**Data Consistency**
- Timestamps automatically managed
- Foreign key constraints enforced
- Availability counts updated correctly
- Request status transitions validated

---

## 11. Testing and Quality Assurance

### Test Cases

| Test ID | Description | Status |
|---------|-------------|--------|
| TC-001 | User registration and login | Pass |
| TC-002 | Search books by title | Pass |
| TC-003 | Search books by author | Pass |
| TC-004 | View book details | Pass |
| TC-005 | Request a book | Pass |
| TC-006 | View request status | Pass |
| TC-007 | Admin add book | Pass |
| TC-008 | Admin edit book | Pass |
| TC-009 | Admin delete book | Pass |
| TC-010 | Admin approve request | Pass |
| TC-011 | Admin reject request | Pass |
| TC-012 | Admin mark as returned | Pass |
| TC-013 | User cancel pending request | Pass |
| TC-014 | Book not available | Pass |
| TC-015 | Input validation | Pass |

**Test Summary:** All 15 test cases passed successfully. The system works as expected for all core features.

### Automated Testing

We wrote Vitest tests for backend procedures:

- Test user authorization (non-admins can't add books)
- Test book search functionality
- Test request creation and status updates
- Test input validation
- Test error handling

All automated tests pass successfully.

### Code Quality

- Clean, readable code with clear variable names
- Consistent styling throughout
- Proper error handling and logging
- Type safety with TypeScript
- No critical bugs or security issues

---

## 12. Sprint Reports

### Sprint 1: Foundation and Core Features (Week 1-2)

**Planned Work:**
- Set up project structure and database
- Implement user authentication
- Create book management backend
- Build book catalog and search
- Implement borrow request system

**Completed Work:**
- Database schema created with users, books, borrowRequests tables
- 6 backend tRPC procedures implemented
- 5 frontend pages created
- 7 automated tests passing
- All core features working

**Issues Encountered:**
- TypeScript compilation errors in template code
- Dashboard needed book title lookup
- Route parameter handling required careful implementation

**Resolutions:**
- Debugged TypeScript errors
- Added book title fetching
- Used useEffect hook properly for route params

**Metrics:**
- 6 backend procedures
- 5 frontend pages
- 7 tests passing
- 0 critical bugs

### Sprint 2: Admin Panel and Polish (Week 3-4)

**Planned Work:**
- Build admin panel for book management
- Implement admin request management
- Add book edit functionality
- Enhance user dashboard
- Write comprehensive documentation

**Completed Work:**
- Admin panel with add/edit/delete books
- Admin requests page with approve/reject/mark returned
- Enhanced dashboard with book titles and cancel option
- 15 user stories documented
- UML diagrams created
- 15 test cases documented
- Security and dependability documentation
- Sprint reports and final report

**Issues Encountered:**
- Edit form needed conditional rendering
- Dashboard refresh logic needed proper implementation
- Styling consistency across pages

**Resolutions:**
- Used conditional rendering for edit form
- Used useQuery refetch function
- Applied consistent Tailwind classes

**Metrics:**
- 2 admin pages completed
- 15 user stories documented
- 15 test cases created
- 100% test pass rate
- All core features implemented

### Overall Project Status

**Completed Features:**
- User registration and login via OAuth
- Book catalog with search by title, author, category
- Book detail pages with availability
- Borrow request system with status tracking
- User dashboard for viewing requests
- Admin panel for book management
- Admin panel for request approval
- User ability to cancel requests
- Comprehensive error handling
- Clean, student-style UI

**Quality Metrics:**
- All automated tests passing
- No critical bugs
- Input validation on frontend and backend
- Clear error messages
- Consistent styling

**Lessons Learned:**
- Clear database design makes implementation faster
- Early testing catches problems before they grow
- Consistent styling improves user experience
- Documentation is as important as code

---

## 13. Challenges and Solutions

### Challenge 1: Route Parameter Handling

**Problem:** The BookDetail page wasn't reading the book ID from the URL correctly, causing the page to fail to load.

**Solution:** We used React's useEffect hook to extract the route parameter when the component mounts, rather than trying to access it during render. This ensures the parameter is available when we need it.

### Challenge 2: Displaying Meaningful Information

**Problem:** The dashboard and admin pages were showing book IDs instead of book titles, making them hard to understand.

**Solution:** We fetched all books and created a lookup function to match request book IDs with actual book titles. This made the interface much more user-friendly.

### Challenge 3: Form State Management

**Problem:** The admin edit form needed to work differently than the add form (some fields shouldn't be editable).

**Solution:** We used conditional rendering to show different fields depending on whether we're adding a new book or editing an existing one.

### Challenge 4: Data Refresh After Mutations

**Problem:** When users cancelled requests, the dashboard didn't update immediately.

**Solution:** We used the useQuery refetch function to refresh the data after a mutation completes, ensuring the UI stays in sync with the backend.

---

## 14. Conclusion and Future Work

### What We Accomplished

We successfully built a complete, functional library book borrowing system. Students can search for books, request them, and track their requests. Admins can manage the catalog and process requests. The system is secure, validates all input, and provides clear feedback to users.

The application demonstrates proper software engineering practices including clear architecture, comprehensive testing, security considerations, and user-friendly design. The code is clean and well-organized, making it easy to maintain and improve.

### Key Achievements

- Fully functional book borrowing system
- Clean, student-style user interface
- Comprehensive documentation and testing
- Secure authentication and authorization
- Proper error handling and logging
- All core features implemented and working

### Future Improvements

If we continue developing this system, we could add:

1. **Duplicate Request Prevention:** Prevent students from requesting the same book twice if they already have a pending request.

2. **Automated Notifications:** Send students email or in-app alerts when their request status changes (approved, rejected, or returned).

3. **Advanced Search Filters:** Allow students to filter books by publication date, book condition, or multiple categories at once.

4. **Book Ratings and Reviews:** Let students rate and review books they've borrowed to help other students choose.

5. **Borrow History:** Show students a history of all books they've borrowed and when they returned them.

6. **Admin Statistics:** Create a dashboard showing which books are most popular, average borrow duration, and overdue tracking.

7. **Automated Return Reminders:** Send reminders to students when their borrowed books are due back.

8. **Wishlist Feature:** Let students create a wishlist of books they want to read.

### Team Reflection

Working on this project as a team was a valuable learning experience. We divided work between frontend and backend but helped each other when stuck. We learned the importance of clear planning, good communication, and testing. When we had a clear plan at the start of each sprint, we could execute efficiently. We also learned that documentation and testing are just as important as writing code.

### Final Thoughts

The Library Book Finder is a solid foundation for a real library management system. The architecture is clean and extensible, making it easy to add new features. The code is well-tested and documented. The system is ready for deployment and can handle the core use cases of book discovery, requesting, and admin management.

This project gave us hands-on experience with full-stack web development. We worked with databases, backend logic, and frontend interfaces. We learned about security, testing, and how to build applications that are both functional and user-friendly. We're proud of what we built and confident it meets all the project requirements.

---

## Appendix: File Structure

```
library_book_finder/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Catalog.tsx
│   │   │   ├── BookDetail.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── AdminRequests.tsx
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── public/
├── server/
│   ├── routers.ts
│   ├── db.ts
│   ├── books.test.ts
│   └── _core/
├── drizzle/
│   ├── schema.ts
│   └── migrations/
├── package.json
├── tsconfig.json
└── Documentation/
    ├── COMPLETE_PROJECT_REPORT.md
    ├── USER_STORIES.md
    ├── UML_DIAGRAMS.md
    ├── TEST_CASES.md
    ├── SECURITY_DEPENDABILITY.md
    ├── SPRINT_REPORTS.md
    └── FINAL_REPORT.md
```

---

## End of Report

**Submitted by:** Group 10
**Date:** April 2026
**Status:** Complete and Ready for Submission
