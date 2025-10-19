# =============================================================================
# Fase 1: Build - Instalar dependencias
# =============================================================================
FROM node:18-alpine AS build

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json para cachear las dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --only=production

# =============================================================================
# Fase 2: Production - Crear la imagen final
# =============================================================================
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar las dependencias instaladas desde la fase de build
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD [ "node", "./src/server.js" ]