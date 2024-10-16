export const atualizarBotao = document.getElementById('atualizar-tela');


export function atualizarBanco(){
    console.log("Atualizando banco online")
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