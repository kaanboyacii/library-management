CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    points INT DEFAULT 0
);

CREATE TABLE Books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    averageRating DECIMAL(3,2) DEFAULT 0.00
);

CREATE TABLE Loans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    bookId INT,
    borrowedAt DATETIME NOT NULL,
    returnedAt DATETIME,
    score INT CHECK (score >= 1 AND score <= 10),
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (bookId) REFERENCES Books(id)
);
