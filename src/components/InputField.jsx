import PropTypes from 'prop-types';

const InputField = ({ type, placeholder, value, onChange, name }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{placeholder}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                name={name}  // Asegúrate de que este prop se pase correctamente al input
                placeholder={placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>
    );
};

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,  // Asegúrate de que el `name` esté definido y sea requerido
};

export default InputField;
