/* =========================
   NAVIGATION ENTRE ÉCRANS
   ========================= */

function navigateTo(screenId) {
  const screens = document.querySelectorAll('.screen');

  screens.forEach(screen => {
    if (screen.id === screenId) {
      screen.classList.add('active');
    } else {
      screen.classList.remove('active');
    }
  });
}

/* =========================
   SÉLECTION CATÉGORIE (HOME)
   ========================= */

function selectCategory(category) {
  // 1. Aller vers l’écran filtres
  navigateTo('search-filter');

  // 2. Attendre que l’écran soit visible
  setTimeout(() => {
    const select = document.getElementById('category-select');
    if (select) {
      select.value = category;
    }
  }, 0);
}

/* =========================
   BOUTON RECHERCHER
   ========================= */

document.addEventListener('DOMContentLoaded', () => {
  navigateTo('client-home');

  const searchButton = document.querySelector(
    '#search-filter .btn-primary'
  );

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      navigateTo('artisan-list');
    });
  }
});

/* =========================
   LOGIN ARTISAN
   ========================= */

function loginArtisan(event) {
  event.preventDefault();
  navigateTo('artisan-dashboard');
}