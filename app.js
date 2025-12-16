// =====================================================
// ARTISANS (30 PERSONAS) avec numéro
// =====================================================
const artisans = [
    {id:1,name:"Patrick Mukendi",phone:"+243970000001",category:"Électricien",rating:4.8,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/1.jpg",reviews:12,distance:3,price:"moyen"},
    {id:2,name:"Jean Kabila",phone:"+243970000002",category:"Plombier",rating:4.5,availability:"Occupé",photo:"https://randomuser.me/api/portraits/men/2.jpg",reviews:8,distance:5,price:"budget"},
    {id:3,name:"Marie Nsimba",phone:"+243970000003",category:"Menuisier",rating:4.2,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/1.jpg",reviews:15,distance:2,price:"premium"},
    {id:4,name:"Alain Tshibanda",phone:"+243970000004",category:"Peintre",rating:3.9,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/3.jpg",reviews:5,distance:8,price:"budget"},
    {id:5,name:"Koffi Lenga",phone:"+243970000005",category:"Mécanicien",rating:4.7,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/4.jpg",reviews:10,distance:6,price:"moyen"},
    {id:6,name:"Lucie Mwamba",phone:"+243970000006",category:"Maçon",rating:4.1,availability:"Occupé",photo:"https://randomuser.me/api/portraits/women/2.jpg",reviews:7,distance:9,price:"premium"},
    {id:7,name:"Jeanine Bemba",phone:"+243970000007",category:"Couturière",rating:4.3,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/3.jpg",reviews:6,distance:4,price:"budget"},
    {id:8,name:"Michel Ndaye",phone:"+243970000008",category:"Coiffeur",rating:4.0,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/5.jpg",reviews:9,distance:3,price:"moyen"},
    {id:9,name:"Alice Kitenge",phone:"+243970000009",category:"Esthéticienne",rating:4.5,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/4.jpg",reviews:11,distance:2,price:"premium"},
    {id:10,name:"Joseph Kalenga",phone:"+243970000010",category:"Chauffeur",rating:4.2,availability:"Occupé",photo:"https://randomuser.me/api/portraits/men/6.jpg",reviews:5,distance:7,price:"budget"},
    {id:11,name:"Fatou Banza",phone:"+243970000011",category:"Photographe",rating:4.6,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/5.jpg",reviews:8,distance:6,price:"moyen"},
    {id:12,name:"Paul Mbemba",phone:"+243970000012",category:"Jardinier",rating:4.1,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/7.jpg",reviews:12,distance:5,price:"budget"},
    {id:13,name:"Sophie Kambale",phone:"+243970000013",category:"Peintre",rating:4.0,availability:"Occupé",photo:"https://randomuser.me/api/portraits/women/6.jpg",reviews:7,distance:8,price:"moyen"},
    {id:14,name:"Didier Tshisekedi",phone:"+243970000014",category:"Électricien",rating:4.8,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/8.jpg",reviews:14,distance:4,price:"premium"},
    {id:15,name:"Claudine Nsimba",phone:"+243970000015",category:"Coiffeuse",rating:4.3,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/7.jpg",reviews:10,distance:3,price:"budget"},
    {id:16,name:"Henri Lumbala",phone:"+243970000016",category:"Mécanicien",rating:4.2,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/9.jpg",reviews:9,distance:6,price:"moyen"},
    {id:17,name:"Emilie Mukendi",phone:"+243970000017",category:"Esthéticienne",rating:4.5,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/8.jpg",reviews:12,distance:2,price:"premium"},
    {id:18,name:"Jean-Pierre Kabila",phone:"+243970000018",category:"Menuisier",rating:4.1,availability:"Occupé",photo:"https://randomuser.me/api/portraits/men/10.jpg",reviews:5,distance:7,price:"budget"},
    {id:19,name:"Claire Banza",phone:"+243970000019",category:"Couturière",rating:4.0,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/9.jpg",reviews:8,distance:3,price:"moyen"},
    {id:20,name:"Lucien Kalenga",phone:"+243970000020",category:"Peintre",rating:4.3,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/11.jpg",reviews:11,distance:5,price:"premium"},
    {id:21,name:"Annie Ndaye",phone:"+243970000021",category:"Jardinier",rating:4.2,availability:"Occupé",photo:"https://randomuser.me/api/portraits/women/10.jpg",reviews:6,distance:9,price:"budget"},
    {id:22,name:"Marc Kitenge",phone:"+243970000022",category:"Chauffeur",rating:4.5,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/12.jpg",reviews:9,distance:4,price:"moyen"},
    {id:23,name:"Patricia Mbemba",phone:"+243970000023",category:"Photographe",rating:4.6,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/11.jpg",reviews:10,distance:6,price:"premium"},
    {id:24,name:"Fabrice Lumbala",phone:"+243970000024",category:"Électricien",rating:4.8,availability:"Occupé",photo:"https://randomuser.me/api/portraits/men/13.jpg",reviews:13,distance:3,price:"premium"},
    {id:25,name:"Sarah Kambale",phone:"+243970000025",category:"Coiffeuse",rating:4.2,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/12.jpg",reviews:7,distance:2,price:"moyen"},
    {id:26,name:"Daniel Tshibanda",phone:"+243970000026",category:"Mécanicien",rating:4.1,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/14.jpg",reviews:9,distance:5,price:"budget"},
    {id:27,name:"Jeanne Nsimba",phone:"+243970000027",category:"Menuisier",rating:4.3,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/13.jpg",reviews:11,distance:3,price:"premium"},
    {id:28,name:"Albert Mukendi",phone:"+243970000028",category:"Peintre",rating:4.0,availability:"Occupé",photo:"https://randomuser.me/api/portraits/men/15.jpg",reviews:6,distance:8,price:"budget"},
    {id:29,name:"Marie-Ange Bemba",phone:"+243970000029",category:"Couturière",rating:4.5,availability:"Disponible",photo:"https://randomuser.me/api/portraits/women/14.jpg",reviews:10,distance:2,price:"moyen"},
    {id:30,name:"Jean-Luc Kalenga",phone:"+243970000030",category:"Chauffeur",rating:4.2,availability:"Disponible",photo:"https://randomuser.me/api/portraits/men/16.jpg",reviews:8,distance:4,price:"premium"}
];

// =====================================================
// PROFILE VIEW avec WhatsApp et Appel
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

    // === Bouton WhatsApp ===
    container.querySelector('.btn-whatsapp')?.addEventListener('click', () => {
        window.open(`https://wa.me/${artisan.phone}`, '_blank');
    });

    // === Bouton Appeler ===
    container.querySelector('.btn-call')?.addEventListener('click', () => {
        window.location.href = `tel:${artisan.phone}`;
    });
}

// =====================================================
// FILTER ACTION avec compteur
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

    // Afficher le compteur exact
    const counter = document.getElementById('artisan-count');
    if (counter) counter.textContent = `${filtered.length} résultat(s) trouvé(s)`;
});