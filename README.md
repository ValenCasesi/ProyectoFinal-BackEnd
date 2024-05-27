# Proyecto Final BackEnd - Clínica Odontológica

## Descripción

Este proyecto es una API RESTful para una clínica odontológica, desarrollada utilizando Node.js, Express, y MongoDB. La API permite gestionar pacientes, profesionales y turnos de manera eficiente, incluyendo la funcionalidad para enviar correos electrónicos.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Endpoints](#endpoints)
- [Autores](#autores)
- [Licencia](#licencia)

## Características

- Gestión de pacientes (crear, leer, actualizar y eliminar).
- Gestión de profesionales (crear, leer, actualizar y eliminar).
- Gestión de turnos (crear, leer, actualizar y eliminar).
- Envío de correos electrónicos de confirmación para nuevos turnos.
- Autenticación y autorización de usuarios.

## Tecnologías

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- bcrypt
- dotenv

## Instalación

1. Clonar el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/ProyectoFinal-BackEnd.git
    ```

2. Navegar al directorio del proyecto:

    ```sh
    cd ProyectoFinal-BackEnd
    ```

3. Instalar las dependencias:

    ```sh
    npm install
    ```
    
## Ejecución

1. Iniciar el servidor:

    ```sh
    npm start
    ```

2. La API estará disponible en `http://localhost:3000`.

## Endpoints

### Pacientes

- **POST** `/pacientes`: Crear un nuevo paciente.
- **GET** `/pacientes`: Obtener todos los pacientes.
- **GET** `/pacientes/:id`: Obtener un paciente por ID.
- **PUT** `/pacientes/:id`: Actualizar un paciente por ID.
- **DELETE** `/pacientes/:id`: Eliminar un paciente por ID.

### Profesionales

- **POST** `/profesionales`: Crear un nuevo profesional.
- **GET** `/profesionales`: Obtener todos los profesionales.
- **GET** `/profesionales/:id`: Obtener un profesional por ID.
- **PUT** `/profesionales/:id`: Actualizar un profesional por ID.
- **DELETE** `/profesionales/:id`: Eliminar un profesional por ID.

### Turnos

- **POST** `/turnos`: Crear un nuevo turno.
- **GET** `/turnos`: Obtener todos los turnos.
- **GET** `/turnos/:id`: Obtener un turno por ID.
- **PUT** `/turnos/:id`: Actualizar un turno por ID.
- **DELETE** `/turnos/:id`: Eliminar un turno por ID.

### Autenticación

- **POST** `/auth/login`: Iniciar sesión.
- **POST** `/auth/register`: Registrar un nuevo usuario.

## Autores

- **Valentino Casesi** - [ValenCasesi](https://github.com/ValenCasesi)
- **Ignacio Giggiaro** - [IgnacioGiggiaro](https://github.com/IgnacioGiggiaro)
- **Juan Martin Cresta** - [JuanMartinCresta](https://github.com/JuanMartinCresta)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
