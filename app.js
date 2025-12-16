/* =========================
   NAVIGATION ENTRE ÉCRANS
   ========================= */

function navigateTo(screenId) {
  const screens = document.querySelectorAll('.screen');
  if (!screens.length) return;

  let found = false;

  screens.forEach(screen => {
    const isActive = screen.id === screenId;
    screen.classList.toggle('active', isActive);
    screen.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    if (isActive) found = true;
  });

  // Sécurité : si l'écran n'existe pas, on affiche l'accueil client
  if (!found) {
    const fallback = document.getElementById('client-home');
    if (fallback) {
      fallback.classList.add('active');
      fallback.setAttribute('aria-hidden', 'false');
    }
  }
}

/* =========================
   CATÉGORIES (HOME)
   ========================= */

function selectCategory(category) {
  const select = document.getElementById('category-select');
  if (select) {
    select.value = category;
  }
  navigateTo('search-filter');
}

/* =========================
   DONNÉES MOCKÉES
   ========================= */

const ARTISANS = [
  {
    id: 1,
    name: 'Patrick Mukendi',
    job: 'Électricien',
    rating: 4.8,
    price: '$$',
    phone: '243900000000',
    whatsapp: '243900000000',
    availability: 'Disponible'
  },
  {
    id: 2,
    name: 'Aline Kabeya',
    job: 'Plombier',
    rating: 4.6,
    price: '$',
    phone: '243900000001',
    whatsapp: '243900000001',
    availability: 'Disponible'
  },
  {
    id: 3,
    name: 'Jonathan Ilunga',
    job: 'Menuisier',
    rating: 4.4,
    price: '$$',
    phone: '243900000002',
    whatsapp: '243900000002',
    availability: 'Occupé'
  }
];

/* =========================
   RECHERCHE & LISTE
   ========================= */

function renderArtisanList() {
  const container = document.getElementById('artisan-list-container');
  if (!container) return;

  container.innerHTML = '';

  const category = document.getElementById('category-select')?.value || '';

  const results = ARTISANS.filter(a =>
    !category || a.job === category
  );

  document.querySelector('.results-count').textContent =
    `${results.length} artisans trouvés`;

  results.forEach(artisan => {
    const card = document.createElement('div');
    card.className = 'artisan-card';
    card.onclick = () => openArtisanProfile(artisan.id);

    card.innerHTML = `
      <div class="artisan-info">
        <h3>${artisan.name}</h3>
        <p>${artisan.job}</p>
        <div class="artisan-rating">⭐ ${artisan.rating}</div>
      </div>
      <div class="artisan-status ${artisan.availability === 'Disponible' ? 'available' : 'busy'}">
        ${artisan.availability}
      </div>
    `;

    container.appendChild(card);
  });

  navigateTo('artisan-list');
}

/* =========================
   PROFIL ARTISAN
   ========================= */

function openArtisanProfile(id) {
  const artisan = ARTISANS.find(a => a.id === id);
  if (!artisan) return;

  const container = document.getElementById('artisan-profile-content');
  if (!container) return;

  container.innerHTML = `
    <h3>${artisan.name}</h3>
    <p class="profile-job">${artisan.job}</p>
    <p class="profile-rating">⭐ ${artisan.rating}</p>

    <div class="profile-actions">
      <a href="tel:${artisan.phone}" class="btn-primary">Appeler</a>
      <a href="https://wa.me/${artisan.whatsapp}" class="btn-secondary">WhatsApp</a>
    </div>
  `;

  navigateTo('artisan-profile');
}

/* =========================
   LOGIN ARTISAN (MOCK)
   ========================= */

function loginArtisan(event) {
  event.preventDefault();
  navigateTo('artisan-dashboard');
}

/* =========================
   INITIALISATION
   ========================= */

document.addEventListener('DOMContentLoaded', () => {
  navigateTo('client-home');

  // Bouton rechercher (écran filtres)
  const searchBtn = document.querySelector(
    '#search-filter .btn-primary'
  );
  if (searchBtn) {
    searchBtn.onclick = renderArtisanList;
  }
});