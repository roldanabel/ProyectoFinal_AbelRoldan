//variables con elemento del DOM

let nombreForm = document.querySelector("#nombre")
let apellidoForm = document.querySelector("#apellido")
let correoForm = document.querySelector("#correo")

//eventos

nombreForm.addEventListener("input" , function () {
  if (nombreForm.value === "") {
    Toastify({
      text: "Ingrese un nombre válido",
      className: "info",
      style: {
        background: "linear-gradient(to right, #FF0000, #DC143C)",
      }
    }).showToast();
    
  }
}); 

apellidoForm.addEventListener("input" , function () {
  if (apellidoForm.value === "") {
    Toastify({
      text: "Ingrese un apellido válido",
      className: "info",
      style: {
        background: "linear-gradient(to right, #FF0000, #DC143C)",
      }
    }).showToast();
      }
}); 

correoForm.addEventListener("input" , function () {
  if (correoForm.value === "") {
    Toastify({
      text: "Ingrese un correo real",
      className: "info",
      style: {
        background: "linear-gradient(to right, #FF0000, #DC143C)",
      }
    }).showToast();

  }

    
}); 

let formulario = document.querySelector("#formulario");
let info = document.querySelector(".info");

// mostrar info del form en el DOM

const mostrarInfo = formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  info.innerHTML=`
  <div class="alert alert-warning" role="alert">
  <h5> mucha gracias ${nombreForm.value} por tu consulta</h5></div>`

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Formulario enviado',
    showConfirmButton: false,
    timer: 1500
  })
  
});
