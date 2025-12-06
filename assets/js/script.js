document.getElementById('discover').addEventListener('click', function() {
    window.location.href = "services.html";
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre message! Nous reviendrons vers vous sous peu.');
});

document.addEventListener("DOMContentLoaded", function() {
    // Animation parallax effect on scroll
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        document.querySelector('.hero').style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });

    // Smooth hover effects on carousel items
    const carouselItems = document.querySelectorAll(".carousel-item");
    carouselItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            item.style.transform = "scale(1.1)";
        });
        item.addEventListener("mouseout", () => {
            item.style.transform = "scale(1)";
        });
    });
});
