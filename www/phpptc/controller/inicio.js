$(document).ready(function()
{
    // Se muestra un gráfico
    // graficoCategorias();
    // graficoApartados();
    // graficoEstado();
    fechaLinea();
    // graficoMarca();
    // ProductoApartado();
    // showSelectCategorias('id_categoria', 0);
})

// Constante para establecer la ruta y parámetros de comunicación con la API
const api = '../api/productos.php?action=';
const apires = '../api/reservas.php?action=';

// Función para graficar la cantidad de productos por categoría
function graficoCategorias()
{
    $.ajax({
        url: api + 'cantidadProductosCategoria',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let categorias = [];
                let cantidad = [];
                result.dataset.forEach(function(row){
                    categorias.push(row.nombre_cat);
                    cantidad.push(row.cantidad);
                });
                barGraph('chart', categorias, cantidad, 'Cantidad de productos', 'Cantidad de productos por categoría')
            } else {
                $('#chart').remove();
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

//Función para cargar las caterias en el select del formulario
function showSelectCategorias(idSelect, value)
{
    $.ajax({
        url: api + 'readCategorias',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        //Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                let content = '';
                if (!value) {
                    content += '<option value="" disabled selected>Seleccione una opción</option>';
                }
                result.dataset.forEach(function(row){
                    if (row.id_categoria != value) {
                        content += `<option value="${row.id_categoria}">${row.nombre_cat}</option>`;
                    } else {
                        content += `<option value="${row.id_categoria}" selected>${row.nombre_cat}</option>`;
                    }
                });
                $('#' + idSelect).html(content);
            } else {
                $('#' + idSelect).html('<option value="">No hay opciones</option>');
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        //Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

function CategoriaClick()
{
    //esto es lo que sirve para jalar los datos del combobox (ahi despues cambias el comentario)
    let id_categoria = parseInt($('#id_categoria').val())
    $.ajax({
        url: api + 'grafica_categoria',
        type: 'post',
        data: { id_categoria },
        cache: false,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let nombres = [];
                let dinero = [];
                result.dataset.forEach(function(row){
                    nombres.push(row.nombre_producto);
                    dinero.push(row.precio);
                });
                barGraph3('grafica_categoria_productos', nombres, dinero, 'Platillos más vendidos por categoria', 'Cantidad de platillos más vendidos por categoria')
               //se deshabilitan tanto el boton como el comobobox para que no genere más de una grafica 
                document.getElementById('boton_bloqueo').disabled=true;
                document.getElementById('id_categoria').disabled=true;
            }
            
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    }); 
}


function graficoApartados()
{
    $.ajax({
        url: apires + 'cantidadApartadoCliente',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba que no hay usuarios registrados para redireccionar al registro del primer usuario
            if (result.status) {
                let cliente = [];
                let cantidad = [];
                //se recorren todas las filas de la base y se aplica el campo de la base en el campo usando la funcion push
                result.dataset.forEach(function(row){
                    cliente.push(row.nombre_cliente);
                    cantidad.push(row.cantidad);
                });
                //arreglo para elegir el color
                let color = [];
                for (i = 0; i < cantidad.length; i++) {
                    color.push('#' + (Math.random().toString(16)).substring(2, 8));
                }
                //se llamada el canvas a utilizar por medio del ID
                const context = $('#dona');
                const chart = new Chart(context, {
                    //se dan los valores a mostrar en grafico
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            label: 'Venta',
                            data: cantidad,
                            backgroundColor: color,
                            borderColor: color,
                            borderWidth: 1,
                            hoverBackgroundColor: '#fff',
                            hoverborderColor: '#fff',
                            hoverborderWidth: 20,
                        }],
                        labels: cliente,
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'APARTADOS POR CLIENTE'
                        }
                    }
                });
            } else {
                $('#dona').remove();
            }
        } else {
            console.log(response);            
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

function ProductoApartado()
{
    let fecha1 = $('#fecha1').val()
    let fecha2 = $('#fecha2').val()
    const data = { fecha1, fecha2 }
    $.ajax({
        url: api + 'ProductoApartado',
        type: 'post',
        data,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let producto = [];
                let apartado = [];
                result.dataset.forEach(function(row){
                    producto.push(row.nombre_producto);
                    apartado.push(row.apartado);
                });
                grafiLinea('productoa', producto, apartado, 'Cantidad de productos', 'Cantidad de productos reservados por fecha')
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    }); 
}

// Función para graficar la cantidad de productos por categoría
function graficoEstado()
{
    $.ajax({
        url: api + 'estadoProducto',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let estado = [];
                let cantidad = [];
                result.dataset.forEach(function(row){
                    estado.push(row.estado);
                    cantidad.push(row.cantidad);
                });
                barGraph2('estado', estado, cantidad, 'Estados de producto', 'Estados de productos')
            } else {
                $('#estado').remove();
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

function fechaLinea()
{
    $.ajax({
        url: api + 'fechaLinea',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let cantidad = [];
                let fechas = [];
                result.dataset.forEach(function(row){
                    cantidad.push(row.cantidad);
                    fechas.push(row.fecha_reserva);
                });
                grafiLinea('lineal', fechas , cantidad, 'Cantidad de productos', 'Cantidad de productos por fecha de apartado');
            } else {
                $('#lineal').remove();
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}


function graficoMarca()
{
    $.ajax({
        url: api + 'cantidadProductoMarca',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba que no hay usuarios registrados para redireccionar al registro del primer usuario
            if (result.status) {
                let marca = [];
                let cantidad = [];
                //se recorren todas las filas de la base y se aplica el campo de la base en el campo usando la funcion push
                result.dataset.forEach(function(row){
                    marca.push(row.nombre_marca);
                    cantidad.push(row.cantidad);
                });
                //arreglo para elegir el color
                let color = [];
                for (i = 0; i < cantidad.length; i++) {
                    color.push('#' + (Math.random().toString(16)).substring(2, 8));
                }
                //se llamada el canvas a utilizar por medio del ID
                const context = $('#dona2');
                const chart = new Chart(context, {
                    //se dan los valores a mostrar en grafico
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            label: 'Venta',
                            data: cantidad,
                            backgroundColor: color,
                            borderColor: color,
                            borderWidth: 1,
                            hoverBackgroundColor: '#fff',
                            hoverborderColor: '#fff',
                            hoverborderWidth: 20,
                        }],
                        labels: marca,
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Marcas por producto'
                        }
                    }
                });
            } else {
                $('#dona2').remove();
            }
        } else {
            console.log(response);            
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}