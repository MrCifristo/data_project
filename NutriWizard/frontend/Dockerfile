# Dockerfile para desarrollo

# Usa una imagen de Node como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expón el puerto 3000 para desarrollo
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]