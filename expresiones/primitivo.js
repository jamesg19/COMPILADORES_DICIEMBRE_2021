"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const tipo_1 = require("../table/tipo");
const nodo_1 = require("../abs/nodo");
const util_1 = require("util");
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
        if ((0, util_1.isNumber)(this.value))
            this.tipo = tipo_1.TIPO.DECIMAL;
        let codigo = this.value;
        return codigo;
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
