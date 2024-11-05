// src/components/Carousel.jsx
import React, { useState } from 'react';

const images = [
    'https://marketplace.canva.com/EAFAPEVUs7A/1/0/1067w/canva-tarjeta-recetas-f%C3%A1ciles-simple-amarillo-y-blanco-kUbp0QbvdNk.jpg',
    'https://lh3.googleusercontent.com/proxy/sVof3rvxKXpRrFntcnM30rfxy6yLdOfRWW8Lato37tZI0POk3_BQw-dpHAR7BB0oTgCU6QGzq2r0Maq_l4pewRdfoDlyzGOiWbU8riqjjn20LWDxIy9w2PIWkQAN8VyxXhqQwFdE-YxF2nPCljINwFNBZTXB',
    'https://enriquetomas.com/cdn/shop/articles/72ppp_brocheta-melon_006.jpg?v=1690363201',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXglWlt_GOq2jLYZgPvXRQhE1OXqdwowbQoA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGoQgh-QD3XCvMfEZUQWdx7pMfDBcaFSAi6w&s',
    'https://i0.wp.com/thehappening.com/wp-content/uploads/2018/10/librosaludable8.jpg?fit=1024%2C694&ssl=1',
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full min-h-2-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="w-full h-64 object-cover transition-transform duration-500"
                />
            </div>
            {/* Botones */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
            >
                &#10094;
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
            >
                &#10095;
            </button>
            {/* Indicadores */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`h-3 w-3 rounded-full ${
                            index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                        } cursor-pointer`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;