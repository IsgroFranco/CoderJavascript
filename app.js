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
const handIcon = document.querySelectorAll(".bi bi-hand-index-fill");

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
  const botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");
  const numeroCarrito = document.querySelectorAll(".numerito");
  botonesAgregarCarrito.forEach((boton) => {
    boton.addEventListener("click", () => {
      numeroCarrito.forEach((numerito) => {
        numerito.textContent = parseInt(numerito.textContent) + 1;
      });
    });
  });
}

cargarProductos(productos);

botonCategoria.forEach((boton) => {
  boton.addEventListener("click", () => {
    const icon = boton.querySelector("i");

    botonCategoria.forEach((otroBoton) => {
      if (otroBoton !== boton) {
        otroBoton.querySelector("i").classList.remove("active");
      }
    });

    icon.classList.add("active");

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

const botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");
botonesAgregarCarrito.forEach((boton) => {
  boton.addEventListener("click", () => {
    numeroCarrito.textContent = parseInt(numeroCarrito.textContent) + 1;
  });
});
