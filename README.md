# **Pizarra (React JS)**

## **Funcionalidades**

- Dibujo libre
- Color de la línea y relleno
- Ancho del trazo
- Borrar todo el contenido
- Borrador
- Relleno opcional (al marcar el checkbox de relleno se habilita el selector de color para el relleno)
- ~~Cargar imagen desde los archivos.~~
- ~~Poder dibujar sobre la imagen sin afectar a la imagen.~~
- ~~Eliminar la imagen de fondo sin afectar los trazos.~~
- Insertar texto
- Guardar como imagen (PNG)

### Persistencia IndexedDB

- Guardar
- Eliminar
- Listar

**Importante** -
Navegadores probados:

- Google Chrome
- Microsoft Edge
- ~~Mozilla Firefox~~ (Indexed DB presenta problemas en Firefox.)

## **Funcionalidades con bugs**

- Rotar la figura

## **Uso**

Por defecto está seleccionado el dibujo libre.
Para usar el borrador se debe seleccionar el botón de borrador.
Si se carga alguna imagen, aparecerá el botón de eliminar la imagen, de otro modo no.

Para insertar un círculo se debe hacer clic en el botón de círculo, posteriormente presionar el boton izquierdo del mouse sobre el canvas y arrastrar hasta el tamaño que se quiera.
Si se tiene la opción de relleno seleccionado, la figura tendrá el color de relleno que se haya seleccionado.

### _**Insertar texto**_

El texto usará el color seleccionado, hacer clic en el botón T y escribir el texto en el prompt, al aceptar hacer clic sobre el canvas para insertar el texto, el lugar donde se haga clic será la parte inferior izquierda del texto. Por defecto el tamaño de fuente es 16px, pero puede ser cambiado en la sección de _Tamaño_.

### _**Persistencia en Indexed DB**_

Presionar en el botón Guardar guarda el lienzo actual y se lista en el menú izquierdo.

Hacer **clic sobre el nombre (id)** carga el linezo guardado.

Hacer **clic sobre la x** elimina el lienzo de la base de datos.

## **Instalación**

### Requisitos:

- Tener instalado Node JS y NPM

Para instalar NodeJS en Windows y MacOS, seguir el [enlace](https://nodejs.org/en/) y descargar el instalador.

Para instalar NodeJS en Linux, seguir las instrucciones en el siguiente [enlace](https://github.com/nodesource/distributions/blob/master/README.md)

### Comandos para instalación del proyecto:

### `npm install`

Para poder instalar las dependencias del proyecto

### `npm run start`

Inicia la aplicación en modo desarrollo.
Abrir [http://localhost:3000](http://localhost:3000) para ver en el navegador.

### `npm run build`

Construye la aplicación para producción, por defecto se encuentra en la carpeta _build_.
