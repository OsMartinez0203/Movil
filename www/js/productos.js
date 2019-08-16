$(document).ready(function(){
    LeerUsuario('','');
    LeerEstado('','');
})
function LeerUsuario(value){
    $.ajax({
        url:'phpptc/api/productos.php?action=LeerProductos',
        type:'POST',
        data:null,
        datatype:'JSON'
    })
    .done(function(response){
        if (IsJSONString(response)) {
            const result = JSON.parse(response);
            //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                let content = '';
                result.dataset.forEach(function (row) {
                    content += `<option value="${row.id_categoria}">${row.nombre_cat}</option>`;
                });
                $('#usuario').html(content);
            } else {
                $('#usuario').html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
          console.log(response);
        }
    })
    .fail(function(){

    })
}