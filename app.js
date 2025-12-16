// =====================================================
// PROFILE VIEW AVEC WHATSAPP & APPEL
// =====================================================
function showProfile(artisan) {
    navigateTo('artisan-profile');

    let container = document.getElementById('artisan-profile-content');
    if (!container) {
        // si le conteneur n'existe pas, on le crée dynamiquement
        container = document.createElement('div');
        container.id = 'artisan-profile-content';
        const profileScreen = document.getElementById('artisan-profile');
        if (!profileScreen) {
            // créer la section si elle n'existe pas
            const screenDiv = document.createElement('div');
            screenDiv.id = 'artisan-profile';
            screenDiv.classList.add('screen');
            document.body.appendChild(screenDiv);
            screenDiv.appendChild(container);
        } else {
            profileScreen.appendChild(container);
        }
    }

    container.innerHTML = `
        <img src="${artisan.photo}" class="profile-photo-large">
        <h2>${artisan.name}</h2>
        <p>${artisan.category}</p>
        <div>${renderStars(artisan.rating)}</div>
        <p>${artisan.distance} km • ${artisan.price}</p>
        <button class="btn-whatsapp">WhatsApp</button>
        <button class="btn-call">Appeler</button>
    `;

    // ================= ACTION WHATSAPP =================
    container.querySelector('.btn-whatsapp').addEventListener('click', () => {
        const phone = artisan.phone || '243000000000'; // numéro fictif si non défini
        window.open(`https://wa.me/${phone}`, '_blank');
    });

    // ================= ACTION APPEL =================
    container.querySelector('.btn-call').addEventListener('click', () => {
        const phone = artisan.phone || '243000000000';
        window.location.href = `tel:${phone}`;
    });
}

// =====================================================
// RENDER ARTISANS LIST + COMPTEUR
// =====================================================
function renderArtisans(list) {
    let container = document.getElementById('artisan-list-container');
    if (!container) {
        // créer le conteneur si absent
        container = document.createElement('div');
        container.id = 'artisan-list-container';
        document.body.appendChild(container);
    }

    // créer ou mettre à jour le compteur
    let countEl = document.getElementById('artisan-count');
    if (!countEl) {
        countEl = document.createElement('p');
        countEl.id = 'artisan-count';
        const listScreen = document.getElementById('artisan-list') || document.body;
        listScreen.insertBefore(countEl, container);
    }
    countEl.textContent = `${list.length} résultat(s) trouvé(s)`;

    container.innerHTML = '';

    list.forEach(a => {
        const card = document.createElement('div');
        card.className = 'artisan-card';

        card.innerHTML = `
            <div class="artisan-header">
                <img src="${a.photo}" class="artisan-photo">
                <div>
                    <p class="artisan-name">${a.name}</p>
                    <p class="artisan-category">${a.category}</p>
                    <div class="artisan-rating">
                        ${renderStars(a.rating)}
                        <span>${a.rating.toFixed(1)} (${a.reviews})</span>
                    </div>
                </div>
            </div>
            <div class="artisan-badges">
                <span class="badge">${a.distance} km</span>
                <span class="badge">${a.price}</span>
                <span class="badge">${a.availability}</span>
            </div>
        `;

        card.addEventListener('click', () => showProfile(a));
        container.appendChild(card);
    });
}