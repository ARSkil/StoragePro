<script>
(function () {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  const headerUrl = '/header.html';

  // функция вставки и инициализации
  function initNav(html) {
    placeholder.outerHTML = html;

    // Подсветка активного пункта
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header nav a').forEach(a => {
      const link = a.getAttribute('href').replace('./', '');
      if (link === current) {
        a.classList.add('active');
      }
    });

    // Значок корзины из localStorage
    const countSpan = document.getElementById('navCartCount');
    if (countSpan) {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      const total = items.reduce((s, it) => s + (it.qty || 1), 0);
      countSpan.textContent = total;
    }
  }

  // основной fetch
  fetch(headerUrl)
    .then(r => r.text())
    .then(initNav)
    .catch(() => {
      // fallback для file://
      const alt = (location.pathname.includes('/pages/')) ? '../header.html' : 'header.html';
      fetch(alt).then(r => r.text()).then(initNav);
    });
})();
</script>
