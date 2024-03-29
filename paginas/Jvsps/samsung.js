// VARIABLE
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

// Boton de ir al cielo

document.getElementById("button-up").addEventListener('click', scrollUp);

function scrollUp(){
    let currentScroll = document.documentElement.scrollTop;

    if (currentScroll > 0){
        window.requestAnimationFrame(scrollUp);
        window.scrollTo (0, currentScroll - (currentScroll / 10));
    }
}

buttonUp = document.getElementById("button-up");
window.onscroll = function (){
    let scroll = document.documentElement.scrollTop;
    if (scroll > 600){
        buttonUp.style.transform = "scale(1)";
    }else if (scroll < 500){
        buttonUp.style.transform = "scale(0)";
    }
}

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
        const res = await fetch ('./jvsps/samsung.json')
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
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito.',
        showConfirmButton: false,
        timer: 750
      })
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
        Swal.fire('Vaciaste tu carrito correctamente.')  
    })

    const btnComprar = document.getElementById('comprar')
    btnComprar.addEventListener('click', () =>{
        carrito = {}
        pintarCarrito ()   
        Swal.fire('La compra fue realizada con exito!')
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