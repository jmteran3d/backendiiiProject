# ============================
# Etapa 1: Construcción
# ============================
FROM node:20-bullseye AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# ============================
# Etapa 2: Ejecución
# ============================
FROM node:20-bullseye

WORKDIR /app

COPY --from=build /app /app

EXPOSE 8080

CMD ["npm", "start"]
