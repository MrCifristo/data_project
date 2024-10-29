import PropTypes from 'prop-types';

const Logo = ({ src, alt }) => {
    return (
        <button className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={src} alt={alt} />
            {alt}
        </button>
    );
};

Logo.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default Logo;