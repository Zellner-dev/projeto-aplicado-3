getItem()
function getItem() {
  const id = localStorage.getItem("requisitionId")
  fetch(`http://localhost:3000/requisition/${id}`,{
      method: 'GET',
  }
  ).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  }).then(data => {
    setRequisitions(data)
  }).catch(error => {
    console.error('Houve um problema com a requisição fetch:', error);
  });
}

function setRequisitions(data) {
  let itens = []
  for(let index in data.itens) {
    itens = itens + `<p id="data">Data: ${data.itens[index].codigo} - ${data.itens[index].quantidade} unidades</p>`
  }
  document.getElementById('item-info').innerHTML = `
    <h2>${data.codigo} - ${data.observacao}</h2>
    <p id="data">Data: ${data.data}</p>
    <p class="usuario">Usuario: ${data.usuario}</p>
    <p id="status">Status: ${data.status}</p>
    <p class="aprovador">Aprovador: ${data.aprovador}</p>
    <p id="dataStatus">Data Status: ${data.dataStatus}</p>
    <p id="id">ID: ${data.id}</p>
    <h2>Item</h2>
    ${itens}
  `
}

