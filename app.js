// =====================================================
// NAVIGATION
// =====================================================
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
}

// =====================================================
// USERS & SESSION (AUTH)
// =====================================================
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// =====================================================
// REGISTER & LOGIN
// =====================================================
function registerUser(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const pin = document.getElementById('register-pin').value.trim();
    const role = document.getElementById('register-role').value;

    if (!name || !phone || !pin) return alert('Tous les champs sont obligatoires');
    if (users.find(u => u.phone === phone)) return alert('Numéro déjà utilisé');

    const user = { id: Date.now(), name, phone, pin, role, profile: { photo: 'https://randomuser.me/api/portraits/lego/1.jpg', category:'', price:'', availability:'Disponible' } };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigateTo(role === 'artisan' ? 'artisan-dashboard' : 'client-home');
}

function loginUser(e) {
    e.preventDefault();
    const phone = document.getElementById('phone').value.trim();
    const pin = document.getElementById('pin').value.trim();
    const user = users.find(u => u.phone===phone && u.pin===pin);
    if (!user) return alert('Numéro ou PIN incorrect');
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigateTo(user.role==='artisan'?'artisan-dashboard':'client-home');
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    navigateTo('client-home');
}

// =====================================================
// ARTISANS
// =====================================================
const artisans = [
    {id:1,name:"Patrick Mukendi",category:"Électricien",rating:4.8,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/1.jpg",reviews:12,distance:3,price:"moyen", phone:"243810000001"},
    {id:2,name:"Jean Kabila",category:"Plombier",rating:4.5,availability:"Occupé",photo:"https://randomuser.me/api/portraits/men/2.jpg",reviews:8,distance:5,price:"budget", phone:"243810000002"},
    {id:3,name:"Marie Nsimba",category:"Menuisier",rating:4.2,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/1.jpg",reviews:15,distance:2,price:"premium", phone:"243810000003"},
    // … ajoute les 27 autres avec phone
];

// =====================================================
// RENDER STARS
// =====================================================
function renderStars(rating) {
    let html='';
    for(let i=1;i<=5;i++) html+=`<span class="star ${rating>=i?'':'empty'}">★</span>`;
    return html;
}

// =====================================================
// RENDER ARTISANS LIST + COMPTEUR
// =====================================================
function renderArtisans(list) {
    let container = document.getElementById('artisan-list-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'artisan-list-container';
        document.body.appendChild(container);
    }

    // compteur
    let countEl = document.getElementById('artisan-count');
    if (!countEl) {
        countEl = document.createElement('p');
        countEl.id = 'artisan-count';
        container.parentNode.insertBefore(countEl, container);
    }
    countEl.textContent = `${list.length} résultat(s) trouvé(s)`;

    container.innerHTML = '';
    list.forEach(a => {
        const card = document.createElement('div');
        card.className='artisan-card';
        card.innerHTML=`
            <div class="artisan-header">
                <img src="${a.photo}" class="artisan-photo">
                <div>
                    <p class="artisan-name">${a.name}</p>
                    <p class="artisan-category">${a.category}</p>
                    <div class="artisan-rating">${renderStars(a.rating)} <span>${a.rating.toFixed(1)} (${a.reviews})</span></div>
                </div>
            </div>
            <div class="artisan-badges">
                <span class="badge">${a.distance} km</span>
                <span class="badge">${a.price}</span>
                <span class="badge">${a.availability}</span>
            </div>
        `;
        card.addEventListener('click',()=>showProfile(a));
        container.appendChild(card);
    });
}

// =====================================================
// PROFILE VIEW
// =====================================================
function showProfile(artisan) {
    navigateTo('artisan-profile');

    let container = document.getElementById('artisan-profile-content');
    if (!container) {
        container = document.createElement('div');
        container.id = 'artisan-profile-content';
        const screen = document.getElementById('artisan-profile') || document.body;
        screen.appendChild(container);
    }

    container.innerHTML=`
        <img src="${artisan.photo}" class="profile-photo-large">
        <h2>${artisan.name}</h2>
        <p>${artisan.category}</p>
        <div>${renderStars(artisan.rating)}</div>
        <p>${artisan.distance} km • ${artisan.price}</p>
        <button class="btn-whatsapp">WhatsApp</button>
        <button class="btn-call">Appeler</button>
    `;

    // WhatsApp
    container.querySelector('.btn-whatsapp').onclick = ()=>window.open(`https://wa.me/${artisan.phone}`, '_blank');
    // Appel
    container.querySelector('.btn-call').onclick = ()=>window.location.href = `tel:${artisan.phone}`;
}

// =====================================================
// FILTER ACTION
// =====================================================
document.getElementById('search-btn')?.addEventListener('click',()=>{
    const category = document.querySelector('#category-buttons .active-proximity')?.dataset.value;
    const distance = parseInt(document.querySelector('#distance-buttons .active-proximity')?.dataset.value);
    const price = document.querySelector('#price-buttons .active-price')?.dataset.value;
    const rating = parseFloat(document.querySelector('#rating-buttons .active-rating')?.dataset.value);

    const filtered = artisans.filter(a=>{
        if(category && a.category!==category) return false;
        if(distance && a.distance>distance) return false;
        if(price && a.price!==price) return false;
        if(rating && a.rating<rating) return false;
        return true;
    });

    renderArtisans(filtered);
    navigateTo('artisan-list');
});

// =====================================================
// INIT
// =====================================================
document.addEventListener('DOMContentLoaded',()=>{
    renderArtisans(artisans);
    if(currentUser) navigateTo(currentUser.role==='artisan'?'artisan-dashboard':'client-home');
    else navigateTo('client-home');
});