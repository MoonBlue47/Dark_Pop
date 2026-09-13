document.addEventListener('DOMContentLoaded', () => {
    // 1. Catálogo Simulado de Faixas
    const faixas = [
        { titulo: "After Hours — The Weeknd", tempo: "01:24 / 06:01" },
        { titulo: "bury a friend — Billie Eilish", tempo: "00:45 / 03:13" },
        { titulo: "Ribs — Lorde", tempo: "02:10 / 04:18" },
        { titulo: "Swim — Chase Atlantic", tempo: "01:05 / 03:48" }
    ];

    let indiceAtual = 0;
    let tocando = false;
    let intervaloAnimacao = null;

    // Elementos da UI
    const tituloEl = document.getElementById('current-track-title');
    const tempoEl = document.getElementById('current-track-time');
    const btnPlay = document.getElementById('btn-play');
    const playIcon = document.getElementById('play-icon');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const waveformContainer = document.getElementById('waveform');

    // 2. Gerar Barras da Waveform Dinamicamente
    const TOTAL_BARRAS = 48;
    for (let i = 0; i < TOTAL_BARRAS; i++) {
        const barra = document.createElement('div');
        barra.classList.add('wave-bar');
        // Altura padrão inicial estática
        barra.style.height = `${Math.floor(Math.random() * 35) + 15}%`;
        waveformContainer.appendChild(barra);
    }

    const barras = document.querySelectorAll('.wave-bar');

    // 3. Função de Animação de Áudio
    function animarOnda() {
        barras.forEach((barra, index) => {
            if (tocando) {
                const alturaRandom = Math.floor(Math.random() * 85) + 15;
                barra.style.height = `${alturaRandom}%`;
                // Pinta de vermelho até metade para simular progresso
                if (index < TOTAL_BARRAS * 0.4) {
                    barra.classList.add('active');
                } else {
                    barra.classList.remove('active');
                }
            } else {
                barra.style.height = '15%';
                barra.classList.remove('active');
            }
        });
    }

    // 4. Ações de Play / Pause
    btnPlay.addEventListener('click', () => {
        tocando = !tocando;
        if (tocando) {
            playIcon.classList.replace('bi-play-fill', 'bi-pause-fill');
            intervaloAnimacao = setInterval(animarOnda, 120);
        } else {
            playIcon.classList.replace('bi-pause-fill', 'bi-play-fill');
            clearInterval(intervaloAnimacao);
            animarOnda();
        }
    });

    // 5. Troca de Faixa
    function atualizarFaixa(index) {
        tituloEl.textContent = faixas[index].titulo;
        tempoEl.textContent = faixas[index].tempo;
    }

    btnNext.addEventListener('click', () => {
        indiceAtual = (indiceAtual + 1) % faixas.length;
        atualizarFaixa(indiceAtual);
    });

    btnPrev.addEventListener('click', () => {
        indiceAtual = (indiceAtual - 1 + faixas.length) % faixas.length;
        atualizarFaixa(indiceAtual);
    });
});