# User Stories - Library Book Finder

## High Priority

1. **As a student, I want to register and log in to the system so that I can access my personal account and manage my book requests.**
   - Acceptance Criteria: User can create account, login with credentials, stay logged in across sessions

2. **As a student, I want to search for books by title, author, or category so that I can find the books I'm looking for quickly.**
   - Acceptance Criteria: Search works for all three fields, results display instantly, empty search shows all books

3. **As a student, I want to view detailed information about a book including availability so that I can decide if I want to request it.**
   - Acceptance Criteria: Book details page shows all info, availability status is clear, request button visible

4. **As a student, I want to request a book so that I can borrow it from the library.**
   - Acceptance Criteria: Request button works, confirmation message shown, request appears in dashboard

5. **As a student, I want to view my active book requests and their status so that I can track what I've requested.**
   - Acceptance Criteria: Dashboard shows all requests, status is clearly labeled (pending/approved/returned/rejected)

6. **As an admin, I want to add new books to the catalog so that the library collection stays up to date.**
   - Acceptance Criteria: Admin form allows adding books with all details, books appear in catalog immediately

7. **As an admin, I want to view all pending borrow requests so that I can manage them.**
   - Acceptance Criteria: Admin panel shows all requests, can see which book and which user

8. **As an admin, I want to approve or reject borrow requests so that I can manage book distribution.**
   - Acceptance Criteria: Admin can change request status, status updates reflect in user dashboard

## Medium Priority

9. **As an admin, I want to edit book information so that I can correct or update details.**
   - Acceptance Criteria: Edit form allows updating title, author, category, description

10. **As a student, I want to cancel my pending requests so that I can change my mind about borrowing a book.**
    - Acceptance Criteria: Cancel button visible for pending requests, status changes to rejected

11. **As an admin, I want to delete books from the catalog so that outdated or damaged books are removed.**
    - Acceptance Criteria: Delete option available, book removed from catalog and search results

12. **As an admin, I want to mark books as returned so that the availability count updates.**
    - Acceptance Criteria: Admin can mark approved requests as returned, availability increases

## Low Priority

13. **As a student, I want to see how many copies of each book are available so that I know if I should request it.**
    - Acceptance Criteria: Availability shown on catalog and detail pages

14. **As an admin, I want to see a history of all requests so that I can track borrowing patterns.**
    - Acceptance Criteria: All requests visible with timestamps and status history

15. **As a user, I want friendly error messages when something goes wrong so that I understand what happened.**
    - Acceptance Criteria: Clear error messages on validation failures and server errors
