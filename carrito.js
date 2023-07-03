const sectionCart = document.querySelector(".section-cart");
const productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    sectionCart.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const productoAgregado = document.createElement("article");
      productoAgregado.classList.add("cart-wrapper");
      productoAgregado.innerHTML = ` 
  <div class="product-cart-img">
    <img
      src="${producto.imagen}"
      alt="${producto.titulo}"
    />
  </div>

  <div class="cart-info-wrapp">
    <span class="product-cart-info">PRODUCTO</span>
    <span class="product-name">${producto.titulo}</span>
  </div>

  <div class="cart-info-wrapp">
    <span class="product-cart-info">PRECIO</span>
    <div class="product-cart-price">
      <span class="product-name">$${producto.precio}</span>
    </div>
  </div>
  <div class="cart-info-wrapp">
    <span class="product-cart-info">CANTIDAD</span>
    <div class="product-cart-quantity">
      <button class="decrement-cart">-</button>
      <span>${producto.cantidad}</span>
      <button class="increment-cart">+</button>
    </div>
  </div>
  <div class="cart-info-wrapp">
    <span class="product-cart-info">SUBTOTAL</span>
    <div class="product-cart-subtotal">
      <span class="product-name">$${producto.precio * producto.cantidad}</span>
    </div>
  </div>
  <div id="${producto.id}" class="cart-trash">
    <i class="bi bi-trash"></i>
  </div>
  
`;
      sectionCart.append(productoAgregado);
      const decrementButton = productoAgregado.querySelector(".decrement-cart");
      decrementButton.addEventListener("click", () =>
        decrementCart(producto.id)
      );
      const incrementButton = productoAgregado.querySelector(".increment-cart");
      incrementButton.addEventListener("click", () =>
        incrementCart(producto.id)
      );
    });
  } else {
    sectionCart.innerHTML = "";
    const span = document.createElement("span");
    span.classList.add("carrito-vacio");
    span.innerHTML = "Tu carrito esta vacio";
    sectionCart.append(span);
  }

  actualizarBotonEliminar();
}

cargarProductosCarrito();

function actualizarBotonEliminar() {
  const botonEliminar = document.querySelectorAll(".cart-trash");
  botonEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarCarrito);
  });
}

function eliminarCarrito(e) {
  Toastify({
    text: "Producto eliminado!",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #b01212, #c94040)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  let idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );
  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  compraFinalizada();
}

function decrementCart(idProducto) {
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idProducto
  );
  if (index !== -1) {
    if (productosEnCarrito[index].cantidad > 1) {
      productosEnCarrito[index].cantidad--;
    } else {
      productosEnCarrito.splice(index, 1);
      Toastify({
        text: "Producto eliminado!",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #b01212, #c94040)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      compraFinalizada();
    }

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
  }
}

function incrementCart(idProducto) {
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idProducto
  );
  if (index !== -1) {
    productosEnCarrito[index].cantidad++;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
  }
}

const buyButton = document.querySelector(".buy");

function compraFinalizada() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    buyButton.addEventListener("click", () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Muchas gracias por su compra!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  } else {
    buyButton.addEventListener("click", () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tienes ningun producto!",
      });
    });
  }
}
compraFinalizada();
