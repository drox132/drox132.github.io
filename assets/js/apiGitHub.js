window.onload =iniciar;
function iniciar(){

    var buscarInfo = document.getElementById('buscar-info');
    buscarInfo.addEventListener("click",(evento)=>{
        evento.preventDefault(); // evita que se afecte la pagia
        buscarinformacion();
        //otraFuncion();
    });

}
function buscarinformacion(){

    fetch('https://github.com/drox132?tab=repositories' ,{  mode: 'no-cors'
        })
        .then(respuesta =>{
             return respuesta.text();
        })
        .then(texto =>{

            const coincidencias = texto.match(/<html\b[^>]*>([\s\S]*?)<\/html>/);
            console.log(texto);
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

    function otraFuncion(){
        
        fetch("https://github.com/drox132?tab=repositories", {
            headers: {
              "accept": "text/html, application/xhtml+xml",
              "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
              "if-none-match": "W/\"1607bc8d03b38adcc87084541094ec8b\"",
              "sec-ch-ua": "\"Microsoft Edge\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "turbo-visit": "true"
            },
            referrer: "https://github.com/drox132?tab=repositories",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "no-cors",
            credentials: "include"
          })
          .then(resp=>resp.text())
          .then(texto => console.log(texto))
    }
