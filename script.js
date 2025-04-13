function mascararCEP(input) {
    let cep = input.value.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 9);
    }
    input.value = cep;
}

function buscarCEP() {
    const cepInput = document.getElementById("cep");
    const cep = cepInput.value.replace(/\D/g, '');
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = "Buscando...";

    if (cep.length !== 8) {
        resultadoDiv.innerHTML = `<span class="erro">CEP inválido. Digite 8 números.</span>`;
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultadoDiv.innerHTML = `<span class="erro">CEP não encontrado.</span>`;
            } else {
                resultadoDiv.innerHTML = `
                    <strong>Rua:</strong> ${data.logradouro} <br>
                    <strong>Bairro:</strong> ${data.bairro} <br>
                    <strong>Cidade:</strong> ${data.localidade} <br>
                    <strong>Estado:</strong> ${data.uf}
                `;
                cepInput.value = "";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            resultadoDiv.innerHTML = `<span class="erro">Erro na requisição. Tente novamente.</span>`;
        });
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        buscarCEP();
    }
}

window.onload = function() {
    document.getElementById('cep').focus();
};