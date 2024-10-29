# Usa una imagen base de Node.js
FROM node:18

# Crea el directorio de la aplicación
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package*.json ./
RUN npm install

# Copia el código fuente al contenedor
COPY . .

# Expone el puerto del backend
EXPOSE 5001

# Comando por defecto para ejecutar el backend
CMD ["npm", "run", "dev"]