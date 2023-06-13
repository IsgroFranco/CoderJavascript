const productos = [
  {
    id: "air-jordan-1-mid-taxi",
    titulo: "Air Jordan 1 Mid Taxi (GS) (Nordelta)",
    imagen: "./assets/Jordan-1-Mid-Taxi-GS-433x433.jpg",
    categoria: {
      nombre: "nike",
      id: "nike",
    },
    precio: 600,
  },
  {
    id: "adidas-yeezy-1-boost-350-v2",
    titulo: "Adidas Yeezy Boost 350 V2",
    imagen: "./assets/adidas-Yeezy-Boost-350-V2-Beluga-Reflective.jpg",
    categoria: {
      nombre: "adidas",
      id: "adidas",
    },
    precio: 680,
  },
  {
    id: "adidas-forum-buckle-low",
    titulo: "Adidas Forum Buckle Low",
    imagen: "./assets/adidas-Forum-Buckle-Low-Bad-Bunny-Blue-Tint.jpg",
    categoria: {
      nombre: "adidas",
      id: "adidas",
    },
    precio: 750,
  },
  {
    id: "adidas-adi2000-yu-gi-oh",
    titulo: "Adidas ADI2000 Yu-Gi-Oh!",
    imagen:
      "./assets/adidas-ADI2000-Yu-Gi-Oh-Yugi_s-World-with-Sealed-Dark-Magician-Promo-Card-433x433.jpg",
    categoria: {
      nombre: "adidas",
      id: "adidas",
    },
    precio: 650,
  },
  {
    id: "adidas-yeezy-knit-rnr-sulfur",
    titulo: "Adidas Yeezy Knit RNR Sulfur",
    imagen: "./assets/adidas-Yeezy-Knit-RNR-Sulfur-433x433.jpg",
    categoria: {
      nombre: "adidas",
      id: "adidas",
    },
    precio: 500,
  },
  {
    id: "nike-dunk-low-se-world",
    titulo: "Nike Dunk Low SE World",
    imagen: "./assets/Nike-Dunk-Low-SE-World-Champs-Black-White-433x433.jpg",
    categoria: {
      nombre: "nike",
      id: "nike",
    },
    precio: 700,
  },
];

const contenedorProductos = document.querySelector("#wrapper-products");
const botonCategoria = document.querySelectorAll(".boton-categoria");
const botonCategoriaInicial = document.getElementById("todos");
const carritoBoton = document.querySelector(".button-sticky");
const carritoAside = document.querySelector(".aside-cart");
const carritoAsideInfo = document.querySelector(".aside-cart-wrapper");
let botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");
const numeroCarrito = document.querySelectorAll("#numerito");
const asideCarritoProductos = document.querySelector("#aside-section-cart");
const asideCarrito = document.querySelector(".aside-cart");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach((producto) => {
    const article = document.createElement("article");
    article.classList.add("ecommerce-products");
    article.innerHTML = `
    <div class="products-img-container">
<img src="${producto.imagen}" alt="${producto.titulo}" />
</div>
<h3 class="product-title">${producto.titulo}</h3>
<p class="product-price">$${producto.precio}</p>
<button class="agregar-carrito" id="${producto.id}">Agregar carrito</button>`;

    contenedorProductos.append(article);
  });

  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonCategoria.forEach((boton) => {
  if (boton === botonCategoriaInicial) {
    boton.classList.add("active");
  }

  boton.addEventListener("click", () => {
    botonCategoria.forEach((boton) => {
      boton.classList.remove("active");
    });

    boton.classList.add("active");
    if (boton.id !== "todos") {
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === boton.id
      );
      cargarProductos(productosBoton);
    } else {
      cargarProductos(productos);
    }
  });
});

carritoBoton.addEventListener("click", () => {
  carritoAside.classList.toggle("hidden");
  carritoAsideInfo.classList.toggle("hidden");
});

function actualizarBotonesAgregar() {
  botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");

  botonesAgregarCarrito.forEach((boton) => {
    boton.addEventListener("click", agragarAlCarrito);
  });
}

let productosEnCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
  const productosEnLs = JSON.parse(localStorage.getItem("carrito"));
  if (productosEnLs) {
    productosEnCarrito = productosEnLs;
    actualizarCarrito();
    actualizarNumerito();
  }
});

function agragarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  actualizarCarrito();
  actualizarNumerito();
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCarrito() {
  asideCarrito.innerHTML = "";

  productosEnCarrito.forEach((producto) => {
    const asideSectionCart = document.createElement("section");
    asideSectionCart.classList.add("aside-section-cart");
    asideSectionCart.innerHTML = `
      <article class="aside-cart-wrapper">
        <div class="aside-product-cart-img">
          <img src="${producto.imagen}" alt="${producto.titulo}" />
        </div>
        <div class="aside-cart-info-wrapp">
          <span class="aside-product-cart-info">PRODUCTO</span>
          <span class="aside-product-name">${producto.titulo}</span>
        </div>
        <div class="aside-cart-info-wrapp">
          <span class="aside-product-cart-info">PRECIO</span>
          <div class="aside-product-cart-price">
            <span class="aside-product-name">$${producto.precio}</span>
          </div>
        </div>
        <div class="aside-cart-info-wrapp">
          <span class="aside-product-cart-info">CANTIDAD</span>
          <div class="aside-product-cart-quantity">
            <button class="aside-decrement-cart">-</button>
            <span>${producto.cantidad}</span>
            <button class="aside-increment-cart">+</button>
          </div>
        </div>
        <button id="${producto.id}" class="aside-trash">
          <i class="bi bi-trash"></i>
        </button>
      </article>
    `;

    const incrementButton = asideSectionCart.querySelector(
      ".aside-increment-cart"
    );
    const decrementButton = asideSectionCart.querySelector(
      ".aside-decrement-cart"
    );
    incrementButton.addEventListener("click", () =>
      incrementarCantidad(producto.id)
    );
    decrementButton.addEventListener("click", () =>
      decrementarCantidad(producto.id)
    );

    const trashButton = asideSectionCart.querySelector(".aside-trash");
    trashButton.addEventListener("click", () =>
      eliminarDelCarrito(producto.id)
    );

    asideCarrito.append(asideSectionCart);
  });
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );

  numeroCarrito.forEach((numero) => {
    numero.textContent = nuevoNumerito;
  });
}

function eliminarDelCarrito(idProducto) {
  productosEnCarrito = productosEnCarrito.filter(
    (producto) => producto.id !== idProducto
  );
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  actualizarCarrito();
  actualizarNumerito();
}

function incrementarCantidad(idProducto) {
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idProducto
  );
  if (index !== -1) {
    productosEnCarrito[index].cantidad++;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    actualizarCarrito();
    actualizarNumerito();
  }
}

function decrementarCantidad(idProducto) {
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idProducto
  );
  if (index !== -1) {
    if (productosEnCarrito[index].cantidad > 1) {
      productosEnCarrito[index].cantidad--;
    } else {
      productosEnCarrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    actualizarCarrito();
    actualizarNumerito();
  }
}
