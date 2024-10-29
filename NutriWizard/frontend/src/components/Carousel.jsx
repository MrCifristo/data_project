import React, { useState } from 'react';

const Carousel = () => {
    const cards = [
        {
            imgSrc: "https://entrenaconelite.com/wp-content/uploads/2020/12/Imagen-blog-nutrici%C3%B3n.jpg",
            title: "Nutrición deportiva",
            description: "Consejos y estrategias para una nutrición deportiva óptima.",
        },
        {
            imgSrc: "https://www.nutricienta.com/imagenes/articulos/articulo-nutricienta-consejos-para-elaborar-el-menu-semanal.jpg",
            title: "Planificación semanal",
            description: "Cómo planificar tu menú semanal de manera efectiva.",
        },
        {
            imgSrc: "https://www.cocinavital.mx/wp-content/uploads/2024/02/menu-semanal-saludable.jpg",
            title: "Menú semanal saludable",
            description: "Ideas de menús saludables para cada día de la semana.",
        },
        {
            imgSrc: "https://cocina-casera.com/wp-content/uploads/2023/03/menu-semanal-saludable.jpg",
            title: "Recetas caseras",
            description: "Recetas deliciosas y saludables para preparar en casa.",
        },
        {
            imgSrc: "https://i.blogs.es/9c71c1/menu-saludable/840_560.jpg",
            title: "Menú balanceado",
            description: "Consejos para mantener una dieta balanceada y nutritiva.",
        },
        {
            imgSrc: "https://media.sunbasket.com/2020/08/Faroe-Islands-Salmon_Square_Web-1024x683.jpg",
            title: "¡Receta de Pescado Sana!",
            description: "Una receta deliciosa y saludable de pescado.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = 3;

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cards.length - cardsToShow : prevIndex - cardsToShow >= 0 ? prevIndex - cardsToShow : 0
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + cardsToShow >= cards.length ? 0 : prevIndex + cardsToShow
        );
    };

    return (
        <div className="relative">
            <div className="flex overflow-hidden justify-center">
                {cards.slice(currentIndex, currentIndex + cardsToShow).map((card, index) => (
                    <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2">
                        <button>
                            <img
                                className="rounded-t-lg"
                                src={card.imgSrc}
                                alt={card.title}
                                style={{ width: '350px', height: '250px', objectFit: 'cover' }}
                            />
                        </button>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {card.title}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {card.description}
                            </p>
                            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={goToPrevious} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full">
                Previous
            </button>
            <button onClick={goToNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full">
                Next
            </button>
        </div>
    );
};

export default Carousel;