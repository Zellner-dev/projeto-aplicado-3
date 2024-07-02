function createSupplier() {
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
        "nome": nome, 
        "cnpj": cnpj, 
        "endereco": endereco, 
        "telefone": telefone, 
        "email": email, 
        "website": website, 
        "contato": contato,  
    }

    fetch(`http://localhost:3000/supplier`,{
        method: 'POST',
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
  