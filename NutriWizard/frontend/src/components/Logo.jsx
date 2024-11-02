// src/components/Logo.jsx

import PropTypes from 'prop-types';

const Logo = ({ src, alt, className }) => {
    return (
        <img className={className} src={src} alt={alt} />
    );
};

Logo.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Logo;