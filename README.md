# grupo-webthuldra-p2-frontend

El negocio de la esquina - Webthuldra

## Home Page
Para poder acceder a la aplicación desarrollada por Webthuldra, deben entrar a: https://webthuldrane.netlify.app/. Al acceder, encontrarán dos grandes botones: un botón para poder explorar las tiendas y otro para poder registrarse. El registro de usuarios aún no está disponible, por lo que la vista desplegada solo tendrá el texto "Sign Up Component". Para volver al menú principal, basta con presionar el logo de Webthuldra en la barra de navegación.
En el caso de presionar el botón de explorar tiendas, se desplegará un listado de las tiendas registradas en el sistema. Cada tarjeta desplegada muestra un pequeño resumen de la tienda en cuestión, con su nombre, foto (opcional) y dirección. Estas tarjetas son clickeables y redirigen al perfil detallado de la tienda

## Perfil de la tienda
Al acceder al perfil de una tienda, se puede ver:
  - Un resumen de la información del propietario: la tarjeta contenedora de esta información es clickeable y permite visitar el perfil del propietario de la tienda
  - Una lista de comentarios: estos son todos los comentarios que han hecho distintos usuarios sobre la tienda. Cada comentario tiene la foto de su autor, que puede ser clickeada para acceder a su perfil
  - La lista de acuerdos de compra de la tienda: cada acuerdo de compra tiene una foto de la tienda en que se hizo el acuerdo, el estado del acuerdo y el nombre de la tienda. Hacer click sobre el área del nombre de la tienda permite ver los detalles del acuerdo de compra. Hacer click sobre la foto de la tienda permite ir al perfil de la tienda
  - La lista de productos ofrecidos por la tienda: cada producto está en una tarjeta y presenta su nombre, precio y foto (opcional). La tarjeta de un producto es clickeable y permite ir al perfil del producto en cuestión

## Perfil del producto
Al acceder al perfil de un producto, se pueden ver detalles como el stock del producto y, adicionalmente, existe un form para comprar una cantidad N de ese producto. También, en la parte superior de la vista, se puede encontrar un link que redirige a la tienda vendedora del producto

## Perfil del usuario
Al acceder al perfil del usuario, se pueden encontrar cuatro secciones:
  - Información del usuario: foto, nombre, email de contacto
  - Acuerdos de compra del usuario: cada acuerdo de compra tiene la foto de la tienda, el estado del acuerdo y el nombre de la tienda. La foto de la tienda es cliqueable y redirige al perfil de la tienda. El nombre de la tienda es cliqueable y redirige al acuerdo de compra para el usuario
  - Comentarios: se muestra un listado de comentarios que ha hecho el usuario a distintas tiendas. La foto del usuario es cliqueable y debería redirigir al perfil del mismo usuario
  - Lista de tiendas: se muestran tarjetas de resumen de todas las tiendas que el usuario posee, o sea, en las que es dueño

El usuario puede acceder a su propio perfil mediante la barra de navegación superior, en la sección "Profile"

## Perfil de un acuerdo de compra
Al acceder al perfil del acuerdo de compra, se puede ver dos secciones:
  - Los productos que son parte del acuerdo de compra: se muestra el nombre del producto y la cantidad comprada
  - Mensajes: se muestra la conversación que tendría el comprador con la tienda del acuerdo de compra

## Botones, autorizaciones, cambios a venir...
En la aplicación, varios botones para editar y eliminar recursos han sido ubicados en las distintas vistas. Por el momento, esos botones no funcionan, pues no se ha desarrollado vistas de edición ni eliminación de recuros. Asimismo, todos los usuarios pueden ver todos los botones sin importar si los recursos les pertenecen o no. Esto debe ser arreglado una vez que el sitio comience a trabajar con datos reales y, entonces, se pueda manejar bien las autorizaciones respectivas.
También se propone como cambio que los acuerdos de compra y los comentarios tengan vistas dedicadas a futuro pues, si por alguna razón existen muchos para una determinada tienda o usuario, los perfiles se van a extender demasiado. También, en los casos de comentarios muy extensos, las vistas podrían dejar de ser cómodas para el usuario. Finalmente, se considera que se debe manejar un carrito de compras ordenado, pero esto debe verse una vez estén los datos reales para manejar la información correspondientemente.
