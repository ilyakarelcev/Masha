// Confetti Effect
function celebrate() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Reveal on Scroll
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Modal logic
function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "flex";
    modalImg.src = src;
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Sparkles/Stars Background (Simple simulation)
function createStars() {
    const container = document.getElementById('canvas-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.opacity = Math.random();

        // Glow effect
        star.style.boxShadow = `0 0 ${Math.random() * 5}px white`;

        // Animation
        const duration = 3 + Math.random() * 5;
        star.style.animation = `twinkle ${duration}s infinite ease-in-out`;

        container.appendChild(star);
    }
}

// CSS for twinkle (injected via JS for simplicity or could be in style.css)
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
    }
`;
document.head.appendChild(style);

// Compliments / Secret Wishes
const compliments = [
    "Маша, ты невероятно оригинальная личность! 🎨",
    "Твоя энергия по-настоящему заряжает! ✨",
    "Оставайся всегда такой же яркой и настоящей! 🌟",
    "Ты умеешь делать этот мир интереснее! 🎈",
    "Пусть твоя красота и харизма только расцветают! 💫",
    "Желаю тебе море крутых событий и позитива! 🌈",
    "Радости, вдохновения и гармонии в этот чудесный день! 💐"
];

function showSecretWish() {
    const wishText = compliments[Math.floor(Math.random() * compliments.length)];
    const messageEl = document.querySelector('.message p');
    messageEl.textContent = wishText;

    // Extra confetti for the wish
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#ffd93d', '#6c5ce7']
    });
}

const photos = [
    "photo_2025-12-05_14-33-50.jpg",
    "photo_2026-01-31_15-55-19.jpg"
];
let currentPhotoIndex = 0;

function togglePhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    const photoEl = document.getElementById('masha-photo');

    // Add a quick fade out/in effect
    photoEl.style.opacity = '0';
    setTimeout(() => {
        photoEl.src = photos[currentPhotoIndex];
        photoEl.style.opacity = '1';

        // Small puff of confetti on change
        confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.3 }
        });
    }, 200);
}

window.addEventListener("scroll", reveal);


window.onload = () => {
    celebrate();
    reveal();
    createStars();

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
};
