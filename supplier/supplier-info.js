getItem()
function getItem() {
  const id = localStorage.getItem("supplierId")
  fetch(`http://localhost:3000/supplier/${id}`,{
      method: 'GET',
  }
  ).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // ou response.text() dependendo do tipo de resposta
  }).then(data => {
    setRequisitions(data)
  }).catch(error => {
    console.error('Houve um problema com a requisição fetch:', error);
  });
}

function setRequisitions(data) {
  console.log(data);
  document.getElementById('item-info').innerHTML = `
    <h2>${data.nome}</h2>
    <p id="cnpj">CNPJ: ${data.cnpj}</p>
    <p class="endereco">Endereço: ${data.endereco}</p>
    <p id="telefone">Telefone: ${data.telefone}</p>
    <p class="email">Email: ${data.email}</p>
    <p id="website">Website: ${data.website}</p>
    <p id="contato">Contato: ${data.contato}</p>
    <p id="id">ID: ${data.id}</p>
  `
}

function deleteSupplier() {
  const id = localStorage.getItem("supplierId")
  console.log(id);
  fetch(`http://localhost:3000/supplier/${id}`,{
    method: 'DELETE',
  }
  ).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // ou response.text() dependendo do tipo de resposta
  }).then(data => {
      window.location.replace('./supplier-list.html');
  }).catch(error => {
    console.error('Houve um problema com a requisição fetch:', error);
  });
}


