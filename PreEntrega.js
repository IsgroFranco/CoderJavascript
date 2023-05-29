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
}

function loSentimos() {
  contenedorProductos.innerHTML = "";
  const article = document.createElement("article");
  article.classList.add("ecommerce-products");
  article.innerHTML =
    "<h2>Lo sentimos, pero no cumples con los requisitos para ingresar a la tienda</h2>";
  contenedorProductos.append(article);
}

let validacion1 = prompt("Usted es un robot ¿Si? ¿No?").toLowerCase();
let validacion2 = prompt("Usted es mayor de 18 años ¿Si? ¿No?").toLowerCase();
if (validacion1 === "no" && validacion2 === "si") {
  alert("Bienvenido a Sneakers tienda");
  cargarProductos(productos);
} else if (validacion1 === "si" && validacion2 === "si") {
  alert("Lo sentimos pero no se permiten robots en esta pagina");
  loSentimos();
} else if (validacion1 === "no" && validacion2 === "no") {
  alert("Lo sentimos pero debes ser mayor a 1 años para poder comprar");
  loSentimos();
} else if (validacion1 === "si" && validacion2 === "no") {
  alert(
    "Al parecer eres un robot menor de edad por lo tanto no puedes acceder a este sitio"
  );
  loSentimos();
} else {
  alert("Algo a salido mal, vuelve a intentarlo mas tarde");
  loSentimos();
}

let sneakerSelection = prompt(
  "Que sneaker desea, Nike, Adidas o todos"
).toLowerCase();

if (sneakerSelection === "nike") {
  const sneakersNike = productos.filter(
    (producto) => producto.categoria.id === "nike"
  );
  cargarProductos(sneakersNike);
} else if (sneakerSelection === "adidas") {
  const sneakersAdidas = productos.filter(
    (producto) => producto.categoria.id === "adidas"
  );
  cargarProductos(sneakersAdidas);
} else if (sneakerSelection === "todos") {
  cargarProductos(productosElegidos);
}
