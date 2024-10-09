const adicionarPopup = document.querySelector('#adicionar-popup');
const adicionarBotao = document.getElementById('adicionar');
const atualizarBotao = document.getElementById('atualizar');
const fecharJanelaBotao = document.getElementById('fechar');

function adicionarScreen(){
    if (adicionarPopup.style.display === 'none') {
        adicionarPopup.style.display = 'flex';
    } else {
        adicionarPopup.style.display = 'none';
    }
}

function atualizarBanco(){
    console.log("Atualizando banco online")
    //TODO fetch banco de dados 
}

function fecharJanela(){
    adicionarPopup.style.display = 'none';
}

// Teste de fetch p/ lista
// async function renderizarLista() {
//     const dados = await fetchDados();
//     const lista = document.getElementById('lista');
//     lista.innerHTML = ''; // Limpa a lista antes de renderizar

//     dados.forEach(item => {
//         const li = document.createElement('li');
//         li.textContent = item.nome;
//         li.classList.add('item');
        
//         if (item.custom) {
//             li.classList.add('custom'); // Adiciona a classe custom se necessário
//         }

//         lista.appendChild(li);
//     });
// }

adicionarBotao.addEventListener('click', adicionarScreen);

atualizarBotao.addEventListener('click', atualizarBanco)

fecharJanelaBotao.addEventListener('click', fecharJanela)

// TODO continuação
//{Fazer o login mobile, autenticar com o firebase e depois fetch customizado com o item em lista, em seguida func atualizarBanco}