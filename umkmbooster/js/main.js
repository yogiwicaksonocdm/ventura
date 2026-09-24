
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    const revealItems = document.querySelectorAll('.process-card, .pricing-card, .service-card, .affiliate-section .card, .hero-section .row > div');
    revealItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
    });

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));

    const heroVisual = document.querySelector('.hero-visual');
    const supportsPointerMotion = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
    if (heroVisual && supportsPointerMotion) {
        heroVisual.addEventListener('pointermove', (event) => {
            const bounds = heroVisual.getBoundingClientRect();
            const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -3;
            const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 3;
            heroVisual.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        heroVisual.addEventListener('pointerleave', () => {
            heroVisual.style.transform = '';
        });
    }
});
