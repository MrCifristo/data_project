import React from 'react';

const Logo = () => {
    return (
        <a href="/" className="flex items-center space-x-4">
            <img
                src="https://dynamic.design.com/asset/logo/9870fcb1-4feb-4c90-a136-759ed18ff17c/logo-search-grid-2x?logoTemplateVersion=1&v=637841421306600000&text=NutriWizard&colorpalette=blue"
                alt="NutriWizard"
                className="h-16 w-auto object-contain"  // Aumenta el tamaño de la imagen
            />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                NutriWizard
            </span>
        </a>
    );
};

export default Logo;