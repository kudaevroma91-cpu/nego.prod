const menuButton = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}));

const cases = {
  headwear: ['CASE 01 / 2026','Obladaet','Fashion CGI · Direction','assets/work-01.jpg'],
  measure: ['CASE 02 / 2026','Measure Yourself','Product concept · CGI','assets/work-02.jpg'],
  dark: ['CASE 03 / 2026','Dark Matter','Material study · CGI','assets/work-03.jpg'],
  garment: ['CASE 04 / 2026','Garment Development','Fashion CGI · Design','assets/work-04.jpg']
};
const dialog = document.querySelector('.case-dialog');
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  const data = cases[button.dataset.case];
  dialog.querySelector('.case-index').textContent = data[0];
  dialog.querySelector('h2').textContent = data[1];
  dialog.querySelector('p').textContent = data[2];
  dialog.querySelector('img').src = data[3];
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const reel = document.querySelector('.reel video');
const sound = document.querySelector('#reel-sound');
sound.addEventListener('click', () => {
  reel.muted = !reel.muted;
  sound.textContent = reel.muted ? 'Sound off' : 'Sound on';
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .08 });
document.querySelectorAll('.services-grid article,.project,.about>p,.cta h2').forEach(element => {
  element.classList.add('reveal');
  observer.observe(element);
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const cursorAura = document.querySelector('.cursor-aura');
let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let auraX = mouseX;
let auraY = mouseY;

window.addEventListener('pointermove', event => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * .16;
  ringY += (mouseY - ringY) * .16;
  auraX += (mouseX - auraX) * .075;
  auraY += (mouseY - auraY) * .075;
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;
  cursorAura.style.left = `${auraX}px`;
  cursorAura.style.top = `${auraY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a,button').forEach(element => {
  element.addEventListener('pointerenter', () => cursorRing.classList.add('is-active'));
  element.addEventListener('pointerleave', () => cursorRing.classList.remove('is-active'));
});
document.querySelectorAll('.project').forEach(element => {
  element.addEventListener('pointerenter', () => cursorRing.classList.add('is-project'));
  element.addEventListener('pointerleave', () => cursorRing.classList.remove('is-project'));
});
