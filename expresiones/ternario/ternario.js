"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Ternario extends Instruccion_1.Instruccion {
    /**
     * @param  {Instruccion} condicion
     * @param  {Instruccion} exp_true
     * @param  {Instruccion} exp_false
     * @param  {number} fila
     * @param  {number} columna
     * @returns number
     */
    constructor(condicion, exp_true, exp_false, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.exp_true = exp_true;
        this.exp_false = exp_false;
        Object.assign(this, { condicion, exp_true, exp_false });
    }
    /**
     * @param  {TablaSimbolos} e
     * @param  {Arbol} arbol
     */
    interpretar(e, arbol) {
        return this.condicion.interpretar(e, arbol)
            ? this.exp_true.interpretar(e, arbol)
            : this.exp_false.interpretar(e, arbol);
    }
    traducir(e, arbol) {
        let x = this.condicion.traducir(e, arbol);
        let val1 = this.exp_true.traducir(e, arbol);
        let val2 = this.exp_false.traducir(e, arbol);
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        principal_1.Principal.addComentario(" Expresion Ternaria ");
        let lab = principal_1.Principal.etiqueta;
        lab++;
        let l_verdadero = "L" + lab;
        lab++;
        let l_falso = "L" + lab;
        lab++;
        let l_salida = "L" + lab;
        principal_1.Principal.historial += "if (" + x + ") goto " + l_verdadero + ";\n";
        principal_1.Principal.historial += "goto " + l_falso + ";\n";
        principal_1.Principal.historial += l_verdadero + ":\n";
        principal_1.Principal.historial += t + " = " + val1 + ";\n";
        principal_1.Principal.historial += "goto " + l_salida + ";\n";
        principal_1.Principal.historial += l_falso + ":\n";
        principal_1.Principal.historial += t + " = " + val2 + ";\n";
        principal_1.Principal.historial += "goto " + l_salida + ";\n";
        principal_1.Principal.historial += l_salida + ":";
        principal_1.Principal.temp = temp;
        principal_1.Principal.etiqueta = lab;
        return t;
        // goto L0;
        // L0:
        // t0 = 1;
        // goto L2;
        // L1:
        // t0 = 2;
        // L2:
        // stack[(int)0] = t0;
        return "tenario en desarrollo";
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("TERNARIO");
        nodo.agregarHijo(this.condicion.getNodo());
        return nodo;
    }
}
exports.Ternario = Ternario;
