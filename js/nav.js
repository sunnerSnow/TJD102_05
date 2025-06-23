
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 60) { // 捲動超過 60px，加上 class
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
