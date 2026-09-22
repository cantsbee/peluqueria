# Peluquería - API

Requisitos implementados: servidor Express, MongoAtlas, modelos, subida a Cloudinary, gestión de roles, eliminación de cuentas, semilla, y documentación.

Entorno (.env) obligatorio:

- `DB_URL` - MongoDB Atlas connection string
- `JWT_SECRET` - secreto para JWT
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

Primer administrador:

El primer admin debe insertarse manualmente en MongoAtlas. En la colección `users` cambie el campo `role` a `admin` para el usuario que quiera.

Endpoints principales:

- `POST /api/users/register` - Crear usuario. En multipart con campo `image` puede subir una imagen. Nuevo usuario siempre se crea con `role: "user"`.
- `POST /api/users/login` - Login, devuelve `token`.
- `PUT /api/users/:id/role` - Cambiar rol (solo `admin`).
- `DELETE /api/users/:id` - Eliminar cuenta (self o `admin`). Al borrar también se elimina la imagen en Cloudinary.
- `POST /api/users/:id/favorites` - Añadir referencia a `favorites` (array) sin duplicados. Body: `{ "itemId": "<peluqueriaId>" }`.

Seeder:

Ejecutar la semilla para poblar `Peluqueria`:

```bash
node src/utils/seed.js
```

Instalación:

```bash
npm install
npm run dev
```

Notas de integridad y seguridad:

- Los usuarios normales no pueden cambiar roles ni borrar cuentas de otros usuarios.
- El array `favorites` se actualiza usando `$addToSet` para evitar duplicados y no sobrescribir elementos anteriores.
