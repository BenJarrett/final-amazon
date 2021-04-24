import firebase from 'firebase/app';
import 'firebase/auth';
import { showAuthors } from '../components/authors';
import { showBooks } from '../components/books';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import editAuthorForm from '../components/forms/editAuthorForm';
import {
  createAuthors,
  updateAuthor,
  getSingleAuthor,
} from '../helpers/data/authorData';
import {
  createBook,
  deleteBook,
  getSingleBook,
  updatebook
} from '../helpers/data/bookData';
import editBookForm from '../components/forms/editBookForm';
import formModal from '../components/forms/formModal';
import { authorBookInfo, deleteAuthorBooks } from '../helpers/data/authorBooksData';
import authorInfo from '../components/forms/authorInfo';

const domEvents = (uid) => {
  document.querySelector('body').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        // pull the firebaseKey off the button
        const firebaseKey = e.target.id.split('--')[1];
        deleteBook(firebaseKey, uid).then((booksArray) => showBooks(booksArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('CLICKED ADD BOOK BUTTON', e.target.id);
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
        uid
        // TO DO Add userid
      };
      createBook(bookObject, uid).then((booksArray) => showBooks(booksArray));
    }
    // CLICK EVENT FOR SHOWING MODAL FORM FOR ADDING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const firebaseKey = e.target.id.split('--')[1];
      formModal('Edit Book');
      getSingleBook(firebaseKey).then((bookObject) => editBookForm(bookObject));
      // console.warn(firebaseKey);
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
      };
      updatebook(firebaseKey, bookObject).then((booksArray) => showBooks(booksArray));
      $('#formModal').modal('toggle');
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      if (window.confirm('Want to delete?')) {
        const authorId = e.target.id.split('--')[1];
        console.warn(authorId);
        deleteAuthorBooks(authorId, uid).then((authorsArray) => showAuthors(authorsArray));
      }
    }
    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('Clicked Add Author', e.target.id);
      addAuthorForm();
    }
    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      e.preventDefault();
      console.warn('clicked', e.target.id);
      const authorObject = {
        first_name: document.querySelector('#first').value,
        last_name: document.querySelector('#last').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        uid: firebase.auth().currentUser.uid
      };
      createAuthors(authorObject, uid).then((authorsArray) => showAuthors(authorsArray));
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author-btn')) {
      const firebaseKey = e.target.id.split('--')[1];
      formModal('Edit Author');
      getSingleAuthor(firebaseKey).then((authorObject) => editAuthorForm(authorObject));
    }

    if (e.target.id.includes('author-name-title')) {
      const authorId = e.target.id.split('--')[1];
      console.warn(authorId);
      authorBookInfo(authorId).then((authorInfoObject) => {
        showBooks(authorInfoObject.books);
        authorInfo(authorInfoObject.author);
      });
    }

    if (e.target.id.includes('update-author')) {
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const authorObject = {
        first_name: document.querySelector('#first').value,
        last_name: document.querySelector('#last').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
      };
      updateAuthor(firebaseKey, authorObject).then((authorsArray) => showAuthors(authorsArray));
      $('#formModal').modal('toggle');
    }
  });
};

export default domEvents;
