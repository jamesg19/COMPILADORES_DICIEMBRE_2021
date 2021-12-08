"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Principal = void 0;
const arbol_1 = require("./table/arbol");
const tablasimbolos_1 = require("./table/tablasimbolos");
const Parser = require('./analizador/analizador');
class Principal {
    ejecutar(code) {
        const instrucciones = Parser.parse(code);
        //tabla
        let ts_global = new tablasimbolos_1.TablaSimbolos(undefined);
        //ast
        const ast = new arbol_1.Arbol(ts_global, instrucciones);
        //interpreto
        instrucciones.forEach((element) => {
            element.interpretar(ts_global, ast);
        });
    }
}
exports.Principal = Principal;
let principa = new Principal();
principa.ejecutar('println(6>5);   '
    + 'if(1>5){'
    + 'println("entra if6>5");'
    + '} '
    + 'else if(5>5){'
    + 'println("entra else if 7>5 ");'
    + '} '
    + 'else if(8>5){'
    + 'println("entra else if 8>5 ");'
    + '} '
    + 'else { println("entra AL FALSE");  } '
    + 'println(true);'
    + 'switch ("5+6"){'
    + 'case "5+6":'
    + 'println("ENTRA A SWITCH1");'
    + ''
    + 'case "5+6":'
    + 'println("ENTRA A SWITCH2");'
    + 'break;'
    + 'default:'
    + ' println("ENTRA A DEFAULT");'
    + '}'
    + '');
//principa.ejecutar ('println((true && true) && (true && true));');
