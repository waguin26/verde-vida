// spa.js

const mainContent = document.getElementById('main-content');
const contentCache = {}; // Cache para armazenar conteúdo já carregado

async function loadPage(path) {
    if (contentCache[path]) {
        // Usa o conteúdo do cache, se existir
        mainContent.innerHTML = contentCache[path];
        return;
    }

    try {
        // 1. Faz a requisição HTTP para o arquivo HTML
        const response = await fetch(path);
        
        if (!response.ok) {
            throw new Error('Página não encontrada.');
        }

        // 2. Extrai o HTML como texto
        const htmlText = await response.text();
        
        // 3. Simulação de Template Parsing (apenas pega o conteúdo principal)
        // Isso é complexo, então usaremos uma forma simplificada de DOM Parser:
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        // Pega apenas o conteúdo dentro do <main>
        const newContent = doc.querySelector('#main-content').innerHTML;

        // 4. Salva no Cache e Atualiza o DOM
        contentCache[path] = newContent;
        mainContent.innerHTML = newContent;
        
        // 5. Re-inicializa funcionalidades JS específicas da nova página
        // Ex: initializeCalculadora(); se estivesse na página 'doar.html'
        
    } catch (error) {
        mainContent.innerHTML = `<section class="error-section"><h2>Erro 404</h2><p>Página ${path} não pode ser carregada.</p></section>`;
    }
}

// 6. Manipulação de Eventos e History API (Roteamento)
export function initSPA() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const path = link.getAttribute('href');
            
            // Ignora links externos ou de ação (como o botão Doe Agora)
            if (path && !path.startsWith('http') && path.endsWith('.html')) {
                e.preventDefault(); 
                
                // Carrega a nova página
                loadPage(path);
                // js/spa.js

// ... no topo:
import { setupDonationFormValidation } from './forms.js'; 
// ...

async function loadPage(path) {
    // ... (fetch e parse do HTML) ...

    mainContent.innerHTML = newContent; // O CONTEÚDO FOI INJETADO AQUI!
    
    // AGORA, INICIALIZAMOS O JS:
    if (path.includes('doar.html')) {
        console.log("Inicializando validação do formulário de doação...");
        // ESTE CHAMADO É ESSENCIAL:
        setupDonationFormValidation(); 
    }
    
    // ...
}
                
                // Atualiza a URL sem recarregar a página (History API)
                history.pushState(null, '', path);
            }
        });
    });

    // Trata o botão Voltar do navegador
    window.addEventListener('popstate', () => {
        const path = window.location.pathname.substring(1) || 'index.html';
        loadPage(path);
    });
    
    // Carrega a página inicial ao carregar o site
    const initialPath = window.location.pathname.substring(1) || 'index.html';
    loadPage(initialPath);
}
// js/spa.js

const mainContent = document.getElementById('main-content');
const contentCache = {}; 

async function loadPage(path) {
    // [CÓDIGO DE CACHE E FETCH AQUI]
    if (contentCache[path]) {
        mainContent.innerHTML = contentCache[path];
        return;
    }

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('Página não encontrada.');
        }

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        // Esta linha é crucial: ela só pega o conteúdo dentro da tag <main>
        const newContent = doc.querySelector('#main-content').innerHTML;

        contentCache[path] = newContent;
        mainContent.innerHTML = newContent;
        
        // Chama as funções JS específicas para a página carregada
        if (path.includes('doar.html')) {
            // Se a página for a de doação, inicializa a validação
            setupDonationFormValidation(); 
        }
        if (path.includes('projetos.html')) {
            // Se a página for a de projetos, carrega a galeria
            loadProjects(); 
        }
        
    } catch (error) {
        mainContent.innerHTML = `<section class="error-section"><h2>Erro 404</h2><p>Página ${path} não pode ser carregada.</p></section>`;
    }
}
// js/spa.js

const mainContent = document.getElementById('main-content');
const contentCache = {}; 

async function loadPage(path) {
    // [CÓDIGO DE CACHE E FETCH AQUI]
    if (contentCache[path]) {
        mainContent.innerHTML = contentCache[path];
        return;
    }

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('Página não encontrada.');
        }

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        // Esta linha é crucial: ela só pega o conteúdo dentro da tag <main>
        const newContent = doc.querySelector('#main-content').innerHTML;

        contentCache[path] = newContent;
        mainContent.innerHTML = newContent;
        
        // Chama as funções JS específicas para a página carregada
        if (path.includes('doar.html')) {
            // Se a página for a de doação, inicializa a validação
            setupDonationFormValidation(); 
        }
        if (path.includes('projetos.html')) {
            // Se a página for a de projetos, carrega a galeria
            loadProjects(); 
        }
        
    } catch (error) {
        mainContent.innerHTML = `<section class="error-section"><h2>Erro 404</h2><p>Página ${path} não pode ser carregada.</p></section>`;
    }
}

// O 'export' permite que outras partes do código (como o main.js) usem esta função.
export function initSPA() {
    // [CÓDIGO DE MANIPULAÇÃO DE LINKS E HISTORY API AQUI]
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const path = link.getAttribute('href');
            
            if (path && !path.startsWith('http') && path.endsWith('.html')) {
                e.preventDefault(); 
                loadPage(path);
                history.pushState(null, '', path);
            }
        });
    });

    window.addEventListener('popstate', () => {
        const path = window.location.pathname.substring(1) || 'index.html';
        loadPage(path);
    });
    
    // Carrega a página inicial ao carregar o site
    const initialPath = window.location.pathname.substring(1) || 'index.html';
    loadPage(initialPath);
}
// js/spa.js

// Adicione esta importação no topo do spa.js:
import { setupDonationFormValidation } from './forms.js'; 
// ...
// Resto do código do SPA.js...

async function loadPage(path) {
    // ... (restante do código de cache e fetch) ...
    
    // 4. Salva no Cache e Atualiza o DOM
    // ...
    mainContent.innerHTML = newContent;
    
    // 5. Re-inicializa funcionalidades JS específicas da nova página
    // ESTA É A PARTE CRUCIAL:
    if (path.includes('doar.html')) {
        setupDonationFormValidation(); // Chama a função AGORA que o HTML do formulário existe
    }
    // ...
}

// ... (Resto do código do SPA.js) ...