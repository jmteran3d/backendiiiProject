# Mocking API con Express y MongoDB

Este proyecto implementa una API en **Node.js + Express** que permite generar y almacenar datos ficticios (mocking) de **usuarios** y **mascotas**, usando **Faker.js** y **MongoDB**.  
Es ideal para **pruebas**, **desarrollo de frontends** o como base para un **proyecto educativo**.

---

## 🚀 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Faker.js](https://fakerjs.dev/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 📂 Estructura del proyecto

/src
├── /config
│ ├── db.js # Conexión a MongoDB
│ ├── env.js # Configuración de variables de entorno
├── /routes
│ ├── mocks.router.js # Rutas de generación de datos falsos
│ ├── users.router.js # CRUD de usuarios
│ ├── pets.router.js # CRUD de mascotas
│ └── index.js # Centraliza las rutas
├── /utils
│ ├── bcrypt.js # Helper para encriptación de contraseñas
│ ├── user.mocking.js # Generador de usuarios
│ └── pet.mocking.js # Generador de mascotas
├── /dao
│ ├── /models
│ │ ├── users.model.js
│ │ └── pets.model.js
│ └── /managers
│ ├── user.manager.js
│ └── pet.manager.js
├── app.js # Punto de entrada de la aplicación
├── package.json
└── .env

---

1. Clonar el repositorio  
   ```bash
   git clone 

2. Instalar dependencias
   npm install

3. Configurar variables de entorno en .env

4. Levantar el servidor

📌 Endpoints principales
🔹 Mocks

GET /api/mocks/mockingusers → Genera 50 usuarios falsos

GET /api/mocks/mockingpets → Genera 100 mascotas falsas

POST /api/mocks/generateData → Inserta usuarios y mascotas falsos en la base de datos

🔹 Usuarios

GET /api/users → Lista todos los usuarios

POST /api/users → Crea un usuario

🔹 Mascotas

GET /api/pets → Lista todas las mascotas

POST /api/pets → Crea una mascota

✨ Mejoras futuras

Implementar autenticación con JWT

Manejo de roles y permisos (admin / user)

Tests unitarios con Jest

Dockerización de la app

👨‍💻 Autor

Proyecto desarrollado por Jesús Manuel Terán Dávila

¿Dudas o sugerencias? ¡Estoy en LinkedIn! 👉 linkedin.com/in/jmteran3d