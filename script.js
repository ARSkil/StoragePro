document.querySelectorAll(".price-cell").forEach(cell => {
  cell.addEventListener("click", function () {
    // убираем подсветку со всех
    document.querySelectorAll(".price-cell").forEach(c => c.classList.remove("selected-price"));

    // подсвечиваем выбранную
    this.classList.add("selected-price");

    // берем цену из data-price
    let selectedPrice = this.getAttribute("data-price");

    // показываем в консоли (или в отдельном блоке на сайте)
    console.log("Выбранная цена:", selectedPrice);

    // если у тебя есть блок для отображения выбранной цены — обновляем
    let priceDisplay = document.getElementById("selected-price");
    if (priceDisplay) {
      priceDisplay.textContent = "$" + selectedPrice;
    }
  });
});
// корзина
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
    return cart;
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart-count").textContent = cart.length;
}

function addToCart(name, price) {
    let cart = loadCart();
    cart.push({ name, price });
    saveCart(cart);
    alert(name + " added to cart!");
}
document.addEventListener("DOMContentLoaded", loadCart);
