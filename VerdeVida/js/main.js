// 1. Seleção dos Elementos do DOM
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

// 2. Função para alternar o Menu
function toggleMenu() {
    // Alterna a classe 'active' na lista de navegação.
    // Usaremos CSS para definir o que 'active' significa (mostrar/esconder).
    navList.classList.toggle('active');
    
    // 3. Atualização da Acessibilidade (ARIA)
    // O atributo 'aria-expanded' deve refletir o estado atual do menu (aberto ou fechado).
    const isExpanded = navList.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // (Opcional) Mudar o texto ou ícone do botão.
    const screenReaderText = isExpanded ? 'Fechar Menu' : 'Abrir Menu';
    menuToggle.querySelector('.sr-only').textContent = screenReaderText;
}

// 4. Adição do Listener de Evento (O coração da interatividade)
// O evento é disparado sempre que o botão for clicado.
menuToggle.addEventListener('click', toggleMenu);

// 5. Garantir que o JS só rode depois que a página estiver totalmente carregada
// Embora tenhamos o <script> no final do <body>, é uma boa prática profissional:
document.addEventListener('DOMContentLoaded', () => {
    // Aqui virão outras funções, como a Calculadora de Impacto.
    // Exemplo: initializeCalculadora();
});
// Valores de Referência (Constantes)
// Baseados em uma simulação simplificada
const CARBON_PER_KM = 0.2; // Ex: 0.2 kg CO2 por km rodado (média)
const CARBON_PER_TREE_YEAR = 22; // Ex: 22 kg CO2 absorvidos por ano por uma árvore jovem
const TREE_COST = 25; // Custo simulado para plantar e manter uma árvore (R$ 25,00)


function initializeImpactCalculator() {
    const form = document.getElementById('impact-calculator-form');
    const resultsArea = document.getElementById('results-area');

    if (!form || !resultsArea) {
        // Sai da função se o formulário ou a área de resultados não existirem na página atual
        return; 
    }

    // Função principal que processa a lógica de cálculo
    const calculateImpact = (event) => {
        // 1. Previne o comportamento padrão de submissão do formulário (que recarrega a página)
        event.preventDefault();

        // 2. Coleta e Converte os Valores
        const distanceInput = document.getElementById('distance').value;
        const donationInput = document.getElementById('donation-value').value;
        
        // Garante que os valores são números (usando parseFloat)
        const distance = parseFloat(distanceInput) || 0;
        const donation = parseFloat(donationInput) || 0;

        // 3. Lógica do Cálculo (Compensação de Carbono)
        
        // A. Cálculo da Pegada de Carbono
        const totalCarbonFootprint = distance * CARBON_PER_KM; // kg de CO2 por mês
        
        // B. Cálculo de Árvores Necessárias para Compensação
        // Para compensar a emissão mensal, dividimos pela absorção anual e multiplicamos por 12 meses.
        // É uma simplificação, mas ilustra a lógica.
        const treesToCompensateCarbon = Math.ceil(totalCarbonFootprint * 12 / CARBON_PER_TREE_YEAR);


        // 4. Lógica do Cálculo (Impacto da Doação)

        // A. Cálculo de Árvores que a Doação Financia
        const treesByDonation = Math.floor(donation / TREE_COST);
        const donationImpactCarbon = treesByDonation * CARBON_PER_TREE_YEAR;


        // 5. Renderização dos Resultados (Manipulação do DOM)
        
        let htmlContent = `<h3>Seu Potencial de Impacto no Verde Vida:</h3>`;
        
        if (distance > 0) {
            htmlContent += `
                <div class="result-card carbon-result">
                    <h4>Sua Pegada de Carbono (Simulada):</h4>
                    <p>Você emite aproximadamente <strong>${totalCarbonFootprint.toFixed(1)} kg de CO2</strong> por mês.</p>
                    <p>Para compensar sua emissão anual, você precisaria de: 
                    <strong>${treesToCompensateCarbon} Árvores</strong>.</p>
                </div>
            `;
        }
        
        if (donation >= TREE_COST) {
            htmlContent += `
                <div class="result-card donation-result">
                    <h4>Impacto da Sua Doação de R$ ${donation.toFixed(2)}:</h4>
                    <p>Sua doação financiará o plantio de <strong>${treesByDonation} Árvore(s)</strong>.</p>
                    <p>Isso ajudará a absorver até <strong>${donationImpactCarbon.toFixed(1)} kg de CO2</strong> por ano!</p>
                </div>
            `;
        } else if (donation > 0 && donation < TREE_COST) {
             htmlContent += `
                <div class="result-card donation-result">
                    <p>Sua doação de R$ ${donation.toFixed(2)} ajudará a manter nossas mudas.</p>
                    <p>Doações a partir de R$ ${TREE_COST.toFixed(2)} financiam uma árvore inteira!</p>
                </div>
            `;
        }
        
        resultsArea.innerHTML = htmlContent;
    };

    // 6. Adiciona o Listener ao Formulário (Usando o evento 'submit')
    form.addEventListener('submit', calculateImpact);
}

