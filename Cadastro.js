// Espera o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    const mensagemResposta = document.getElementById('mensagem-resposta');

    form.addEventListener('submit', async (event) => {
        // Impede o comportamento padrão do formulário (que recarrega a página)
        event.preventDefault();

        // Pega os valores dos campos de input
        const username = document.getElementById('username').value;
        const senha = document.getElementById('senha').value;

        // Limpa mensagens anteriores
        mensagemResposta.textContent = '';
        mensagemResposta.className = '';

        try {
            // Usa a API Fetch para enviar a requisição POST para o nosso back-end
            const response = await fetch('/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Converte os dados do formulário para o formato JSON
                body: JSON.stringify({ username, senha }), 
            });

            const data = await response.json();

            if (!response.ok) {
                // Se a resposta não for bem-sucedida (status 4xx ou 5xx), lança um erro
                throw new Error(data.mensagem || 'Ocorreu um erro');
            }
            
            // Se o cadastro foi bem-sucedido
            mensagemResposta.textContent = data.mensagem;
            mensagemResposta.classList.add('sucesso');
            form.reset(); // Limpa o formulário

        } catch (error) {
            // Se ocorrer qualquer erro (de rede ou da nossa API)
            mensagemResposta.textContent = error.message;
            mensagemResposta.classList.add('erro');
        }
    });
});