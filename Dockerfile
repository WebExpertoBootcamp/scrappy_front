# Usamos Node.js como base
FROM node:23-alpine3.19

# Establecemos el directorio de trabajo
WORKDIR /app

# Instalamos las dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto de la aplicación
COPY . .

# Exponemos el puerto de desarrollo de Angular (por defecto 4200)
EXPOSE 4200

# Comando para iniciar Angular en modo desarrollo
CMD ["npm", "start", "--", "--host", "0.0.0.0"]