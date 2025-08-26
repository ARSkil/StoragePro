<script>
(function () {
  // Куда вставляем шапку
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  // Если сайт запускается через сервер — используем корневой путь.
  // Если открываешь напрямую (file://), этот fetch не сработает (CORS).
  const headerUrl = '/header.html';

  fetch(headerUrl)
    .then(r => r.text())
    .then(html => {
      placeholder.outerHTML = html; // подменяем плейсхолдер на <header>...</header>

      // Подсветка активного пункта
      const path = location.pathname.replace(/\/$/, '/index.html');
      document.querySelectorAll('header nav a').forEach(a => {
        try {
          const linkPath = new URL(a.getAttribute('href'), location.origin).pathname
            .replace(/\/$/, '/index.html');
          if (path === linkPath) a.classList.add('active');
        } catch (e) {}
      });

      // Значок корзины из localStorage
      const countSpan = document.getElementById('navCartCount');
      if (countSpan) {
        const items = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = items.reduce((s, it) => s + (it.qty || 1), 0);
        countSpan.textContent = total;
      }
    })
    .catch(() => {
      // Фолбэк для режима file:// — пробуем относительный путь
      const alt = (location.pathname.includes('/pages/')) ? '../header.html' : 'header.html';
      fetch(alt).then(r => r.text()).then(html => {
        placeholder.outerHTML = html;
      });
    });
})();
</script>
