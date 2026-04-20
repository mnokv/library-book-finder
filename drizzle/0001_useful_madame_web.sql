CREATE TABLE `books` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`author` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`description` text,
	`isbn` varchar(20),
	`totalCopies` int NOT NULL DEFAULT 1,
	`availableCopies` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `books_id` PRIMARY KEY(`id`),
	CONSTRAINT `books_isbn_unique` UNIQUE(`isbn`)
);
--> statement-breakpoint
CREATE TABLE `borrowRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bookId` int NOT NULL,
	`status` enum('pending','approved','returned','rejected') NOT NULL DEFAULT 'pending',
	`requestDate` timestamp NOT NULL DEFAULT (now()),
	`approvalDate` timestamp,
	`returnDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `borrowRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `borrowRequests` ADD CONSTRAINT `borrowRequests_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `borrowRequests` ADD CONSTRAINT `borrowRequests_bookId_books_id_fk` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE no action ON UPDATE no action;