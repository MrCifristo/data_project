// src/components/SignUpForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo.jsx';
import InputField from './InputField.jsx';
import SelectField from './SelectField.jsx';
import LoginButton from './LoginButton.jsx';

const SignUpForm = ({ onSignUp, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        nombre_completo: '',
        edad: '',
        sexo: '',
        altura: '',
        peso: '',
        nivel_actividad: '',
        historial_medico: '',
        alergias_alimentarias: '',
        condicion_especifica: '',
        objetivos_nutricionales: '',
        dieta: '',
        consumo_calorias_diario: '',
        numero_comidas_bocadillos: '',
        consumo_agua_diario: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const userResponse = await fetch('http://localhost:5001/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre_completo: formData.nombre_completo,
                    edad: formData.edad,
                    sexo: formData.sexo,
                    altura: formData.altura,
                    peso: formData.peso,
                    nivel_actividad: formData.nivel_actividad,
                    historial_medico: formData.historial_medico,
                    alergias_alimentarias: formData.alergias_alimentarias,
                    condicion_especifica: formData.condicion_especifica,
                    objetivos_nutricionales: formData.objetivos_nutricionales,
                    dieta: formData.dieta,
                    consumo_calorias_diario: formData.consumo_calorias_diario,
                    numero_comidas_bocadillos: formData.numero_comidas_bocadillos,
                    consumo_agua_diario: formData.consumo_agua_diario,
                }),
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                const usuarioId = userData.id;

                const authResponse = await fetch('http://localhost:5001/register-auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        usuario_id: usuarioId,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                if (authResponse.ok) {
                    const authData = await authResponse.json();
                    console.log('Registration successful:', authData);
                    onSignUp(authData);
                } else {
                    console.error('Authentication registration failed');
                }
            } else {
                console.error('User registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 overflow-y-auto max-h-[75vh]">
                <Logo src="https://media.tenor.com/BIn4gjem0LQAAAAj/naruto-hungry.gif" alt="Company Name" />
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                    {/* Campos para información del usuario */}
                    <InputField type="text" name="nombre_completo" placeholder="Full Name" value={formData.nombre_completo} onChange={handleChange} />
                    <InputField type="number" name="edad" placeholder="Age" value={formData.edad} onChange={handleChange} />
                    <InputField type="text" name="sexo" placeholder="Sex" value={formData.sexo} onChange={handleChange} />
                    <InputField type="number" name="altura" placeholder="Height (cm)" value={formData.altura} onChange={handleChange} />
                    <InputField type="number" name="peso" placeholder="Weight (kg)" value={formData.peso} onChange={handleChange} />
                    <SelectField name="nivel_actividad" placeholder="Activity Level" value={formData.nivel_actividad} onChange={handleChange} options={['Sedentario', 'Ligera', 'Moderado', 'Intenso', 'Muy intenso']} />
                    <SelectField name="historial_medico" placeholder="Medical History" value={formData.historial_medico} onChange={handleChange} options={['Diabetes', 'Hipertensión', 'Cardiopatía', 'Asma', 'Otra']} />
                    <InputField type="text" name="alergias_alimentarias" placeholder="Food Allergies" value={formData.alergias_alimentarias} onChange={handleChange} />
                    <SelectField name="condicion_especifica" placeholder="Specific Conditions" value={formData.condicion_especifica} onChange={handleChange} options={['Trastornos digestivos', 'Intolerancia a la lactosa', 'Intolerancia al gluten', 'Otra']} />
                    <SelectField name="objetivos_nutricionales" placeholder="Nutritional Goals" value={formData.objetivos_nutricionales} onChange={handleChange} options={['Pérdida de peso', 'Mantenimiento de peso', 'Ganancia de masa muscular', 'Mejora del rendimiento deportivo', 'Salud general y bienestar']} />
                    <SelectField name="dieta" placeholder="Diet" value={formData.dieta} onChange={handleChange} options={['Vegetariana', 'Vegana', 'Omnívora', 'Otra']} />
                    <InputField type="number" name="consumo_calorias_diario" placeholder="Daily Calorie Intake" value={formData.consumo_calorias_diario} onChange={handleChange} />
                    <InputField type="number" name="numero_comidas_bocadillos" placeholder="Meals and Snacks per Day" value={formData.numero_comidas_bocadillos} onChange={handleChange} />
                    <InputField type="number" name="consumo_agua_diario" placeholder="Daily Water Intake (L)" value={formData.consumo_agua_diario} onChange={handleChange} />
                    {/* Campos para autenticación */}
                    <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <InputField type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <LoginButton label="Create an account" />
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?{' '}
                        <button onClick={onSwitchToLogin} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

SignUpForm.propTypes = {
    onSignUp: PropTypes.func.isRequired,
    onSwitchToLogin: PropTypes.func.isRequired,
};

export default SignUpForm;