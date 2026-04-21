# Security and Dependability - Library Book Finder

**Group 10 - CSC 1405**

Team: Nada Omar Alotaibi, Ashwaq Eid Al-Atawi, Fai Mofareh Alshmlani, Esra Naser Al-Fadlil, Nawal Mohammed Al-Yami

---

## Security Features

### Authentication

The system uses OAuth for user authentication, which means we don't store passwords at all. When students log in, they go through the Manus OAuth provider which handles all the security. This is much safer than storing passwords ourselves because we don't have to worry about password breaches or weak password management.

Once a student logs in successfully, they get a secure session cookie that proves they're logged in. This cookie is HTTP-only, which means JavaScript can't access it (preventing certain types of attacks). The cookie is also marked as secure, so it only gets sent over HTTPS connections.

### Authorization and Access Control

The system checks what role each user has. Students are regular users, and some users are admins. Before allowing any sensitive operation, the system verifies the user's role.

For example, when someone tries to add a book, the backend checks if they're an admin. If they're not, the operation fails and they get an error message. Regular students can't see the admin panel buttons in the interface, and even if they somehow tried to access the admin features directly, the backend would reject their requests.

### Input Validation

Every piece of data that comes from users gets checked before it's used. When a student searches for books, we validate that the search term is a string. When an admin adds a book, we check that the title isn't empty, that the ISBN is in the right format, and that the copy count is a positive number.

This validation happens in two places. First, the frontend validates data before sending it to the server, which gives users immediate feedback if something is wrong. Second, the backend validates everything again before using it or storing it in the database. This double validation means that even if someone tries to bypass the frontend validation, the backend will catch it.

We use a library called Zod to define validation schemas. These schemas describe exactly what format each piece of data should be in. If data doesn't match the schema, it gets rejected.

### Database Security

The database uses proper relationships and constraints. Foreign keys ensure that you can't create a request for a non-existent book or user. Unique constraints prevent duplicate ISBNs or user IDs.

All database queries use parameterized statements through the Drizzle ORM. This means we never directly insert user input into SQL queries. Instead, the database driver handles escaping and formatting, which prevents SQL injection attacks.

---

## Potential Security Risks and How We Handle Them

### Risk 1: Unauthorized Book Management

**What could go wrong:** A student could try to add, edit, or delete books even though only admins should be able to do this.

**How we prevent it:** The backend checks the user's role before allowing any book management operation. The frontend also hides the admin panel from non-admin users. Even if a student somehow found the admin page, they couldn't do anything because the backend would reject their requests.

### Risk 2: Data Injection Attacks

**What could go wrong:** Someone could enter malicious code in a search box or book title field to try to manipulate the database or steal data.

**How we prevent it:** All database queries use parameterized statements, so user input is never directly inserted into SQL. We also validate all input to make sure it matches expected formats. For example, a book title should be a string with reasonable length, not a SQL command.

### Risk 3: Unauthorized Request Modification

**What could go wrong:** A student could try to approve their own request or change the status of another student's request.

**How we prevent it:** Only admins can change request status. Students can only cancel their own pending requests. The backend checks the user's role and ownership before allowing any changes.

### Risk 4: Session Hijacking

**What could go wrong:** Someone could steal a student's session cookie and pretend to be them.

**How we prevent it:** Session cookies are HTTP-only (JavaScript can't access them), secure (only sent over HTTPS), and have a reasonable expiration time. After the session expires, the user has to log in again.

---

## Dependability Features

### Error Handling

When something goes wrong, the system tells users clearly what happened and what they can do about it. If a student tries to request a book that has no available copies, they see a message saying "This book is not currently available." If they try to search with no results, they see "No books found matching your search."

Error messages are friendly and don't expose technical details that would confuse users. They explain the problem in simple language and suggest what to do next.

### Input Validation and Data Quality

We validate data at multiple levels. The frontend validates immediately as users type or submit forms. The backend validates again before storing anything. This means bad data almost never gets into the system.

When validation fails, users see clear error messages explaining what's wrong. For example, if they try to add a book without a title, they see "Book title is required." If they enter a negative number of copies, they see "Number of copies must be positive."

### Logging and Monitoring

The system logs important events to help us understand what's happening and debug problems if they occur. We log when users log in and out, when books are added or modified, when requests are created or updated, and when errors happen.

These logs go to the console where developers can see them. In a production system, we would send logs to a centralized logging service so we could search through them and set up alerts for problems.

### Data Consistency

The database maintains data consistency through relationships and constraints. For example, if a book is deleted, any requests for that book are handled appropriately. Timestamps are automatically managed so we always know when something was created or last updated.

When admins mark a book as returned, the system updates the available copy count. This ensures that the availability information is always accurate.

### Graceful Degradation

If something goes wrong, the system tries to handle it gracefully. If a database query fails, users see a friendly error message instead of a technical error. If the server is temporarily unavailable, users see a message telling them to try again later.

---

## Data Protection and Privacy

### Personal Information

The system stores minimal personal information. We only store what's necessary: the user's ID from OAuth, their name, and their email. We don't store passwords because we use OAuth.

### Request History

Borrow requests are stored in the database so we can track what books students have requested. This information is only visible to the student who made the request and to admins. Students can't see other students' requests.

### Audit Trail

Timestamps on all records create an audit trail. We can see when each request was created, when it was approved, and when the book was returned. This helps with accountability and debugging.

---

## Backup and Recovery

### Database Backups

The database should be backed up daily using the hosting provider's automated backup service. Backups should be kept for at least 30 days so we can recover from accidental data loss or corruption.

### Code Backups

The source code is version-controlled using Git. Every change is tracked and can be recovered. The code is stored in a remote repository so it's not lost even if the development computer fails.

### Disaster Recovery

If the system goes down completely, we can:
1. Redeploy the application from the Git repository
2. Restore the database from backups
3. Verify that everything is working correctly

This process should take less than an hour in most cases.

---

## Future Security Improvements

If we continue developing this system, we could add:

1. **Rate limiting:** Prevent brute force attacks by limiting how many requests someone can make in a short time
2. **CSRF protection:** Add tokens to forms to prevent cross-site request forgery attacks
3. **Audit logging:** Keep detailed logs of all admin actions for accountability
4. **Two-factor authentication:** Add an extra security layer for admin accounts
5. **Data encryption:** Encrypt sensitive data at rest in the database
6. **Security scanning:** Run automated tools to find vulnerabilities
7. **Penetration testing:** Have security experts try to break the system to find weaknesses

These improvements would make the system even more secure for a production environment.
