// js/forms.js

/**
 * Valida o formato de um e-mail.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    // Regex simples para verificar o formato do e-mail
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Adiciona a classe de erro CSS e exibe a mensagem de feedback.
 * @param {HTMLElement} input - O campo de input
 * @param {string} message - A mensagem de erro
 */
function markAsInvalid(input, message) {
    input.classList.add('is-invalid');
    
    // Remove mensagens de erro antigas, se houver
    let oldFeedback = input.nextElementSibling;
    if (oldFeedback && oldFeedback.classList.contains('error-message')) {
        oldFeedback.remove();
    }
    
    // Cria e insere a nova mensagem de erro
    const feedback = document.createElement('p');
    feedback.classList.add('error-message');
    feedback.textContent = message;
    
    input.parentNode.insertBefore(feedback, input.nextSibling);
}

/**
 * Remove a classe de erro CSS e a mensagem de feedback.
 * @param {HTMLElement} input - O campo de input
 */
function markAsValid(input) {
    input.classList.remove('is-invalid');
    
    let feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('error-message')) {
        feedback.remove();
    }
}

/**
 * Configura o listener de submit para o formulário de doação e executa a validação.
 * (Função exportada para ser chamada pelo main.js ou spa.js)
 */
export function setupDonationFormValidation() {
    const form = document.getElementById('donation-form'); 
    // É crucial que o elemento exista, por isso o if!
    if (!form) {
        console.warn("Elemento #donation-form não encontrado. Validação não inicializada.");
        return; 
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Limpa validações anteriores antes de validar
        document.querySelectorAll('.is-invalid').forEach(el => markAsValid(el));

        // 1. Validação de E-mail
        const emailInput = document.getElementById('email');
        if (emailInput && !isValidEmail(emailInput.value)) {
            markAsInvalid(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        // 2. Validação de Valor da Doação
        const valueInput = document.getElementById('donation-value');
        const donationValue = parseFloat(valueInput.value);
        if (valueInput && (isNaN(donationValue) || donationValue < 5)) {
            markAsInvalid(valueInput, 'O valor mínimo de doação é R$ 5,00.');
            isValid = false;
        }

        if (isValid) {
            alert('Doação simulada com sucesso! Obrigado pelo seu apoio.');
            form.reset();
            // Aqui você faria o fetch/envio dos dados reais
        }
    });
}