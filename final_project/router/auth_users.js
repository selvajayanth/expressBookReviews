const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    const checkUser = users.find(user=>user.username===username);
    return checkUser ? true : false;
}

const authenticatedUser = (username, password) => {
    const userDetails = users.find(user => user.username === username && user.password === password);
    return userDetails ? true : false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (authenticatedUser(username, password)) {
        let token = jwt.sign({ username }, 'access', { expiresIn: '1h' });
        req.session.auth = { access_token: token, username };
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(401).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.auth ? req.session.auth.username : null;
  
    if (!username) {
      return res.status(403).json({ message: "User not authenticated" });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    // Add or modify review
    books[isbn].reviews[username] = review;
  
    return res.status(200).json({ message: "Review added/modified successfully!" });
});
regd_users.delete("/auth/review/:isbn", (req, res) =>{
    const isbn = req.params.isbn;
    const username = req.session.auth ? req.session.auth.username : null;
    if(books[isbn]){
        let book = books[isbn];
        if(book.reviews[username]){
            delete book.reviews[username];
            return res.status(200).json({
            message: `Review by user ${username} for book with ISBN ${isbn} has been deleted.`,
            });
        }else {
            return res.status(404).json({
              message: `No review found for user ${username} on this book.`,
            });
          }
    }else {
        return res.status(404).json({
          message: `Book with ISBN ${isbn} not found.`,
        });
      }
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
