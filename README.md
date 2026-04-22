# Library Book Finder

## Project Information

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

## Overview

Library Book Finder is a web-based application that streamlines book borrowing in a university library. Students can search for books, check availability, and request them for borrowing. Administrators can manage the book catalog and approve or reject borrow requests.

The system provides a clean, intuitive interface for students to discover books and track their requests, while giving library staff powerful tools to manage the catalog and process requests efficiently.

---

## Features

### Student Features
- User registration and secure login via OAuth
- Search books by title, author, or category
- View detailed book information and availability
- Request books for borrowing
- Track request status (pending, approved, returned, rejected)
- Cancel pending requests

### Admin Features
- Add new books to the catalog
- Edit existing book information
- Delete books from the catalog
- View all pending borrow requests
- Approve or reject requests
- Mark books as returned

---

## Technology Stack

### Frontend
- React 19
- Tailwind CSS 4
- tRPC for type-safe API calls
- Wouter for routing

### Backend
- Express.js
- tRPC for RPC procedures
- Drizzle ORM for database access
- Zod for input validation

### Database
- MySQL
- Drizzle migrations for schema management

---

## Project Structure

```
library_book_finder/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable UI components
│   │   ├── App.tsx           # Main app with routing
│   │   ├── index.css         # Global styles
│   │   └── main.tsx          # Entry point
│   └── public/               # Static assets
├── server/                    # Express backend
│   ├── routers.ts            # tRPC procedures
│   ├── db.ts                 # Database helpers
│   ├── books.test.ts         # Backend tests
│   └── _core/                # Framework code
├── drizzle/                   # Database schema
│   ├── schema.ts             # Table definitions
│   └── migrations/           # SQL migrations
├── COMPLETE_PROJECT_REPORT.md # Full project documentation
└── package.json              # Dependencies
```

---

## Installation and Setup

### Prerequisites
- Node.js 22+
- MySQL database
- pnpm package manager

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd library_book_finder
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create .env file with database connection and OAuth credentials
DATABASE_URL=mysql://user:password@localhost/library_db
JWT_SECRET=your_secret_key
VITE_APP_ID=your_oauth_app_id
OAUTH_SERVER_URL=https://api.manus.im
```

4. Run database migrations:
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

5. Start the development server:
```bash
pnpm dev
```

6. Open your browser and navigate to `http://localhost:3000`

---

## Usage

### For Students

1. **Register/Login:** Click the login button and authenticate via OAuth
2. **Browse Books:** Go to the Catalog page to see all available books
3. **Search:** Use the search box to find books by title, author, or category
4. **View Details:** Click on a book to see full information and availability
5. **Request Book:** Click "Request Book" to borrow an available book
6. **Track Requests:** Go to your Dashboard to see all your requests and their status
7. **Cancel Request:** Click "Cancel" on any pending request to remove it

### For Admins

1. **Add Books:** Go to Admin Panel and click "Add New Book"
2. **Edit Books:** Click the edit icon on any book to modify its information
3. **Delete Books:** Click the delete icon to remove a book from the catalog
4. **Manage Requests:** Go to Admin Requests page to see all pending requests
5. **Approve/Reject:** Click approve or reject to process requests
6. **Mark Returned:** When a student returns a book, mark the request as returned

---

## Database Schema

### Users Table
Stores user account information with OAuth integration.

### Books Table
Stores the library catalog with book details and availability tracking.

### Borrow Requests Table
Tracks all book requests with status management (pending, approved, rejected, returned).

---

## API Endpoints

All API calls go through tRPC at `/api/trpc`. Key procedures include:

**Books:**
- `listBooks()` - Get all books
- `searchBooks(query)` - Search books
- `getBook(id)` - Get single book
- `addBook(data)` - Add book (admin only)
- `editBook(id, data)` - Edit book (admin only)
- `deleteBook(id)` - Delete book (admin only)

**Requests:**
- `createRequest(bookId)` - Create request
- `getUserRequests()` - Get user's requests
- `getAllRequests()` - Get all requests (admin only)
- `updateRequestStatus(id, status)` - Update status (admin only)
- `cancelRequest(id)` - Cancel pending request

**Auth:**
- `me()` - Get current user
- `logout()` - Log out user

---

## Testing

Run the test suite:
```bash
pnpm test
```

Tests cover:
- User authentication flow
- Book search functionality
- Request creation and status updates
- Input validation
- Authorization checks

---

## Security Features

- OAuth-based authentication (no passwords stored)
- Secure session cookies (HTTP-only, secure flag)
- Role-based access control (admin vs user)
- Input validation on frontend and backend
- Parameterized database queries prevent SQL injection
- Foreign key constraints maintain data integrity

---

## Error Handling

The application provides user-friendly error messages for:
- Invalid input (missing required fields, wrong format)
- Authorization errors (non-admins trying admin operations)
- Database errors (duplicate entries, missing references)
- Server errors (with clear guidance on next steps)

---

## Logging

Important events are logged to the console:
- User login/logout
- Book management operations
- Request status changes
- Validation errors
- System errors

---

## Future Improvements

- Duplicate request prevention
- Automated notifications for request status changes
- Advanced search filters (date range, multiple categories)
- Book ratings and reviews
- Borrow history tracking
- Admin statistics dashboard
- Automated return reminders
- Student wishlist feature

---

## Challenges and Solutions

### Challenge 1: Route Parameter Handling
**Solution:** Used React's useEffect hook to properly extract route parameters.

### Challenge 2: Displaying Meaningful Information
**Solution:** Implemented book title lookup to show names instead of IDs.

### Challenge 3: Form State Management
**Solution:** Used conditional rendering for add vs edit forms.

### Challenge 4: Data Refresh After Mutations
**Solution:** Used useQuery refetch function to sync UI with backend.

---

## Team Contributions

**Nada Omar Alotaibi:** Database schema design and backend procedures

**Ashwaq Eid Al-Atawi:** Frontend pages and user interface

**Fai Mofareh Alshmlani:** Admin panel and request management

**Esra Naser Al-Fadlil:** Testing and quality assurance

**Nawal Mohammed Al-Yami:** Documentation and project coordination

---

## License

This project is submitted as coursework for CSC 1405.

---

## Contact

For questions about this project, contact Group 10 members through the university system.

---

**Project Status:** Complete and ready for submission
