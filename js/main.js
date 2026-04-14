document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       STICKY HEADER
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       SCROLL REVEAL ANIMATION
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================================================
       CATALOGUE DYNAMIQUE (Page Produits & Services Uniquement)
       ========================================================================== */
    const productsGrid = document.getElementById('products-grid');

    if (productsGrid) {
        
        // Base de données des 34 produits
        const productsData = [
            { id: 1, image: "1.png", category: "corps", name: "Lait Corporel Éclat", desc: "Hydratation et unification du teint.", price: "15 000" },
            { id: 2, image: "2.png", category: "visage", name: "Crème Visage Douceur", desc: "Soin de jour protecteur.", price: "12 000" },
            { id: 3, image: "3.png", category: "corps", name: "Gommage Corporel Intense", desc: "Exfolie et adoucit la peau.", price: "10 000" },
            { id: 4, image: "4.png", category: "visage", name: "Brume Rafraîchissante", desc: "Tonifie et hydrate instantanément.", price: "8 000" },
            { id: 5, image: "5.png", category: "visage", name: "Gel Nettoyant Purifiant", desc: "Nettoie sans assécher.", price: "9 500" },
            { id: 6, image: "6.png", category: "serum", name: "Sérum Éclat Vitamine C", desc: "Cible les taches et illumine.", price: "18 000" },
            { id: 7, image: "7.png", category: "corps", name: "Lait Hydratant Quotidien", desc: "Texture légère non grasse.", price: "14 000" },
            { id: 8, image: "8.png", category: "visage", name: "Crème Visage Douceur", desc: "Soin de jour protecteur.", price: "12 000" },
            { id: 9, image: "9.png", category: "visage", name: "Lotion Tonique Apaisante", desc: "Resserre les pores en douceur.", price: "8 500" },
            { id: 10, image: "10.png", category: "visage", name: "Sérum Hydratant Instantané", desc: "Répare et revitalise la peau.", price: "16 000" },
            { id: 11, image: "11.png", category: "visage", name: "Crème de Nuit Régénérante", desc: "Répare la peau pendant le sommeil.", price: "13 000" },
            { id: 12, image: "12.png", category: "corps", name: "Beurre Corporel Grand Format", desc: "Nutrition extrême pour peaux sèches.", price: "20 000" },
            { id: 13, image: "13.png", category: "visage", name: "Produit 13", desc: "Description à venir.", price: "10 000" },
            { id: 14, image: "14.png", category: "corps", name: "Produit 14", desc: "Description à venir.", price: "10 000" },
            { id: 15, image: "15.png", category: "serum", name: "Produit 15", desc: "Description à venir.", price: "10 000" },
            { id: 16, image: "16.png", category: "visage", name: "Produit 16", desc: "Description à venir.", price: "10 000" },
            { id: 17, image: "17.png", category: "visage", name: "Mousse Nettoyante Douce", desc: "Démaquille et nettoie.", price: "11 000" },
            { id: 18, image: "18.png", category: "pack", name: "Coffret Routine Complète", desc: "L'essentiel Wilau Bio dans un pack.", price: "45 000" },
            { id: 19, image: "19.png", category: "corps", name: "Produit 19", desc: "Description à venir.", price: "10 000" },
            { id: 20, image: "20.png", category: "corps", name: "Lait Unifiant Extrême", desc: "Atténue les imperfections corporelles.", price: "16 000" },
            { id: 21, image: "21.png", category: "visage", name: "Produit 21", desc: "Description à venir.", price: "10 000" },
            { id: 22, image: "22.png", category: "serum", name: "Produit 22", desc: "Description à venir.", price: "10 000" },
            { id: 23, image: "23.png", category: "corps", name: "Produit 23", desc: "Description à venir.", price: "10 000" },
            { id: 24, image: "24.png", category: "visage", name: "Produit 24", desc: "Description à venir.", price: "10 000" },
            { id: 25, image: "25.png", category: "corps", name: "Lait Douceur Rosée", desc: "Laisse la peau souple et parfumée.", price: "15 000" },
            { id: 26, image: "26.png", category: "serum", name: "Produit 26", desc: "Description à venir.", price: "10 000" },
            { id: 27, image: "27.png", category: "serum", name: "Huile Scellante Précieuse", desc: "Garde l'hydratation toute la journée.", price: "12 500" },
            { id: 28, image: "28.png", category: "corps", name: "Produit 28", desc: "Description à venir.", price: "10 000" },
            { id: 29, image: "29.png", category: "visage", name: "Produit 29", desc: "Description à venir.", price: "10 000" },
            { id: 30, image: "30.png", category: "serum", name: "Produit 30", desc: "Description à venir.", price: "10 000" },
            { id: 31, image: "31.png", category: "corps", name: "Produit 31", desc: "Description à venir.", price: "10 000" },
            { id: 32, image: "32.png", category: "visage", name: "Produit 32", desc: "Description à venir.", price: "10 000" },
            { id: 33, image: "33.png", category: "pack", name: "Produit 33", desc: "Description à venir.", price: "10 000" },
            { id: 34, image: "34.png", category: "corps", name: "Beurre de Cacao Pur", desc: "100% naturel, multi-usages.", price: "9 000" }
        ];

        const filterBtns = document.querySelectorAll('.filter-btn');

        function getWhatsAppLink(productName, productPrice) {
            const message = `Bonjour Wilau Bio, je souhaite commander le produit : ${productName} à ${productPrice} FCFA.`;
            return `https://wa.me/237697655431?text=${encodeURIComponent(message)}`;
        }

        function displayProducts(category = "all") {
            productsGrid.innerHTML = ""; 
            
            const filteredProducts = category === "all" 
                ? productsData 
                : productsData.filter(product => product.category === category);

            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card'); 
                
                card.innerHTML = `
                    <div class="img-wrapper aspect-portrait">
                        <img src="assets/images/${product.image}" alt="${product.name}" onerror="this.src='assets/images/placeholder.png'">
                    </div>
                    <div class="product-info">
                        <span class="product-category" style="font-size: 0.75rem; text-transform: uppercase; color: #6b7280; display: block; margin-bottom: 0.5rem;">${product.category}</span>
                        <h3>${product.name}</h3>
                        <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">${product.desc}</p>
                        <div class="product-price" style="font-size: 1.2rem; font-weight: 700; color: #F39200; margin: 0.5rem 0 1rem;">${product.price} FCFA</div>
                        <a href="${getWhatsAppLink(product.name, product.price)}" target="_blank" class="btn btn-outline small full-width">Commander</a>
                    </div>
                `;
                productsGrid.appendChild(card);
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                displayProducts(e.target.getAttribute('data-filter'));
            });
        });

        // Premier affichage forcé
        displayProducts("all");
    }
});