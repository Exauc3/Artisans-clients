/* =========================
   NAVIGATION ENTRE ÉCRANS
   ========================= */

const screens = document.querySelectorAll('.screen');

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle('active', screen.id === id);
    screen.setAttribute(
      'aria-hidden',
      screen.id === id ? 'false' : 'true'
    );
  });
}

/* Boutons de navigation */
document.querySelectorAll('[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    showScreen(btn.dataset.target);
  });
});

/* =========================
   CATÉGORIES (FIGMA STATES)
   ========================= */

const categories = document.querySelectorAll('.category');

categories.forEach(category => {
  category.addEventListener('click', () => {
    categories.forEach(c => c.classList.remove('active'));
    category.classList.add('active');

    const selectedCategory = category.dataset.category;
    filterArtisans(selectedCategory);
  });
});

/* =========================
   FILTRES VISUELS (UI ONLY)
   ========================= */

document.querySelectorAll('.filter').forEach(filter => {
  filter.addEventListener('click', () => {
    filter.classList.toggle('selected');
  });
});

/* =========================
   DONNÉES MOCKÉES
   ========================= */

const ARTISANS = [
  {
    name: 'Jean Mulumba',
    job: 'Électricien',
    rating: 4.8,
    price: '10$',
    phone: '243900000000',
    whatsapp: '243900000000'
  },
  {
    name: 'Aline Kabeya',
    job: 'Plombier',
    rating: 4.6,
    price: '12$',
    phone: '243900000001',
    whatsapp: '243900000001'
  }
];

/* =========================
   LISTE DES ARTISANS
   ========================= */

const artisanList = document.getElementById('artisan-list');

function renderArtisans(list) {
  artisanList.innerHTML = '';

  list.forEach(artisan => {
    const card = document.createElement('article');
    card.className = 'artisan-card';

    const header = document.createElement('header');
    header.className = 'artisan-header';

    const name = document.createElement('h3');
    name.textContent = artisan.name;

    const job = document.createElement('span');
    job.className = 'job';
    job.textContent = artisan.job;

    header.append(name, job);

    const meta = document.createElement('div');
    meta.className = 'artisan-meta';

    meta.innerHTML = `
      <span class="rating">⭐ ${artisan.rating}</span>
      <span class="price">${artisan.price}</span>
    `;

    const actions = document.createElement('div');
    actions.className = 'artisan-actions';

    const callBtn = document.createElement('button');
    callBtn.className = 'btn-call';
    callBtn.textContent = 'Appeler';
    callBtn.onclick = () => {
      window.location.href = `tel:${artisan.phone}`;
    };

    const whatsappBtn = document.createElement('button');
    whatsappBtn.className = 'btn-whatsapp';
    whatsappBtn.textContent = 'WhatsApp';
    whatsappBtn.onclick = () => {
      window.location.href = `https://wa.me/${artisan.whatsapp}`;
    };

    actions.append(callBtn, whatsappBtn);

    card.append(header, meta, actions);
    artisanList.appendChild(card);
  });
}

/* =========================
   FILTRAGE PAR CATÉGORIE
   ========================= */

function filterArtisans(category) {
  if (!category || category === 'all') {
    renderArtisans(ARTISANS);
    return;
  }

  const filtered = ARTISANS.filter(
    artisan => artisan.job === category
  );

  renderArtisans(filtered);
}

/* =========================
   INITIALISATION
   ========================= */

document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
  renderArtisans(ARTISANS);
});