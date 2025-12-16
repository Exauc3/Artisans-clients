// ===============================================
// 1. GESTION DES DONNÉES SIMULÉES (Mock Data)
// ===============================================

const MOCK_ARTISANS = [
    { id: 'a1', name: 'Jean Dupont', job: 'Plombier', rating: 4.8, distance: '2.1 km', phone: '+33612345678' },
    { id: 'a2', name: 'Marie Curie', job: 'Électricienne', rating: 4.5, distance: '500 m', phone: '+33698765432' },
    // Ajoutez d'autres artisans ici si nécessaire
];

let selectedArtisanId = null;

// ===============================================
// 2. LOGIQUE DE NAVIGATION
// ===============================================

/**
 * Affiche l'écran spécifié et cache tous les autres.
 * @param {string} screenId - L'ID de l'écran à afficher (ex: 'client-home').
 */
function navigateTo(screenId) {
    console.log(`Navigation vers l'écran: ${screenId}`);
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        screen.setAttribute('aria-hidden', 'true');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.setAttribute('aria-hidden', 'false');

        // Gère le bouton retour si un data-target est défini ; ne pas écraser les onclick inline
        const backButton = targetScreen.querySelector('.btn-back');
        if (backButton) {
            const prevScreen = backButton.getAttribute('data-target');
            if (prevScreen) {
                backButton.onclick = () => navigateTo(prevScreen);
            }
        }

        // Si c'est l'écran de profil, on le peuple avec des données
        if (screenId === 'artisan-profile') {
            renderArtisanProfile();
        }
    } else {
        console.error(`Erreur: L'écran avec l'ID "${screenId}" est introuvable.`);
    }
}

// ===============================================
// 3. LOGIQUE D'INTERACTIVITÉ ET DE DONNÉES
// ===============================================

/**
 * Gère le clic sur les boutons d'action (WhatsApp/Appel)
 * @param {string} actionType - 'whatsapp' ou 'call'
 * @param {string} phoneNumber - Le numéro de téléphone
 */
function handleAction(actionType, phoneNumber) {
    if (!phoneNumber) return;

    let url;
    if (actionType === 'whatsapp') {
        url = `https://wa.me/${phoneNumber.replace(/[\s\(\)-]/g, '')}?text=Bonjour,%20j'ai%20vu%20votre%20profil%20sur%20l'application.`;
    } else if (actionType === 'call') {
        url = `tel:${phoneNumber.replace(/[\s\(\)-]/g, '')}`;
    }

    if (url) {
        console.log(`Ouverture de l'application: ${actionType}`);
        // Utiliser '_system' si on détecte un environnement mobile (cordova), sinon '_blank'
        const target = (window.cordova || window.Cordova) ? '_system' : '_blank';
        window.open(url, target);
    }
}

/**
 * Sélection d'une catégorie depuis les cartes ou la liste.
 * @param {string} category
 */
function selectCategory(category) {
    const select = document.getElementById('category-select');
    if (select) select.value = category;

    // Appliquer le filtre et afficher la liste
    populateArtisanList({ category });
    navigateTo('artisan-list');
}

/**
 * Gère la soumission du formulaire de connexion artisan.
 * @param {Event} event
 */
function loginArtisan(event) {
    if (event && event.preventDefault) event.preventDefault();
    const phoneInput = document.getElementById('phone');
    const pinInput = document.getElementById('pin');

    const phone = phoneInput ? phoneInput.value.trim() : '';
    const pin = pinInput ? pinInput.value.trim() : '';

    // Simple validation (mock)
    if (!phone || !pin) {
        alert('Veuillez renseigner le numéro de téléphone et le code PIN.');
        return;
    }

    console.log(`Tentative de connexion pour ${phone}`);
    // Ici vous ajouterez la logique d'authentification réelle.
    // Pour la démo, on considère la connexion réussie.
    navigateTo('artisan-dashboard');
}

/**
 * Remplit l'écran de profil de l'artisan avec des données.
 * Si selectedArtisanId est défini, on l'utilise ; sinon on prend le premier mock.
 */
