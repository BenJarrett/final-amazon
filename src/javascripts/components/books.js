const makeBooks = (array) => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#store').classList.add('flex');

  array.forEach((item) => {
    document.querySelector('#store').innerHTML += `<div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
        <hr>
        <button class="btn btn-danger" id="delete-book--${item.firebaseKey}">Delete Book</button>
        </div>
      </div>`;
  });
};

const emptyBooks = () => {
  document.querySelector('#store').innerHTML = '<h1>No Items</h1>';
};

export { makeBooks, emptyBooks };
