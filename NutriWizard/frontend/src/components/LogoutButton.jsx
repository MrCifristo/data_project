// src/components/LogoutButton.jsx

import PropTypes from 'prop-types';
import LoginButton from './LoginButton.jsx'; // Reutilizamos el componente de botón

const LogoutButton = ({ onLogout }) => {
    return (
        <div className="fixed top-4 right-4">
            <LoginButton
                label="Logout"
                onClick={onLogout}
            />
        </div>
    );
};

LogoutButton.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
