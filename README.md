# Aplicaciones_Web_II
# Amaya Nicolás Agustín
# 37897454

# Plataforma de Alquiler de Películas/Productos

## Requisitos
- Node.js v16 o superior
- MongoDB Atlas (crear un clúster gratuito)
- MongoDB Tools (para importar datos, opcional)

## Stack utilizado

- **Backend:**
  - **Node.js**: Entorno de ejecución para JavaScript en el servidor.
  - **Express**: Framework para construir la API RESTful.
  - **MongoDB Atlas**: Base de datos NoSQL en la nube para almacenar usuarios, productos, y ventas.
  - **Mongoose**: ORM para modelar datos y realizar operaciones CRUD en MongoDB.
  - **jsonwebtoken**: Autenticación de usuarios mediante tokens JWT.
  - **bcryptjs**: Hashing de contraseñas para seguridad.
  - **express-validator**: Validación de datos en los formularios de registro y creación de productos.
  - **cors**: Middleware para habilitar solicitudes desde el frontend.
  - **dotenv**: Gestión de variables de entorno (por ejemplo, `MONGODB_URI`).

- **Frontend:**
  - **HTML**: Estructura de la interfaz de usuario.
  - **Bootstrap**: Framework CSS para un diseño responsivo y componentes predefinidos.
  - **JavaScript**: Lógica del cliente para interactuar con la API.

- **Despliegue:**
  - **MongoDB Atlas**: Servicio en la nube para la base de datos.

- **Herramientas de desarrollo:**
  - **nodemon**: Reinicio automático del servidor en desarrollo.
  - **MongoDB Compass**: Interfaz gráfica para inspeccionar y gestionar la base de datos.
  - **Postman**: Pruebas de los endpoints de la API.
  - **MongoDB Tools** (`mongoexport`, `mongoimport`): Migración de datos desde localhost a MongoDB Atlas.

## Resumen del proceso de desarrollo

### Descripción general
El proyecto consiste en una aplicación web para gestionar el alquiler de películas o productos. Los usuarios pueden registrarse e iniciar sesión (con autenticación segura mediante JWT y bcrypt), listar productos disponibles, y registrar ventas. La aplicación está dividida en un frontend estático (HTML, Bootstrap, JavaScript) y un backend (Node.js, Express, MongoDB Atlas) con una API RESTful. El desarrollo se centró en crear una experiencia de usuario sencilla, una API robusta, y un despliegue en la nube para accesibilidad global.

### Roadmap de la construcción

1. **Planificación y diseño (Semana 1):**
   - **Objetivo:** Definir los requisitos y la estructura del proyecto.
   - **Tareas:**
     - Diseñar el modelo de datos con colecciones para `usuarios`, `productos`, y `ventas`.
     - Crear wireframes básicos para la interfaz con Bootstrap.
     - Planificar endpoints de la API: `/usuarios` (registro, login), `/productos` (listar, crear), `/ventas` (registrar ventas).
   - **Resultado:** Esquema de la base de datos y mockups iniciales.

2. **Configuración del entorno y backend (Semanas 2-3):**
   - **Objetivo:** Construir el backend y conectar con MongoDB.
   - **Tareas:**
     - Configurar el proyecto con Node.js, Express, y dependencias (`mongoose`, `jsonwebtoken`, `bcryptjs`, `express-validator`, `cors`, `dotenv`).
     - Crear el archivo `index.js` para inicializar el servidor y configurar rutas.
     - Implementar la conexión a MongoDB local en `config.js` usando Mongoose.
     - Definir modelos (`usuarios.models.js`, `productos.models.js`, `ventas.models.js`) con validaciones (por ejemplo, `required`, `enum`, `minLength`).
     - Desarrollar rutas (`usuarios.routes.js`, `productos.routes.js`, `ventas.routes.js`) para operaciones CRUD.
     - Probar endpoints con Postman (por ejemplo, `POST /usuarios/register`, `GET /productos/all`).
   - **Desafíos:**
     - Configurar correctamente `express-validator` para validar formularios.
     - Implementar autenticación JWT y proteger rutas sensibles.
   - **Resultado:** Backend funcional con API RESTful y base de datos local.

