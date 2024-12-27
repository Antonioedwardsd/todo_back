# To-Do Backend API

Este proyecto es una API para la gestión de tareas, desarrollada con Node.js, Express, Sequelize y TypeScript. Incluye validaciones robustas con Zod, autenticación con `express-openid-connect`, y pruebas automatizadas con Vitest.

---

## Configuración del Entorno

### 1. Requisitos Previos

- Node.js (versión 16 o superior)
- PostgreSQL (configurado y en ejecución)
- Docker (opcional para base de datos con Docker)

### 2. Clonar el Proyecto

Clona este repositorio en tu máquina local:

```bash
git clone <URL_DEL_REPOSITORIO>
cd todo-back

.env
DB_NAME=todo_back
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432
BASE_URL=http://localhost:3000
AUTH_SECRET=your_auth_secret
CLIENT_ID=your_client_id
ISSUER_URL=https://example.auth0.com

test.env
NODE_ENV=test
DB_NAME=todo_back_test
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432
BASE_URL=http://localhost:3000
AUTH_SECRET=your_auth_secret
CLIENT_ID=your_client_id
ISSUER_URL=https://example.auth0.com

Pruebas:
$env:NODE_ENV="test"; npm run test

En sistemas basados en Unix/Linux:
NODE_ENV=test npm run test

La API está configurada para ejecutarse en http://localhost:3000.

Endpoints Disponibles

1. Crear una Nueva Tarea
POST /api/todos

Cuerpo de la Solicitud:
{
  "title": "New Task",
  "description": "Task description (optional)",
  "completed": false
}
Respuesta Exitosa:
{
  "id": 1,
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "status": "pending"
}

2. Obtener Todas las Tareas
GET /api/todos

Respuesta Exitosa:
[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description 1",
    "completed": false,
    "status": "pending"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Description 2",
    "completed": true,
    "status": "completed"
  }
]

3. Obtener una Tarea por ID
GET /api/todos/:id

Respuesta Exitosa:
{
  "id": 1,
  "title": "Task 1",
  "description": "Description 1",
  "completed": false,
  "status": "pending"
}

Respuesta con Error:
{
  "error": "Task not found"
}

4. Actualizar una Tarea
PUT /api/todos/:id

{
  "title": "Updated Task",
  "completed": true
}

Respuesta Exitosa:
{
  "id": 1,
  "title": "Updated Task",
  "description": "Description 1",
  "completed": true,
  "status": "in-progress"
}

5. Eliminar una Tarea
DELETE /api/todos/:id

Respuesta Exitosa:
{
  "message": "Task deleted successfully"
}

src/
  ├── controllers/       # Lógica de los controladores
  ├── middlewares/       # Middlewares personalizados
  ├── models/            # Modelos de la base de datos
  ├── routes/            # Definición de rutas
  ├── services/          # Lógica de negocio
  ├── utils/             # Funciones de utilidad
  ├── validators/        # Validaciones con Zod
tests/                   # Pruebas automatizadas
```
