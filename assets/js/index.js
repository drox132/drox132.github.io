window.onload=iniciar;
function iniciar (){
    var comentarios =[];

    listarComentarios();

    var form = document.getElementById('form');
    form.addEventListener('submit', (evento)=>{
            evento.preventDefault();
            var txtInputName = document.getElementById('name').value;
            var txtInputEmail = document.getElementById('email').value;
            var txtInputMessage = document.getElementById('message').value;

            if(validarFormulario(txtInputName,txtInputEmail,txtInputMessage)){
                comentarios.push(enviarDatos(txtInputName,txtInputEmail,txtInputMessage));
                var comentariosJson = JSON.stringify(comentarios);
                localStorage.setItem('comentarios', comentariosJson);
                listarComentarios()
            }else{
                alert ('El formulario no cumple las validaciones para ser enviado');
                return
            }
            
            
        })

    
    
}
///////////////////////////////////////////////////////////////////////////////////////////
function listarComentarios(){
    var comentariosAlmacenados = JSON.parse(localStorage.getItem('comentarios'));

    console.log(comentariosAlmacenados);
    var divContenedor= document.getElementById('divContenedor');

        divContenedor.style.maxHeight ='400px'; /* establece el ancho máximo del div */
        divContenedor.style.overflow='auto'; /* agrega barras de desplazamiento si es necesario */
        divContenedor.style.overflowY ='autox';       /* agrega barras de desplazamiento solo verticalmente si es necesario */  
            
              
              
              
    

    
     comentariosAlmacenados.forEach(element => {
        var nodoHjo= document.createElement('p');
         var html = `
         <p>Nombre : ${element.Nombre} Email : ${element.Email}<br>
         Mensaje : ${element.Mensaje}</p><hr>
         `  
         nodoHjo.innerHTML=html;
         divContenedor.appendChild(nodoHjo);

    }); 
}
////////////////////////////////////////////////////////////////////////////////////////////
function validarFormulario(nombre, email, mensaje){

    //validamos el campo del nombre 
    var regexNombre = /^\D+$/;
    if (!regexNombre.test(nombre)||nombre.trim()==='') {
        let spanName = document.getElementById('spanName');
        spanName.innerText = 'Campo Incorrecto';
        spanName.style.color='red';
        let inputName = document.getElementById('name');
        inputName.style.border='1px solid red';
        return false
    } else {
        let spanName = document.getElementById('spanName');
        spanName.innerText = 'Campo Correcto';
        spanName.style.color='green' ;
        let inputName = document.getElementById('name');
        inputName.style.border='1px solid green';
        
    }
    //validamos en campo de mensaje no venga vacio
    let regexMensaje = /^\w*/;
     if (mensaje.trim()===''|| !regexMensaje.test(mensaje)) {
        let spanMessage = document.getElementById('spanMessage');
        spanMessage.innerText = 'Campo Incorrecto';
        spanMessage.style.color='red';
        let inputMessage = document.getElementById('message');
        inputMessage.style.border='1px solid red';
        return false
    }else{
        let spanMessage = document.getElementById('spanMessage');
        spanMessage.innerText = 'Campo Correcto';
        spanMessage.style.color='green';
        let inputMessage = document.getElementById('message');
        inputMessage.style.border='1px solid green';
        
    } 
    //validamos el campo del correo electronico

    let regexEmail =/^([a-zA-Z0-9._%+-\?!]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;

    if (!regexEmail.test(email)|| email.trim()==='') {
        let spanEmail = document.getElementById('spanEmail');
        spanEmail.innerText = 'Campo Incorrecto';
        spanEmail.style.color='red';
        let inputEmail = document.getElementById('email');
        inputEmail.style.border='1px solid red';
        return false
    } else {
        let spanEmail = document.getElementById('spanEmail');
        spanEmail.innerText = 'Campo Correcto';
        spanEmail.style.color='green';
        let inputEmail = document.getElementById('email');
        inputEmail.style.border='1px solid green';
    } 
    return true;
}
////////////////////////////////////////////////////////////////////////////////////////

function enviarDatos(nombre,email,mensaje){
    let inputName = document.getElementById('name');
    inputName.value='';
    let inputMessage = document.getElementById('message');
    inputMessage.value='';
    let inputEmail = document.getElementById('email');
    inputEmail.value='';
    let spanName = document.getElementById('spanName');
    spanName.innerText='';
    let spanMessage = document.getElementById('spanMessage');
    spanMessage.innerText='';
    let spanEmail = document.getElementById('spanEmail');
    spanEmail.innerText='';

    return {'Nombre' : nombre,  'Email' : email , 'Mensaje': mensaje};

}
