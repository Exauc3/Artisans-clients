// Navigation simple entre écrans
function navigateTo(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.toggle('active', screen.id === screenId);
  });
}

// Sélection d'une catégorie depuis la home
function selectCategory(category) {
  // Afficher l'écran filtres
  navigateTo('search-filter');

  // Pré-remplir le select catégorie
  const categorySelect = document.getElementById('category-select');
  if (categorySelect) {
    categorySelect.value = category;
  }
}

// Bouton recherche dans l'écran filtres
function searchArtisans() {
  // Ici tu peux ajouter la logique pour filtrer les artisans
  // Pour l'instant on navigue simplement vers la liste
  navigateTo('artisan-list');
}

// Login artisan
function loginArtisan(event) {
  event.preventDefault();
  // Pour l'instant, rediriger vers dashboard
  navigateTo('artisan-dashboard');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('client-home');

  const searchBtn = document.querySelector('#search-filter .btn-primary');
  if (searchBtn) {
    searchBtn.addEventListener('click', searchArtisans);
  }
});