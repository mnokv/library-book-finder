# Test Cases - Library Book Finder

**Group 10 - CSC 1405**

Team: Nada Omar Alotaibi, Ashwaq Eid Al-Atawi, Fai Mofareh Alshmlani, Esra Naser Al-Fadlil, Nawal Mohammed Al-Yami

---

## Test Case 1: User Registration and Login

**Test ID:** TC-001

**What We're Testing:** Students should be able to create an account and log in to the system.

**Steps:**
1. Click the "Get Started" button on the home page
2. Complete the login/registration process
3. Verify that the system recognizes the user and shows their dashboard

**Expected Result:** After logging in, the user should see the home page with Dashboard and Admin Panel buttons (if they're an admin). Their session should persist when they navigate to different pages.

**Status:** Pass

---

## Test Case 2: Search Books by Title

**Test ID:** TC-002

**What We're Testing:** Students should be able to find books by searching for the title.

**Steps:**
1. Go to the Catalog page
2. Enter a book title in the search box
3. Click search or wait for results to update

**Expected Result:** Only books with matching titles should appear in the results. If no books match, a message should say no results were found.

**Status:** Pass

---

## Test Case 3: Search Books by Author

**Test ID:** TC-003

**What We're Testing:** Students should be able to find books by searching for the author's name.

**Steps:**
1. Go to the Catalog page
2. Enter an author name in the search box
3. Click search or wait for results to update

**Expected Result:** Only books by that author should appear. The search should be case-insensitive so "john" finds "John Smith".

**Status:** Pass

---

## Test Case 4: View Book Details

**Test ID:** TC-004

**What We're Testing:** Students should see complete information about a book when they click on it.

**Steps:**
1. Go to the Catalog page
2. Click on any book title
3. Look at the detail page

**Expected Result:** The detail page should show the book's title, author, category, description, how many copies are available, and a request button. The availability should be clearly displayed.

**Status:** Pass

---

## Test Case 5: Request a Book

**Test ID:** TC-005

**What We're Testing:** Students should be able to request a book that has available copies.

**Steps:**
1. Go to a book detail page
2. Click the "Request Book" button
3. Confirm the request

**Expected Result:** A success message should appear. The request should immediately show up in the student's dashboard with a "pending" status.

**Status:** Pass

---

## Test Case 6: View Request Status

**Test ID:** TC-006

**What We're Testing:** Students should be able to see the status of all their requests in one place.

**Steps:**
1. Go to the Dashboard page
2. Look at the list of requests

**Expected Result:** All requests should be displayed with clear status badges. The status should be one of: pending, approved, returned, or rejected. Each request should show the book title so the student knows which book it's for.

**Status:** Pass

---

## Test Case 7: Admin Add Book

**Test ID:** TC-007

**What We're Testing:** Admins should be able to add new books to the catalog.

**Steps:**
1. Go to the Admin Panel
2. Click "Add New Book"
3. Fill in the form with book details (title, author, category, description, ISBN, number of copies)
4. Click "Add Book"

**Expected Result:** A success message should appear. The new book should immediately appear in the catalog and be searchable.

**Status:** Pass

---

## Test Case 8: Admin Edit Book

**Test ID:** TC-008

**What We're Testing:** Admins should be able to update book information.

**Steps:**
1. Go to the Admin Panel
2. Find a book and click "Edit"
3. Change the book details (title, author, category, or description)
4. Click "Update Book"

**Expected Result:** A success message should appear. The changes should be visible in the catalog immediately. When students view the book, they should see the updated information.

**Status:** Pass

---

## Test Case 9: Admin Delete Book

**Test ID:** TC-009

**What We're Testing:** Admins should be able to remove books from the catalog.

**Steps:**
1. Go to the Admin Panel
2. Find a book and click "Delete"
3. Confirm the deletion

**Expected Result:** A success message should appear. The book should no longer appear in the catalog or search results. Any pending requests for that book should be handled appropriately.

**Status:** Pass

---

## Test Case 10: Admin Approve Request

**Test ID:** TC-010

**What We're Testing:** Admins should be able to approve pending borrow requests.

**Steps:**
1. Go to the Admin Requests page
2. Find a pending request
3. Click the "Approve" button

**Expected Result:** The request status should change to "approved". The student should see this status change in their dashboard.

**Status:** Pass

---

## Test Case 11: Admin Reject Request

**Test ID:** TC-011

**What We're Testing:** Admins should be able to reject borrow requests if the book isn't available.

**Steps:**
1. Go to the Admin Requests page
2. Find a pending request
3. Click the "Reject" button

**Expected Result:** The request status should change to "rejected". The student should see this status change in their dashboard and know the book isn't available.

**Status:** Pass

---

## Test Case 12: Admin Mark as Returned

**Test ID:** TC-012

**What We're Testing:** Admins should be able to mark approved requests as returned when students return books.

**Steps:**
1. Go to the Admin Requests page
2. Find an approved request
3. Click "Mark as Returned"

**Expected Result:** The request status should change to "returned". The number of available copies for that book should increase.

**Status:** Pass

---

## Test Case 13: User Cancel Pending Request

**Test ID:** TC-013

**What We're Testing:** Students should be able to cancel requests they no longer want.

**Steps:**
1. Go to the Dashboard
2. Find a pending request
3. Click the "Cancel Request" button
4. Confirm the cancellation

**Expected Result:** The request status should change to "rejected". The cancel button should disappear. The student should be able to request the book again later if they want.

**Status:** Pass

---

## Test Case 14: Book Not Available

**Test ID:** TC-014

**What We're Testing:** The system should prevent requests when no copies are available.

**Steps:**
1. Find a book with 0 available copies
2. Go to its detail page
3. Look for the request button

**Expected Result:** The request button should be disabled or not visible. A message should say "Not Available" or similar. The student should understand they can't request this book right now.

**Status:** Pass

---

## Test Case 15: Input Validation

**Test ID:** TC-015

**What We're Testing:** The system should validate form inputs and show error messages.

**Steps:**
1. Try to add a book without entering a title
2. Try to add a book with a negative number of copies
3. Try to search with invalid characters

**Expected Result:** Error messages should appear telling the user what's wrong. The form should not submit with invalid data. The error messages should be clear and helpful.

**Status:** Pass

---

## Test Summary

| Metric | Result |
|--------|--------|
| Total Test Cases | 15 |
| Passed | 15 |
| Failed | 0 |
| Success Rate | 100% |

All test cases passed successfully. The system works as expected for all core features. Students can search for books, request them, and track their requests. Admins can manage the catalog and approve/reject requests. Error handling works properly and users get clear feedback.
