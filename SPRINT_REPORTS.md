# Sprint Reports - Library Book Finder

## Sprint 1: Foundation and Core Features (Week 1-2)

### Planned Work
- Set up project structure and database schema
- Implement user authentication (OAuth)
- Create book management backend procedures
- Build book catalog and search functionality
- Implement borrow request system

### Completed Work
- Database schema created with users, books, and borrowRequests tables
- Database migrations generated and applied successfully
- Backend tRPC procedures implemented for:
  - Book listing, searching, and detail retrieval
  - Book CRUD operations (admin only)
  - Borrow request creation and management
- Frontend pages created:
  - Home page with landing content
  - Book Catalog with search functionality
  - Book Detail page with request button
  - User Dashboard for viewing requests

### Issues Encountered
- Initial TypeScript compilation errors in template code (resolved)
- Need to ensure proper route parameter handling in BookDetail page
- Dashboard needed enhancement to show book titles instead of just IDs

### Resolutions
- Fixed route parameter extraction using useEffect hook
- Added book title lookup in Dashboard and AdminRequests pages
- Implemented proper error handling and logging

### Metrics
- 6 backend procedures implemented
- 5 frontend pages created
- 7 vitest tests passing
- 0 critical bugs

## Sprint 2: Admin Panel and Polish (Week 3-4)

### Planned Work
- Build admin panel for book management
- Implement admin request management interface
- Add book edit functionality
- Enhance user dashboard with better information display
- Write comprehensive documentation and test cases

### Completed Work
- Admin Panel page created with:
  - Add new book form
  - Edit existing book functionality
  - Delete book with confirmation
  - List all books with details
- Admin Requests page created with:
  - View all pending requests
  - Approve/reject request functionality
  - Mark books as returned
  - Display book titles and user IDs
- User Dashboard enhanced with:
  - Book title display for each request
  - Cancel pending request functionality
  - Clear status badges (pending/approved/returned/rejected)
- Documentation completed:
  - User stories (15 stories covering all features)
  - UML diagrams (use case, class, ER)
  - Test cases (15 test cases with results)
  - Security and dependability documentation
  - Sprint reports

### Issues Encountered
- Admin edit form needed to exclude ISBN and totalCopies fields
- Dashboard refetch logic needed proper implementation
- Need to ensure consistent styling across all pages

### Resolutions
- Conditional rendering in admin form to hide copy-related fields during edit
- Used useQuery refetch function for proper state updates
- Applied consistent Tailwind utility classes throughout

### Metrics
- 2 admin pages completed
- 15 user stories documented
- 15 test cases created and verified
- 100% test pass rate
- All core features implemented and working

## Overall Project Status

### Completed Features
- User registration and login via OAuth
- Book catalog with search by title, author, category
- Book detail pages with availability information
- Borrow request system with status tracking
- User dashboard for viewing requests
- Admin panel for book management
- Admin panel for request approval/rejection
- User ability to cancel pending requests
- Comprehensive error handling and logging
- Clean, student-style UI with responsive design

### Quality Metrics
- All vitest tests passing (7/7)
- No critical bugs remaining
- Input validation on frontend and backend
- Proper error messages for all failure scenarios
- Consistent styling and user experience

### Lessons Learned
1. Starting with a clear database schema makes backend implementation faster
2. Reusable components and consistent styling improve development speed
3. Early testing catches issues before they become problems
4. User feedback on UI/UX is valuable for refinement

### Recommendations for Future Work
1. Implement duplicate request prevention
2. Add notification system for request status changes
3. Create advanced search filters (date range, availability)
4. Add book rating and review system
5. Implement automated return reminders
6. Add analytics dashboard for library statistics
