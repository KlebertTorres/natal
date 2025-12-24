document.addEventListener('DOMContentLoaded', function() {
    updateCounter();
    showImage(0);
    createMemoryGame();
    document.getElementById('enterBtn').addEventListener('click', checkPassword);
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('romantic-audio');
    if (musicBtn && audio) {
        audio.loop = true;
        musicBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '⏸️';
                musicBtn.setAttribute('aria-label', 'Pausar música');
            } else {
                audio.pause();
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = '▶️';
                musicBtn.setAttribute('aria-label', 'Tocar música');
            }
        });
    }
});

function checkPassword() {
    const password = document.getElementById('password').value;
    const correctPassword = '130322'; 
    if (password === correctPassword) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

function updateCounter() {
    const now = new Date();
    const target = new Date('2026-03-13T00:00:00');
    const diff = target - now;
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('contador').innerHTML = `Faltam ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos para nossos 4 anos de namoro! ❤️`;
    } else {
        document.getElementById('contador').innerHTML = 'Feliz Ano Novo! 🎉';
    }
    setTimeout(updateCounter, 1000);
}

let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');

function showImage(index) {
    images.forEach((img, i) => {
        img.style.opacity = i === index ? '1' : '0';
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

setInterval(nextImage, 4000);

function createMemoryGame() {
    const game = document.getElementById('game');
    const cards = ['❤️', '💕', '💖', '💘', '❤️', '💕', '💖', '💘'];
    cards.sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedCards = 0;

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${card}</div>
        `;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        game.appendChild(cardElement);
    });

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
            flippedCards.forEach(card => card.classList.add('matched'));
            matchedCards += 2;
            if (matchedCards === cards.length) {
                showPresents();
            }
        } else {
            flippedCards.forEach(card => card.classList.remove('flipped'));
        }
        flippedCards = [];
    }
}

function showPresents() {
    document.getElementById('game-instruction').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('presentes-container').style.display = 'block';
}

// Modal dos Presentes
const modal = document.getElementById('modal-presente');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const presentesData = {

    jantar: {
        titulo: ' Jantar Romântico ',
        conteudo: '<div class="emoji-grande">❤️</div><h3>Jantar Romântico</h3><p>Uma noite só nossa, luz de velas e muito amor.</p>'
    },
    especial: {
        titulo: ' Presente Especial ',
        conteudo: '<div class="emoji-grande">💝</div><h3>Presente Especial</h3><p>Algo simples para lembrar o quanto te amooo, hoje e sempre.</p>'
    },
    cinema: {
        titulo: ' Cinema Romântico ',
        conteudo: '<div class="emoji-grande">🎬</div><h3>Cinema Romântico</h3><p>Sessão aconchegante, pipoca e muitos beijos.</p>'
    }
};


// Lógica dos Presentes Fechados
document.querySelectorAll('.presente-fechado').forEach(item => {
    item.addEventListener('click', function(e) {
        // Se já foi clicado, ignora
        if (this.classList.contains('selecionado')) return;
        
        // Marca como selecionado
        this.classList.add('selecionado');
        
        const presenteType = this.getAttribute('data-presente');
        const presenteInfo = presentesData[presenteType];
        
        // Desabilita os outros presentes (mantendo-os fechados)
        document.querySelectorAll('.presente-fechado').forEach(outro => {
            if (outro !== this) {
                outro.style.pointerEvents = 'none';
            }
        });
        
        // Abre o presente escolhido após um pequeno delay
        setTimeout(() => {
            // Anima a revelação
            const presenteBox = this.querySelector('.presente-box-fechada');
            presenteBox.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            presenteBox.style.transform = 'scale(0)';
            presenteBox.style.opacity = '0';
            
            // Após a animação, mostra o conteúdo
            setTimeout(() => {
                this.classList.remove('presente-fechado');
                const presenteBox = this.querySelector('.presente-box');
                if (presenteBox) presenteBox.remove();
                
                const label = this.querySelector('p');
                label.textContent = presenteInfo.titulo;
                label.style.fontWeight = '600';
                label.style.marginTop = '15px';
                
                // Mostra o modal automaticamente
                document.getElementById('modal-body').innerHTML = presenteInfo.conteudo;
                modal.style.display = 'block';
            }, 600);
        }, 300);
    });
});
