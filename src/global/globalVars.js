import { Dimensions, Platform } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const GlobalVars = {
  /** Tracking & Register Config */
  firebaseConfig: {
    apiKey: "AIzaSyBKzG-wCviwYzP8F8sjJKJCsM-YztIq2Ys",
    authDomain: "alavueltahay.firebaseapp.com",
    projectId: "alavueltahay",
    storageBucket: "alavueltahay.appspot.com",
    messagingSenderId: "181512922368",
    appId: "1:181512922368:web:42024638f4517414e1ffe5",
    measurementId: "G-2CSC466C4R",
  },

  tokenAPIFCM:
    "AAAAKkMDZQA:APA91bF932adyTezKH1wWnRB56QKc1E_gNQAv22tjakWsKlTdc-ViFw3PPkORLleyS5boF1OwUhuKqcWLmUAxiHgk0LPpmRiSkC0aFUot_3uXcij_CpmtTKQqW0z9uGNUJSnzwTVBHtV",

  API_GCP: "AIzaSyAn42XDvsegaLaO2WMODI5ABJc_l3ianTk",

  /** API REST PATH **/
  // Develop
  // urlapi: "http://192.168.1.6:1337/api",
  // urlapi: "http://192.168.114.220:1337/api",
  // Staging
  // urlapi: "https://aqueous-atoll-80760.herokuapp.com/api",
  // Production
   urlapi: "https://a-la-vuelta-hay-backend.herokuapp.com/api",
        // urlapi: "http://Mac-mini-de-Andres.local:1337/api",

  /** Fonts generals fields */
  fontFamily: Platform.OS === "ios" ? "Poppins" : "",
  fontButtons: "Spartan",

  /** View Configurations Colors */
  fondoPrincipal: "#F2F2F2",
  white: "#FFF",
  black: "#000",
  googleColor: "#DC1327",
  facebookColor: "#1977F1",
  firstColor: "#D8600E",
  blueOpaque: "#D8600E",
  orange: "#D8600E",
  secondOrange: "#F28830",
  thirdOrange: "#F9A262",
  whiteLight: "#FEFEFE",
  textGrayColor: "#7B7B7B",
  blueComplementary: "#0071BC",

  /** ViewPort Dimensions */
  windowWidth: windowWidth,
  windowHeight: windowHeight,

  /** Default Language */
  defaultLang: "es",

  version: "1.0.22",

  termConditions: `El sitio web ALAVUELTAHAY.CL y la aplicación móvil (app) ALAVUELTAHAY son iniciativas desarrolladas y de propiedad de la sociedad Marchantes SpA.
  
SOBRE ALAVUELTAHAY.CL Y APP ALAVUELTAHAY
  
ALAVUELTAHAY.CL y la app ALAVUELTAHAY son espacios virtuales para que vendedores y vendedoras puedan
exponer sus productos y servicios e informar a sus potenciales clientes de sus horarios de funcionamiento, ubicación
e información de contacto.

TÉRMINOS Y CONDICIONES DE USO DEL SITIO WEB ALAVUELTAHAY.CL

Y APP ALAVUELTAHAY

Por favor lea estas condiciones de uso detenidamente, antes de utilizar el sitio web en https://alavueltahay.cl (en
adelante el sitio web o el sitio), otros servicios ofrecidos por el sitio web y la aplicación móvil ALAVUELTAHAY (en
adelante la aplicación o app).

Este Acuerdo establece los términos y condiciones para el uso del sitio ALAVUELTAHAY.CL y la app ALAVUELTAHAY.
Al ingresar al sitio automáticamente o acceder a la app acepta los términos y condiciones, las cuales aplican para
quien interese a revisar negocios que promocionan sus productos y servicios en el sitio o app. Al tratarse de
plataformas de servicio gratuito de localización de comercios vía georreferenciación y difusión de comercios, los
potenciales compradores y compradoras aceptan expresamente las condiciones y términos que se detallan al
momento de revisar las distintas publicaciones de promoción de negocios en el sitio y app.
El acceso, navegación y utilización del sitio web y app implican la aceptación expresa y sin reservas de todos los
términos del presente Acuerdo, teniendo la misma validez y eficacia que cualquier contrato celebrado por escrito y
firmado.

Su observancia y cumplimiento serán exigibles respecto de cualquier persona que acceda, navegue o utilice el sitio
web y app. Si usted no está de acuerdo con los términos expuestos, no acceda, navegue o utilice los mismos.
Dicho acuerdo se rige por la legislación chilena aplicable a la materia, y en especial por las siguientes cláusulas:

1) GENERALIDADES
ALAVUELTAHAY.CL y app ALAVUELTAHAY son servicios gratuitos de localización de comercios vía georreferenciación
y difusión de comercios, en base a la información que los mismos comercios proveen. No tiene un carácter
transaccional, es decir, no se realizan operaciones de compraventa en ellos.
Los servicios permiten a las tiendas, comercios o emprendimientos tener su propia página personalizada, con su
nombre, logo, información general, fotos de sus productos, etc. y donde el visitante podrá visualizar algunos de los
productos o servicios promocionados por los vendedores y vendedoras, darle una evaluación o puntuación a los
servicios o productos que pudiere adquirir del vendedor o vendedora, dejar comentarios, hacer consultas, entre
otros.

ALAVUELTAHAY.CL y app ALAVUELTAHAY no funcionan como intermediarios. ALAVUELTAHAY.CL y app
ALAVUELTAHAY no están directamente involucrados en la transacción entre compradores y vendedores. Como

resultado, el sitio web y la app no tienen control sobre la calidad, seguridad, moralidad o legalidad de cualquier
aspecto de los productos o servicios ofrecidos, la veracidad o exactitud de los anuncios, la capacidad de los
vendedores para vender artículos o la capacidad de los posibles compradores para pagar los artículos. El sitio web y la
app, sin embargo, contarán con revisiones, para velar siempre por la calidad de los productos ofrecidos, y que sigan
una línea similar al estándar del mercado. Se llevarán a cabo monitoreos constantes para que las tiendas cumplan
siempre con los estándares de calidad en cuanto a productos, que las fotografías correspondan a los artículos
ofrecidos y el servicio a los compradores, establecidos en el presente contrato entre ALAVUELTAHAY.CL, la app
ALAVUELTAHAY y cada vendedor.

2) DISPOSICIONES PARA QUIEN OFRECE UN PRODUCTO Y/O SERVICIO
Aceptación de términos, proceso de enrolamiento y condiciones
Los vendedores que deseen tener su tienda o servicios en el sitio y/o app deberán aceptar el presente Acuerdo de
Términos y Condiciones previamente. En caso de tener interés de contar con un espacio en el sitio y/o app, pueden
completar los formularios correspondientes dispuestos en las mismas plataformas. La información que proporciona el
vendedor, tanto en el formulario como en el registro de la tienda o emprendimiento deberá ser exacta, actualizada y
cumplir con los requisitos mínimos solicitados por ALAVUELTAHAY.CL y app ALAVUELTAHAY. El sitio web y la app
podrán suspender o cancelar una cuenta, si el vendedor incumple algunos de los lineamientos aceptados en el
contrato.

Obligaciones del Vendedor
El Vendedor que promociona en el sitio y app deberá:
- Tener capacidad legal para vender el bien o servicio objeto de su oferta.
- Cumplir con todas las obligaciones regulatorias pertinentes y contar con los registros, habilitaciones,
permisos y/o autorizaciones exigidas por la normativa aplicable para la venta de los bienes y servicios
ofrecidos.
- Dado que ALAVUELTAHAY.CL y app ALAVUELTAHAY son puntos de promoción de los vendedores y
vendedoras, accesibles a los potenciales compradores y no participan de las operaciones que se realizan
entre ellos, el vendedor será responsable por todas las obligaciones y cargas impositivas que correspondan
por la venta de sus artículos, sin que pudiera imputársele a ALAVUELTAHAY.CL o app ALAVUELTAHAY algún
tipo de responsabilidad por incumplimientos en tal sentido.
- ALAVUELTAHAY.CL y app ALAVUELTAHAY no tienen participación alguna en el proceso de negociación y
acuerdo definitivo entre las partes. Por eso, ALAVUELTAHAY.CL y app ALAVUELTAHAY no son responsables
por el efectivo cumplimiento de las obligaciones fiscales o impositivas establecidas por la ley vigente.
- El vendedor podrá describir sus productos o servicios con precisión o indicar los medios para obtener más
información. En sus anuncios sólo se pueden incluir descripciones de texto, gráficos, fotos y otros contenidos
relacionados con la venta de ese elemento.

3) DISPOSICIONES PARA QUIEN BUSCA UN PRODUCTO Y/O SERVICIO
El potencial comprador debe tener presente que:
- Los compradores son responsables de leer la descripción del artículo de estar disponible o de solicitar al
proveedor la información detallada antes de hacer una compra.

- No es posible realizar compras directamente en el sitio web y app, sino que dicha operación se realiza
directamente con los vendedores en su tienda u otro lugar físico en que funcione, o por el medio que dicho
proveedor implemente para llevar a cabo la operación.
- Cada vendedor que promociona en el sitio web y app indicará plazos, métodos de envío y políticas de tienda,
por lo que antes de adquirir un producto, el comprador debe solicitar toda la información, especialmente las
políticas de la tienda o proveedor, costos de envío, formas de pago, etc., y en caso de duda, comunicarse
directamente con el vendedor, por los medios que éste provea o en la opción contactar al propietario
disponible en la página de la tienda o negocio disponible en las plataformas, quien tendrá la obligación de
revisar la recepción de la consulta (también en la casilla no deseados) y de responder a la brevedad.
- Tal como lo establece la normativa fiscal vigente, el comprador debe exigir la boleta o factura al vendedor
como comprobante de la operación.
- Los servicios de ALAVUELTAHAY.CL y app ALAVUELTAHAY solo están disponibles para, y sólo pueden ser
utilizados por, las personas que tengan 18 años o más. ALAVUELTAHAY.CL y app ALAVUELTAHAY pueden, a
su entera discreción, negarse a ofrecer el acceso o uso de los Servicios a cualquier persona o entidad y
cambiar sus criterios de elegibilidad en cualquier momento. Las personas menores de 18 años podrán hacer
uso de los servicios de ALAVUELTAHAY.CL y app ALAVUELTAHAY sólo bajo la supervisión de un padre o tutor
legal que tenga por lo menos 18 años de edad. En todos los casos, el adulto es el usuario y es responsable de
cualquier actividad que se lleve a cabo.
- Cuando compra en una tienda o comercio que se promociona en ALAVUELTAHAY.CL y app ALAVUELTAHAY,
está apoyando directamente a un negocio independiente, cada uno con sus anuncios, políticas, plazos de
procesamiento diferentes. Al considerar un comprador realizar una operación con un vendedor (Tienda) que
promociona en ALAVUELTAHAY.CL y app ALAVUELTAHAY el comprador acepta que:
o Está conforme con estos términos y condiciones en su totalidad.
o Ha leído la descripción del artículo o servicio ofrecido, ha solicitado la información adicional relevante
y ha consultado las políticas de compra antes de concretarla.
o Enviará y/o cursará el pago correspondiente para los artículos comprados, de la forma indicada
directamente por el vendedor u oferente.
o Proporcionará información de envío o contacto exacta al vendedor.

4) EXENCIÓN DE RESPONSABILIDAD DEL SITIO
Tanto oferentes como los potenciales compradores tendrán presente que el sitio ALAVUELTAHAY.CL y app
ALAVUELTAHAY no tiene responsabilidad alguna al producirse un caso de no entrega de un pedido o prestación de
servicio promocionado en ellos, respecto del cual el comprador envió y/o cursó el pago, pero el vendedor no le envía
y/o entrega el artículo, o envía y/o entrega uno distinto, o, que no cumple con las características del ofrecido o
promocionado, no corresponde a la cantidad o calidad ofrecida, o no lo envía y/o entrega en la dirección correcta o
no presta el servicio convenido, sometiéndose desde ya a la resolución de los conflictos que pudieren presentarse a la
legislación vigente en materia de protección a los consumidores y cumplimiento de contratos.
El sitio web y app no puede controlar todo el contenido proporcionado por los usuarios en el sitio y app. También
existen riesgos de tratar con personas menores de edad o personas que actúan bajo una identidad falsa. Se insta a los
vendedores y a los compradores a mantener políticas de compraventa seguras, para el resguardo de los intereses de
ambas partes.

5) PRIVACIDAD DE LA INFORMACIÓN RECIBIDA Y ALMACENADA
Para poder abrir una tienda en ALAVUELTAHAY.CL y app ALAVUELTAHAY requiere que el potencial vendedor
proporcione una dirección de correo electrónico válida y que elija un nombre de usuario (Seudónimo). Será necesaria

también información adicional: nombre completo, número de cédula de identidad, número de teléfono y una
dirección física. Se solicitará otra información como enlaces a redes sociales, de ser necesario. El sitio web y app
utilizarán la información que recopila del vendedor para comunicarse con el mismo y para brindarle el mejor servicio.
De esta manera se mantendrá informado sobre novedades y mejoras.
Asimismo, un comprador deberá indicar su correo electrónico para dejar reseñas en el sitio y app.
Obligatoriedad de facilitar los datos
Los datos solicitados en el registro del sitio web y app son con carácter general, obligatorios (salvo que en el campo
requerido se especifique lo contrario) para cumplir con un adecuado servicio. Por lo tanto, si no se facilitan los
mismos o no se facilitan correctamente no podrán atenderse los mismos, sin perjuicio de que podrá visualizar
libremente el contenido del sitio web y app.
¿Con qué finalidad tratarán el sitio web y app los datos personales del usuario?
Los datos personales facilitados a través del sitio web y app serán tratados conforme a las siguientes finalidades:
- Gestionar, tramitar y dar respuesta a peticiones, solicitudes, incidencias, quejas, reclamos o consultas de los
usuarios, a través del correo electrónico contacto@alavueltahay.cl o teléfonos habilitados al efecto en el
sitio web, app o a través de las Redes Sociales de ALAVUELTAHAY.CL y app ALAVUELTAHAY, así como realizar
encuestas de satisfacción con el servicio.
- Gestionar el envío de comunicaciones comerciales personalizadas sobre productos y servicios de
ALAVUELTAHAY.CL y app ALAVUELTAHAY, por medios electrónicos y/o convencionales.
- Mantener informado a los usuarios sobre las novedades de ALAVUELTAHAY.CL y app ALAVUELTAHAY en sus
perfiles en las Redes Sociales, si los usuarios se hacen seguidor de ALAVUELTAHAY.CL y app ALAVUELTAHAY
en sus perfiles. Los usuarios que no deseen seguir recibiendo comunicaciones comerciales sobre
ALAVUELTAHAY.CL y app ALAVUELTAHAY en las Redes Sociales deben dejar de seguir sus perfiles.
El sitio web y app no venderán o divulgarán la información personal a terceros sin su consentimiento expreso.

6) COOKIES
El acceso y la navegación en el sitio web y app, o el uso de los servicios de los mismos, implican la aceptación de los
presentes términos y condiciones. Con el fin de facilitar su navegación en el sitio web y app, se les comunica que se
utilizan Cookies u otros archivos de funcionalidad similar (en adelante, las “Cookies”).
Las Cookies son esenciales para el funcionamiento de Internet; no pueden dañar el equipo/dispositivo del usuario y,
si se encuentran activadas en la configuración de su navegador, ayudan a identificar y resolver posibles errores de
funcionamiento del sitio web y app.
Uso de Cookies por parte del sitio web y app
Concretamente, el sitio web y app están utilizando las Cookies para las finalidades que a continuación se exponen:
- Cookies propias.

- Cookies técnicas y de personalización.
Estas Cookies facilitan el acceso y navegación del usuario por el sitio web y app en cada una de sus visitas a los
mismos y la utilización de las diferentes opciones o servicios que en ellas existen como, por ejemplo, controlar el
tráfico y la comunicación de datos, o acceder a secciones de acceso restringido.
- Cookies de terceros.
- Cookies de análisis.
- Cookies de publicidad.
Cada vez que un usuario visita el sitio web y app se le asigna una cookie persistente que durante un plazo
determinado almacena información sobre su comportamiento a través de la observación de sus hábitos de
navegación en el sitio web y app, lo que permite al sitio web y app identificar al usuario y mostrarle determinada
publicidad en función de los mismos. Una vez que los usuarios abandonan el sitio web y app, se les mostrará
publicidad del tipo de productos o servicios del sitio web sobre los que se ha interesado.
Asimismo, si navega por otras páginas web y app en las que se publicitan anuncios sobre servicios del sitio web y app,
le informamos de que la visualización de los anuncios es gestionada a través de datos obtenidos mediante una cookie
a la que podríamos tener acceso con la finalidad de realizar un seguimiento de alguna campaña publicitaria relativa a
dicho anuncio, así como para mostrarle determinada publicidad según sus intereses.
En caso de que el usuario decida desactivar todas las cookies, la calidad y rapidez del servicio podría disminuir e,
incluso, podría perder el acceso a algunos de los servicios o secciones ofrecidos en ALAVUELTAHAY.CL y app
ALAVUELTAHAY.

7) PROPIEDAD INTELECTUAL
ALAVUELTAHAY.CL y app ALAVUELTAHAY son titulares de todos los derechos que en virtud de las leyes de Propiedad
Intelectual se le reconocen al creador de una obra. El contenido como contrato, texto, imágenes, logos, botones,
iconos, marcas comerciales y otros, son propiedad intelectual del sitio web y app (a excepción de material propiedad
de terceros previamente autorizados) y están protegidos bajo los derechos de autor, marcas y en general derechos de
propiedad intelectual. Queda prohibida la reproducción total o parcial de cualquier contenido descrito en esta
cláusula, por cualquier medio y sin autorización previa.
Los usuarios vendedores del sitio y app se comprometen a cumplir cabalmente la legislación en materia de propiedad
intelectual y desde ya eximen de toda responsabilidad al sitio y app, por alguna violación en la materia.

8) COMENTARIOS EN EL SITIO
Los comentarios y evaluaciones son una buena forma de obtener más información sobre la reputación del vendedor;
también ayudan a los buenos vendedores a destacarse con una reputación sólida o a advertir a otros compradores
sobre una mala experiencia.
Los comentarios deben reflejar opiniones, conclusiones, creencias o experiencias de los compradores que sean
honestas e imparciales.
Los comentarios en el sitio y app deben realizarse de forma respetuosa, no se aceptan insultos, denostaciones
públicas o información fraudulenta.

Nos reservamos el derecho a eliminar comentarios que infrinjan nuestros Términos y Condiciones

9) OTROS
Garantía de servicio
El sitio web y app no garantizan el acceso continuo e ininterrumpido al sitio web y app, ya que el funcionamiento del
sitio y app pueden ser interferidos por numerosos factores fuera del control de ALAVUELTAHAY.CL y app
ALAVUELTAHAY.
Otros servicios ALAVUELTAHAY.CL y app ALAVUELTAHAY
El sitio y app podrán ofrecer servicios adicionales de publicidad, cuyos términos, condiciones y valores específicos
corresponderán a los que fijarán las condiciones particulares de prestación de cada servicio, los que se fijarán y
publicitarán en el sitio, app o serán informados por el medio en que el interesado tome contacto con el área
comercial del sitio y app para efectos de solicitar mayores detalles. La formalización, formas de pago, obligaciones de
las partes, costos, quedarán plasmados en el contrato que celebren las partes y se sujetarán, respecto de sus
obligaciones, a la legislación chilena.
Otros recursos
El sitio web y app no son responsables de los sitios web y app externos o recursos vinculados o referenciados en el
sitio web y app. ALAVUELTAHAY.CL y app ALAVUELTAHAY no respaldan ni son responsables de ningún contenido,
publicidad, productos u otros materiales disponibles en dichos sitios, app o recursos. El vendedor acepta que
ALAVUELTAHAY.CL y app ALAVUELTAHAY no serán responsables, directa o indirectamente, por cualquier daño o
pérdida causada por el uso de cualquier contenido, bienes o servicios disponibles en sitios web o recursos externos a
ALAVUELTAHAY.CL y app ALAVUELTAHAY.
La activación y uso de estos enlaces puede conllevar la identificación y autenticación del usuario (login/contraseña)
en las plataformas correspondientes, completamente externas al sitio web y app, y fuera del control de
ALAVUELTAHAY.CL y app ALAVUELTAHAY. Al acceder a dichas redes externas, el usuario ingresa en un entorno no
controlado por el sitio web y app, por lo que estos no asumirán ninguna responsabilidad sobre la configuración de
seguridad de dichos entornos.
Dado que ALAVUELTAHAY.CL y app ALAVUELTAHAY no tiene control alguno sobre el contenido alojado en dichos
canales, el usuario reconoce y acepta que aquellas no asumen responsabilidad alguna por el contenido ni por los
servicios a los que el usuario pueda acceder en dichas páginas, ni por cualquier contenido, productos, servicios,
publicidad, ni cualquier otro material disponible en los mismos. Por tal motivo, el usuario debe extremar la prudencia
en la valoración y utilización de la información, contenidos y servicios existentes en los canales enlazados, y sobre la
información propia o de terceros que quiera compartir en dichos canales.
Enlaces en otras páginas web y/o app con destino al sitio web y app
ALAVUELTAHAY.CL y app ALAVUELTAHAY no autorizan el establecimiento de un enlace al sitio web y app desde
aquellas páginas web y/o app que contengan materiales, información o contenidos ilícitos, ilegales, degradantes,
obscenos y, en general, que contravengan las leyes, la moral o el orden público, o las normas sociales generalmente
aceptadas.

En todo caso, los usuarios podrán establecer, en páginas web y app de su titularidad, enlaces que dirijan al sitio web y
app, siempre y cuando cumplan con las siguientes condiciones:
- El enlace no podrá reproducir el contenido de ALAVUELTAHAY.CL, app ALAVUELTAHAY o partes de los
mismos de ninguna forma.
- No está permitido realizar manifestaciones o indicaciones falsas, inexactas o incorrectas sobre el sitio web,
app y/o, en particular, declarar o dar a entender que ALAVUELTAHAY.CL y app ALAVUELTAHAY han
autorizado el enlace o que han supervisado o asumido de cualquier forma los contenidos o servicios ofrecidos
o puestos a disposición en la página web o app en la que se establece dicho enlace.
- La página web en la que se establezca el enlace al sitio web o app no contendrán informaciones o contenidos
ilícitos, contrarios a la moral y buenas costumbres generalmente aceptadas y al orden público, así como
tampoco abarcarán contenidos contrarios a cualquier derecho de terceros, incluidos los derechos de
propiedad intelectual e industrial y/o el derecho al honor, a la intimidad personal o familiar o a la propia
imagen o de cualquier otro derecho, o contenidos contrarios a las normas reguladoras de la protección de
datos de carácter personal.
El sitio web y app no tiene facultades ni medios humanos ni técnicos para conocer, controlar ni aprobar toda la
información, contenidos, productos o servicios facilitados por otras páginas web o app que tengan establecidos
enlaces con destino al sitio web o app. ALAVUELTAHAY.CL y app ALAVUELTAHAY no asumen ningún tipo de
responsabilidad por cualquier aspecto relativo a la página web o app que establece ese enlace con destino al sitio
web o app, en concreto, a título enunciativo y no taxativo, sobre su funcionamiento, acceso, datos, información,
archivos, calidad y fiabilidad de sus productos y servicios, sus propios enlaces y/o cualquiera de sus contenidos, en
general.
Modificación o conclusión de Servicio
El sitio web y app se reservan el derecho de modificar o terminar el servicio de ALAVUELTAHAY.CL y app
ALAVUELTAHAY por cualquier razón, sin previo aviso, en cualquier momento. El sitio web y app se reservan el
derecho de modificar estas Condiciones de Uso u otras políticas del sitio web en cualquier momento, así que por
favor revise las políticas con frecuencia. Si ALAVUELTAHAY.CL y app ALAVUELTAHAY hacen un cambio, el sitio web
y/o app les notificarán por correo electrónico o por medio de un aviso en nuestra páginas de inicio o en otros lugares.
Legislación aplicable
En todo lo convenido y en lo que no se encuentre expresamente previsto, este contrato se regirá por las leyes
vigentes de la República de Chile.

Notificaciones
ALAVUELTAHAY.CL y app ALAVUELTAHAY señalan medio para atender notificaciones al correo electrónico
contacto@alavueltahay.cl.
  `,
};

export default GlobalVars;
