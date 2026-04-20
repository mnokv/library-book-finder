# Test Cases - Library Book Finder

## Test Case 1: User Registration and Login
| Field | Value |
|-------|-------|
| Test ID | TC-001 |
| Description | User can register and login to the system |
| Steps | 1. Click Sign In button 2. Complete OAuth flow 3. Verify user is logged in |
| Expected Output | User dashboard loads, welcome message shows user name |
| Status | Pass |

## Test Case 2: Search Books by Title
| Field | Value |
|-------|-------|
| Test ID | TC-002 |
| Description | User can search for books by title |
| Steps | 1. Go to Catalog 2. Enter book title in search 3. Click search |
| Expected Output | Only books matching title appear in results |
| Status | Pass |

## Test Case 3: Search Books by Author
| Field | Value |
|-------|-------|
| Test ID | TC-003 |
| Description | User can search for books by author name |
| Steps | 1. Go to Catalog 2. Enter author name in search 3. Click search |
| Expected Output | Only books by that author appear in results |
| Status | Pass |

## Test Case 4: View Book Details
| Field | Value |
|-------|-------|
| Test ID | TC-004 |
| Description | User can view complete book details |
| Steps | 1. Go to Catalog 2. Click on a book 3. View details page |
| Expected Output | Book title, author, category, description, availability shown |
| Status | Pass |

## Test Case 5: Request a Book
| Field | Value |
|-------|-------|
| Test ID | TC-005 |
| Description | User can request an available book |
| Steps | 1. View book details 2. Click Request Book 3. Confirm |
| Expected Output | Success message shown, request appears in dashboard |
| Status | Pass |

## Test Case 6: View Request Status
| Field | Value |
|-------|-------|
| Test ID | TC-006 |
| Description | User can view status of their requests |
| Steps | 1. Go to Dashboard 2. View requests list 3. Check status badges |
| Expected Output | All requests shown with status (pending/approved/returned/rejected) |
| Status | Pass |

## Test Case 7: Admin Add Book
| Field | Value |
|-------|-------|
| Test ID | TC-007 |
| Description | Admin can add new books to catalog |
| Steps | 1. Go to Admin Panel 2. Click Add Book 3. Fill form 4. Submit |
| Expected Output | Book added successfully, appears in catalog |
| Status | Pass |

## Test Case 8: Admin Edit Book
| Field | Value |
|-------|-------|
| Test ID | TC-008 |
| Description | Admin can edit existing book details |
| Steps | 1. Go to Admin Panel 2. Click Edit on a book 3. Modify details 4. Save |
| Expected Output | Book details updated, changes visible in catalog |
| Status | Pass |

## Test Case 9: Admin Delete Book
| Field | Value |
|-------|-------|
| Test ID | TC-009 |
| Description | Admin can delete books from catalog |
| Steps | 1. Go to Admin Panel 2. Click Delete on a book 3. Confirm |
| Expected Output | Book removed from catalog and search results |
| Status | Pass |

## Test Case 10: Admin Approve Request
| Field | Value |
|-------|-------|
| Test ID | TC-010 |
| Description | Admin can approve pending borrow requests |
| Steps | 1. Go to Admin Requests 2. Click Approve on pending request 3. Confirm |
| Expected Output | Request status changes to approved, user sees update in dashboard |
| Status | Pass |

## Test Case 11: Admin Reject Request
| Field | Value |
|-------|-------|
| Test ID | TC-011 |
| Description | Admin can reject pending borrow requests |
| Steps | 1. Go to Admin Requests 2. Click Reject on pending request 3. Confirm |
| Expected Output | Request status changes to rejected, user sees update in dashboard |
| Status | Pass |

## Test Case 12: Admin Mark as Returned
| Field | Value |
|-------|-------|
| Test ID | TC-012 |
| Description | Admin can mark approved requests as returned |
| Steps | 1. Go to Admin Requests 2. Click Mark as Returned on approved request |
| Expected Output | Request status changes to returned, availability count increases |
| Status | Pass |

## Test Case 13: User Cancel Pending Request
| Field | Value |
|-------|-------|
| Test ID | TC-013 |
| Description | User can cancel their pending requests |
| Steps | 1. Go to Dashboard 2. Find pending request 3. Click Cancel Request |
| Expected Output | Request status changes to rejected, button disappears |
| Status | Pass |

## Test Case 14: Book Not Available
| Field | Value |
|-------|-------|
| Test ID | TC-014 |
| Description | Request button disabled when no copies available |
| Steps | 1. View book with 0 available copies 2. Check request button |
| Expected Output | Request button disabled, "Not Available" badge shown |
| Status | Pass |

## Test Case 15: Input Validation
| Field | Value |
|-------|-------|
| Test ID | TC-015 |
| Description | System validates required fields on forms |
| Steps | 1. Try submitting empty form 2. Check validation messages |
| Expected Output | Error messages shown for required fields, form not submitted |
| Status | Pass |

## Summary
- Total Test Cases: 15
- Passed: 15
- Failed: 0
- Success Rate: 100%
