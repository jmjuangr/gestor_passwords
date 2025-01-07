<<<<<<< HEAD
# AA 1EV DWEC SV ONLINE

📖 Para el desarrollo de la primera actividad de aprendizaje, es recomendable utilizar este esqueleto como base del proyecto.

## Instalación 👩‍💻

Después de clonar el repositorio será necesario instalar las dependencias mediante
```
npm install
```

Esto instalará las dependencias del proyecto

Una vez instaladas, es necesario inicializar la BD, para ello:

```
npm run db:init
```

## Estructura de proyecto

El directorio donde debe desarrollarse la AA es dentro de `www`.

## Ejecución 🏃

Para poder ver la aplicación funcionando (y poder desarrollar), será necesario lanzar 2 procesos independientes.

Para ello, será necesario tener 2 consolas distinas abierta.

💾 En la primera consola lanzaremos el backend, que se quedará ejecutando en el puerto 3000
```
npm start

> node index.js

Example app listening on port 3000
```


🌐 En la segunda consola lanzaremos el proceso que se encarga de que podamos acceder a la página web
```
npm run www

> live-server www/

Serving "www/" at http://127.0.0.1:8080
```

Con esto, podemos arrancar el navegador en http://localhost:8080 y ver el desarrollo

## 🚀 API

La API disponible en el backend es:

```
  app.get('/categories/:id', listCategorySites)
  app.get('/categories',listCategories)
  app.get('/sites',listSites)

  app.post('/categories/:id', addNewSite)
  app.post('/categories', addNewCategory)

  app.delete('/sites/:id',delSite)
  app.delete('/categories/:id',delCategory)
```

### Añadir un site
En el body, la estructura será:
```
{
  "name": "test2",
  "url": "sample",
  "user": "test",
  "password": "test",
  "description": "test"
}
```

### Añadir una categoría
El body tendrá la siguiente estructura:

```
{ "name": "test_category" }
```

⚠️  Al enviar datos, es necesario indicar la cabecera `Content-type:application/json`
=======
# gestor_contrase-as
>>>>>>> ebbe3ce203be805e311fc3ae6373541e43c308ac
