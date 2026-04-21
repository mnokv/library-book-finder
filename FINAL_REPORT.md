# Library Book Finder - Final Project Report

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

## 1. Introduction

We developed the Library Book Finder as a practical solution to manage book borrowing in a university library. The system lets students browse books, check availability, and request them. Admins can add, edit, and remove books from the catalog, and they approve or reject borrow requests. Instead of dealing with manual processes or paper-based systems, students and staff now have a centralized platform that makes borrowing books easier and faster.

---

## 2. Project Overview

The Library Book Finder addresses real problems we face in our library. Students spend time looking for books, checking if they're available, and then waiting to hear if their request was approved. Admins manage the catalog manually and process requests one by one. Our application brings all of this together in one place.

We built a web application that students can access from anywhere. They can search for books by title, author, or category. Once they find a book they want, they can see how many copies are available and request it. Their requests go to admins, who can approve them or let students know if the book isn't available right now. Students can track the status of their requests in their personal dashboard.

---

## 3. Key Features

**For Students:**
We made it simple for students to find and request books. The search feature works across titles, authors, and categories. Each book shows its availability status so students know right away if they can request it. The dashboard shows all their requests with clear status labels (pending, approved, returned, or rejected). If they change their mind, they can cancel pending requests.

**For Admins:**
Admins have a dedicated panel to manage the entire book catalog. They can add new books with all the details like title, author, category, and ISBN. They can edit book information if something needs updating. If a book is damaged or outdated, they can remove it. The admin request panel shows all pending requests so admins can approve or reject them. Once a student returns a book, admins mark it as returned.

---

## 4. How It Works

The system is built with a React frontend that students interact with and an Express backend that handles all the business logic. We use a MySQL database to store information about users, books, and requests.

When a student logs in, they see the home page with options to browse books or access their dashboard. The catalog page lets them search for books and click on any book to see full details. If they want to borrow a book, they click the request button. The system checks if they're logged in and if the book has available copies. If everything is good, their request gets created and they see it in their dashboard.

Admins log in and go to the admin panel. They see all the books in the catalog and can add new ones using a form. They can edit book details or delete books they no longer want. In the requests panel, they see all pending requests. They can approve them (which means the student can pick up the book) or reject them (if the book isn't available). When a student returns a book, admins mark it as returned.

---

## 5. Technical Details

**Frontend:** We used React with Tailwind CSS to build the interface. The pages are organized by feature (catalog, dashboard, admin panel) and they all connect to the backend through tRPC, which is a type-safe way to call server functions from the client.

**Backend:** The Express server runs tRPC procedures that handle everything. These procedures check if the user has permission to do what they're asking (like only admins can add books). They validate all the data coming in to make sure it's correct. They talk to the database and return results to the frontend.

**Database:** We designed the database with three main tables. The users table stores login information and roles. The books table has all the book details and tracks how many copies are available. The borrowRequests table connects users to books and tracks the status of each request.

---

## 6. Security and Reliability

We took security seriously. Users log in through OAuth, which means we don't store passwords. Each user gets a role (admin or regular user) and the system checks this role before allowing sensitive operations. Only admins can manage books and requests. Regular users can only see their own requests.

All data coming from users gets validated before it's used. We check that book titles aren't empty, that copy counts are positive numbers, and that status values are valid. This prevents bad data from getting into the system.

If something goes wrong, we show users friendly error messages explaining what happened. We also log important events like when users log in, when books are added, and when requests are approved. This helps us debug problems if they come up.

---

## 7. Testing

We tested the system thoroughly. We created test cases for all the main features: searching for books, viewing details, requesting books, tracking requests, adding books, editing books, and approving requests. Each test case describes what we're testing, the steps to follow, and what result we expect.

We also wrote automated tests using Vitest to verify that the backend procedures work correctly. These tests check that the system properly handles authorization (making sure non-admins can't do admin things), that search works, and that requests are created properly.

---

## 8. What We Learned

Working on this project taught us a lot about building real applications. We learned how important it is to start with a clear database design. When we knew exactly what data we needed and how it connected, building the features on top of that was much faster.

We also learned that testing early catches problems before they become big issues. When we wrote tests as we built features, we found bugs right away instead of discovering them later. And we learned that consistent styling and clear error messages make a huge difference in how users experience the application.

---

## 9. Challenges and Solutions

We ran into a few challenges along the way. At first, we had some issues with how the frontend was reading book IDs from the URL. We fixed this by using React's useEffect hook properly to get the ID when the page loads instead of trying to get it during rendering.

We also wanted to show book titles in the dashboard and admin panels instead of just book IDs. To do this, we fetched all the books and then looked up the title for each request. This made the interface much more user-friendly.

---

## 10. Future Improvements

The system works well for the core features, but there are things we could add in the future. We could prevent students from requesting the same book twice if they already have a pending request. We could send automatic notifications when a request status changes. We could add more advanced search filters so students can filter by publication date or book condition.

We could also add a rating system so students can review books they've borrowed. And we could create a dashboard for admins to see statistics about which books are most popular and when books are typically returned.

---

## 11. Conclusion

We're proud of what we built. The Library Book Finder is a practical application that solves real problems. Students can easily find and request books, and admins have the tools they need to manage the library efficiently. The code is clean and well-organized, making it easy to maintain and improve in the future.

This project gave us hands-on experience with full-stack web development. We worked with databases, backend logic, and frontend interfaces. We learned about security, testing, and how to build applications that are both functional and user-friendly. We think this is a solid foundation for a real library management system.
