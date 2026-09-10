document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. MOBILE MENU TOGGLE (Homepage)
    // =========================================
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            // Toggle the 'active' class on the nav list
            navLinks.classList.toggle('active');
            
            // Update accessibility attribute
            const isExpanded = navLinks.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
            
            // Change icon from Hamburger to X
            menuBtn.textContent = isExpanded ? '✕' : '☰';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.textContent = '☰';
            });
        });
    }

    // =========================================
    // 2. AUTH PAGE ROLE SWITCHING
    // =========================================
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const formTitle = document.getElementById('formTitle');
    const tutorFields = document.querySelector('.tutor-only');
    const authForm = document.getElementById('authForm');

    if (toggleBtns.length > 0) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                toggleBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');

                const role = e.target.textContent.toLowerCase(); // 'student' or 'tutor'

                if (role === 'tutor') {
                    if (formTitle) formTitle.innerText = "Tutor Registration";
                    if (tutorFields) tutorFields.style.display = 'block';
                    // Make fields required if visible
                    if (tutorFields) {
                        const inputs = tutorFields.querySelectorAll('input');
                        inputs.forEach(input => input.required = true);
                    }
                } else {
                    if (formTitle) formTitle.innerText = "Student Registration";
                    if (tutorFields) tutorFields.style.display = 'none';
                    // Remove required attribute if hidden
                    if (tutorFields) {
                        const inputs = tutorFields.querySelectorAll('input');
                        inputs.forEach(input => input.required = false);
                    }
                }
            });
        });
    }

    // =========================================
    // 3. FORM SUBMISSION SIMULATION
    // =========================================
    
    // Handle Auth Form
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = authForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = "Creating Account...";
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert("Account created successfully! Redirecting to dashboard...");
                btn.innerText = originalText;
                btn.disabled = false;
                // In a real app, you would redirect here:
                // window.location.href = 'tutor-dashboard.html'; 
            }, 1500);
        });
    }

    // Handle Contact Form
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Note: Your HTML uses mailto, so this prevents default only if you want JS handling
            // If you want to keep mailto, remove this listener or let it proceed.
            // For better UX, we can show a message before opening email client:
            const btn = contactForm.querySelector('button');
            btn.innerText = "Opening Email Client...";
            setTimeout(() => {
                btn.innerText = "Send Message";
            }, 2000);
        });
    }

    // Handle Publish Form (Tutor Dashboard)
    const publishForm = document.querySelector('.publish-form');
    if (publishForm) {
        publishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = publishForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = "Publishing...";
            btn.disabled = true;

            setTimeout(() => {
                alert("Service/Book published successfully!");
                publishForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Handle Admin Approve Buttons
    const approveBtns = document.querySelectorAll('.btn-sm');
    approveBtns.forEach(btn => {
        if (btn.textContent === 'Approve') {
            btn.addEventListener('click', function() {
                if (confirm("Are you sure you want to approve this user?")) {
                    const row = this.closest('tr');
                    const badge = row.querySelector('.badge');
                    
                    // Update UI to show approved
                    badge.className = 'badge active';
                    badge.textContent = 'Active';
                    this.textContent = 'Approved';
                    this.disabled = true;
                    this.style.opacity = '0.5';
                    this.style.cursor = 'not-allowed';
                }
            });
        }
    });
});