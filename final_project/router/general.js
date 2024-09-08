const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username,password} = req.body;
  if(!isValid(username)){
    users.push({"username":username,"password":password});
    return res.status(200).json({message: "User registered succesfully!"});  
  }
  return res.status(401).json({message: "User already registered !"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
  let book = books[isbn];
     if(book)
        return res.json(book);
    else
    return res.status(404).json({ message: "Book not found. Try a valid ISBN!" });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let bookDetails = Object.values(books).filter(book => book.author === author);
    if (bookDetails.length > 0)
        return res.status(200).json(bookDetails);
    else
        return res.status(404).json({ message: "Details not found" });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title; // Use `req.params.title` directly
    let bookDetails = Object.values(books).filter(book => book.title === title); 
    if (bookDetails.length > 0)
        return res.status(200).json(bookDetails);
    else
        return res.status(404).json({ message: "Details not found" });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let book = books[isbn];
    if (book)
        return res.json(book.reviews);
    else
        return res.status(404).json({ message: "Book not found. Try a valid ISBN!" });
});

module.exports.general = public_users;