function renderArtisanProfile() {
    const profileContainer = document.getElementById('artisan-profile-content');
    const artisanId = selectedArtisanId || (MOCK_ARTISANS.length ? MOCK_ARTISANS[0].id : null);
    const artisan = MOCK_ARTISANS.find(a => a.id === artisanId);

    if (!profileContainer) return console.warn('artisan-profile-content introuvable');
    if (!artisan) {
        profileContainer.innerHTML = '<p>Artisan non trouvé.</p>';
        return;
    }

    // Création d'éléments via DOM (éviter innerHTML non sécurisé)
    profileContainer.innerHTML = '';

    const nameEl = document.createElement('h2');
    nameEl.className = 'artisan-name';
    nameEl.textContent = artisan.name;

    const jobEl = document.createElement('p');
    jobEl.className = 'artisan-job';
    jobEl.textContent = artisan.job;

    const ratingEl = document.createElement('div');
    ratingEl.className = 'artisan-rating';
    ratingEl.textContent = `${artisan.rating} ⭐`;

    const actions = document.createElement('div');
    actions.className = 'profile-actions';

    const waBtn = document.createElement('button');
    waBtn.className = 'btn-whatsapp';
    waBtn.textContent = 'WhatsApp';
    waBtn.addEventListener('click', () => handleAction('whatsapp', artisan.phone));

    const callBtn = document.createElement('button');
    callBtn.className = 'btn-call';
    callBtn.textContent = 'Appeler';
    callBtn.addEventListener('click', () => handleAction('call', artisan.phone));

    actions.appendChild(waBtn);
    actions.appendChild(callBtn);

    profileContainer.appendChild(nameEl);
    profileContainer.appendChild(jobEl);
    profileContainer.appendChild(ratingEl);
    profileContainer.appendChild(actions);
}

/**
 * Remplit la liste d'artisans selon un filtre optionnel.
 * @param {{category?: string}} filter
 */
function populateArtisanList(filter = {}) {
    const container = document.getElementById('artisan-list-container');
    const resultsCount = document.querySelector('.results-count');
    if (!container) return console.warn('artisan-list-container introuvable');

    const categoryFilter = (filter.category || document.getElementById('category-select')?.value || '').toLowerCase();

    const filtered = MOCK_ARTISANS.filter(a => {
        if (!categoryFilter) return true;
        return a.job.toLowerCase().includes(categoryFilter.toLowerCase()) || a.job.toLowerCase() === categoryFilter;
    });

    container.innerHTML = ''; // vider

    filtered.forEach(artisan => {
        const item = document.createElement('button');
        item.className = 'artisan-list-item';
        item.setAttribute('type', 'button');
        item.dataset.id = artisan.id;

        item.innerHTML = `
            <div class="artisan-card">
                <div class="artisan-info">
                    <h4 class="artisan-name">${artisan.name}</h4>
                    <p class="artisan-job">${artisan.job} • ${artisan.distance}</p>
                </div>
                <div class="artisan-rating">${artisan.rating} ⭐</div>
            </div>
        `;

        item.addEventListener('click', () => {
            selectedArtisanId = artisan.id;
            renderArtisanProfile();
            navigateTo('artisan-profile');
        });

        container.appendChild(item);
    });

    if (resultsCount) resultsCount.textContent = `${filtered.length} artisan(s) trouvés`;
}

// ===============================================
// 4. INITIALISATION DE L'APPLICATION
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // Démarrer sur l'écran d'accueil client (conforme au HTML)
    navigateTo('client-home');

    // Remplir la liste d'artisans
    populateArtisanList();

    // Écouteur pour le select de catégorie (filtre)
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            populateArtisanList();
        });
    }

    // Attacher la soumission du formulaire artisan si présent
    const loginForm = document.querySelector('#artisan-login form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginArtisan);
    }

    // Si certains éléments ont des handlers inline dans le HTML, ils restent fonctionnels.
});