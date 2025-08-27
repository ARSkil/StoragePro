// Определяем текущую папку страницы
const path = window.location.pathname;
const currentFolder = path.substring(0, path.lastIndexOf('/') + 1);

// Назначаем ссылки на страницы
document.getElementById('navHome').href = currentFolder + 'index.html';
document.getElementById('navServices').href = currentFolder + 'services.html';
document.getElementById('navProducts').href = currentFolder + 'products.html';
document.getElementById('navContact').href = currentFolder + 'contact.html';
document.getElementById('navCart').href = currentFolder + 'cart.html';

// Если нужно, здесь можно добавить обновление счётчика корзины
// Например: document.getElementById('navCartCount').textContent = localStorage.getItem('cartCount') || 0;