// Garanta que a função seja chamada na inicialização do script:
document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle (Já implementado)
    // Exemplo: toggleMenu(); 

    // Inicialização da Calculadora de Impacto
    initializeImpactCalculator(); 
});
// Função para gerar o HTML de um único card de projeto
function createProjectCardHTML(project) {
    const cardStatusClass = project.status === 'Concluído' ? 'status-completed' : 'status-ongoing';
    
    // Uso de template literals para criar strings complexas de HTML
    return `
        <article class="project-card">
            <img src="${project.image_url}" alt="Foto do projeto: ${project.title}" class="project-image">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p class="description">${project.description}</p>
                <div class="card-metrics">
                    <span class="metric">Área: <strong>${project.area_sqm} m²</strong></span>
                    <span class="metric">Árvores: <strong>${project.trees_planted}</strong></span>
                </div>
                <span class="project-status ${cardStatusClass}">${project.status}</span>
                <a href="#" class="btn btn-secondary">Ver Detalhes</a>
            </div>
        </article>
    `;
}

// Função principal para carregar os projetos usando Fetch API
async function loadProjects() {
    const container = document.getElementById('projects-container');
    
    // 1. Tratamento de Erro (Try...Catch) e Requisição Assíncrona
    try {
        // Uso da Fetch API para buscar o JSON
        const response = await fetch('data.json');
        
        // 2. Verifica se a resposta foi bem-sucedida (status 200)
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }
        
        // 3. Converte a resposta para JSON
        const projects = await response.json();
        
        // 4. Manipulação do DOM: Limpa o status "Carregando"
        container.innerHTML = ''; 
        
        // 5. Renderiza cada projeto
        projects.forEach(project => {
            const cardHTML = createProjectCardHTML(project);
            container.innerHTML += cardHTML; // Adiciona o novo HTML ao contêiner
        });
        
    } catch (error) {
        // 6. Exibe Mensagem de Erro (Acessibilidade e Usabilidade)
        console.error('Falha ao carregar os projetos:', error);
        container.innerHTML = `<p class="error-message">Não foi possível carregar os projetos no momento. Tente novamente mais tarde.</p>`;
    }
}

// Adicione a chamada da função na inicialização do DOM, junto com a calculadora:
document.addEventListener('DOMContentLoaded', () => {
    // ... toggleMenu e initializeImpactCalculator ...
    
    // Inicialização do Carregamento de Projetos (apenas na página que contém o container)
    // Você pode usar uma condição, ex: if (document.getElementById('projects-container'))
    loadProjects(); 
});
// main.js

import { initSPA } from './spa.js';
import { setupDonationFormValidation } from './forms.js';
// Importe outras funções como loadProjects, toggleMenu, etc., se estiverem em arquivos separados

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do SPA (Roteamento de Página)
    initSPA(); 
    
    // Inicialização da Validação de Formulário
    setupDonationFormValidation();
    
    // Outras inicializações já existentes (Menu, Calculadora, etc.)
    // ...
});
// js/main.js

// Importa as funções de inicialização dos módulos
import { initSPA } from './spa.js';
import { setupDonationFormValidation } from './forms.js';
// Importe outras funções que você usou, como a Calculadora de Impacto e Menu Toggle, se existirem.

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do SPA
    initSPA(); 
    
    // A validação do formulário será chamada pelo SPA quando a página 'doar.html' carregar.
    // setupDonationFormValidation(); // Chamado dentro do SPA para garantir que o formulário exista.
    
    // Aqui viriam as inicializações de funcionalidades que estão no index.html (como o menu toggle)
});
// js/main.js

import { initSPA } from './spa.js';
// Não importe setupDonationFormValidation aqui. Deixe o spa.js fazer a chamada.

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do SPA
    initSPA(); 
    
    // ... outras inicializações (Menu, Calculadora, etc.) ...
});