$(document).ready(function(){
    $('select').formSelect();
    LeerCliente();
    LeerProducto();
})
function LeerCliente(){
    $.ajax({
        url:'phpptc/api/reservas.php?action=LeerCliente',
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
                    content += `<option value="${row.id_cliente}">${row.nombre_cliente}</option>`;
                });
                $('#cliente').html(content);
            } else {
                $('#cliente').html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
          console.log(response);
        }
    })
    .fail(function(){

    })
}

function LeerProducto(){
    $.ajax({
        url:'phpptc/api/reservas.php?action=LeerProducto',
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
                    content += `<option value="${row.id_producto}">${row.nombre_producto}</option>`;
                });
                $('#producto').html(content);
            } else {
                $('#producto').html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
          console.log(response);
        }
    })
    .fail(function(){

    })
}

function insertReserva() {
    
    var fecha = $("#fecha").val();
    var cliente = $("#cliente").val();
    var producto = $("#producto").val();
    var cantidad = $("#cantidad").val();

    if ($.trim(fecha).length > 0 && $.trim(cliente).length > 0 && $.trim(producto).length > 0 && $.trim(cantidad).length > 0) {        
        var dataString = "fecha=" + fecha + "&cliente=" + cliente + "&producto=" + producto + "&cantidad=" + cantidad +"&insert=true";
        $.ajax({
            type: "POST",
            url: "phpptc/insertres.php",
            data: dataString,
            crossDomain: false,
            cache: false,
            beforeSend: function() {
                $("#insert").val('Connecting...');
            },
            success: function(data) {
                if (data == "success") {
                    alert("inserted");
                    //$("#insert").val('submit');
                } else if (data == "error") {
                    alert("error");
                }
            }
        });
    }else{
        alert("Error en los datos, campos vacios");
    }
}           