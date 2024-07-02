getRequisition()

function getRequisition() {
    const id = localStorage.getItem("supplierId")
    fetch(`http://localhost:3000/supplier/${id}`,{
        method: 'GET',
    }).then(response => {
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
    document.getElementById('nome').value = data.nome
    document.getElementById('cnpj').value = data.cnpj
    document.getElementById('endereco').value = data.endereco
    document.getElementById('telefone').value = data.telefone
    document.getElementById('email').value = data.email
    document.getElementById('website').value = data.website
    document.getElementById('contato').value = data.contato
}

function updateSupplier() {
    const id = parseInt(localStorage.getItem("supplierId"))
    const nome = document.getElementById('nome').value.trim()
    const cnpj = document.getElementById('cnpj').value.trim()
    const endereco = document.getElementById('endereco').value.trim()
    const telefone = document.getElementById('telefone').value.trim()
    const email = document.getElementById('email').value.trim()
    const website = document.getElementById('website').value.trim()
    const contato = document.getElementById('contato').value.trim()
    
    if(nome == "" || cnpj == "" || telefone == "" || email == "" || endereco == "" 
        || website == "" || contato == "") {
        alert("Preencha o formulário corretamente.")
        return;
    }

    const body = {
        id: id,
        nome: nome,
        cnpj: cnpj,
        endereco: endereco,
        telefone: telefone,
        email: email,
        website: website,
        contato: contato,
    }

    fetch(`http://localhost:3000/supplier/${localStorage.getItem("supplierId")}`,{
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
        window.location.replace('./supplier-list.html');
    }).catch(error => {
        console.error('Houve um problema com a requisição fetch:', error);
    });
}
  