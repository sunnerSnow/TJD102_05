
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  const logoImg = document.querySelector('#navbar-logo')
  if (window.scrollY > 60) { // 捲動超過 60px，加上 class
    nav.classList.add('scrolled');
    logoImg.src='./images/logo-white.svg';
  } else {
    nav.classList.remove('scrolled');
    logoImg.src = './images/logo-black.svg';
  }
});

