# User Stories - Library Book Finder

## Group 10 Project - CSC 1405

Team Members:
- Nada Omar Alotaibi (431001389)
- Ashwaq Eid Al-Atawi (431006908)
- Fai Mofareh Alshmlani (441001934)
- Esra Naser Al-Fadlil (441006275)
- Nawal Mohammed Al-Yami (431007547)

---

## Essential Features

1. **As a student, I want to register and log into the system so I can access my personal account and manage my book requests.**
   - The system should allow students to create accounts and log in securely. Once logged in, students should be able to access their dashboard and manage their requests. Sessions should persist so students stay logged in across visits.

2. **As a student, I want to search for books by title, author, or category so I can find what I'm looking for quickly.**
   - The search feature should work across all three fields. When I type a search term, results should appear immediately. If I don't search for anything, I should see all available books.

3. **As a student, I want to see detailed information about a book including how many copies are available so I can decide if I want to request it.**
   - Each book should have a detail page showing the title, author, category, description, and availability. I should be able to see at a glance if the book is available or if all copies are currently borrowed.

4. **As a student, I want to request a book so I can borrow it from the library.**
   - When I find a book I want, I should be able to click a request button. The system should confirm my request and show me a success message. My request should appear in my dashboard right away.

5. **As a student, I want to see all my book requests and their current status so I can track what I've requested.**
   - My dashboard should show all my requests with clear status labels. I should be able to see whether each request is pending, approved, returned, or rejected. The book titles should be displayed so I know exactly which books I've requested.

6. **As an admin, I want to add new books to the catalog so the library collection stays current.**
   - The admin panel should have a form where I can enter book details like title, author, category, ISBN, and how many copies we have. Once I submit the form, the book should appear in the catalog immediately.

7. **As an admin, I want to see all pending borrow requests so I can manage them.**
   - The admin requests page should show me all pending requests. I should be able to see which book is being requested and which student requested it. This helps me prioritize and manage the requests.

8. **As an admin, I want to approve or reject borrow requests so I can manage book distribution.**
   - For each pending request, I should have buttons to approve or reject it. When I approve a request, the student should see the status change in their dashboard. When I reject a request, the student should know the book isn't available right now.

## Important Features

9. **As an admin, I want to edit book information so I can correct or update details when needed.**
   - I should be able to click an edit button on any book and update its information like title, author, or category. The changes should be saved and visible throughout the system.

10. **As a student, I want to cancel my pending requests if I change my mind about borrowing a book.**
    - If I have a pending request, I should see a cancel button next to it. When I click cancel, my request should be removed and I should be able to request a different book instead.

11. **As an admin, I want to delete books from the catalog so outdated or damaged books are removed.**
    - I should be able to click a delete button on any book. The system should ask me to confirm before deleting. Once deleted, the book should no longer appear in the catalog or search results.

12. **As an admin, I want to mark books as returned so the availability count updates correctly.**
    - When a student returns a book, I should be able to mark the request as returned. This should increase the available copy count so other students can request it.

## Nice to Have Features

13. **As a student, I want to see exactly how many copies of each book are available so I know if I should request it now.**
    - The catalog and detail pages should show something like "3 of 5 copies available" so I know the availability status at a glance.

14. **As an admin, I want to see a history of all requests so I can track borrowing patterns and usage.**
    - The system should keep records of all requests (past and present) so I can see which books are most popular and when books are typically returned.

15. **As a user, I want to see clear error messages when something goes wrong so I understand what happened.**
    - If I try to do something invalid (like search with no results or request a book with no copies), the system should tell me clearly what the problem is and what I can do about it.
