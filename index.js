/* /* alert("¡Hola! Bienvenido a TecnoPAK, antes de continuar deber registrate.");

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


    if (localStorage.getItem('productosCarrito')){
        productosCarrito = agregarFundas.parse(localStorage.getItem('productosCarrito'))
        infoFunda()
    }

    localStorage.setItem('productosCarrito', infoFunda.stringify(productosCarrito))

 


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
 */

// VARIABLE
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

// EVENTOS

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})
cards.addEventListener('click', e => {
    addcarrito(e)
})
items.addEventListener('click',(e) =>{
    btnAccion(e)
})

const fetchData = async () => {
    try{
        const res = await fetch ('api.json')
        const data = await res.json()
        // console.log(data)
        pintarCards(data)
    } catch (error){
console.log(error);
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addcarrito = e => {

    if(e.target.classList.contains('btn-dark')){ 
    setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td') [0].textContent = producto.title
        templateCarrito.querySelectorAll('td') [1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)

    })
    items.appendChild(fragment)

    pintarFooter ()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0 ) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`

        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad} ) => acc + cantidad,0 )
    const nPrecio = Object.values (carrito).reduce ((acc, {cantidad, precio}) => acc + cantidad * precio,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito ()
    })
}

const btnAccion = e =>{
    if(e.target.classList.contains('btn-info')){
        console.log(carrito[e.target.dataset.id]);
   
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito ()
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito () 
    }
    e.stopPropagation()
}
























