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
