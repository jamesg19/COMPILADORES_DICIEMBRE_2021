const Traducir = require("./traduccion.js");
const Principal = require("./principal.js");

let consola = "";
const principall = "";
let dotGlobal = "";
if (typeof window !== 'undefined') {
    window.parseExternal = function(code) {
        const prin = new Principal.Principal();

        //ANALIZA EL CODIGO RECIBIDO
        prin.ejecutar(code);
        //ESTABLACE EL VALOR DE LA CONSOLA A consola
        consola = prin.getConsola();
        //obtiene codigo html para mostrar tabla de errores
        let codeTableError = prin.getErrores();
        let tablaSimboloss = prin.graficarTS();
        //grafica el AST DEL codigo ingresado
        let dotAst = prin.graficarAST();
        //obtiene el reporte de la gramatica
        let grammarReport = prin.getReporteGramatical();
        console.log(codeTableError);
        document.getElementById("tablaerror").innerHTML = " ";
        $('#tablaerror').append(codeTableError);

        document.getElementById("tablasimbolos").innerHTML = " ";
        $('#tablasimbolos').append(tablaSimboloss);

        document.getElementById("gramatica").innerHTML = " ";
        $('#gramatica').append(grammarReport);

        document.getElementById("ast").innerHTML = " ";
        dotGlobal = dotAst;
        //$('#ast').append(codigoAST);






    }
}


//funciona para obtener el valor de la consola
if (typeof window !== 'undefined') {
    window.actualizarConsola = function() {

        return consola;

    }
}

//Funcion que devuelve el codigo Dot para AST
if (typeof window !== 'undefined') {
    window.getDotAST = function() {

        return dotGlobal;

    }
}

if (typeof window !== 'undefined') {
    window.parseTraducir = function(code) {
        const traslate = new Traducir.Traducir();
        //ANALIZA EL CODIGO RECIBIDO

        consola = traslate.traducir(code);

    }
}