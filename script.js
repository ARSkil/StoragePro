// price select (работает для таблиц)
document.addEventListener('click', function (e) {
  // клик по ячейке цены
  if (e.target.matches('.price-cell')) {
    // убираем подсветку
    document.querySelectorAll('.price-cell').forEach(c => c.classList.remove('selected-price'));
    e.target.classList.add('selected-price');

    // обновление display (если есть)
    const priceDisplay = document.getElementById('selected-price');
    if (priceDisplay) priceDisplay.textContent = '$' + e.target.getAttribute('data-price');
    return;
  }

  // клик по кнопке Add to Cart
  if (e.target.matches('.add-to-cart')) {
    const row = e.target.closest('tr');
    if (!row) return;

    const sizeCell = row.querySelector('td'); // первая ячейка — размер
    const sizeText = sizeCell ? sizeCell.textContent.trim() : '';

    // выбираем выбранную цену в этой строке, иначе первую цену (Base)
    let priceCell = row.querySelector('.price-cell.selected-price');
    if (!priceCell) {
      priceCell = row.querySelectorAll('.price-cell')[0];
    }
    if (!priceCell) {
      alert('Не найдено значение цены в строке.');
      return;
    }

    const price = Number(priceCell.getAttribute('data-price'));
    const productTitleEl = document.querySelector('h1') || document.querySelector('h2');
    const productName = (productTitleEl ? productTitleEl.textContent.trim() + ' — ' : '') + sizeText;

    // добавляем в корзину: используем siteAddToCart если доступен
    const product = { name: productName, price: price, qty: 1 };
    if (window.siteAddToCart) {
      window.siteAddToCart(product);
    } else {
      // fallback: сохраняем в localStorage.cart
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      // пробуждаем обновление в других табах
      window.dispatchEvent(new Event('storage'));
    }

    alert(`${productName} — $${price} добавлен(а) в корзину`);
    return;
  }
});
