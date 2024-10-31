// Obtener elementos del DOM
const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");
const continuarCompraElement = document.getElementById("continuar-compra");

/** Crea las tarjetas de productos usando los datos guardados en localStorage */
function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("seleccionados")) || [];

  if (productos.length > 0) {
    carritoVacioElement.style.display = "none";
    continuarCompraElement.style.display = "block";
    let totalCantidad = 0;
    let totalPrecio = 0;

    productos.forEach((producto, i) => {
      const nuevoItem = document.createElement("div");
      nuevoItem.classList.add("tarjeta-producto");
      nuevoItem.innerHTML = `
        <div class="producto">
          <div class="card-body">
            <h4>${producto.nombre}</h4>
            <img src="${producto.imagen}" alt="${producto.alt}">
            <p class="precio">Precio: ${producto.precio}</p>
            <div class="mas">
              <button onclick="cambiarCantidad(${i}, -1)">-</button>
              <span class="cantidad">${producto.cantidad}</span>
              <button onclick="cambiarCantidad(${i}, 1)">+</button>
            </div>
          </div>
        </div>
      `;
      contenedorTarjetas.appendChild(nuevoItem);

      totalCantidad += producto.cantidad;
      totalPrecio += producto.cantidad * parseFloat(producto.precio.replace("$", "").replace(",", ""));
    });

    cantidadElement.textContent = totalCantidad;
    precioElement.textContent = totalPrecio.toFixed(2);
  } else {
    carritoVacioElement.style.display = "block";
    continuarCompraElement.style.display = "none";
  }
}

/** Cambia la cantidad de un producto en el carrito */
function cambiarCantidad(index, cambio) {
  const productos = JSON.parse(localStorage.getItem("seleccionados")) || [];
  if (productos[index]) {
    productos[index].cantidad += cambio;
    if (productos[index].cantidad <= 0) {
      productos.splice(index, 1);
    }
    localStorage.setItem("seleccionados", JSON.stringify(productos));
    crearTarjetasProductosCarrito();
    actualizarNumeroCarrito();
  }
}

/** Actualiza el número de productos en el ícono del carrito */
function actualizarNumeroCarrito() {
  const productos = JSON.parse(localStorage.getItem("seleccionados")) || [];
  const totalProductos = productos.reduce((total, producto) => total + producto.cantidad, 0);
  document.getElementById("cuenta-carrito").textContent = totalProductos;
}

/** Reinicia el carrito */
document.getElementById("reiniciar").addEventListener("click", () => {
  localStorage.removeItem("seleccionados");
  crearTarjetasProductosCarrito();
  cantidadElement.textContent = "0";
  precioElement.textContent = "0.00";
  actualizarNumeroCarrito();
});

/** Inicializa la página del carrito */
document.addEventListener("DOMContentLoaded", () => {
  crearTarjetasProductosCarrito();
  actualizarNumeroCarrito();
});
