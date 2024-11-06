# challengeRAY

Herramientas
------------

### API:
- [Hono](https://hono.dev) en lugar de express ya que viene con mas herramientas para facilitar el desarrollo
- [Drizzle](https://orm.drizzle.team/) ORM facil de usar y SQL-Like
- [Supabase](https://supabase.com) Para alojar la DB

### CLIENT:
- [React Router](https://reactrouter.com/) para hacer la SPA, a partir de la version 6 viene con herramientas para manejar el estado de la app y los datos
- [Axios](https://axios-http.com/) para hacer los request a la api, es mas completo que el fetch
- [React Hook Form](https://www.react-hook-form.com/) para facilitar el manejo de formularios
- [Yup](https://github.com/jquense/yup?tab=readme-ov-file) para validar los formularios

Instrucciones
-------------
```sh 
npm i
```
```sh 
npm run dev
```

tanto en la carpeta *app* como el la carpeta *api*

Documentacion
-------------
### API:
``` 
HOST http://localhost:3000
GET     /api/private <- solo se puede acceder si se manda el header Authorization con Bearer {token}
POST    /api/auth/signin <- para iniciar session se debe enviar {user:string, password:string} y devuelve el token, el user puede ser el email o el username
DELETE  /api/auth/signout <- para cerrar session elemina el token de la DB con lo que el token actual sera invalido
POST    /api/auth/signup <- para crear un nuevo usuario se debe enviar {username:string, email:string password:string} y devuelve el token, el username y el email deben ser unicos
```

### CLIENT:
```
HOST http://localhost:3001
En / estaria la landing page y desde alli de puede acceder a la app ubicada en /app.
Los formularios para el usuario estan el /auth/sigin y /auth/signup.
Solo se puede acceder al /app si el token se encuentra en el localstorage caso contrario se redireciona a /auth/signin
```

