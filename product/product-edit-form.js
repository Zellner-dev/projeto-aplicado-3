getSupplier()
getItem()

function getItem() {
    const id = localStorage.getItem("itemId")
    fetch(`http://localhost:3000/product/${id}`,{
        method: 'GET',
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        setItem(data)
    }).catch(error => {
        console.error('Houve um problema com a requisição fetch:', error);
    });
}

function getSupplier() {
    fetch(`http://localhost:3000/supplier/`,{
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
    let list = []
    for(let index in data) {
      list = list + `<option value="${data[index].id}">${data[index].nome}</option>`
    }
    document.getElementById('suppliers').innerHTML = list
}

function setItem(data) {
    document.getElementById('codigo').value = data.codigo
    document.getElementById('nome').value = data.nome
    document.getElementById('descricao').value = data.descricao
    document.getElementById('categoria').value = data.categoria
    document.getElementById('unidadeMedida').value = data.unidadeMedida
    document.getElementById('quantidadeEstoque').value = data.quantidadeEstoque
    document.getElementById('valorUnitario').value = data.valorUnitario
    document.getElementById('suppliers').value = data.fornecedor
}

function updateItem() {
    const codigo = document.getElementById('codigo').value.trim()
    const nome = document.getElementById('nome').value.trim()
    const descricao = document.getElementById('descricao').value.trim()
    const categoria = document.getElementById('categoria').value.trim()
    const unidadeMedida = document.getElementById('unidadeMedida').value.trim()
    const quantidadeEstoque = document.getElementById('quantidadeEstoque').value.trim()
    const valorUnitario = document.getElementById('valorUnitario').value.trim()
    const fornecedor = document.getElementById('suppliers').value.trim()
    
    if(codigo == "" || nome == "" || descricao == "" || categoria == "" || unidadeMedida == "" 
        || quantidadeEstoque == "" || valorUnitario == "" || fornecedor == "") {
        alert("Preencha o formulário corretamente.")
        return;
    }

    const body = {
        codigo : codigo,
        nome : nome,
        descricao : descricao,
        categoria : categoria,
        unidadeMedida : unidadeMedida,
        quantidadeEstoque : parseInt(quantidadeEstoque),
        valorUnitario : parseFloat(valorUnitario),
        fornecedor : parseInt(fornecedor),
        status : "ativo",
        id: parseInt(localStorage.getItem("itemId"))
    }

    fetch(`http://localhost:3000/product/${localStorage.getItem("itemId")}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // ou response.text() dependendo do tipo de resposta
    }).then(data => {
        console.log(data)
        window.location.replace('../index.html');
    }).catch(error => {
        console.error('Houve um problema com a requisição fetch:', error);
    });
}
  