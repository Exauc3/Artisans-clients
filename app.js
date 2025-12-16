// ===============================================
// 1. GESTION DES DONNÉES SIMULÉES (Mock Data)
// ===============================================

const MOCK_ARTISANS = [
    { id: 'a1', name: 'Jean Dupont', job: 'Plombier', rating: 4.8, distance: '2.1 km', phone: '+33612345678' },
    { id: 'a2', name: 'Marie Curie', job: 'Électricienne', rating: 4.5, distance: '500 m', phone: '+33698765432' },
    // Ajoutez d'autres artisans ici si nécessaire
];

// ===============================================
// 2. LOGIQUE DE NAVIGATION
// ===============================================

/**
 * Affiche l'écran spécifié et cache tous les autres.
 * @param {string} screenId - L'ID de l'écran à afficher (ex: 'home', 'artisan-list').
 */
function navigateTo(screenId) {
    console.log(`Navigation vers l'écran: ${screenId}`);
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        // Masque l'écran visuellement (pour l'accessibilité)
        screen.setAttribute('aria-hidden', 'true');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.setAttribute('aria-hidden', 'false');

        // Gère le bouton retour
        const backButton = targetScreen.querySelector('.btn-back');
        if (backButton) {
            // Assurez-vous que l'attribut data-target existe dans votre HTML
            const prevScreen = backButton.getAttribute('data-target');
            backButton.onclick = () => navigateTo(prevScreen);
        }
        
        // Si c'est l'écran de profil, on le peuple avec des données
        if (screenId === 'artisan-profile-screen') {
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
        // Lien direct vers WhatsApp
        url = `https://wa.me/${phoneNumber.replace(/[\s\(\)-]/g, '')}?text=Bonjour,%20j'ai%20vu%20votre%20profil%20sur%20l'application.`;
    } else if (actionType === 'call') {
        // Lien direct pour l'appel (compatible mobile)
        url = `tel:${phoneNumber.replace(/[\s\(\)-]/g, '')}`;
    }

    if (url) {
        console.log(`Ouverture de l'application: ${actionType}`);
        window.open(url, '_system'); // Utilisez '_system' pour ouvrir les applications natives sur un vrai appareil/webview
    }
}

/**
 * Peuple l'écran de profil de l'artisan avec des données mockées.
 * (Ceci est un exemple, vous devrez adapter les IDs de votre HTML de profil)
 */
function renderArtisanProfile() {
    const profileContainer = document.getElementById('artisan-profile-details');
    // Récupérer l'ID de l'artisan via un mécanisme (URL, session, ou mocké ici)
    const artisanId = 'a1'; // Exemple: affiche Jean Dupont

    const artisan = MOCK_ARTISANS.find(a => a.id === artisanId);

    if (artisan && profileContainer) {
        // Met à jour le nom, le métier, etc. sur l'écran de profil
        profileContainer.innerHTML = `
            <h2 class="artisan-name">${artisan.name}</h2>
            <p class="artisan-job">${artisan.job}</p>
            <div class="artisan-rating">${artisan.rating} ⭐</div>
            <div class="profile-actions">
                <button onclick="handleAction('whatsapp', '${artisan.phone}')" class="btn-whatsapp">WhatsApp</button>
                <button onclick="handleAction('call', '${artisan.phone}')" class="btn-call">Appeler</button>
            </div>
        `;
    }
}

// ===============================================
// 4. INITIALISATION DE L'APPLICATION
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Démarrer sur l'écran de sélection de rôle/accueil
    navigateTo('role-selection-screen'); 

    // 2. Écouteurs d'événements pour la sélection de rôle
    const btnClient = document.getElementById('btn-client-path');
    const btnArtisan = document.getElementById('btn-artisan-path');

    if (btnClient) {
        btnClient.addEventListener('click', () => {
            // Redirige vers l'accueil Client
            navigateTo('client-home-screen'); 
        });
    }

    if (btnArtisan) {
        btnArtisan.addEventListener('click', () => {
            // Redirige vers le tableau de bord Artisan
            navigateTo('artisan-dashboard-screen'); 
        });
    }

    // 3. Écouteurs d'événements pour les cartes interactives (ex: Rechercher un artisan)
    const searchCard = document.getElementById('card-search-artisan');
    if (searchCard) {
        searchCard.addEventListener('click', () => {
            navigateTo('artisan-list-screen'); // Naviguer vers la liste des artisans
        });
    }

    // 4. Écouteur pour la liste des artisans (pour simuler le clic sur un profil)
    const listItems = document.querySelectorAll('.artisan-list-item');
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            // Ici, on stockerait l'ID de l'artisan cliqué et on naviguerait vers son profil.
            // Pour l'exemple, on navigue directement au profil.
            navigateTo('artisan-profile-screen'); 
        });
    });


    // 5. Initialiser les écouteurs de navigation sur tous les éléments pertinents
    // (Ajoutez ici d'autres écouteurs d'événements pour les liens/boutons spécifiques à votre HTML)
});
