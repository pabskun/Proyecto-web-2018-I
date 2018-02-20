# Arquitectura básica de Proyecto Web 1

Arquitectura básica de AngularJS, utilizando GulpJS para la automatización de tareas tales como levantar el servidor y la exportación de dependencias dentro de la carpeta public/lib.

Para este ejemplo estamos utilizando AngularJS en su versión 1.6.9, Bootstrap 4, Jquery 3.3.1, Popper.JS 1.12.9, Sweet Alert 2.1.0, OcLazyLoad 1.1.0 y UIRouter 1.0.15.


### Prerequisitos

Tener instalado Gulp como dependencia global dentro del sistema con el siguiente comando.

```
npm install gulp gulp-cli -g
```

Además tener instalado nodemon como dependencia global con el siguiente comando

```
npm install nodemon -g
```

Una vez finalizado el proceso de instalación, se debe instalar browser-sycn con el siguiente comando

```
npm install -g browser-sync
```

### Instalación

Para poder levantar el proyecto se deben seguir los siguientes pasos

Se deben instalar todas las depencias con el comando

```
npm install
```

Una vez finalizado el proceso de instalación se llama a la tarea

```
gulp
```

Y para finalizar, automaticamente, la tarea abre navegador dentro de un servidor local

## Authors

* [Kevin Aguilar](https://github.com/KaguilarA)
