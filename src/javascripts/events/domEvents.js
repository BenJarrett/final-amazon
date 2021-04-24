// THIS FILE IS FOR ANYTHING DYNAMIC THAT WE NEED TO LISTEN FOR ON THE DOM
const domEvents = () => {
  document.querySelector('body').addEventListener('click', (e) => {
  // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      console.warn('CLICKED DELETE BOOK', e.target.id);
    }
  });

  // CLICK EVENT FOR DELETING AN AUTHOR
};

export default domEvents;
