
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  const logoImg = document.querySelector('#navbar-logo')
  //如果螢幕寬小於768就不執行(手機版)
  if (window.innerWidth <= 768) return;
  if (window.scrollY > 60) { // 捲動超過 60px，加上 class
    nav.classList.add('scrolled');
    logoImg.src='./images/logo-white.svg';
  } else {
    nav.classList.remove('scrolled');
    logoImg.src = './images/logo-black.svg';
  }
});


const hamburger = document.getElementById('hamburger')
const menuOverlay = document.getElementById('menuOverlay')

hamburger.addEventListener('click' , () => {
  hamburger.classList.toggle('active');
  menuOverlay.classList.toggle('open')
})

menuOverlay.addEventListener('click', (e) => {
  if(e.target === menuOverlay){
    hamburger.classList.remove('active');
   menuOverlay.classList.remove('open')
  }
})