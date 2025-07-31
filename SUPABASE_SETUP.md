# Configuración de Supabase

## Pasos para conectar Supabase a tu proyecto

### 1. Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota tu URL del proyecto y la clave anónima

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_del_proyecto_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_supabase
```

### 3. Crear la base de datos

1. Ve al SQL Editor en tu dashboard de Supabase
2. Copia y ejecuta el contenido del archivo `supabase-schema.sql`
3. Esto creará la tabla `players` con datos de ejemplo

### 4. Verificar la conexión

1. Ejecuta `pnpm dev` para iniciar el servidor de desarrollo
2. La aplicación debería cargar los datos desde Supabase
3. Si no hay jugadores que cumplan años hoy, verás el mensaje "No hay cumpleaños hoy"

### 5. Estructura de la base de datos

La tabla `players` tiene los siguientes campos:
- `id`: ID único del jugador
- `name`: Nombre del jugador
- `age`: Edad del jugador
- `team`: Equipo actual
- `country`: País de origen
- `position`: Posición en el campo
- `titles`: Número de títulos ganados
- `image`: URL de la imagen del jugador
- `birthday`: Fecha de nacimiento
- `birthday_month`: Mes de nacimiento (generado automáticamente)
- `birthday_day`: Día de nacimiento (generado automáticamente)
- `created_at`: Fecha de creación del registro

### 6. Funcionalidades disponibles

- **Lectura automática**: La app carga automáticamente los jugadores que cumplen años hoy
- **Ordenamiento**: Los jugadores se ordenan por número de títulos (descendente)
- **Fallback**: Si hay error de conexión, muestra datos estáticos
- **CRUD completo**: El servicio incluye métodos para crear, leer, actualizar y eliminar jugadores

### 7. Próximos pasos

- Implementar autenticación de usuarios
- Agregar formularios para crear/editar jugadores
- Implementar búsqueda y filtros
- Agregar notificaciones push para cumpleaños 