3. **Desarrollo del frontend (Semanas 4-5):**
   - **Objetivo:** Crear una interfaz de usuario responsiva.
   - **Tareas:**
     - Diseñar páginas con HTML y Bootstrap (inicio, registro, login, lista de productos).
     - Implementar JavaScript para consumir la API (usando `fetch` para endpoints como `/productos/all`).
     - Configurar formularios con validaciones en el cliente (por ejemplo, registro de usuarios).
   - **Desafíos:**
     - Manejar tokens JWT en el frontend y enviarlos en las solicitudes autenticadas.
     - Asegurar responsividad con Bootstrap.
   - **Resultado:** Interfaz funcional conectada al backend.

4. **Migración a MongoDB Atlas (Semana 6):**
   - **Objetivo:** Mover la base de datos a la nube para despliegue.
   - **Tareas:**
     - Crear un clúster gratuito (M0) en MongoDB Atlas.
     - Exportar datos locales con `mongoexport` (por ejemplo, `mongoexport --db peliculasDB --collection productos --out productos.json`).
     - Importar datos a Atlas con `mongoimport` (por ejemplo, `mongoimport --uri "<MONGODB_URI>" --collection productos --file productos.json`).
     - Actualizar `config.js` para conectar a Atlas usando `MONGODB_URI` desde `.env`.
     - Verificar la conexión con MongoDB Compass y probar endpoints en Postman.
   - **Desafíos:**
     - Asegurar que los datos migrados coincidan con los schemas de Mongoose.
     - Resolver problemas de conexión (por ejemplo, configuración de `Network Access` en Atlas).
   - **Resultado:** Base de datos en la nube con datos migrados.

5. **Pruebas y correcciones (Semana 7-8):**
   - **Objetivo:** Asegurar que la aplicación sea robusta y esté lista para evaluación.
   - **Tareas:**
     - Probar todos los endpoints con Postman (registro, login, listar productos, registrar ventas).
     - Verificar que los datos en MongoDB Atlas sean accesibles (usando Compass y `mongosh`).
     - Corregir errores, como el 404 en `/productos/all` (causado por una ruta mal definida o `express.static` interfiriendo).
     - Optimizar el modelo `Productos` con validaciones (`enum`, `minLength`, índices).
     - Crear un `README.md` claro con instrucciones para el profesor.
   - **Desafíos:**
     - Asegurar que la colección `productos` no esté vacía en Atlas.
     - Documentar el proceso para facilitar la evaluación.
   - **Resultado:** Aplicación lista para entrega con documentación completa.

## Mejoras Implementadas

### Barra de búsqueda por nombre
- **Descripción:** Se añadió una barra de búsqueda simple en el frontend para buscar productos por nombre (búsqueda parcial, insensible a mayúsculas), integrándose con el sistema de filtrado existente. Mejora la experiencia de usuario al permitir búsquedas rápidas.
- **Implementación:**
  - **Backend:** Endpoint `GET /api/productos/search` en `routes/productos.routes.js` usa Mongoose con `$regex` para búsqueda parcial por nombre.
  - **Frontend:** Barra de búsqueda en `public/index.html` con Bootstrap y JavaScript (`fetch`).

  ### Carrito de compras
- **Descripción:** Botón "Agregar al carrito" en cada tarjeta, con una solapa lateral (offcanvas) que muestra productos seleccionados y el total.
- **Implementación:** Botón en tarjetas de `public/index.html`, offcanvas con Bootstrap, carrito gestionado en `localStorage`.
- **Pruebas:** Añade productos al carrito en `http://localhost:3000`, verifica la solapa y total.

### Sistema de Valoración
- **Descripción**: Sistema de 5 estrellas interactivas para valorar películas en `historialCompras.html`.
- **Implementación**: Estrellas en `<div class="star-rating">`, CSS para hover/selección, JavaScript para enviar puntuación a `POST /productos/:_id/valoraciones`.
- **Pruebas**: Pasa el cursor por las estrellas y envía una valoración en `http://localhost:3000/historialCompras.html`.