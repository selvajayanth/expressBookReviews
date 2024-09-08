// client.js or any other client-side script

const axios = require('axios');

// Fetch all books
async function fetchAllBooks() {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log('Books:', response.data);
  } catch (error) {
    console.error('Error fetching all books:', error.message);
  }
}

// Fetch book by ISBN
async function fetchBookByIsbn(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log('Book:', response.data);
  } catch (error) {
    console.error('Error fetching book by ISBN:', error.message);
  }
}

// Fetch books by author
async function fetchBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log('Books by Author:', response.data);
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
  }
}

// Fetch books by title
async function fetchBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log('Books by Title:', response.data);
  } catch (error) {
    console.error('Error fetching books by title:', error.message);
  }
}

// Fetch book reviews
async function fetchBookReviews(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/review/${isbn}`);
    console.log('Book Reviews:', response.data);
  } catch (error) {
    console.error('Error fetching book reviews:', error.message);
  }
}

// Call functions as needed
fetchAllBooks();
fetchBookByIsbn('1');
fetchBooksByAuthor('Jane Austen');
fetchBooksByTitle('Pride and Prejudice');
fetchBookReviews('1');
