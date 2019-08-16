$(document).ready(function(){
    $('select').formSelect();   
    LeerEstado();
    LeerCategoria();
    LeerMarca();
    LeerPres();
    cargarInformacion();   
})
function LeerEstado(){
    $.ajax({
        url:'phpptc/api/productos.php?action=LeerEstado',
        type:'POST',
        data:null,
        datatype:'JSON'
    })
    .done(function(response){
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                let content = '';
                result.dataset.forEach(function (row) {
                    content += `<option value="${row.id_estado}">${row.estado}</option>`;
                });
                $('#estado').html(content);
            } else {
                $('#estado').html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
          console.log(response);
        }
    })
    .fail(function(){

    })

    var id = decodeURI(getUrlVars()["id"]);


    // var imagen = decodeURI(getUrlVars()["imagen"]);
    // var producto = decodeURI(getUrlVars()["nombre_producto"]);
    // var precio = decodeURI(getUrlVars()["precio"]);
    // var cantidad = decodeURI(getUrlVars()["cantidad"]);
    // var ingreso = decodeURI(getUrlVars()["ingreso"]);
    // var caducidad = decodeURI(getUrlVars()["caducidad"]);
    // var estado = decodeURI(getUrlVars()["estado"]);
    // var categoria = decodeURI(getUrlVars()["categoria"]);
    // var marca = decodeURI(getUrlVars()["marca"]);
    // var pres = decodeURI(getUrlVars()["pres"]);
    // $("#id").val(id);
    // $("#imagen").val(imagen);
    // $("#producto").val(producto);
    // $("#precio").val(precio);
    // $("#cantidad").val(cantidad);
    // $("#ingreso").val(ingreso);
    // $("#caducidad").val(caducidad);
    // $("#estado").val(estado);
    // $("#categoria").val(categoria);
    // $("#marca").val(marca);
    // $("#pres").val(pres);
}

function cargarInformacion() {
    var id = decodeURI(getUrlVars()["id_producto"]);
    $.ajax({
        url:'phpptc/api/productos.php?action=LeerProducto',
        type:'POST',
        data: { id_producto : id },
        datatype:'JSON'
    })
    .done(function(response){
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                console.log(result.dataset)
                let { caducidad, cantidad, id_categoria, id_estado, id_marca, id_pres, id_producto, imagen_producto
                        , ingreso, nombre_producto, precio} = result.dataset[0]

                $("#id").val(id_producto);
                $("#imagen").val(imagen_producto);
                $("#producto").val(nombre_producto);
                $("#precio").val(precio);
                $("#cantidad").val(cantidad);
                $("#ingreso").val(ingreso);
                $("#caducidad").val(caducidad);
                $("#estado").val(id_estado);
                $("#categoria").val(id_categoria);
                $("#marca").val(id_marca);
                $("#pres").val(id_pres);
            }
        } else {
          console.log(response);
        }
    })
}

function LeerCategoria(){
    $.ajax({
        url:'phpptc/api/productos.php?action=LeerCategoria',
        type:'POST',
        data:null,
        datatype:'JSON'
    })
    .done(function(response){
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                let content = '';
                result.dataset.forEach(function (row) {
                    content += `<option value="${row.id_categoria}">${row.nombre_cat}</option>`;
                });
                $('#categoria').html(content);
            } else {
                $('#categoria').html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
          console.log(response);
        }
    })
    .fail(function(){

    })
}

function LeerMarca(){
    $.ajax({
        url:'phpptc/api/productos.php?action=LeerMarca',
        type:'POST',
        data:null,
        datatype:'JSON'
    })
    .done(function(response){
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                let content = '';
                result.dataset.forEach(function (row) {
                    content += `<option value="${row.id_marca}">${row.nombre_marca}</option>`;
                });
                $('#marca').html(content);
            } else {
                $('#marca').html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
          console.log(response);
        }
    })
    .fail(function(){

    })
}

function LeerPres(){
    $.ajax({
        url:'phpptc/api/productos.php?action=LeerPres',
        type:'POST',
        data:null,
        datatype:'JSON'
    })
    .done(function(response){
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                let content = '';
                result.dataset.forEach(function (row) {
                    content += `<option value="${row.id_pres}">${row.presentacion}</option>`;
                });
                $('#presentacion').html(content);
            } else {
                $('#presentacion').html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
          console.log(response);
        }
    })
    .fail(function(){

    })
}

function insertProducto() {
    
    var imagen = $("#imagen").val();
    var producto = $("#producto").val();
    var precio = $("#precio").val();
    var cantidad = $("#cantidad").val();
    var ingreso = $("#ingreso").val();
    var caducidad = $("#caducidad").val();
    var estado = $("#estado").val();
    var categoria = $("#categoria").val();
    var marca = $("#marca").val();
    var pres = $("#pres").val();    

    if ($.trim(imagen).length > 0 && $.trim(producto).length > 0 && $.trim(precio).length > 0 && $.trim(cantidad).length > 0 && $.trim(ingreso).length > 0 && $.trim(caducidad).length > 0 && $.trim(estado).length > 0 && $.trim(categoria).length > 0 && $.trim(marca).length > 0) {        
        var dataString = "imagen=" + imagen + "&producto=" + producto + "&precio=" + precio + "&cantidad=" + cantidad + "&ingreso=" + ingreso + "&caducidad=" + caducidad + "&estado=" + estado + "&categoria=" + categoria + "&marca=" + marca + "&pres=" + pres +"&insert=true";
        $.ajax({
            type: "POST",
            url: "phpptc/insert.php",
            data: dataString,
            crossDomain: false,
            cache: false,
            beforeSend: function() {
                $("#insert").val('Connecting...');
            },
            success: function(data) {
                if (data == "success") {
                    alert("inserted");
                } else if (data == "error") {
                    alert("error");
                }
            }
        });            
    }else{
        console.log(response);
        alert("Error en los datos");
    }
}

function DeleteProducto() {
    var id = $("#id").val();
    $.ajax({
        url:'phpptc/delete.php',
        type:'POST',
        data: { id },
        datatype:'JSON', 
        crossDomain: true,
        cache: false,
    })
    .done(function(response){
        location.href ='productos.html'
    })
}

function UpDeProducto() {
    console.log('entra a la funcion')
        var id = $("#id").val();
        var imagen = $("#imagen").val();
        var producto = $("#producto").val();
        var precio = $("#precio").val();
        var cantidad = $("#cantidad").val();
        var ingreso = $("#ingreso").val();
        var caducidad = $("#caducidad").val();
        var estado = $("#estado").val();
        var categoria = $("#categoria").val();
        var marca = $("#marca").val();
        var pres = $("#presentacion").val();  

        $.ajax({
            url:'phpptc/update.php',
            type:'POST',
            data: { id, imagen, producto, precio, cantidad, ingreso, caducidad, estado, categoria, marca, pres},
            datatype:'JSON', 
            crossDomain: true,
            cache: false,
        })
        .done(function(response){
            location.href='productos.html'
        })
};