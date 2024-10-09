import * as repositorio from "/js/repositorio/repositorio.js";

const adicionarPopup = document.querySelector('#adicionar-popup');
const adicionarBotao = document.getElementById('adicionar');
const fecharJanelaBotao = document.getElementById('fechar');

function adicionarScreen(){
    if (adicionarPopup.style.display === 'none') {
        adicionarPopup.style.display = 'flex';
    } else {
        adicionarPopup.style.display = 'none';
    }
}

function fecharJanela(){
    adicionarPopup.style.display = 'none';
}

adicionarBotao.addEventListener('click', adicionarScreen);

repositorio.atualizarBotao.addEventListener('click', repositorio.atualizarBanco)

fecharJanelaBotao.addEventListener('click', fecharJanela)

// TODO continuação
//{Fazer o login mobile, autenticar com o firebase e depois fetch customizado com o item em lista, em seguida func atualizarBanco}