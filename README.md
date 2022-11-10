# Pizarra (React JS)

## Funcionalidades

- Dibujo libre
- Color de la línea y relleno
- Ancho del trazo
- Borrar todo el contenido
- Borrador
- Relleno opcional (al marcar el checkbox de relleno se habilita el selector de color para el relleno)
- Cargar imagen desde los archivos.
- Poder dibujar sobre la imagen sin afectar a la imagen.
- Eliminar la imagen de fondo sin afectar los trazos.
- Insertar texto
- Guardar como imagen (PNG)

## Funcionalidades con bugs

- Rotar la figura
- Guardar como imagen (PNG), guarda en diferente relación de aspecto.

## Uso

Por defecto está seleccionado el dibujo libre.
Para usar el borrador se debe seleccionar el botón de borrador.
Si se carga alguna imagen, aparecerá el botón de eliminar la imagen, de otro modo no.

Para insertar un círculo se debe hacer clic en el botón de círculo, posteriormente presionar el boton izquierdo del mouse sobre el canvas y arrastrar hasta el tamaño que se quiera.
Si se tiene la opción de relleno seleccionado, la figura tendrá el color de relleno que se haya seleccionado.

### _Insertar texto_

El texto usará el color seleccionado, hacer clic en el botón T y escribir el texto en el prompt, al aceptar hacer clic sobre el canvas para insertar el texto, el lugar donde se haga clic será la parte inferior izquierda del texto. Por defecto el tamaño de fuente es 16px, pero puede ser cambiado en la sección de _Tamaño_.

## Instalación

### Requisitos:

- Tener instalado Node JS y NPM

Para instalar NodeJS, seguir el [enlace](www.nodejs.dev)

### Comandos para instalación del proyecto:

### `npm install`

Para poder instalar las dependencias del proyecto

### `npm run start`

Inicia la aplicación en modo desarrollo.
Abrir [http://localhost:3000](http://localhost:3000) para ver en el navegador.

### `npm run build`

Construye la aplicación para producción, por defecto se encuentra en la carpeta _build_.
