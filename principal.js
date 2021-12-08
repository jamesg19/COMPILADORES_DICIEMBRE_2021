"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Principal = void 0;
const arbol_1 = require("./table/arbol");
const tablasimbolos_1 = require("./table/tablasimbolos");
const funcion_1 = require("./instruccion/funcion");
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
            if (element instanceof funcion_1.Funcion) {
                ast.funciones.push(element);
            }
            else
                element.interpretar(ts_global, ast);
        });
    }
}
exports.Principal = Principal;

