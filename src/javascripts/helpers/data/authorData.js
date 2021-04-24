import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
// API CALLS FOR AUTHORS
const dbUrl = firebaseConfig.databaseURL;

// GET AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        const authorArray = Object.values(response.data);
        resolve(authorArray);
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

// GET FAVORITE AUTHOR
const favoriteAuthor = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
    .then((response) => {
      const favoriteAuthorArray = Object.values(response.data);
      resolve(favoriteAuthorArray);
    }).catch((error) => reject(error));
});
// DELETE AUTHOR
const deleteAuthor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => getAuthors(uid).then((authorsArray) => resolve(authorsArray)))
    .catch((error) => reject(error));
});
// CREATE AUTHOR
const createAuthors = (authorObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors(uid).then((authorsArray) => resolve(authorsArray));
        });
    }).catch((error) => reject(error));
});

// Get single Author
const getSingleAuthor = (authorId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${authorId}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
// UPDATE AUTHOR
const updateAuthor = (firebaseKey, authorObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${firebaseKey}.json`, authorObject)
    .then(() => getAuthors(firebase.auth().currentUser.uid)).then((authorsArray) => resolve(authorsArray))
    .catch((error) => reject(error));
});
// SEARCH AUTHORS

export {
  getAuthors,
  createAuthors,
  favoriteAuthor,
  deleteAuthor,
  getSingleAuthor,
  updateAuthor,
};
