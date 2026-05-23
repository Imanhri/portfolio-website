const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const teamSlider = document.getElementById('teamSlider');
const slideLeftBtn = document.getElementById('slideLeft');
const slideRightBtn = document.getElementById('slideRight');

const setMobileMenuState = (isOpen) => {
    mobileMenu.classList.toggle('active', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    openMenuBtn.setAttribute('aria-expanded', String(isOpen));
};

const scrollToSection = (targetSelector) => {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuState(false);
};

document.querySelectorAll('[data-scroll-target]').forEach((control) => {
    control.addEventListener('click', (event) => {
        const targetSelector = control.getAttribute('data-scroll-target');
        if (!targetSelector) return;
        event.preventDefault();
        scrollToSection(targetSelector);
    });
});

openMenuBtn.addEventListener('click', () => setMobileMenuState(true));
closeMenuBtn.addEventListener('click', () => setMobileMenuState(false));

window.closeMenuFunc = () => setMobileMenuState(false);

slideLeftBtn.addEventListener('click', () => {
    teamSlider.scrollBy({ left: -400, behavior: 'smooth' });
});

slideRightBtn.addEventListener('click', () => {
    teamSlider.scrollBy({ left: 400, behavior: 'smooth' });
});
