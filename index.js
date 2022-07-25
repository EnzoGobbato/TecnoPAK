/* alert("¡Hola! Bienvenido a TecnoPAK, antes de continuar deber registrate.");

let account = prompt(`1. Ingrese su nombre de usuario`)
let pass = prompt(`2. Ingrese una contraseña`)

function login (account, pass){
    let usuario = prompt ("usuario");
    let contraseña = prompt ("contraseña");

    while(account !== usuario || pass !== contraseña){
        usuario = prompt ("Ha ingresado un usuario no valido, intente nuevamente.")
        contraseña = prompt ("La contraseña es incorrecta, intente nuevamente.")
    }
    alert("Has ingresado correctamente")
    }

 for(let  i = 1 ; i <= 12 ; i++){
    let saludo = `¡Hola ${usuario}! bienvenido a TecnoPAK! 
    Ante cualquier consulta no dude en contactarnos.`;
    alert (saludo);
    let turno = prompt("Profavor ingrese su nombre completo y numero de telefono para asignarle un turno");
    let problema = prompt("Ingrese que reparacion desea realizar");
    let respuesta = `Hola ${turno}, tu turno es el ${i} para ${problema}, nos comunicaremos lo antes posible para coordinar con usted, gracias!`;
    alert (respuesta);

    if(i >= 10){
        break;
}}

    let saludo = `¡Hola ${usuario}! bienvenido a TecnoPAK! 
    Ante cualquier consulta no dude en contactarnos.`;
    alert (saludo);
let ocupado = ("No quedan turnos disponibles para esta semana para realizar reparaciones, pero no dude en ponerse en contacto con nosotros para poder darle respuesta , gracias!");
alert (ocupado);

 */


// HACIENDO CARRITO DE COMPRAS

    // Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector ('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const fundas = document.querySelector('#lista-fundas');
let productosCarrito = [];

cargarEventListener();
function cargarEventListener () {
    // Cuando agregas una funda presionando en "agregar al carrito"
    fundas.addEventListener('click', agregarFundas);

    // Elimina articulos del carrito
    carrito.addEventListener ('click', eliminarArticulo);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        productosCarrito = [ ]; // Reseteamos el arreglo
        limpiarHTML (); // Eliminamos todo el html generado en el carrito
    })
}

    // Funciones

function agregarFundas(e){

    if (e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerDatosProductos (productoSeleccionado);
    }
}

//Elimina un articulo del carrito

function eliminarArticulo (e){
    if(e.target.classList.contains('borrar-articulo')){
        const fundaId = e.target.getAttribute('data-id');

        //Elimina del arrays de productosCarrito por el data-id
        productosCarrito = productosCarrito.filter (funda => funda.id !== fundaId);
        carritoHTML(); //Iteramos sobre el carrito y mostramos el html actualizado
     }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del producto.

function leerDatosProductos (funda){
console.log(funda);

// Crear un objeto con las caracteristicas del producto elegido.

const infoFunda = {
    imagen: funda.querySelector('img').src,
    titulo: funda.querySelector('h5').textContent,
    precio: funda.querySelector('h3').textContent,
    id: funda.querySelector('a').getAttribute('data-id'),
    cantidad : 1 
}
// Revisa si un elemento ya existe en el carrito
const existe = productosCarrito.some ( funda => funda.id === infoFunda.id );
if (existe){
//Actualizamos la cantidad
const fundas = productosCarrito.map (funda => {
    if (funda.id === infoFunda.id){
        funda.cantidad++;
        return funda; // Retorna el objeto con la cantidad actualizada
    }else {
        return funda} // Retorna los objetos que no son los duplicados
    })
    productosCarrito = [...fundas];
}else{
// Agrega prodcutos al Arrays del carrito de compras
productosCarrito = [...productosCarrito, infoFunda];
};

    console.log(productosCarrito);

    carritoHTML ();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {

// Limpiar los HTML generados en el carrito

limpiarHTML (); 

// Recorre el carrito y genera los HTML
    
    productosCarrito.forEach( funda => {
        console.log(funda);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${funda.imagen}" width="100">
        </td>
        <td>${funda.titulo}</td>
        <td>${funda.precio}</td>
        <td>${funda.cantidad}</td>
        <td>
            <a href="#" class="borrar-articulo" data-id="${funda.id}"> X </a>
        </td>
        `;
        
// Agrega los HTML generados en el tbody

contenedorCarrito.appendChild(row);

    });
}

// Elimina los productos del tbody

function limpiarHTML() {

while (contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
}
























