let datosProductos
const btn = document.querySelectorAll(".btn")

const pedirPost = async () => {
  const resp = await fetch("data.json");
  const datosProductos = await resp.json();
  
  cargarproductos(datosProductos)
}

pedirPost() 



const productos = (post) => {
  return `
  <div class="col-sm-6 mb-3 mb-sm-0">
  <div class="card">
    <img src="${post.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${post.nombre}</h5>
      <p class="card-text">PRECIO: ${post.precio}.
        Abonando con American Express emitidas por American Express 9 cuotas sin interés.</p>
        <button class="btn btn-primary" data-id="${post.id}">Agregar</button>
    </div>
  </div>
</div>`;
};

const cargarproductos = (array) => {
  let tarjetas = "";
  if (array.length > 0) {
    array.forEach((elem) => {
      tarjetas += productos(elem);
    });
    document.querySelector("#listado").innerHTML = tarjetas;
  }
  
let carga = document.querySelectorAll(".btn");
carga.forEach((el) => {
  el.addEventListener("click", cargarCarrito);
});

};

function cargarCarrito(e) {
  if (e.target.classList.contains("btn-primary")) {
    let productoID = (e.target.getAttribute("data-id"));
    leerDatosProducto(e.target.parentElement)
}
}


//Array vacio para guardar los productos
let articulosCarrito = [];
let deJson = [];


function leerDatosProducto(producto) {
  const infoProducto = {
    titulo: producto.querySelector(".card-title").textContent,
    texto: producto.querySelector(".card-text").textContent,
    id: producto.querySelector(".btn").getAttribute("data-id"),
  };

  //Agrega elementos al carrito
  articulosCarrito = [...articulosCarrito, infoProducto];

  if (localStorage.getItem("infoProducto")) {

  //traigo la información de local storage
    articulosCarrito = JSON.parse(localStorage.getItem("infoProducto"));

  //sumo datos al array de consultas
    articulosCarrito = [...articulosCarrito, infoProducto];

  //convierto a json la info y la envio al local storage
    localStorage.setItem("infoProducto", JSON.stringify(articulosCarrito));
  } else {
  
   // genero el json de datos en local Storage
    const aJson = JSON.stringify(articulosCarrito);
    localStorage.setItem("infoProducto", aJson);
  }
  
  
  //LLamo a la funcion para mostrar los productos en el carrito

   carritoHTML();
  
}


//Mostrar los productos en el carrito
const carrito = document.querySelector("#carrito");

function carritoHTML() {
  deJson = JSON.parse(localStorage.getItem("infoProducto"));
  //Limpiar el HTML
  limpiarHTML();

  if (
    localStorage.getItem("infoProducto") &&
    localStorage.getItem("infoProducto").length > 2
  ) {

    deJson.forEach((producto) => {
    const row = document.createElement("p");
    row.innerHTML = `
    <div class="container">
    <h5>${producto.titulo}</h5>
    <p>${producto.texto}</p>
    <button class="btn btn-danger" id="${producto.id}">Eliminar</button>
    </div>
    `;
    carrito.appendChild(row);
  });
}
}

carritoHTML()

function limpiarHTML() {
  carrito.innerHTML = "";
}

carrito.addEventListener("click", eliminarProducto);

// Eliminar productos del carrito

function eliminarProducto(e) {
  articulosCarrito =  JSON.parse(localStorage.getItem("infoProducto"))
  if (e.target.classList.contains("btn-danger")) {
    let productoID = e.target.getAttribute("id");

    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoID
      
    );
    let aJson = JSON.stringify(articulosCarrito);
    localStorage.setItem("infoProducto", aJson)
    carritoHTML();
  }
  
}







