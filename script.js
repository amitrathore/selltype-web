document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const email = 'hello@selltype.io';
            const subject = 'I\'m interested in learning more about Selltype';
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
            window.location.href = mailtoLink;
        });
    });

    if (!document.querySelector('style[data-animations]')) {
        const animationStyles = document.createElement('style');
        animationStyles.setAttribute('data-animations', 'true');
        animationStyles.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes glow {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
                }
                50% {
                    box-shadow: 0 0 40px rgba(0, 217, 255, 0.6);
                }
            }

            .problem-card:hover {
                animation: glow 2s ease-in-out;
            }
        `;
        document.head.appendChild(animationStyles);
    }
});
