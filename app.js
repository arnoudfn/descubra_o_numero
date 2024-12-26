const numerosSorteados = [];
const numeroLimite = 100;
let numeroSecreto;
let tentativas;

//Exibe o texto na tela + voz
function textoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function mensagemInicial() {
    textoNaTela('h1', 'Descubra o número');
    textoNaTela('p', 'Escolhe um número entre 1 e 100');
}

function verificarChute() {
    const chute = parseInt(document.querySelector('input').value); // Converte para número

    if (isNaN(chute)) { // Verifica se a entrada é um número válido
        textoNaTela('p', 'Por favor, digite um número válido.');
        return; // Sai da função sem continuar a verificação
    }
    
    if (chute === numeroSecreto) {
        textoNaTela('h1', 'Acertou!');
        const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        textoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Ativa o botão
    } else {
        if (chute > numeroSecreto) {
            textoNaTela('p', 'O número secreto é menor');
        } else {
            textoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function numeroAleatorio() {
    if (numerosSorteados.length === numeroLimite) {
        numerosSorteados.length = 0;
    }

    let numeroEscolhido;
    do {
        numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    } while (numerosSorteados.includes(numeroEscolhido));

    numerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    iniciarJogo();
}

function iniciarJogo() {
    numeroSecreto = numeroAleatorio();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desativa o botão no início
    limparCampo(); // Limpa o campo de input ao reiniciar o jogo
}

iniciarJogo(); // Inicia o jogo pela primeira vez