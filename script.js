const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const heroImage = document.querySelector('.hero-visual img');
const profileImage = document.querySelector('.approach-image img');
if (heroImage) heroImage.src = 'assets/mary-grace-city.webp';
if (profileImage) profileImage.src = 'assets/mary-grace-office.webp';

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (element) {
  observer.observe(element);
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
