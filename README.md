# NutriWizard

NutriWizard es una aplicación web diseñada para gestionar y monitorear planes de alimentación. Los usuarios pueden agregar, eliminar y visualizar comidas, además de integrarlas a un menú diario. La aplicación emplea una arquitectura moderna con una capa de caché (Redis) para mejorar el rendimiento en consultas frecuentes.

## Tabla de Contenidos

- [Características](#características)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## Características

- **Gestión de comidas**: Agregar, editar y eliminar comidas.
- **Caché eficiente**: Uso de Redis para mejorar tiempos de respuesta.
- **Interfaz interactiva**: React.js para una experiencia de usuario fluida.
- **Soporte para JWT**: Autenticación basada en tokens para proteger operaciones críticas.
- **Integración de PostgreSQL**: Base de datos relacional para el almacenamiento de información.

---

## Arquitectura del Proyecto

El sistema sigue un enfoque basado en **MVC** (Modelo-Vista-Controlador) con los siguientes componentes principales:

### Frontend:
- **React.js**: Interfaz de usuario.
- Componentes clave: `Meals.jsx`, `LayoutForm.jsx`.

### Backend:
- **Express.js**: Framework para construir API RESTful.
- Rutas principales: `mealsRoutes.js`, `menuRoutes.js`.

### Base de Datos:
- **PostgreSQL**: Almacén principal de datos.
- Modelos: `meals`, `menu`.

### Cache:
- **Redis**: Usado para almacenar en caché consultas frecuentes.

### Flujo General:
1. El usuario interactúa con el frontend.
2. El frontend realiza solicitudes HTTP a las rutas del backend.
3. El backend maneja la lógica de la aplicación y consulta Redis o PostgreSQL según sea necesario.
4. Los datos se envían de vuelta al frontend para su visualización.

---

## Instalación

### Requisitos Previos
- Node.js 16+
- PostgreSQL 12+
- Redis

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/nutriwizard.git
   cd nutriwizard
    ```
2. Instalar dependencias:
    ```bash
    npm install
    ```Instalar dependencias:

3. Configurar variables de entorno: Crea un archivo .env en la raíz con las siguientes claves:
    ```env
    PORT=5001
    DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nutriwizard
    JWT_SECRET=tu_secreto
    REDIS_HOST=localhost
    REDIS_PORT=6379
   ```
4. Ejecutar migraciones:
    ```bash
    npx sequelize-cli db:migrate
    ```
5. Iniciar el servidor:
    ```bash
    npm run dev
    ```