const editAuthorForm = (authorObject) => {
  document.querySelector('#modal-body').innerHTML = `<form id="submit-author-form" class="mb-4">
  <div class="form-group">
    <label for="firstName">First Name</label>
    <input type="text" class="form-control" id="first" aria-describedby="firstName" placeholder="First Name" value="${authorObject.first_name}" required>
  </div>
  <div class="form-group">
    <label for="title">Last Name</label>
    <input type="text" class="form-control" id="last" aria-describedby="bookTitle" placeholder="Last Name" value="${authorObject.last_name}" required>
  </div>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="text" class="form-control" id="email" placeholder="Email Address" value="${authorObject.email}" required>
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="favorite">
    <label class="form-check-label" for="favorite">Favorite Author?</label>
  </div>
  <button type="submit" id="update-author--${authorObject.firebaseKey}" class="btn btn-primary">Submit Author</button>
</form>`;
};

export default editAuthorForm;
