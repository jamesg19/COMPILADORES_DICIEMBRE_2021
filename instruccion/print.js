"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
class Print {
    constructor(fila, columna, value) {
        //super(fila,columna);
        this.fila = fila;
        this.columna = columna;
        this.expresion = value;
        this.struct = false;
        this.arra = false;
    }
    interpretar(entorno, arbol) {
        //let value = this.expresion.interpretar(entorno,arbol);
        //if( value instanceof Excepcion){
        //  return value;            
        //}  
        console.log("Interpretar println");
        //console.log(value);
    }
}
exports.Print = Print;
