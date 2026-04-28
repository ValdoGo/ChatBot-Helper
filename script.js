// 1. SELEÇÃO DE ELEMENTOS (Tudo no topo para não dar erro)
const botaoToggle = document.querySelector('.toggle');
const chatContainer = document.querySelector('.main');
const iconeToggle = document.querySelector('.toggle i');
const chatBox = document.querySelector('.msg'); 
const btnFecharTopo = document.querySelector('.fa-chevron-down'); 
const inputMsg = document.querySelector('.input-msg');
const btnEnviar = document.querySelector('.send-icon');

// Variável de controle
let primeiraMensagemEnviada = false;

// 2. O OBJETO DE FLUXO
const fluxoChat = {
    inicio: {
        texto: "Olá! Eu sou o seu assistente virtual. Como posso ajudar você hoje?",
        opcoes: [
            { texto: "💰 Financeiro", proximo: "financeiro" },
            { texto: "🛠️ Suporte Técnico", proximo: "tecnico" },
            { texto: "❓ Dúvidas Gerais", proximo: "duvidas" }
        ]
    },
    financeiro: {
        texto: "Entendido. Qual o problema no Financeiro?",
        opcoes: [
            { texto: "Segunda via de conta", proximo: "final_conta" },
            { texto: "Negociar dívida", proximo: "final_divida" },
            { texto: "⬅️ Voltar", proximo: "inicio" }
        ]
    },
    final_conta: {
        texto: "Para segunda via, você pode acessar nosso portal com seu CPF ou aguardar o código de barras por SMS.",
        opcoes: [{ texto: "🏠 Voltar ao Menu Principal", proximo: "inicio" }]
    },
    final_divida: {
        texto: "Temos planos de parcelamento em até 12x. Gostaria de falar com um atendente?",
        opcoes: [
            { texto: "Falar com Atendente", proximo: "transfere_humano" },
            { texto: "🏠 Menu Principal", proximo: "inicio" }
        ]
    },
    tecnico: {
        texto: "Opa! O que está acontecendo com sua conexão?",
        opcoes: [
            { texto: "Internet lenta", proximo: "final_internet" },
            { texto: "Sem sinal (Totalmente fora)", proximo: "final_sinal" },
            { texto: "⬅️ Voltar", proximo: "inicio" }
        ]
    },
    final_internet: {
        texto: "Muitas vezes isso resolve: desligue o roteador da tomada por 30 segundos. O problema persiste?",
        opcoes: [
            { texto: "Já fiz e continua lento", proximo: "transfere_humano" },
            { texto: "🏠 Menu Principal", proximo: "inicio" }
        ]
    },
    final_sinal: {
        texto: "Verifique os cabos. Se houver luz vermelha acesa, pode ser um rompimento de fibra.",
        opcoes: [
            { texto: "Tem luz vermelha", proximo: "transfere_humano" },
            { texto: "🏠 Menu Principal", proximo: "inicio" }
        ]
    },
    duvidas: {
        texto: "Sobre o que você gostaria de saber mais?",
        opcoes: [
            { texto: "Horários de Atendimento", proximo: "final_horario" },
            { texto: "Planos e Preços", proximo: "final_planos" },
            { texto: "⬅️ Voltar", proximo: "inicio" }
        ]
    },
    final_horario: {
        texto: "Suporte 24h. Administrativo de Seg a Sex, das 08h às 18h.",
        opcoes: [{ texto: "🏠 Menu Principal", proximo: "inicio" }]
    },
    final_planos: {
        texto: "Temos planos de 200MB até 1GB. Consulte no site oficial.",
        opcoes: [{ texto: "🏠 Menu Principal", proximo: "inicio" }]
    },
    transfere_humano: {
        texto: "Certo! Vou te transferir agora para um especialista humano. Aguarde...",
        opcoes: [{ texto: "❌ Cancelar", proximo: "inicio" }]
    }
};

// 3. FUNÇÕES DE LÓGICA
function carregarEtapa(idEtapa) {
    const etapa = fluxoChat[idEtapa];
    if (!etapa) return;

    const msgRobo = document.createElement('div');
    msgRobo.className = 'sender';
    msgRobo.innerHTML = `<i class="fas fa-robot fas1 amos"></i> 
                         <div class="sbox"><p>${etapa.texto}</p></div>`;
    chatBox.appendChild(msgRobo);

    const containerOpcoes = document.createElement('div');
    containerOpcoes.className = 'opcoes-container';

    etapa.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.innerText = opcao.texto;
        botao.className = 'btn-opcao';
        
        botao.onclick = () => {
            containerOpcoes.remove();
            const msgEscolha = document.createElement('div');
            msgEscolha.className = 'receiver'; 
            msgEscolha.innerHTML = `
                <div class="sboxr"><p>${opcao.texto}</p></div>
                <i class="fas fa-user-circle fas1 amos2"></i>`;
            chatBox.appendChild(msgEscolha);

            setTimeout(() => {
                carregarEtapa(opcao.proximo);
            }, 600); 
        };
        containerOpcoes.appendChild(botao);
    });

    chatBox.appendChild(containerOpcoes);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function enviarMensagemManual() {
    const texto = inputMsg.value.trim();
    if (texto !== "") {
        const msgUser = document.createElement('div');
        msgUser.className = 'receiver';
        msgUser.innerHTML = `<div class="sboxr"><p>${texto}</p></div>
                             <i class="fas fa-user-circle fas1 amos2"></i>`;
        chatBox.appendChild(msgUser);
        inputMsg.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        if (!primeiraMensagemEnviada) {
            primeiraMensagemEnviada = true;
            setTimeout(() => {
                const msgBot = document.createElement('div');
                msgBot.className = 'sender';
                msgBot.innerHTML = `<i class="fas fa-robot fas1 amos"></i>
                                    <div class="sbox"><p>Mensagem recebida! Um atendente responderá em breve. 👨‍💻</p></div>`;
                chatBox.appendChild(msgBot);
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1000);
        }
    }
}

// 4. FUNÇÕES DE ABERTURA/FECHAMENTO
function abrirChat() {
    chatBox.innerHTML = ""; 
    chatContainer.classList.remove('hidden');
    iconeToggle.classList.replace('fa-comments', 'fa-times');
    primeiraMensagemEnviada = false;
    carregarEtapa('inicio'); 
}

function fecharChat() {
    chatContainer.classList.add('hidden');
    iconeToggle.classList.replace('fa-times', 'fa-comments');
    chatBox.innerHTML = ""; 
}

// 5. EVENTOS
botaoToggle.addEventListener('click', () => {
    if (chatContainer.classList.contains('hidden')) {
        abrirChat();
    } else {
        fecharChat();
    }
});

if (btnFecharTopo) {
    btnFecharTopo.addEventListener('click', (e) => {
        e.stopPropagation();
        fecharChat();
    });
}

btnEnviar.addEventListener('click', enviarMensagemManual);

inputMsg.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarMensagemManual();
    }
});


