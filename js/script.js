const menu = document.querySelector('.menu');
const nav = document.querySelector('.navlinks');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('.navlinks a').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('open'));
});
