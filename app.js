/* =========================
   DONNÉES (MOCK)
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
   NAVIGATION SIMPLE (RARE)
   ========================= */

function navigateTo(screenId) {
  const screens = document.querySelectorAll('.screen');
  if (!screens.length) return;

  screens.forEach(screen => {
    const isActive = screen.id === screenId;
    screen.classList.toggle('active', isActive);
    screen.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  });
}

/* =========================
   SÉLECTION DE CATÉGORIE
   ========================= */
/*
  ⚠️ IMPORTANT :
  - PAS de navigateTo ici
  - On reste sur le même écran
  - On met à jour le contenu
*/

function selectCategory(category) {
  const select = document.getElementById('category-select');
  if (select) {
    select.value = category;
  }

  renderArtisanList();

  const resultsSection = document.getElementById('artisan-list');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* =========================
   RENDU LISTE ARTISANS
   ========================= */

function renderArtisanList() {
  const container = document.getElementById('artisan-list-container');
  if (!container) return;

  container.innerHTML = '';

  const selectedCategory =
    document.getElementById('category-select')?.value || '';

  const results = ARTISANS.filter(artisan =>
    !selectedCategory || artisan.job === selectedCategory
  );

  const count = document.querySelector('.results-count');
  if (count) {
    count.textContent = `${results.length} artisans trouvés`;
  }

  results.forEach(artisan => {
    const card = document.createElement('div');
    card.className = 'artisan-card';

    card.innerHTML = `
      <div class="artisan-info">
        <h3>${artisan.name}</h3>
        <p>${artisan.job}</p>
        <div class="artisan-rating">⭐ ${artisan.rating}</div>
      </div>

      <div class="artisan-status ${
        artisan.availability === 'Disponible' ? 'available' : 'busy'
      }">
        ${artisan.availability}
      </div>

      <div class="artisan-contact">
        <a href="tel:${artisan.phone}" class="btn-primary">Appeler</a>
        <a href="https://wa.me/${artisan.whatsapp}" class="btn-secondary">
          WhatsApp
        </a>
      </div>
    `;

    container.appendChild(card);
  });
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
  renderArtisanList();

  const searchBtn = document.querySelector(
    '#search-filter .btn-primary'
  );
  if (searchBtn) {
    searchBtn.onclick = renderArtisanList;
  }
});