import React, { useState } from 'react';

const Carousel = () => {
    // Datos de ejemplo para las tarjetas
    const cards = [
        {
            imgSrc: "/docs/images/blog/image-1.jpg",
            title: "Noteworthy technology acquisitions 2021",
            description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
        },
        {
            imgSrc: "/docs/images/blog/image-2.jpg",
            title: "The state of AI in 2022",
            description: "A review of AI advancements and trends in 2022.",
        },
        {
            imgSrc: "/docs/images/blog/image-3.jpg",
            title: "Top programming languages in 2023",
            description: "An overview of the most popular programming languages in 2023.",
        },
        {
            imgSrc: "/docs/images/blog/image-4.jpg",
            title: "Cloud computing trends in 2023",
            description: "Exploring the latest trends in cloud computing.",
        },
        {
            imgSrc: "/docs/images/blog/image-5.jpg",
            title: "Cybersecurity best practices",
            description: "Best practices to keep your data and systems secure in 2023.",
        },
    ];

    const [startIndex, setStartIndex] = useState(0);

    // Muestra las tarjetas actuales en función del índice
    const visibleCards = cards.slice(startIndex, startIndex + 3);

    const handleNext = () => {
        if (startIndex + 3 < cards.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="relative border-2 border-black p-4 max-w-screen-lg mx-auto">
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md focus:outline-none"
                >
                    ◀
                </button>
                <div className="flex space-x-4">
                    {visibleCards.map((card, index) => (
                        <div key={index} className="min-w-[200px] max-w-[200px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src={card.imgSrc} alt={card.title} />
                            </a>
                            <div className="p-3">
                                <a href="#">
                                    <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
                                </a>
                                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">{card.description}</p>
                                <a href="#" className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md focus:outline-none"
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default Carousel;