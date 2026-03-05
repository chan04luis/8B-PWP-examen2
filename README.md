# Examen Técnico - SWAPI

Este proyecto consiste en una aplicación que consume la API de **Star Wars (SWAPI)** y muestra información de personajes.

El proyecto está dividido en dos partes:

* **Backend (Node.js)** → Puerto `3001`
* **Frontend (estático)** → Puerto `3000`

---

# Requisitos

Antes de ejecutar el proyecto debes tener instalado:

* **Node.js 18 o superior**
* **npm**

Verificar instalación:

```bash
node -v
npm -v
```

---

# 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd examen
```

---

# 2. Instalar dependencias

## Backend

Entrar a la carpeta backend:

```bash
cd backend
npm install
```

---

# 3. Ejecutar Backend

Desde la carpeta `backend` ejecutar:

```bash
npm start
```

El servidor iniciará en:

```
http://localhost:3001
```

En consola aparecerá:

```
Servidor corriendo en http://localhost:3001
```

---

# 4. Ejecutar Frontend

Abrir otra terminal y posicionarse en la carpeta **raíz del proyecto**.

Luego ejecutar:

```bash
npx serve frontend
```

Si es la primera vez que se ejecuta pedirá instalar `serve`:

```
Need to install the following packages:
serve@14.x
Ok to proceed? (y)
```

Presionar:

```
y
```

El frontend quedará disponible en:

```
http://localhost:3000
```

---

# 5. Acceder a la aplicación

Abrir en el navegador:

```
http://localhost:3000
```

El frontend consumirá el backend en:

```
http://localhost:3001
```

---

# Estructura del proyecto

```
examen
│
├── backend
│   ├── server.js
│   ├── package.json
│
├── frontend
│   ├── index.html
│   ├── js
│   └── css
│
└── README.md
```

---

# Puertos utilizados

| Servicio | Puerto |
| -------- | ------ |
| Frontend | 3000   |
| Backend  | 3001   |

---

# Notas

* El backend actúa como intermediario para consumir **SWAPI**.
* El frontend muestra la lista de personajes y permite filtrarlos.
* Ambos servicios deben estar ejecutándose al mismo tiempo para que la aplicación funcione correctamente.
