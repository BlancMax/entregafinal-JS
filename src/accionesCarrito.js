import { actualizarTotalesCarrito } from './actualizarCarrito.js';
import { obtenerCarritoStorage } from './storage.js';

let carrito = [];

const validarProductoRepetido = (productoId) => {

    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
    }

    const productoRepetido = carrito.find(producto => producto.id === productoId.id);

    if (productoRepetido) {
        productoRepetido.cantidad++;
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
    } else {
        agregarAlCarrito(productoId);
    }
};

const agregarAlCarrito = (productoId) => {
    const contenedor = document.getElementById('carrito-contenedor');
    carrito.push(productoId);

    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = `<p>${productoId.nombre}</p>
                    <p>Precio: ${productoId.precio}</p>
                    <p id=cantidad${productoId.id}>Cantidad: ${productoId.cantidad}</p>
                    <button id=eliminar${productoId.id} value='${productoId.id}' class='btn waves-effect waves-ligth boton-eliminar'>X</button>
                    `;
    contenedor.appendChild(div);
    actualizarTotalesCarrito(carrito);
};

// pintarCarrito recibe por parámetro un array de objetos
const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p>${producto.nombre}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                        <button id=eliminar${producto.id} value='${producto.id}' class='btn waves-effect waves-ligth boton-eliminar'>X</button>
                        `;
        contenedor.appendChild(div);
    });
};

const eliminarProductoCarrito = (productoId) => {
    Swal.fire({
        title: 'Está seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            const carritoStorage = obtenerCarritoStorage();
            const carritoActualizado = carritoStorage.filter(producto => producto.id != productoId);
        
            actualizarTotalesCarrito(carritoActualizado);
            pintarCarrito(carritoActualizado);

            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'El archivo ha sido borrado'
            })
        }
    })
};

export { agregarAlCarrito, validarProductoRepetido, pintarCarrito, eliminarProductoCarrito };
