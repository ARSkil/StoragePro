// nav.js — универсальный загрузчик header.html (пытается несколько путей)
(async function () {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  const headerName = 'header.html';
  const tryPaths = [
    '/' + headerName,           // /header.html (server root)
    headerName,                 // ./header.html (same dir)
    '../' + headerName,
    '../../' + headerName,
    '../../../' + headerName
  ];

  let html = null;
  for (const p of tryPaths) {
    try {
      const url = new URL(p, location.href).href;
      const res = await fetch(url);
      if (res.ok) { html = await res.text(); break; }
    } catch (e) {
      // ignore and try next
    }
  }
  if (!html) {
    console.warn('header.html not found (tried multiple paths).');
    return;
  }

  // Если placeholder находится внутри <header>, заменим весь внешний header,
  // чтобы не получилось nested <header>
  const outerHeader = placeholder.closest('header');
  if (outerHeader) outerHeader.outerHTML = html;
  else placeholder.outerHTML = html;

  // подсветка активного пункта (сравниваем pathname)
  try {
    const current = location.pathname.replace(/\/$/, '/index.html');
    document.querySelectorAll('header nav a').forEach(a => {
      try {
        const hrefPath = new URL(a.getAttribute('href'), location.href).pathname.replace(/\/$/, '/index.html');
        if (hrefPath === current) a.classList.add('active');
      } catch (e) {}
    });
  } catch (e) {}

  // обновление счётчика корзины из localStorage.cart (массив объектов)
  function updateCartBadge() {
    const span = document.getElementById('navCartCount');
    if (!span) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalCount = cart.reduce((s, it) => s + (it.qty || 1), 0);
    span.textContent = totalCount;
  }
  updateCartBadge();

  // вынесенная в глобал функцию для добавления товара в корзину
  window.siteAddToCart = function (product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product); // product = { name, price, qty }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
  };

  // слушаем storage (если корзина меняется в другой вкладке)
  window.addEventListener('storage', function (ev) {
    if (ev.key === 'cart') updateCartBadge();
  });
})();
