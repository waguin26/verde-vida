# 🌳 Projeto Verde Vida: Restauração Ambiental (Entrega Final - UNIDADE 4)

## 🎯 Sobre o Projeto
O Projeto Verde Vida é um website desenvolvido como Single Page Application (SPA) para promover e gerenciar doações destinadas à restauração de áreas de mata nativa.

O site foi construído seguindo os princípios de acessibilidade WCAG 2.1 Nível AA e otimizado para produção, conforme os requisitos da disciplina.

## ⚙️ Tecnologias Utilizadas
* HTML5 Semântico
* CSS3 (Utilizando Flexbox e Grid)
* JavaScript ES6 (Módulos e SPA - Single Page Application)
* Controle de Versão: Git e GitHub (Estratégia GitFlow)

---

## ✅ Versionamento e GitFlow (Requisito da Unidade 4)

Este projeto segue a metodologia GitFlow para gerenciar o desenvolvimento e as entregas.

### 🌿 Estratégia de Branching
* **main:** Branch estável, reflete o código em produção (a cada release).
* **develop:** Branch de integração onde todas as novas funcionalidades são construídas e testadas.

### 📝 Histórico e Commits
Todos os commits seguem um padrão semântico:
* `feat:` (Nova funcionalidade, ex: Modo Escuro)
* `fix:` (Correção de bugs)
* `perf:` (Melhoria de performance, ex: Compressão de Imagens)

---

## ♿ Acessibilidade (WCAG 2.1 Nível AA)

O projeto foi auditado e ajustado para atender aos critérios de acessibilidade:

* **Navegação por Teclado:** Todos os elementos interativos (`<a>`, `<button>`, `input`) são acessíveis sequencialmente via tecla **TAB**.
* **Modo Escuro / Alto Contraste:** Implementado via *media query* `prefers-color-scheme: dark` para atender ao requisito de alto contraste.
* **Semântica:** Uso correto de tags como `<header>`, `<nav>`, `<main>`, `<footer>`, e atributos `aria-label` onde necessário (ex: botões sem texto).
* **Contraste:**  Contraste de texto principal de 5.2:1 (acima do mínimo 4.5:1).

---

## 🚀 Otimização para Produção

* **Minificação:** Os arquivos CSS e HTML foram minificados. (Observação: Arquivos JS foram mantidos na versão legível/funcional para garantir a estabilidade do SPA).
* **Compressão de Imagens:** Todas as imagens na pasta `img/` foram comprimidas usando [COLOQUE AQUI: Nome da Ferramenta, ex: TinyPNG], resultando em [COLOQUE AQUI: % de economia, ex: 60%] de economia de dados.

---

## 🛠️ Como Rodar Localmente

1.  Clone o repositório: `git clone https://github.com/waguin26/verde-vida.git`
2.  Navegue até a pasta do projeto: `cd verde-vida`
3.  Abra o arquivo `index.html` em seu navegador via **Live Server** (recomendado) ou abrindo o arquivo diretamente.

**Autor:**
[Wagner de Paula Galvão]