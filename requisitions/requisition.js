
onStart()

function onStart() {
  getSuppliers()
}

function getSuppliers() {
  fetch("http://localhost:3000/requisition",{
    method: 'GET',
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  }).then(data => {
    setSuppliers(data)
  }).catch(error => {
    console.error('Houve um problema com a requisição fetch:', error);
  });
}


function setSuppliers(data) {
  let items = []
  for(let index in data) {
    items = items + 
    `<div class="item" onClick= navigateToItem(${data[index].id})>
      <p id="title">${data[index].codigo} - ${data[index].observacao}</p>
      <p>${data[index].status}</p>
    </div>`
  }
  document.getElementById('item-list').innerHTML = items
}

function navigateToItem(id) {
  localStorage.setItem("requisitionId", id)
  window.location.replace('./requisition-info.html');
}
