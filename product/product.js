getRequisition()
function getRequisition() {
  const id = localStorage.getItem("itemId")
  fetch(`http://localhost:3000/product/${id}`,{
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
  document.getElementById('item-info').innerHTML = `
    <h2>${data.nome}</h2>
    <p id="codigo">Codigo: ${data.codigo}</p>
    <p class="categoria">Categoria: ${data.categoria}</p>
    <p id="descricao">Descricao: ${data.descricao}</p>
    <p class="quantidadeEstoque">Quantidade Estoque: ${data.quantidadeEstoque}</p>
    <p id="unidadeMedida">Unidade Medida: ${data.unidadeMedida}</p>
    <p id="valorUnitario">Valor Unitario: R$${data.valorUnitario}</p>
    <p id="status">Status: ${data.status}</p>
  `
}

function deleteItem() {
  const id = localStorage.getItem("itemId")
  console.log(id);
  fetch(`http://localhost:3000/product/${id}`,{
    method: 'DELETE',
  }
  ).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // ou response.text() dependendo do tipo de resposta
  }).then(data => {
      window.location.replace('../index.html');
  }).catch(error => {
    console.error('Houve um problema com a requisição fetch:', error);
  });
}


