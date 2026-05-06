# Usar una imagen base ligera de Node.js 18
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar primero los archivos de dependencias para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente del servidor
COPY . .

# Exponer el puerto en el que correrá el servidor
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["npm", "start"]
