# Proyecto Final: Adopción de Mascotas - Backend

Este es el proyecto final para el curso de Backend de Coderhouse. La aplicación es una API REST para gestionar usuarios, mascotas y adopciones, completamente dockerizada y documentada.

## ✨ Características

- **Arquitectura Profesional:** Diseño por capas (controladores, servicios, repositorios, DAO).
- **Gestión de Usuarios:** CRUD completo para usuarios, con registro y login mediante JWT.
- **Gestión de Mascotas:** CRUD completo para mascotas.
- **Sistema de Adopción:** Lógica transaccional para que los usuarios adopten mascotas.
- **Documentación de API:** Documentación interactiva con Swagger para todos los endpoints.
- **Testing:** Tests funcionales completos para el módulo de adopciones.
- **Dockerización:** Imagen de Docker multi-etapa optimizada para producción y disponible en Docker Hub.

## 🚀 Empezando

Sigue estas instrucciones para tener una copia del proyecto corriendo en tu máquina local para desarrollo y pruebas.

### Pre-requisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (o una cuenta en MongoDB Atlas)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Instalación Local

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables. **Asegúrate de reemplazar los valores con tu propia configuración.**
    ```env
    # 🌐 Configuración del servidor
    PORT=8080

    # 🗄️ Base de datos de Desarrollo
    MONGO_URL=mongodb+srv://<user>:<password>@<cluster-url>/<dev-db-name>?retryWrites=true&w=majority
    DB_NAME=<dev-db-name>

    # 🗄️ Base de datos de Test
    MONGO_URL_TEST=mongodb+srv://<user>:<password>@<cluster-url>/<test-db-name>?retryWrites=true&w=majority
    DB_NAME_TEST=<test-db-name>

    # 🔑 Secretos
    SECRET_SESSION=coderpass
    JWT_SECRET=coderpass
    ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm start
    ```
    El servidor estará corriendo en `http://localhost:8080`.

## 🐳 Uso con Docker

Este proyecto está completamente dockerizado. La imagen utiliza una construcción multi-etapa para ser ligera y segura.

### Enlace a la Imagen en Docker Hub

Puedes encontrar la imagen pública en el siguiente enlace:

➡️ **[jmteran3d/backendiii en Docker Hub](https://hub.docker.com/r/jmteran3d/backendiii)**

### Ejecutar con `docker run`

La forma más directa de ejecutar la aplicación es usando `docker run`.

1.  **Crea el archivo de entorno:**
    Asegúrate de tener tu archivo `.env` configurado como se describió en la sección de instalación local. Docker lo usará para inyectar las variables de entorno en el contenedor.

2.  **Ejecuta el contenedor:**
    Este comando le dice a Docker que ejecute la imagen, mapee el puerto `8080` de tu máquina al `8080` del contenedor, y utilice el archivo `.env` para la configuración.
    ```bash
    docker run -p 8080:8080 --env-file .env jmteran3d/backendiii:latest
    ```
    La aplicación estará disponible en `http://localhost:8080`.

## 🧪 Tests

Para ejecutar la suite de tests funcionales, usa el siguiente comando. Esto establecerá `NODE_ENV=test` para conectar a la base de datos de prueba.

```bash
npm test
```

## 📚 Documentación de la API

La documentación completa de la API está disponible a través de Swagger UI una vez que la aplicación está en ejecución.

Visita: `http://localhost:8080/api/docs`