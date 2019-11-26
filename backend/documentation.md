# Modelos de base de datos 

## Modelo usuario

```
Usuario: {
    fecha: {
        type: Date, // Se crea desde el servidor luedo de pasar las validaciones.
        required: true
        },
    name: {
        type: String,
        required: true,
        unique: true
        },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String, // ADMIN_ROLE: contiene todos los permisos. USER_ROLE: tieme los permisos que le conceda un ADMIN_ROLE.
        required: true
    },
    access: {
        Type: [String] // Define los accesos permitidos del usuario.
    },
    status: {
        type: Boolean, // Define si el usuario existe o no.
        default: true,
        required: true
    }    

}
```