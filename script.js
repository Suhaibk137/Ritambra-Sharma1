document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav item is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio filtering
    const categories = document.querySelectorAll('.category');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    // Portfolio items data - Reduced to 16 total (4 per category)
    const portfolioItems = [
        // Bridal Category (4 items)
        {
            id: 1,
            category: 'bridal',
            image: 'p3.png',
            title: 'Modern Bride',
            description: 'Contemporary bridal makeup'
        },
        {
            id: 2,
            category: 'bridal',
            image: 'p4.png',
            title: 'Traditional Bride',
            description: 'Classic bridal beauty'
        },
        {
            id: 3,
            category: 'bridal',
            image: 'p5.png',
            title: 'Destination Wedding',
            description: 'Cinema wedding makeup'
        },
        {
            id: 4,
            category: 'bridal',
            image: 'p6.png',
            title: 'Bride Fusion',
            description: 'Group Bride'
        },
        
        // Editorial Category (4 items)
        {
            id: 5,
            category: 'editorial',
            image: 'editorial.png',
            title: 'Bold Editorial',
            description: 'Creative makeup for fashion magazine'
        },
        {
            id: 6,
            category: 'editorial',
            image: 'p6.png',
            title: 'IFW',
            description: 'Group for IFW'
        },
        {
            id: 7,
            category: 'editorial',
            image: 'p7.png',
            title: 'Color Story',
            description: 'Vibrant editorial concept'
        },
        {
            id: 8,
            category: 'editorial',
            image: 'p8.png',
            title: 'Geometric Lines',
            description: 'Abstract editorial concept'
        },
        
        // Special Effects Category (4 items)
        {
            id: 9,
            category: 'sfx',
            image: 'p1.png',
            title: 'Fantasy Creature',
            description: 'Special effects makeup for mythical character'
        },
        {
            id: 10,
            category: 'sfx',
            image: 'p9.png',
            title: 'Alien Transformation',
            description: 'Sci-fi character special effects'
        },
        {
            id: 11,
            category: 'sfx',
            image: 'p10.png',
            title: 'Futuristic Character',
            description: 'Sci-fi inspired special effects'
        },
        {
            id: 12,
            category: 'sfx',
            image: 'p11.png',
            title: 'Zombie Effect',
            description: 'Horror-inspired character'
        },
        
        // Beauty Category (4 items)
        {
            id: 13,
            category: 'beauty',
            image: 'p12.png',
            title: 'Glowing Skin',
            description: 'Natural beauty enhancement'
        },
        {
            id: 14,
            category: 'beauty',
            image: 'p13.png',
            title: 'Red Carpet Ready',
            description: 'Glamorous event makeup'
        },
        {
            id: 15,
            category: 'beauty',
            image: 'p14.png',
            title: 'Luminous Skin',
            description: 'Dewy makeup look'
        },
        {
            id: 16,
            category: 'beauty',
            image: 'p15.png',
            title: 'Smoky Eye',
            description: 'Classic evening look'
        }
    ];
    
    // Generate portfolio items
    function generatePortfolioItems() {
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';
        
        portfolioItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <div class="portfolio-info">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
            
            // Add click event to new item
            portfolioItem.addEventListener('click', () => {
                openModal(item.image, item.title, item.description);
            });
        });
    }
    
    // Initialize portfolio
    generatePortfolioItems();
    
    // Portfolio filtering functionality
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            categories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            category.classList.add('active');
            
            const filter = category.getAttribute('data-filter');
            
            // Filter portfolio items
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Create dots for each slide
    if (testimonialSlides.length > 0 && sliderDots) {
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            sliderDots.appendChild(dot);
        });
    }
    
    const dots = document.querySelectorAll('.dot');
    
    // Initialize slider
    function initSlider() {
        if (testimonialSlides.length > 0) {
            testimonialSlides[0].classList.add('active');
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % testimonialSlides.length;
        goToSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        goToSlide(prev);
    }
    
    // Add event listeners for slider controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Auto slide change if there are slides
    if (testimonialSlides.length > 0) {
        setInterval(nextSlide, 5000);
    }
    
    // Initialize slider
    initSlider();
    
    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    
    function openModal(imgSrc, title, description) {
        if (!modal || !modalImg || !modalCaption) return;
        
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        
        // Disable scroll on body
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close modal when clicking outside the image
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Form submission handling (prevent default for demo)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This form is currently for demonstration purposes only. Please contact Ritambra directly via email or phone.');
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});