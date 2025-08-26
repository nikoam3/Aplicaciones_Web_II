# Usa una imagen base de Node.js (elige la versión que coincida con tu proyecto, e.g., 18-alpine es ligera)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json para instalar dependencias primero (optimiza el cache de Docker)
COPY package*.json ./

# Instala las dependencias (usa --production para evitar devDependencies como nodemon)
RUN npm install --production

# Copia el resto del código fuente (incluyendo rutas, controladores, DB, etc.)
COPY . .

# Expone el puerto donde corre tu app (usa process.env.PORT o fallback a 3000)
EXPOSE 3000

# Comando para correr la app (usa el script "start" de package.json)
CMD ["npm", "start"]