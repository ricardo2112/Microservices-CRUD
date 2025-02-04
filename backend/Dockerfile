# Usamos la imagen oficial de Node.js
FROM node:16

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos de configuración (package.json y package-lock.json)
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Copiamos el resto de los archivos del proyecto al contenedor
COPY . .

# Exponemos el puerto en el que la app escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
