document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Handle popups
  const popup = document.querySelector('.image-popup');
  const popupImg = popup.querySelector('img');

  document.querySelectorAll('.project-slideshow img').forEach(img => {
    img.addEventListener('click', () => {
      popup.style.display = 'flex';
      popupImg.src = img.src;
    });
  });

  popup.addEventListener('click', () => {
    popup.style.display = 'none';
    popupImg.src = '';
  });

  // Multiple slideshows logic
  document.querySelectorAll('.project-slideshow').forEach(slideshow => {
    const slides = slideshow.querySelector('.slides');
    const images = slides.querySelectorAll('img');
    let currentSlide = 0;

    const moveSlide = (step) => {
      currentSlide = (currentSlide + step + images.length) % images.length;
      const offset = -currentSlide * 100;
      slides.style.transform = `translateX(${offset}%)`;
    };

    // Button events
    slideshow.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    slideshow.querySelector('.next').addEventListener('click', () => moveSlide(1));

    // Autoslide every 4 seconds
    setInterval(() => moveSlide(1), 4000);
  });
});
