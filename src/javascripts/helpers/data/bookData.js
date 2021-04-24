import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
// API CALLS FOR BOOKS
const dbUrl = firebaseConfig.databaseURL;
// const currentUserUid = firebase.auth().currentUser;

// GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});
// DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => getBooks().then((booksArray) => resolve(booksArray)))
    .catch((error) => reject(error));
});
// CREATE BOOK
const createBook = (bookObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, body)
        .then(() => {
          getBooks(uid).then((booksArray) => resolve(booksArray));
        });
    }).catch((error) => reject(error));
});

// GET BOOKS ON SALE
const getSaleBooks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="sale"&equalTo=true`)
    .then((response) => {
      const saleBooksArray = Object.values(response.data);
      resolve(saleBooksArray);
    }).catch((error) => reject(error));
});
// GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
// UPDATE BOOK
const updatebook = (firebaseKey, bookObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${firebaseKey}.json`, bookObject)
    .then(() => getBooks(firebase.auth().currentUser.uid)).then((booksArray) => resolve(booksArray))
    .catch((error) => reject(error));
});
// SEARCH BOOKS

export {
  getBooks,
  createBook,
  getSaleBooks,
  deleteBook,
  getSingleBook,
  updatebook,
};
