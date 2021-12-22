"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const tipo_1 = require("../table/tipo");
const nodo_1 = require("../abs/nodo");
const util_1 = require("util");
const principal_1 = require("../principal");
class Primitivo extends Instruccion_1.Instruccion {
    /**
     * @param  {TIPO} tipo
     * @param  {any} value
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor(tipo, value, fila, columna) {
        super(fila, columna);
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.value = value;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     */
    interpretar(entorno, arbol) {
        //console.log(this.value);
        if (this.tipo == tipo_1.TIPO.ENTERO || this.tipo == tipo_1.TIPO.DECIMAL) {
            return this.value;
        }
        if (this.tipo == tipo_1.TIPO.CADENA) {
            return this.value.replace('\\n', '\n');
        }
        return this.value;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("PRIMITIVO");
        nodo.agregarHijo(this.value);
        return nodo;
    }
    traducir(entorno, arbol) {
        // let temp:string = "t"
        // let temp += super.temp;
        let codigo;
        if ((0, util_1.isNumber)(this.value))
            this.tipo = tipo_1.TIPO.DECIMAL;
        codigo = this.value;
        if (this.tipo == tipo_1.TIPO.BOOLEAN)
            return (this.value) ? 1 : 0;
        if (this.tipo == tipo_1.TIPO.CADENA) {
            codigo = this.transform_cadena(this.value);
        }
        return codigo;
    }
    /**
     * @param  {string} x
     * @param  {Arbol} arbol
     * @returns string
     * cuando se tratan de constantes se usa la posicion actual libre como referencia
     * se devuelve el temporal que tiene la referencia hacia el heap
     * todas las cadenas se pasan al heap
     */
    transform_cadena(x) {
        let return_string = "";
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        return_string = t + " = H;\n"; //Asigno la referencia del heap al temporal
        principal_1.Principal.temp = temp;
        principal_1.Principal.addComentario("Pasando cadena al heap , '" + x + "'");
        if (!x)
            x = "Undefined";
        for (let i = 0; i < x.length; i++) {
            let item = x.charCodeAt(i);
            return_string += "heap[(int)H] = " + item + " ;\n";
            return_string += "H = H + 1;\n";
            //console.log(item);
        }
        return_string += "heap[(int)H] = -1 ;\n";
        return_string += "H = H + 1;\n";
        //referencia de la cadena desde el stack
        //Principal.posicion;
        let temp2 = principal_1.Principal.posicion + 1 + "";
        return_string += "stack[(int)" + (temp2) + "] = " + t + ";\n";
        principal_1.Principal.historial += return_string;
        principal_1.Principal.addComentario("Fin de pasar cadena al heap");
        //"t" + Principal.temp + " = P + " + Principal.posicion + ";\n";
        return temp2;
    }
}
exports.Primitivo = Primitivo;
// def traducir(self,ent,arbol):
//         resultado3D = Resultado3D()
//         resultado3D.codigo3D = ""
//         if isinstance(self.valor, str):
//             resultado3D.tipo = Tipo.CHAR
//         elif isinstance(self.valor, int):
//             resultado3D.tipo = Tipo.ENTERO
//         elif isinstance(self.valor, float):
//             resultado3D.tipo = Tipo.FLOAT
//         if(resultado3D.tipo == Tipo.CHAR):
//             resultado3D.temporal = Temporal("\""+self.valor+"\"")
//         else:
//             resultado3D.temporal = Temporal(str(self.valor))
//         return resultado3D
