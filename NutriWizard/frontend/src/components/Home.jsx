// src/components/Home.jsx

import React, { useState } from 'react';

const Home = () => {
    const [activeTab, setActiveTab] = useState('users');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-gray-50 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Dashboard de NutriWizard</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Tarjeta 1: Gestión de Usuarios */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestión de Usuarios</h2>
                        <p className="text-gray-600 mb-4">Administra y visualiza los datos de los usuarios activos.</p>
                        <button
                            onClick={() => handleTabChange('users')}
                            className={`w-full py-2 px-4 rounded-md text-white ${
                                activeTab === 'users' ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'
                            }`}
                        >
                            Ver Usuarios
                        </button>
                    </div>

                    {/* Tarjeta 2: Añadir Nueva Tabla */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Añadir Nueva Tabla</h2>
                        <p className="text-gray-600 mb-4">Crea nuevas tablas para organizar la información nutricional.</p>
                        <button
                            onClick={() => handleTabChange('addTable')}
                            className={`w-full py-2 px-4 rounded-md text-white ${
                                activeTab === 'addTable' ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'
                            }`}
                        >
                            Crear Tabla
                        </button>
                    </div>

                    {/* Tarjeta 3: Atributos de Usuarios */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Atributos de Usuarios</h2>
                        <p className="text-gray-600 mb-4">Gestiona y actualiza los atributos de los usuarios.</p>
                        <button
                            onClick={() => handleTabChange('userAttributes')}
                            className={`w-full py-2 px-4 rounded-md text-white ${
                                activeTab === 'userAttributes' ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'
                            }`}
                        >
                            Gestionar Atributos
                        </button>
                    </div>
                </div>

                {/* Sección dinámica basada en el tab activo */}
                <div className="mt-12">
                    {activeTab === 'users' && <UsersSection />}
                    {activeTab === 'addTable' && <AddTableSection />}
                    {activeTab === 'userAttributes' && <UserAttributesSection />}
                </div>
            </div>
        </div>
    );
};

// Componentes internos definidos dentro de Home (sin exportar)
const UsersSection = () => {
    // Aquí puedes integrar APIs para obtener y mostrar usuarios
    // Por ahora, usaremos datos estáticos como ejemplo
    const users = [
        { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', active: true },
        { id: 2, name: 'María Gómez', email: 'maria.gomez@example.com', active: false },
        { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com', active: true },
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Usuarios</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activo</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {user.active ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Activo
                                    </span>
                            ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Inactivo
                                    </span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const AddTableSection = () => {
    const [tableName, setTableName] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleAddTable = () => {
        // Aquí puedes integrar la lógica para añadir una nueva tabla vía API
        console.log('Añadir nueva tabla:', tableName);
        setTableName('');
        setSuccess('Tabla añadida exitosamente.');
        setError('');
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Crear Nueva Tabla</h3>
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Nombre de la Tabla</label>
                <input
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    required
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ej. Macronutrientes"
                />
                <button
                    onClick={handleAddTable}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Añadir Tabla
                </button>
            </div>
        </div>
    );
};

const UserAttributesSection = () => {
    const [attribute, setAttribute] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleAddAttribute = () => {
        // Aquí puedes integrar la lógica para añadir un nuevo atributo vía API
        console.log('Añadir nuevo atributo:', attribute);
        setAttribute('');
        setSuccess('Atributo añadido exitosamente.');
        setError('');
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Gestionar Atributos de Usuarios</h3>
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Nuevo Atributo</label>
                <input
                    type="text"
                    value={attribute}
                    onChange={(e) => setAttribute(e.target.value)}
                    required
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ej. Fecha de Registro"
                />
                <button
                    onClick={handleAddAttribute}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Añadir Atributo
                </button>
            </div>
        </div>
    );
};

export default Home;