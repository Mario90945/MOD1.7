// Esperar a que el documento cargue completamente
document.addEventListener('DOMContentLoaded', () => {

    // === ELEMENTOS DEL SLIDER / BANNER ===
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Función para actualizar la posición del slider
    function updateSlider(index) {
        // Mueve la pista horizontalmente multiplicando por 100%
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar la clase 'active' en los puntos (dots)
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentIndex = index;
    }

    // Siguiente Diapositiva
    function nextSlide() {
        let newIndex = (currentIndex + 1) % totalSlides;
        updateSlider(newIndex);
    }

    // Diapositiva Anterior
    function prevSlide() {
        let newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider(newIndex);
    }

    // Eventos de los botones Flecha
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Eventos de clic en los Puntos (Dots)
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateSlider(idx);
            resetAutoSlide();
        });
    });

    // Iniciar movimiento automático cada 4 segundos
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    // Reiniciar temporizador cuando el usuario interactúa
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Iniciar el carrusel
    startAutoSlide();

    // Detener carrusel al pasar el mouse por encima
    sliderTrack.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderTrack.addEventListener('mouseleave', startAutoSlide);
});