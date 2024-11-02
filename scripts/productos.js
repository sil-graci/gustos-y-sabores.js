if (document.getElementById("productos")) {
  let productosHTML = `
    <h2>Productos</h2>
    <div class="productos-contenedor">
  `;

  // Iterar sobre cada producto en `data` y crear el HTML para cada uno
  data.forEach((producto, index) => { 
      productosHTML += `
        <div class="producto">
          <img src="${producto.imagen}" alt="${producto.alt}">
          <h3>${producto.nombre}</h3>
          <p class="descripcion">${producto.descripcion}</p>
          <div class="footer">
            <p class="precio">${producto.precio}</p>
            <a href="#" class="btn btn-card" data-index="${index}">Agregar al carrito</a> 
          </div>
        </div>
      `;
  });

  productosHTML += `</div>`;

  // Insertar el HTML generado en el contenedor con id "productos"
  document.getElementById("productos").innerHTML = productosHTML;

  // Agregar los event listeners para los botones "Agregar al carrito" en cada producto
  let productosButtons = document.querySelectorAll("#productos .btn.btn-card");
  productosButtons.forEach(button => {
      button.addEventListener("click", (event) => {
          event.preventDefault();
          let index = event.target.getAttribute("data-index"); 
          agregarAlCarrito(data[index]); // Llamamos a la función para añadir al carrito el producto del array data con el índice donde se hizo clic
      });
  });
}
  
// Función para manejar la lógica de agregar productos al carrito y almacenarlos en localStorage
function agregarAlCarrito(producto) {
  // Obtener los datos actuales del carrito almacenados en localStorage
  const memoria = localStorage.getItem("seleccionados");
  
  if (!memoria) {
    // Si no hay datos en localStorage, agregar el primer producto con cantidad 1
    const nuevoProducto = { ...producto, cantidad: 1 };
    localStorage.setItem("seleccionados", JSON.stringify([nuevoProducto]));
  } else {
    // Si ya hay datos, parsear el JSON para obtener un array de productos
    const productosEnCarrito = JSON.parse(memoria);
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = productosEnCarrito.find(p => p.codigo === producto.codigo);
    
    if (productoExistente) {
      // Si el producto ya existe en el carrito, incrementar la cantidad
      productoExistente.cantidad++;
    } else {
      // Si el producto no existe en el carrito, agregarlo con cantidad 1
      const nuevoProducto = { ...producto, cantidad: 1 };
      productosEnCarrito.push(nuevoProducto);
    }
    
    // Guardar nuevamente el array actualizado en localStorage
    localStorage.setItem("seleccionados", JSON.stringify(productosEnCarrito));
  }

  actualizarNumeroCarrito();
}

// Elemento del contador del carrito
const cuentaCarritoElement = document.getElementById("cuenta-carrito");

// Función para actualizar el número total de productos en el carrito
function actualizarNumeroCarrito() {
  const memoria = JSON.parse(localStorage.getItem("seleccionados") || "[]");
  const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
  cuentaCarritoElement.innerText = cuenta;
}

// Actualizar el contador al cargar la página
actualizarNumeroCarrito();
  