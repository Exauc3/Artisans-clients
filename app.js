// =====================================================
// NAVIGATION
// =====================================================
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
}

// =====================================================
// FILTER BUTTONS (gestion état actif)
// =====================================================
function handleFilterButtons(groupId, activeClass) {
    const group = document.getElementById(groupId);
    if (!group) return;

    group.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            group.querySelectorAll('.filter-btn').forEach(b =>
                b.classList.remove(activeClass)
            );
            btn.classList.add(activeClass);
        });
    });
}

handleFilterButtons('category-buttons', 'active-proximity');
handleFilterButtons('distance-buttons', 'active-proximity');
handleFilterButtons('price-buttons', 'active-price');
handleFilterButtons('rating-buttons', 'active-rating');
handleFilterButtons('availability-buttons', 'active-proximity');

// =====================================================
// CATEGORY SELECTION FROM HOME
// =====================================================
function selectCategory(category) {
    navigateTo('search-filter');

    document
        .querySelectorAll('#category-buttons .filter-btn')
        .forEach(btn => {
            btn.classList.remove('active-proximity');
            if (btn.dataset.value === category) {
                btn.classList.add('active-proximity');
            }
        });
}

// =====================================================
// USERS & SESSION (AUTH)
// =====================================================
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// =====================================================
// REGISTER
// =====================================================
function registerUser(e) {
    e.preventDefault();

    const name = document.getElementById('register-name').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const pin = document.getElementById('register-pin').value.trim();
    const role = document.getElementById('register-role').value;

    if (!name || !phone || !pin) {
        alert('Tous les champs sont obligatoires');
        return;
    }

    if (users.find(u => u.phone === phone)) {
        alert('Numéro déjà utilisé');
        return;
    }

    const user = {
        id: Date.now(),
        name,
        phone,
        pin,
        role,
        profile: {
            photo: 'https://randomuser.me/api/portraits/lego/1.jpg',
            category: '',
            price: '',
            availability: 'Disponible'
        }
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));

    navigateTo(role === 'artisan' ? 'artisan-dashboard' : 'client-home');
}

// =====================================================
// LOGIN
// =====================================================
function loginUser(e) {
    e.preventDefault();

    const phone = document.getElementById('phone').value.trim();
    const pin = document.getElementById('pin').value.trim();

    const user = users.find(u => u.phone === phone && u.pin === pin);

    if (!user) {
        alert('Numéro ou PIN incorrect');
        return;
    }

    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

    navigateTo(user.role === 'artisan' ? 'artisan-dashboard' : 'client-home');
}

// =====================================================
// LOGOUT
// =====================================================
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    navigateTo('client-home');
}

// =====================================================
// ARTISANS (30 PERSONAS)
// =====================================================
const artisans = [
    {id:1,name:"Patrick Mukendi",category:"Électricien",rating:4.8,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/1.jpg",reviews:12,distance:3,price:"moyen"},
    {id:2,name:"Jean Kabila",category:"Plombier",rating:4.5,availability:"Occupé",photo:"https://randomuser.me/api/portraits/men/2.jpg",reviews:8,distance:5,price:"budget"},
    {id:3,name:"Marie Nsimba",category:"Menuisier",rating:4.2,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/1.jpg",reviews:15,distance:2,price:"premium"},
    {id:4,name:"Alain Tshibanda",category:"Peintre",rating:3.9,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/3.jpg",reviews:5,distance:8,price:"budget"},
    {id:5,name:"Koffi Lenga",category:"Mécanicien",rating:4.7,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/4.jpg",reviews:10,distance:6,price:"moyen"},
    {id:6,name:"Lucie Mwamba",category:"Maçon",rating:4.1,availability:"Occupé",photo:"https://randomuser.me/api/portraits/women/2.jpg",reviews:7,distance:9,price:"premium"},
    // … (les 24 autres sont conservés tels quels dans ta version)
];

// =====================================================
// RENDER STARS
// =====================================================
function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="star ${rating >= i ? '' : 'empty'}">★</span>`;
    }
    return html;
}

// =====================================================
// RENDER ARTISANS LIST
// =====================================================
function renderArtisans(list) {
    const container = document.getElementById('artisan-list-container');
    if (!container) return;

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

// =====================================================
// FILTER ACTION
// =====================================================
document.getElementById('search-btn')?.addEventListener('click', () => {
    const category = document.querySelector('#category-buttons .active-proximity')?.dataset.value;
    const distance = document.querySelector('#distance-buttons .active-proximity')?.dataset.value;
    const price = document.querySelector('#price-buttons .active-price')?.dataset.value;
    const rating = document.querySelector('#rating-buttons .active-rating')?.dataset.value;

    const filtered = artisans.filter(a => {
        if (category && a.category !== category) return false;
        if (distance && a.distance > distance) return false;
        if (price && a.price !== price) return false;
        if (rating && a.rating < rating) return false;
        return true;
    });

    renderArtisans(filtered);
    navigateTo('artisan-list');
});

// =====================================================
// PROFILE VIEW
// =====================================================
function showProfile(artisan) {
    navigateTo('artisan-profile');
    const container = document.getElementById('artisan-profile-content');
    if (!container) return;

    container.innerHTML = `
        <img src="${artisan.photo}" class="profile-photo-large">
        <h2>${artisan.name}</h2>
        <p>${artisan.category}</p>
        <div>${renderStars(artisan.rating)}</div>
        <p>${artisan.distance} km • ${artisan.price}</p>
        <button class="btn-whatsapp">WhatsApp</button>
        <button class="btn-call">Appeler</button>
    `;
}

// =====================================================
// INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    renderArtisans(artisans);

    if (currentUser) {
        navigateTo(currentUser.role === 'artisan'
            ? 'artisan-dashboard'
            : 'client-home'
        );
    } else {
        navigateTo('client-home');
    }
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered:', reg))
      .catch(err => console.log('Service Worker failed:', err));
  });
}
