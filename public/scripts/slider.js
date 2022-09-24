    const slides = document.querySelectorAll('.card-image');
    const next = document.querySelector('.next-btn');
    const prev = document.querySelector('.prev-btn');

    let currentSlide = 0;
    let maxSlide = slides.length - 1;

next.addEventListener('click', () => {
    if (currentSlide === maxSlide) {
        currentSlide = 0;
    } else {
        currentSlide++
    }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    });
})

prev.addEventListener('click', () => {
    if (currentSlide === 0) {
        currentSlide = maxSlide;
    } else {
        currentSlide--;
    }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    })
})