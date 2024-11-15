document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scroll-container');
    const imageRow = document.querySelector('.image-row');
    let images = Array.from(document.querySelectorAll('.image-row img'));

    function cloneImages() {
        images.forEach((img) => {
            const clone = img.cloneNode(true);
            imageRow.appendChild(clone);
        });
        images = Array.from(document.querySelectorAll('.image-row img'));
    }

    function calculateOffset() {
        const containerWidth = scrollContainer.clientWidth;
        const imageWidth = images[0].clientWidth;
        return (containerWidth - imageWidth) / 2;
    }

    function setInitialScroll() {
        const offset = calculateOffset();
        scrollContainer.scrollLeft = images[1].offsetLeft - offset;
    }


    function updateImageSizes(currentIndex) {
        images.forEach((img, index) => {
            img.classList.remove('shrink', 'enlarge');
            if (index === currentIndex) {
                img.classList.add('enlarge');
            } else if (index === currentIndex - 1 || index === currentIndex + 1) {
                img.classList.add('shrink');
            }
        });
    }

    function startSlideshow() {
        cloneImages();
        setInitialScroll();

        let currentIndex = 1;
        const imageWidth = images[0].clientWidth + 50;


        updateImageSizes(currentIndex);


        setInterval(() => {
            currentIndex++;


            scrollContainer.scrollTo({
                left: currentIndex * imageWidth - (imageWidth / 2),
                behavior: "smooth",
            });


            updateImageSizes(currentIndex % images.length);


            if (scrollContainer.scrollLeft >= imageRow.scrollWidth / 2) {
                cloneImages();
            }
        }, 2500);
    }

    startSlideshow();
});
document.querySelectorAll('.categories a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.categories a').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

