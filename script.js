// ------------------------
// ВЫБОР ЦЕНЫ
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".price-cell").forEach(cell => {
    cell.addEventListener("click", function () {
      // убираем подсветку со всех
      document.querySelectorAll(".price-cell").forEach(c => c.classList.remove("selected-price"));

      // подсвечиваем выбранную
      this.classList.add("selected-price");

      // берем цену из data-price
      let selectedPrice = this.getAttribute("data-price");

      // показываем в консоли (или выводим на страницу)
      console.log("Выбранная цена:", selectedPrice);

      // если есть блок для отображения цены — обновляем
      let priceDisplay = document.getElementById("selected-price");
      if (priceDisplay) {
        priceDisplay.textContent = "$" + selectedPrice;
      }
    });
  });

  // Загружаем корзину после полной загрузки DOM
  loadCart();
});

// ------------------------
// КОРЗИНА
// ------------------------
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let counter = document.getElementById("navCartCount");
  if (counter) counter.textContent = cart.length;
  return cart;
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  let counter = document.getElementById("navCartCount");
  if (counter) counter.textContent = cart.length;
}

function addToCart(name, price) {
  let cart = loadCart();
  cart.push({ name, price });
  saveCart(cart);
  console.log(`${name} added to cart!`);
}
