$(document).ready(function() {
    setTimeout(function() {
        $(".loader").fadeOut(1500);
    },1000);

    setTimeout(function() {
        $(".content2").fadeIn(1500);
    },2000);
});


const productos = [
    {
      tienda: 'buguerking',
      comida: [      
        {id: 1, nombre: "Whopper Doble con Queso", precio: 2950},
        {id: 2, nombre: "Cheese Onion Doble", precio: 3500},
        {id: 3, nombre: "Stacker Doble", precio: 4320},
        {id: 4, nombre: "Stacker Cuadruple", precio: 5300},
        {id: 5, nombre: "Provo King Doble Carne", precio: 6000},
        {id: 6, nombre: "Whopper Guacamole", precio: 2005},
        {id: 7, nombre: "Doble Cuarto XL", precio: 2544},
        {id: 8, nombre: "Stacker Triple", precio: 2555},
        {id: 9, nombre: "Stacker Quintuple", precio: 5420},
        {id: 10, nombre: "Stacker XL Triple", precio: 4930}]
    },
    {
      tienda: 'kfc',
      comida: [      
        {id: 1, nombre: "Bucket de 8 piezas", precio: 2950},
        {id: 2, nombre: "Bucket de 12 Piezas", precio: 3500},
        {id: 3, nombre: "Big Box Discovery", precio: 4320},
        {id: 4, nombre: "Big Box Americana", precio: 5300},
        {id: 5, nombre: "Gran BBQ Bacon", precio: 6000},
        {id: 6, nombre: "Whopper Guacamole", precio: 2005},
        {id: 7, nombre: "Doble Cuarto XL", precio: 2544},
        {id: 8, nombre: "Big Box 5 en 1", precio: 2555},
        {id: 9, nombre: "Duo Box Recargado", precio: 5420},
        {id: 10, nombre: "Supercrunch", precio: 4930}]
    },
    {
        tienda: 'wendys',
        comida: [      
          {id: 1, nombre: "Baconator", precio: 2950},
          {id: 2, nombre: "Daves Simple", precio: 3500},
          {id: 3, nombre: "Chicken Club", precio: 4320},
          {id: 4, nombre: "Papas fritas con cheddar y bacon", precio: 5300},
          {id: 5, nombre: "Papa horneada con chedar y chili", precio: 6000},
          {id: 6, nombre: "Cheddar Lovers", precio: 2005},
          {id: 7, nombre: "Daves Doble", precio: 2544},
          {id: 8, nombre: "Homestyle", precio: 2555},
          {id: 9, nombre: "Papas fritas", precio: 5420},
          {id: 10, nombre: "Papa horneada con bacon", precio: 4930}]
      }
]

const paginaActual = window.location.href;

const classCheckboxes = document.querySelectorAll('.checkbox-restaurantes');
const contenedorNombres = document.getElementById("textCompra");
const h3preciototal = document.getElementById("h3preciototal");

classCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
    actualizar();
    actualizarPrecioTotal();
    guardarStorage();
    }); 
    });

    function actualizar() {
    const nombresSeleccionados = [];
    classCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
        const idBuscado = parseInt(checkbox.value);
        const nombreEncontrado = buscarNombre(idBuscado);
        nombresSeleccionados.push(nombreEncontrado);
    }
    });
    contenedorNombres.textContent = nombresSeleccionados.join(', ');
}

if (paginaActual.includes('burgerking.html')) {
    function actualizarPrecioTotal() {
        let precioTotal = 0;

        classCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
        const idBuscado = parseInt(checkbox.value);
        const elementoEncontrado = productos[0].comida.find(item => item.id === idBuscado);
            if (elementoEncontrado) {
                precioTotal += elementoEncontrado.precio;
            }
        }
        });

        h3preciototal.textContent = '$'+precioTotal
    }
    function buscarNombre(idBuscado) {
        for (let i = 0; i < productos[0].comida.length; i++) {
            if (productos[0].comida[i].id === idBuscado) {
                return productos[0].comida[i].nombre;
            }
        }
    }
} else if (paginaActual.includes('kfc.html')) {
    function actualizarPrecioTotal() {
        let precioTotal = 0;

        classCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
        const idBuscado = parseInt(checkbox.value);
        const elementoEncontrado = productos[1].comida.find(item => item.id === idBuscado);
            if (elementoEncontrado) {
                precioTotal += elementoEncontrado.precio;
            }
        }
        });

        h3preciototal.textContent = '$'+precioTotal
    }
    function buscarNombre(idBuscado) {
        for (let i = 0; i < productos[1].comida.length; i++) {
            if (productos[1].comida[i].id === idBuscado) {
                return productos[1].comida[i].nombre;
            }
        }
    }
} else if (paginaActual.includes('wendys.html')) {
    function actualizarPrecioTotal() {
        let precioTotal = 0;

        classCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
        const idBuscado = parseInt(checkbox.value);
        const elementoEncontrado = productos[2].comida.find(item => item.id === idBuscado);
            if (elementoEncontrado) {
                precioTotal += elementoEncontrado.precio;
            }
        }
        });

        h3preciototal.textContent = '$'+precioTotal
    }
    function buscarNombre(idBuscado) {
        for (let i = 0; i < productos[2].comida.length; i++) {
            if (productos[2].comida[i].id === idBuscado) {
                return productos[2].comida[i].nombre;
            }
        }
    }
}

function guardarStorage() {
    const seleccion = [];
    classCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
        seleccion.push(checkbox.value);
    }
    });
    localStorage.setItem('selecctorCheckbox', JSON.stringify(seleccion));
    }

    function cargarLocalStorage() {
    const seleccionGuardada = localStorage.getItem('selecctorCheckbox');
    if (seleccionGuardada) {
    const seleccion = JSON.parse(seleccionGuardada);
    classCheckboxes.forEach(checkbox => {
        checkbox.checked = seleccion.includes(checkbox.value);
    });
    actualizarPrecioTotal();
    actualizar();
    }
    }


function desmarcartodo(){
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: '¿Está seguro?',
  text: "Se desmarcaran todas tus selecciones",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, estoy seguro',
  cancelButtonText: 'No, cancelalo',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    classCheckboxes.forEach(checkbox => {
    checkbox.checked = false});
    actualizar();
    actualizarPrecioTotal();
    guardarStorage()

    swalWithBootstrapButtons.fire(
      'Desmarcados',
      'Sus selecciones fueron eliminadas',
      'success'
    )

  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelado',
      'Tus selecciones estan salvados',
      'error'
    )
  }
})
}






cargarLocalStorage();



