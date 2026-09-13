document.addEventListener('DOMContentLoaded', () => {
    // 1. Catálogo Expandido de Músicas Representativas
    const faixas = [
        { 
            titulo: "After Hours", 
            artista: "The Weeknd", 
            tempo: "01:24 / 06:01", 
            album: "After Hours (2020)",
            spotifyUrl: "https://open.spotify.com/intl-pt/track/2p8IUWQDrpjuFltbdgLOag?si=edd4cbbd5f154506"
        },
        { 
            titulo: "bury a friend", 
            artista: "Billie Eilish", 
            tempo: "00:45 / 03:13", 
            album: "WHEN WE ALL FALL ASLEEP (2019)",
            spotifyUrl: "https://open.spotify.com/intl-pt/album/0lheRPWdziAtZEiww8TrUO?si=T1R2lWwkTiKb_UAGyMtBww"
        },
        { 
            titulo: "Ribs", 
            artista: "Lorde", 
            tempo: "02:10 / 04:18", 
            album: "Pure Heroine (2013)",
            spotifyUrl: "https://open.spotify.com/intl-pt/track/2MvvoeRt8NcOXWESkxWn3g?si=0a3f3b5ff91b43fc"
        },
        { 
            titulo: "Swim", 
            artista: "Chase Atlantic", 
            tempo: "01:05 / 03:48", 
            album: "Chase Atlantic (2017)",
            spotifyUrl: "https://open.spotify.com/intl-pt/track/3M0lSi5WW79CXQamgSBIjx?si=f56b5e5619b9440c"
        },
        { 
            titulo: "Waiting Game", 
            artista: "BANKS", 
            tempo: "00:52 / 03:27", 
            album: "Goddess (2014)",
            spotifyUrl: "https://open.spotify.com/intl-pt/track/6hXFICcuHc6O7peLkDN4ZU?si=f9475826f750400f"
        },
        { 
            titulo: "Streets", 
            artista: "Doja Cat", 
            tempo: "01:40 / 03:47", 
            album: "Hot Pink (2019)",
            spotifyUrl: "https://open.spotify.com/intl-pt/track/60ynsPSSKe6O3sfwRnIBRf?si=11a7859482824aab"
        },
        { 
            titulo: "BABYDOLL", 
            artista: "Ari Abdul", 
            tempo: "01:12 / 03:39", 
            album: "Fallen Angel (2022)",
            spotifyUrl: "https://open.spotify.com/intl-pt/track/5rPNVwYjVEgkq6YNPki4Zc?si=2b39b8987c95406b"
        },
        { 
            titulo: "i'm yours", 
            artista: "Isabel LaRosa", 
            tempo: "00:58 / 02:37", 
            album: "i'm yours (2022)",
            spotifyUrl: "https://open.spotify.com/intl-pt/track/37vVp2sWHuuIBOSl1NswP6?si=5fdb1fd74f3f4e32"
        }
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
    const playlistContainer = document.getElementById('playlist-container');

    // 2. Renderizar Playlist Clicável
   function renderizarPlaylist() {
        playlistContainer.innerHTML = '';
        faixas.forEach((faixa, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item d-flex justify-content-between align-items-center ${index === indiceAtual ? 'active' : ''}`;
            
            item.innerHTML = `
                <div class="d-flex align-items-center gap-3">
                    <span class="text-secondary small font-monospace">${String(index + 1).padStart(2, '0')}</span>
                    <div>
                        <div class="track-name fw-semibold text-white small">${faixa.titulo}</div>
                        <div class="text-secondary extra-small" style="font-size: 0.75rem;">${faixa.artista} • ${faixa.album}</div>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <a href="${faixa.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="spotify-link" title="Ouvir no Spotify">
                        <i class="bi bi-spotify"></i>
                    </a>
                    <i class="bi ${index === indiceAtual && tocando ? 'bi-soundwave text-accent' : 'bi-play-circle text-secondary'} fs-5"></i>
                </div>
            `;

            // Clique no item troca a faixa no player
            item.addEventListener('click', () => {
                indiceAtual = index;
                atualizarFaixa(indiceAtual);
                if (!tocando) iniciarReproducao();
            });

            // Evita que clicar no ícone do Spotify altere a faixa tocando no player
            const spotifyBtn = item.querySelector('.spotify-link');
            spotifyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            playlistContainer.appendChild(item);
        });
    }

    // 3. Gerar Barras da Waveform
    const TOTAL_BARRAS = 48;
    for (let i = 0; i < TOTAL_BARRAS; i++) {
        const barra = document.createElement('div');
        barra.classList.add('wave-bar');
        barra.style.height = `${Math.floor(Math.random() * 35) + 15}%`;
        waveformContainer.appendChild(barra);
    }
    const barras = document.querySelectorAll('.wave-bar');

    // 4. Animação de Áudio
    function animarOnda() {
        barras.forEach((barra, index) => {
            if (tocando) {
                const alturaRandom = Math.floor(Math.random() * 85) + 15;
                barra.style.height = `${alturaRandom}%`;
                if (index < TOTAL_BARRAS * 0.45) {
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

    function iniciarReproducao() {
        tocando = true;
        playIcon.classList.replace('bi-play-fill', 'bi-pause-fill');
        intervaloAnimacao = setInterval(animarOnda, 120);
        renderizarPlaylist();
    }

    function pausarReproducao() {
        tocando = false;
        playIcon.classList.replace('bi-pause-fill', 'bi-play-fill');
        clearInterval(intervaloAnimacao);
        animarOnda();
        renderizarPlaylist();
    }

    // 5. Controles
    btnPlay.addEventListener('click', () => {
        if (tocando) {
            pausarReproducao();
        } else {
            iniciarReproducao();
        }
    });

    function atualizarFaixa(index) {
        tituloEl.textContent = `${faixas[index].titulo} — ${faixas[index].artista}`;
        tempoEl.textContent = faixas[index].tempo;
        renderizarPlaylist();
    }

    btnNext.addEventListener('click', () => {
        indiceAtual = (indiceAtual + 1) % faixas.length;
        atualizarFaixa(indiceAtual);
    });

    btnPrev.addEventListener('click', () => {
        indiceAtual = (indiceAtual - 1 + faixas.length) % faixas.length;
        atualizarFaixa(indiceAtual);
    });

    // Inicia a playlist renderizada na tela
    renderizarPlaylist();
});