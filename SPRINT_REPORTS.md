# Sprint Reports - Library Book Finder

**Group 10 - CSC 1405**

Team: Nada Omar Alotaibi, Ashwaq Eid Al-Atawi, Fai Mofareh Alshmlani, Esra Naser Al-Fadlil, Nawal Mohammed Al-Yami

---

## Sprint 1: Building the Foundation (Week 1-2)

### What We Planned

We started by setting up the project structure and database. We needed to create a database schema that would store users, books, and borrow requests. We also wanted to implement the core backend procedures for managing books and requests, and build the main frontend pages like the catalog and dashboard.

### What We Accomplished

We successfully created the database tables with proper relationships between users, books, and requests. We wrote the database migration scripts and applied them to set up the database.

On the backend, we implemented 6 tRPC procedures that handle the core functionality: listing books, searching books, getting book details, adding books (admin only), deleting books (admin only), and managing borrow requests.

For the frontend, we created 5 main pages: a home page with project overview, a book catalog with search functionality, a book detail page where students can request books, a user dashboard for viewing requests, and the beginning of an admin panel.

We also wrote automated tests using Vitest to make sure the backend procedures work correctly. All 7 tests passed without any critical issues.

### Issues We Ran Into

We had some TypeScript compilation errors in the template code that we had to debug. We also realized that the dashboard needed to show book titles instead of just book IDs, which made us add a lookup feature.

### How We Fixed Things

We debugged the TypeScript errors by checking the type definitions and fixing the imports. For the dashboard, we added code to fetch all books and match them with the request data so we could display meaningful information to users.

### Numbers

- 6 backend procedures implemented
- 5 frontend pages created
- 7 automated tests passing
- 0 critical bugs

---

## Sprint 2: Completing the System (Week 3-4)

### What We Planned

We wanted to finish the admin panel so admins could manage books and requests. We also wanted to add the ability for students to cancel their pending requests. Finally, we planned to write comprehensive documentation including user stories, diagrams, test cases, and a final report.

### What We Accomplished

We completed the admin panel with a form to add new books. We also added the ability for admins to edit book information and delete books from the catalog. We created the admin requests page where admins can see all pending requests and approve, reject, or mark them as returned.

We enhanced the user dashboard so it shows book titles and added a cancel button for pending requests. We also improved the styling to make the interface consistent throughout the application.

For documentation, we wrote 15 user stories describing all the features from both student and admin perspectives. We created UML diagrams showing the system architecture. We wrote 15 test cases documenting how we tested each feature. We also wrote documentation about security features and how the system is designed to be reliable.

### Issues We Ran Into

We had to figure out how to handle the edit form so it didn't show fields that shouldn't be editable (like ISBN and copy count). We also needed to make sure the dashboard could refresh data properly when students cancelled requests.

### How We Fixed Things

We used conditional rendering in the form to show different fields depending on whether we're adding a new book or editing an existing one. For the dashboard refresh, we used the refetch function from the query hook to update the data after a mutation.

### Numbers

- 2 admin pages completed
- 15 user stories documented
- 15 test cases created
- All core features working
- 100% test pass rate

---

## Overall Project Status

### Features We Built

The system has everything we planned. Students can register and log in. They can search for books and see details. They can request books and track their requests in a dashboard. They can cancel pending requests if they change their mind.

Admins can add, edit, and delete books. They can see all borrow requests and approve or reject them. They can mark books as returned.

The interface is clean and easy to use. Error messages are friendly and tell users what went wrong. The system validates all input to make sure data is correct.

### Quality

All our automated tests passed. We didn't find any critical bugs. The code is organized and easy to understand. The styling is consistent across all pages.

### What We Learned

Starting with a clear database design made everything else easier. When we knew exactly what data we needed, building the features on top of that was straightforward.

Testing early helped us catch problems before they became big issues. Writing tests as we built features meant we found bugs right away instead of discovering them later.

Consistent styling and clear error messages make a huge difference in how users experience the application. When everything looks polished and feedback is clear, users feel confident using the system.

### Recommendations for Future Work

If we continued working on this project, we could add duplicate request prevention so students can't request the same book twice. We could send automatic notifications when request status changes. We could add more search filters so students can find books more easily. We could add a rating system so students can review books. We could create admin statistics to show which books are most popular.

---

## Team Reflection

Working on this project as a team was a good learning experience. We divided the work between frontend and backend, but we all helped each other when someone got stuck. We learned the importance of clear communication and planning. When we had a clear plan at the start of each sprint, we could execute it efficiently. We also learned that testing and documentation are just as important as writing the code itself.
