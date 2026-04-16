document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       STICKY HEADER & MENU
       ========================================================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

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
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* ==========================================================================
       CATALOGUE DYNAMIQUE OPTIMISÉ (Données WiLAU BIO)
       ========================================================================== */
    const productsGrid = document.getElementById('products-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (productsGrid) {
        
        // Base de données des 24 produits WiLAU BIO
        const productsData = [
            { id: 1, image: "1.png", category: "corps", name: "Shampooing FAITHY", desc: "Nettoie, purifie et assainit le cuir chevelu.", price: "7 500" },
            { id: 2, image: "2.png", category: "visage", name: "Masque à l’Argile Verte", desc: "Soin du visage pour peaux grasses et mixtes.", price: "10 000" },
            { id: 3, image: "3.png", category: "corps", name: "FAITHY Crème de Cheveux", desc: "Nourrit, renforce et active la pousse.", price: "7 500" },
            { id: 4, image: "4.png", category: "corps", name: "Sérum Active Pousse", desc: "Stimule la croissance des cheveux.", price: "10 000" },
            { id: 5, image: "5.png", category: "visage", name: "ADOU Gel Nettoyant Purifiant", desc: "Nettoie et purifie la peau du visage.", price: "10 000" },
            { id: 6, image: "6.png", category: "visage", name: "Potion Magique Visage", desc: "Revitalise et illumine le teint.", price: "10 000" },
            { id: 7, image: "7.png", category: "visage", name: "Lotion Pink Sun", desc: "Clarifiante, anti-taches et anti-acné.", price: "5 000" },
            { id: 8, image: "8.png", category: "visage", name: "Lotion Green Moon", desc: "Anti-taches et anti-acné.", price: "5 000" },
            { id: 9, image: "9.png", category: "corps", name: "Traitement de Cheveux FAITHY", desc: "Stimule la croissance et fortifie les cheveux.", price: "7 500" },
            { id: 10, image: "10.png", category: "visage", name: "Crème de Visage DIVA", desc: "Nourrit et illumine la peau.", price: "7 500" },
            { id: 11, image: "11.png", category: "corps", name: "LYLY Gommage Noyaux d’Abricot", desc: "Exfolie le visage et le corps.", price: "7 500" },
            { id: 12, image: "12.png", category: "visage", name: "Masque à l’Argile Rouge", desc: "Soin pour peaux sèches et sensibles.", price: "10 000" },
            { id: 13, image: "13.png", category: "visage", name: "Crème de Visage DIAMOND", desc: "Clarifie et unifie le teint.", price: "7 500" },
            { id: 14, image: "14.png", category: "visage", name: "Crème de Visage KIMMY", desc: "Hydrate et adoucit la peau.", price: "5 000" },
            { id: 15, image: "15.png", category: "corps", name: "Lait de Corps DIVA", desc: "Clarifiant pour teints clairs.", price: "15 000" },
            { id: 16, image: "16.png", category: "corps", name: "Gel Douche LIGHT", desc: "Gommant et éclaircissant.", price: "7 500" },
            { id: 17, image: "17.png", category: "corps", name: "Lait de Corps KIMMY", desc: "Hydratant et clarifiant.", price: "12 500" },
            { id: 18, image: "18.png", category: "corps", name: "Lait de Corps DIAMOND", desc: "Super éclaircissant pour teints métissés.", price: "17 500" },
            { id: 19, image: "19.png", category: "corps", name: "Lait de Corps SHINE", desc: "Hydrate et illumine la peau.", price: "10 000" },
            { id: 20, image: "20.png", category: "corps", name: "Gel Douche GLOW", desc: "Nettoie et illumine la peau.", price: "7 500" },
            { id: 21, image: "21.png", category: "corps", name: "RADIANCE Collagène & Ginseng", desc: "Revitalise et apporte de l’éclat.", price: "7 500" },
            { id: 22, image: "22.png", category: "visage", name: "TRÉSOR Gel Nettoyant Exfoliant", desc: "Nettoie et exfolie en douceur.", price: "10 000" },
            { id: 23, image: "23.png", category: "corps", name: "Secret de Mémé", desc: "Soin nourrissant et réparateur traditionnel.", price: "7 500" },
            { id: 24, image: "24.png", category: "serum", name: "Huile Radiance", desc: "Nourrit et illumine la peau et les cheveux.", price: "10 000" }
        ];

        let currentCategory = "all";
        let currentPage = 1;
        const itemsPerPage = 12;

        function getWhatsAppLink(productName, productPrice) {
            const message = `Bonjour Wilau Bio, je souhaite commander le produit : ${productName} à ${productPrice} FCFA.`;
            return `https://wa.me/237697655431?text=${encodeURIComponent(message)}`;
        }

        function displayProducts(category = "all", reset = true) {
            if (reset) {
                productsGrid.innerHTML = ""; 
                currentPage = 1;
                currentCategory = category;
            }
            
            const filteredProducts = currentCategory === "all" 
                ? productsData 
                : productsData.filter(product => product.category === currentCategory);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const productsToShow = filteredProducts.slice(startIndex, endIndex);

            productsToShow.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card'); 
                
                card.innerHTML = `
                    <div class="img-wrapper aspect-portrait">
                        <img src="assets/images/${product.image}" alt="${product.name}" loading="lazy" decoding="async" onerror="this.src='assets/images/placeholder.png'">
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

            if (endIndex < filteredProducts.length) {
                if (loadMoreBtn) loadMoreBtn.style.display = "inline-block";
            } else {
                if (loadMoreBtn) loadMoreBtn.style.display = "none";
            }
        }

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                displayProducts(e.target.getAttribute('data-filter'), true);
            });
        });

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                currentPage++;
                displayProducts(currentCategory, false);
            });
        }

        displayProducts("all", true);
    }
});