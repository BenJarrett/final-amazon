// FIXME: STUDENTS show your authors

const makeAuthors = (array) => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#store').classList.add('flex');

  array.forEach((item) => {
    // FIXME: STUDENTS create cards for your authors
    document.querySelector('#store').innerHTML += `${item}`;
  });
};

const emptyAuthors = () => {
  document.querySelector('#store').innerHTML = '<h1>No Authors</h1>';
};

export { makeAuthors, emptyAuthors };
