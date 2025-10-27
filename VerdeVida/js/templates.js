// templates.js

// Usa template literals para criar strings complexas de HTML.
// Isso é o cerne do sistema de templates JavaScript.

export function createProjectCardHTML(project) {
    const cardStatusClass = project.status === 'Concluído' ? 'badge-concluido' : 'badge-andamento';
    
    return `
        <article class="project-card col-lg-4 col-md-6 col-12"> 
            <img src="${project.image_url}" alt="Foto do projeto: ${project.title}" class="card-image">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p class="description">${project.description.substring(0, 100)}...</p>
                <div class="card-metrics">
                    <span class="metric">Área: <strong>${project.area_sqm} m²</strong></span>
                    <span class="metric">Árvores: <strong>${project.trees_planted}</strong></span>
                </div>
                <span class="badge ${cardStatusClass}">${project.status}</span>
                <a href="#detalhes/${project.id}" class="btn btn-secondary">Ver Detalhes</a>
            </div>
        </article>
    `;
}

// Outras funções de template (ex: para gerar alertas, modais, etc.) podem ir aqui.
// js/templates.js

// Usa Template Literals para criar strings HTML - Requisito: Sistema de Templates
export function createProjectCardHTML(project) {
    const cardStatusClass = project.status === 'Concluído' ? 'badge-concluido' : 'badge-andamento';
    
    return `
        <article class="project-card col-lg-4 col-md-6 col-12"> 
            <img src="${project.image_url}" alt="Foto do projeto: ${project.title}" class="card-image">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p class="description">${project.description.substring(0, 100)}...</p>
                <div class="card-metrics">
                    <span class="metric">Área: <strong>${project.area_sqm} m²</strong></span>
                    <span class="metric">Árvores: <strong>${project.trees_planted}</strong></span>
                </div>
                <span class="badge ${cardStatusClass}">${project.status}</span>
                <a href="#detalhes/${project.id}" class="btn btn-secondary">Ver Detalhes</a>
            </div>
        </article>
    `;
}
// Note: Este é um módulo "passivo", ele só fornece as templates.