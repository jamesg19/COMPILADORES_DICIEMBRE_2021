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
principa.ejecutar('int a  ;' +
    'struct miStruct{int a,int c};' +
    'println((true || false ));');
//principa.ejecutar ('println((true && true) && (true && true));');
