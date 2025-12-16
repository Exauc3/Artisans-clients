// ==================== NAVIGATION ====================
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
}

// ==================== FILTER BUTTONS ====================
function handleFilterButtons(groupId, activeClass) {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove(activeClass));
            btn.classList.add(activeClass);
        });
    });
}

// Active classes selon type
handleFilterButtons('category-buttons', 'active-proximity');
handleFilterButtons('distance-buttons', 'active-proximity');
handleFilterButtons('price-buttons', 'active-price');
handleFilterButtons('rating-buttons', 'active-rating');
handleFilterButtons('availability-buttons', 'active-proximity');

// ==================== CATEGORY SELECTION FROM HOME ====================
function selectCategory(category) {
    navigateTo('search-filter');
    const categoryButtons = document.querySelectorAll('#category-buttons .filter-btn');
    categoryButtons.forEach(btn => {
        btn.classList.remove('active-proximity');
        if (btn.dataset.value === category) btn.classList.add('active-proximity');
    });
}

// ==================== SAMPLE ARTISANS ====================
const artisans = [
    {id:1, name:"Patrick Mukendi", category:"Électricien", rating:4.8, availability:"Disponible", photo:"https://via.placeholder.com/100", reviews: 12, distance: 3, price:"moyen"},
    {id:2, name:"Jean Kabila", category:"Plombier", rating:4.5, availability:"Occupé", photo:"https://via.placeholder.com/100", reviews: 8, distance: 5, price:"budget"},
    {id:3, name:"Marie Nsimba", category:"Menuisier", rating:4.2, availability:"Disponible", photo:"https://via.placeholder.com/100", reviews: 15, distance: 2, price:"premium"},
    {id:4, name:"Alain Tshibanda", category:"Peintre", rating:3.9, availability:"Disponible", photo:"https://via.placeholder.com/100", reviews: 5, distance: 8, price:"budget"},
    {id:5, name:"Koffi Lenga", category:"Mécanicien", rating:4.7, availability:"Disponible", photo:"https://via.placeholder.com/100", reviews: 10, distance: 6, price:"moyen"},
    {id:6, name:"Lucie Mwamba", category:"Maçon", rating:4.1, availability:"Occupé", photo:"https://via.placeholder.com/100", reviews: 7, distance: 9, price:"premium"}
];

// ==================== RENDER ARTISANS ====================
function renderArtisans(list) {
    const container = document.getElementById('artisan-list-container');
    container.innerHTML = '';
    list.forEach(a => {
        const card = document.createElement('div');
        card.className = 'artisan-card';
        card.innerHTML = `
            <div class="artisan-header">
                <div class="artisan-avatar">
                    <img src="${a.photo}" alt="${a.name}" class="artisan-photo">
                    <div class="verified-badge" title="Artisan vérifié">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                    </div>
                </div>
                <div class="artisan-info">
                    <p class="artisan-name">${a.name}</p>
                    <p class="artisan-category">${a.category}</p>
                    <div class="artisan-rating">
                        <div class="stars">${renderStars(a.rating)}</div>
                        <span class="rating-text">${a.rating.toFixed(1)} (${a.reviews} avis)</span>
                    </div>
                </div>
            </div>
            <div class="artisan-badges">
                <span class="badge ${a.availability==='Disponible'?'badge-available':'badge-busy'}">${a.availability}</span>
                <span class="badge">Distance: ${a.distance} km</span>
                <span class="badge">Prix: ${a.price}</span>
            </div>
        `;
        card.addEventListener('click', () => showProfile(a));
        container.appendChild(card);
    });
}

// ==================== RENDER STARS ====================
function renderStars(rating) {
    let starsHTML = '';
    for (let i=1;i<=5;i++) {
        if (rating >= i) starsHTML += '<span class="star">&#9733;</span>';
        else if (rating >= i-0.5) starsHTML += '<span class="star">&#9733;</span>';
        else starsHTML += '<span class="star empty">&#9733;</span>';
    }
    return starsHTML;
}

// ==================== FILTER FUNCTION ====================
document.getElementById('search-btn').addEventListener('click', () => {
    const selectedCategory = document.querySelector('#category-buttons .filter-btn.active-proximity')?.dataset.value || '';
    const selectedDistance = document.querySelector('#distance-buttons .filter-btn.active-proximity')?.dataset.value || '';
    const selectedPrice = document.querySelector('#price-buttons .filter-btn.active-price')?.dataset.value || '';
    const selectedRating = parseFloat(document.querySelector('#rating-buttons .filter-btn.active-rating')?.dataset.value || 0);
    const selectedAvailability = document.querySelector('#availability-buttons .filter-btn.active-proximity')?.dataset.value || '';

    const filtered = artisans.filter(a => {
        if(selectedCategory && a.category !== selectedCategory) return false;
        if(selectedDistance && a.distance > parseFloat(selectedDistance)) return false;
        if(selectedPrice && a.price !== selectedPrice) return false;
        if(selectedRating && a.rating < selectedRating) return false;
        if(selectedAvailability && a.availability !== selectedAvailability && selectedAvailability==='Disponible') return false;
        return true;
    });

    renderArtisans(filtered);
    navigateTo('artisan-list');
    document.querySelector('.results-count').textContent = `${filtered.length} artisan(s) trouvé(s)`;
});

// ==================== SHOW ARTISAN PROFILE ====================
function showProfile(artisan) {
    navigateTo('artisan-profile');
    const container = document.getElementById('artisan-profile-content');
    container.innerHTML = `
        <div class="profile-hero">
            <div class="profile-avatar-large">
                <img src="${artisan.photo}" alt="${artisan.name}" class="profile-photo-large">
                <div class="verified-badge-large" title="Artisan vérifié">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                </div>
            </div>
            <h2 class="profile-name-large">${artisan.name}</h2>
            <p class="profile-category-large">${artisan.category}</p>
            <div class="profile-rating-large">
                <div class="stars">${renderStars(artisan.rating)}</div>
                <span>${artisan.rating.toFixed(1)} (${artisan.reviews} avis)</span>
            </div>
        </div>
        <div class="info-section">
            <div class="info-card">Distance: ${artisan.distance} km</div>
            <div class="info-card">Prix: ${artisan.price}</div>
            <div class="info-card">Disponibilité: ${artisan.availability}</div>
        </div>
        <div class="artisan-actions">
            <button class="btn-whatsapp">WhatsApp</button>
            <button class="btn-call">Appeler</button>
        </div>
    `;
}

// ==================== LOGIN ARTISAN ====================
function loginArtisan(e){
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    const pin = document.getElementById('pin').value;
    // Ici tu peux ajouter la logique de connexion réelle
    alert(`Connexion réussie pour ${phone}`);
    navigateTo('artisan-dashboard');
}

// ==================== INITIAL RENDER ====================
renderArtisans(artisans);
