# Invent Analytics Backend Developer Case

This project was developed to create a library management application. The application provides a REST API to manage user administration and book borrowing operations by users.

## Features

The application supports the following operations:

- Listing users
- Accessing information about a user (name, past borrowed books, user points, currently borrowed books)
- Creating a new user
- Listing books
- Accessing information about a book (title and average rating)
- Creating a new book
- Borrowing a book
- Returning a book and rating it

## Technical Requirements

- **Version Control:** Git is used.
- **Platform:** Node.js
- **Library:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Validator:** express-validator

## Installation

### 1. Clone the Repository

First, clone this project to your local machine:

```bash
git clone https://github.com/kaanboyacii/library-management.git
cd library-management
```
### 2. Install Dependencies

To install the required dependencies for the project:
```bash
npm install
```
### 3. Database Configuration

To configure the database, update the config/config.json file according to your database settings.
```bash
npx sequelize-cli db:create 
```
### 4. Apply Database Migrations

Run the migrations to create the database tables:
```bash
npx sequelize-cli db:migrate
```
### 5. Start the Server

To start the application:
```bash
npm start
```
### 6. Test the API

You can use the Postman collection to test the API. The Postman collection file and example request/response pairs are provided in the root directory of the project.

API Endpoints:

    GET /users - List users
    GET /users/:id - Access information about a user
    POST /users - Create a new user
    GET /books - List books
    GET /books/:id - Access information about a book
    POST /books - Create a new book
    POST /users/:userId/borrow/:bookId - Borrow a book
    POST /users/:userId/return/:loanId - Return a book and rate it
