window.onload =iniciar;
function iniciar(){

    function buscarinformacion(){

    fetch('https://github.com/drox132?tab=repositories')
        .then(respuesta =>{
            return respuesta.text();
        })
        .then(texto =>{

            const coincidencias = texto.match(/<html\b[^>]*>([\s\S]*?)<\/html>/);
           
            //esto trae dos coincidencias la 1 no se porque no considera la etiqueta html 
            if (coincidencias) {
            var nuevoContenidoHtml = coincidencias[0];
            //console.log(nuevoContenidoHtml);
            } else {
            console.log('No se encontró contenido HTML');
            }

            //para poder reescribir el archivo html  por el que me da GIThub
            //console.log(texto);
            const contenidoHtmlActual = document.getElementById('html').outerHTML.toString();
                 const coincidenciashtmlactual = contenidoHtmlActual.match(/<html\b[^>]*>([\s\S]*?)<\/html>/);

                if (coincidenciashtmlactual) {
                    var contenidoActualHTMLactual = coincidenciashtmlactual[0];
                    //console.log(contenidoActualHTMLactual);
                    var nuevoContenidoHTMLactual = contenidoHtmlActual.replace(contenidoActualHTMLactual,nuevoContenidoHtml);
                    //console.log(nuevoContenidoHTMLactual);
                    } else {
                    console.log('No se encontró contenido HTML');
                }
                let tagHtmlActual = document.getElementById('html');
                tagHtmlActual.innerHTML = nuevoContenidoHTMLactual;
                
               
            });
    }

    var buscarInfo = document.getElementById('buscar-info');
    buscarInfo.addEventListener("click",(evento)=>{
        evento.preventDefault(); // evita que se afecte la pagia
        buscarinformacion();
    })

}


