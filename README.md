# Sistema de Votación Web

Sistema de votación web realizado como prueba técnica para Solcre. Aplicación full-stack con backend Laravel y frontend Angular, diseñada para gestionar votantes, candidatos y realizar conteo de votos.

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalados:

- **Node.js** (v18 o superior) - (https://nodejs.org)
- **npm** (incluido con Node.js)
- **PHP** (v8.1 o superior) - (https://www.php.net)
- **Composer** (gestor de dependencias PHP) - (https://getcomposer.org)
- **Git** (https://git-scm.com)

Verifica las versiones instaladas:
```bash
node --version
npm --version
php --version
composer --version
```

## Clonación del Proyecto

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/usuario/Sistema-de-Votacion-Web.git
cd Sistema-de-Votacion-Web
```

## Instalación

### Backend (Laravel)

1. Navega a la carpeta del backend:
```bash
cd backend
```

2. Instala las dependencias de PHP usando Composer:
```bash
composer install
```

3. Copia el archivo de configuración:
```bash
copy .env.example .env
# En Linux/Mac: cp .env.example .env
```

4. Genera la clave de la aplicación:
```bash
php artisan key:generate
```

5. Configura la base de datos en el archivo `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=votacion
DB_USERNAME=root
DB_PASSWORD=
```

6. Ejecuta las migraciones de la base de datos:
```bash
php artisan migrate
```

7. (Opcional) Siembra la base de datos con datos de prueba:
```bash
php artisan db:seed
```

### Frontend (Angular)

1. En otra terminal, navega a la carpeta del frontend:
```bash
cd frontend
```

2. Instala las dependencias de Node.js:
```bash
npm install
```

## Ejecución de la Aplicación

### Backend

Desde la carpeta `backend`, inicia el servidor Laravel en el puerto 8000:

```bash
php artisan serve
```

El backend estará disponible en: **http://localhost:8000**

### Frontend

Desde la carpeta `frontend`, inicia el servidor de desarrollo Angular:

```bash
ng serve
```

O usando npm:
```bash
npm start
```

El frontend estará disponible en: **http://localhost:4200**

## Credenciales de Prueba

Si ejecutaste el seeder (`php artisan db:seed`), usa estas credenciales:

**Usuario Administrador:**
- Email: `admin.test@admin.com`
- Contraseña: `password123`


## Estructura del Proyecto

```
Sistema-de-Votacion-Web/
├── backend/                    # API Laravel
│   ├── app/
│   │   ├── Models/            # Modelos de datos (User, Voter, Vote, Admin)
│   │   ├── Http/Controllers/  # Controladores
│   │   └── Providers/         # Proveedores
│   ├── database/
│   │   ├── migrations/        # Migraciones de BD
│   │   └── seeders/           # Datos de prueba
│   ├── routes/                # Rutas API
│   └── .env                   # Variables de entorno
│
├── frontend/                   # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/         # Componentes de página
│   │   │   ├── services/      # Servicios HTTP
│   │   │   ├── shared/        # Componentes compartidos
│   │   │   └── app.routes.ts  # Rutas
│   │   └── main.ts            # Entrada principal
│   └── angular.json           # Configuración Angular
│
└── README.md                   # Este archivo
```

## Funcionalidades Principales

- **Autenticación:** Login seguro con tokens JWT (Sanctum)
- **Gestión de Votantes:** Crear, editar y eliminar votantes
- **Gestión de Candidatos:** Registro de candidatos
- **Sistema de Votación:** Votantes pueden votar por candidatos
- **Dashboard Admin:** Visualización de estadísticas y gestión de votos
- **Cambio de Contraseña:** Usuarios pueden cambiar su contraseña

## API Endpoints Principales

**Autenticación:**
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/logout` - Logout

**Votantes:**
- `GET /api/voters` - Listar votantes (requiere autenticación)
- `POST /api/voters` - Crear votante
- `PUT /api/voters/{id}` - Editar votante
- `DELETE /api/voters/{id}` - Eliminar votante

**Votos:**
- `GET /api/votes` - Listar votos (requiere autenticación)
- `POST /api/votes` - Crear voto
- `GET /api/public/candidates` - Listar candidatos (público)

**Cambio de Contraseña:**
- `PUT /api/change-password` - Cambiar contraseña (requiere autenticación)

## Configuración Adicional

### Variables de Entorno del Backend

Edita el archivo `backend/.env` según sea necesario:

```
APP_NAME=VotacionWeb
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=votacion
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:4200
```

### Variables de Entorno del Frontend

Si es necesario, crea un archivo `frontend/.env` para configurar URLs de API:

```
NG_APP_API_URL=http://localhost:8000/api
```

## Pruebas

### Backend (PHPUnit)

Ejecuta los tests del backend:

```bash
cd backend
php artisan test
```

### Frontend (Jasmine)

Ejecuta los tests del frontend:

```bash
cd frontend
ng test
```

## Solución de Problemas

**Error: "Cannot find module"**
- Ejecuta `npm install` en la carpeta `frontend`

**Error: "Port already in use"**
- Cambia el puerto con: `php artisan serve --port=8001` o `ng serve --port=4201`

**Error de conexión a BD**
- Verifica que MySQL esté corriendo y que las credenciales en `.env` sean correctas

**Error: "CORS"**
- Verifica que el backend esté ejecutándose en `http://localhost:8000`

## Notas Importantes

- El proyecto usa **Laravel Sanctum** para autenticación basada en tokens
- **PrimeNG** es la librería de componentes UI utilizada en el frontend
- La API es **RESTful** y requiere headers de autenticación para endpoints protegidos
- Los tokens expiran después de cierto tiempo (configurable en `config/sanctum.php`)

## Contacto

Para preguntas, contacta al desarrollador.
email: renzoperaza16@gmail.com
GitHub: renzoNehuen

---

**Última actualización:** Mayo 2026
