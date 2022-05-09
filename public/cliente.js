let carro = []
const agregarCarro = (elemento)=>{
    let elementosEnCarro = {}
    // obtenemos datos del producto
    const nombre = elemento.dataset.nombre
    const precio = elemento.dataset.precio
    const img = elemento.dataset.img
    const id = elemento.dataset.id
    const cantidad = elemento.dataset.cantidadid

    // obtenemos la tabla del modal
    const modalBody = document.getElementById('bodyTabla')

    // obtenemos la cantidad de elementos del producto
    const cantidadProducto = document.getElementById(cantidad).value

    // creamos un objeto para darle forma a los datos 
    elementosEnCarro.id = id
    elementosEnCarro.nombre = nombre
    elementosEnCarro.precio = precio
    elementosEnCarro.img = img
    elementosEnCarro.cantidad = cantidadProducto

    // Buscamos si es que ya tenemos un producto del mismo id en el carro. 
    // Si es que no está en el carro, pusheamos al carro y creamos una nueva fila en el modal
    // En caso de ya tenerlo, simplemente sumamos y recalculamos el precio total del carro
    if(buscarProducto(carro, id)){
        const producto = carro.find(prod => prod.id === id)
        producto.cantidad = Number(producto.cantidad) + Number(cantidadProducto)
        const cantidadActual = document.getElementById("cantidadActual" + id)
        cantidadActual.innerHTML = `${producto.cantidad}`
        const precioTotalProducto = document.getElementById('precioTotal' + id)
        precioTotalProducto.innerHTML = `${producto.cantidad*precio}`
        
    }else{
        carro.push(elementosEnCarro)

        modalBody.innerHTML += 
            `
            <tr>
            <th scope="row"><img src='/public/imagenes/${img}' class="rounded" style="width:50px;"/></th>
            <td>${nombre}</td>
            <td id=cantidadActual${id}>${cantidadProducto}</td>
            <td id=precioTotal${id}>${cantidadProducto*precio}</td>
            </tr>
            `
        notificarCarro(carro)
    }
    calcularPrecioFinal(carro)
}

// funcion que verifica si un producto ya existe en elc arro
const buscarProducto = (carro, id) => {
    const encontrado = carro.some(producto => producto.id === id)
    return encontrado
}

// funcion que calcula el precio final del carro
const calcularPrecioFinal = (carro) => {
    const precioFinal = document.getElementById('precioFinal')
    const precioTotal = carro.reduce((precio,producto) => precio + (producto.precio * producto.cantidad), 0)
    precioFinal.innerHTML = `Precio Total : ${precioTotal}`
}

// funcion que agrega una alerta en el carro cuando se haya agregado un producto con el número de productos distintos que hay en el carro.
const notificarCarro = (carro) => {
    const carroCompra = document.getElementById('carroCompra')

    carroCompra.innerHTML = 
    `
        <span class="position-absolute" style="background: #ff0000;
            color: #fff;
            padding: 0 5px;
            vertical-align: top;
            margin-left: -22px;
            margin-top:15px; 
            border-radius:7.5px;
            font-size:14px;
            ">
            ${carro.length>9? '+9':carro.length}
        </span>
        <i class="fa-solid fa-cart-shopping fa-lg"></i>
    `
}


  // Ya que este desafío nos pedía instalar jQuery (a pesar de que bootstrap ya no lo usa 👀) vamos a usarlo para hacer unas animaciones
$(function(){
    $('.botonCompra').on('click', ()=>{
        // utilizo animaciones de fontawesome para que el usuario se de cuenta que agrego un producto al carro
        // así que agrego y saco clase fa-beat para que se genere un latido
        $('.fa-cart-shopping').addClass("fa-shake").delay(1000).queue((next)=>{
            $('.fa-cart-shopping').removeClass("fa-shake")
            next()
        })
        // obtengo id para poder animar la imagen de la card
        const id = $(this)[0].activeElement.id
        $(`#imagenProducto${id}`).animate({opacity: 0.4}, 300).animate({opacity: 1}, 300);
    })

})