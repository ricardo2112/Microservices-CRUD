# Usa la imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json desde la carpeta backend
COPY backend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente desde la carpeta backend al contenedor
COPY ./backend /app

# Exponemos el puerto que la app usará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
