# 🌑 Dark Pop — When the Beautiful Gets Darker

> Landing page editorial interativa e imersiva dedicada ao subgênero Dark Pop, combinando estética *Crimson Noir*, tipografia refinada e player de áudio dinâmico com simulação de onda sonora (waveform).

---

## 🎯 Sobre o Projeto

O **Dark Pop** é uma plataforma editorial e visual criada para documentar e celebrar a interseção entre o pop moderno, frequências graves noturnas e estéticas cinematográficas (The Weeknd, Billie Eilish, Lorde, Chase Atlantic).

O objetivo do projeto foi explorar o design de interfaces escuras (*Dark UI*), alta responsividade e manipulação do DOM em tempo real via JavaScript, integrando inteligência artificial no processo criativo e de prototipagem.

---

## 🤖 Engenharia com IA & Desenvolvimento Híbrido

Este projeto demonstra a capacidade prática de atuar em **fluxo assistido por IA (AI-Assisted Development)**:

* **Curadoria & Copywriting Editorial:** Utilização de prompts direcionados para estruturação histórica (timeline de 2011 ao presente), categorização de subgêneros e descrições sonoras.
* **Prototipagem Rápida:** Geração de estruturas base de componentes e layout inicial.
* **Refinamento Técnico Manual:** 
  - Ajuste e isolamento de eventos de propagação no DOM (`e.stopPropagation()` nos links diretos para o Spotify).
  - Animação vetorial e cálculo procedural das 48 barras do simulador de waveform.
  - Customização refinada da paleta CSS (*Crimson Noir*: `#0D0D0D`, `#161616`, `#FF1744`) com variáveis nativas e backdrop filters.

---

## ✨ Funcionalidades Principais

* 🎵 **Player Interativo com Waveform Dinâmica:** Simulador de espectro de áudio com barras renderizadas proceduralmente e animações aleatórias em loop sincronizadas ao estado de *play/pause*.
* 📜 **Playlist Conectada:** Lista de faixas com troca dinâmica de trilha, indicação visual da música em reprodução e links externos diretos para o Spotify.
* ⏳ **Linha do Tempo Evolutiva:** Cronologia vertical com marcos históricos e estilização de nós em neon com sombras difusas.
* 📱 **Design Responsivo & Efeito Glassmorphism:** Navegação sticky com desfoque de fundo (`backdrop-filter: blur`), grid responsivo em Bootstrap 5 e efeitos de *hover* e *glitch*.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico:** Estrutura clara dividida em seções temáticas (`header`, `main`, `section`, `footer`).
* **CSS3 Moderno:** Variáveis CSS (`:root`), flexbox, gradients radiais, transições e pseudo-elementos.
* **Bootstrap 5 & Icons:** Grid flexível, utilitários de layout e ícones vetoriais.
* **JavaScript (Vanilla / ES6+):** Manipulação dinâmica do DOM, controle de arrays/objetos de dados, `setInterval` para animações e escutadores de eventos (`click`, `DOMContentLoaded`).

---

## 📁 Estrutura de Arquivos

```text
├── index.html       # Estrutura semântica e conteúdo editorial
├── styles.css       # Variáveis, tema Crimson Noir, componentes e responsividade
├── script.js        # Catálogo de faixas, controle do player e animação da waveform
└── README.md        # Documentação do projeto
