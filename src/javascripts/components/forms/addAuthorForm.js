const addAuthorForm = () => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#form-container').innerHTML = `<form id="submit-author-form" class="mb-4">
                                                          <div class="form-group">
                                                            <label for="firstName">First Name</label>
                                                            <input type="text" class="form-control" id="first" aria-describedby="firstName" placeholder="First Name" required>
                                                          </div>
                                                          <div class="form-group">
                                                            <label for="title">Last Name</label>
                                                            <input type="text" class="form-control" id="last" aria-describedby="bookTitle" placeholder="Last Name" required>
                                                          </div>
                                                          <div class="form-group">
                                                            <label for="email">Email Address</label>
                                                            <input type="text" class="form-control" id="email" placeholder="Email Address" required>
                                                          </div>
                                                          <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="favorite">
                                                            <label class="form-check-label" for="favorite">Favorite Author?</label>
                                                          </div>
                                                          <button type="submit" id="submit-author" class="btn btn-primary">Submit Author</button>
                                                        </form>`;
};

export default addAuthorForm;
