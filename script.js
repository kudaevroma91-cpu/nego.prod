const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  if (glow) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}));

const dialog = document.querySelector('.case-dialog');
const cases = {
  measure: ['CASE 01 / 2026', 'Measure Yourself', 'Продуктовый концепт, в котором повседневный аксессуар превращается в измерительный инструмент и визуальный statement.', 'assets/work-02.jpg', 'Concept / Art direction / CGI'],
  headwear: ['CASE 02 / 2026', 'Obladaet Headwear', 'Исследование формы, типографики и фактуры в серии цифровых fashion-аксессуаров.', 'assets/work-01.jpg', 'Fashion CGI / Direction'],
  dark: ['CASE 03 / 2026', 'Dark Matter', 'Монохромное исследование материала и света для fashion-продукта.', 'assets/work-03.jpg', 'Material study / CGI'],
  motion: ['CASE 04 / 2026', 'Visual Experiments', 'Серия коротких motion-экспериментов, созданных для вертикальных digital-платформ.', 'assets/work-04.jpg', 'Motion / Social content']
};
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  const data = cases[button.dataset.case];
  dialog.querySelector('.dialog-kicker').textContent = data[0];
  dialog.querySelector('h2').textContent = data[1];
  dialog.querySelector('p').textContent = data[2];
  dialog.querySelector('img').src = data[3];
  dialog.querySelector('.dialog-meta span').textContent = data[4];
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const selections = {};
const briefOutput = document.querySelector('#brief-output');
const briefTitle = document.querySelector('#brief-title');
document.querySelectorAll('.option-list').forEach(group => {
  group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    group.querySelectorAll('button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    selections[group.dataset.group] = button.textContent;
    const parts = [];
    if (selections.type) parts.push(`Нужно: ${selections.type}.`);
    if (selections.client) parts.push(`Проект для категории «${selections.client}».`);
    if (selections.time) parts.push(`Желаемый запуск: ${selections.time.toLowerCase()}.`);
    briefTitle.textContent = selections.type || 'Новый проект';
    briefOutput.textContent = parts.join(' ');
  }));
});

const copyButton = document.querySelector('#copy-brief');
copyButton.addEventListener('click', async () => {
  const text = `Привет! Хочу обсудить проект с NEGO PROD. ${briefOutput.textContent}`;
  try {
    await navigator.clipboard.writeText(text);
    copyButton.innerHTML = 'Бриф скопирован <span>✓</span>';
    setTimeout(() => { copyButton.innerHTML = 'Скопировать бриф <span>↗</span>'; }, 2200);
  } catch {
    copyButton.textContent = 'Выбери параметры выше';
  }
});

document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (!detail.open) return;
  document.querySelectorAll('details').forEach(other => { if (other !== detail) other.open = false; });
}));
