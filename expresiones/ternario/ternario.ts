import { Instruccion } from "../../abs/Instruccion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { NodoAST } from "../../abs/nodo";

export class Ternario extends Instruccion {
  condicion: Instruccion;
  exp_true: Instruccion;
  exp_false: Instruccion;
  /**
   * @param  {Instruccion} condicion
   * @param  {Instruccion} exp_true
   * @param  {Instruccion} exp_false
   * @param  {number} fila
   * @param  {number} columna
   * @returns number
   */
  constructor(
    condicion: Instruccion,
    exp_true: Instruccion,
    exp_false: Instruccion,
    fila: number,
    columna: number
  ) {
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
  interpretar(e: TablaSimbolos, arbol: Arbol) {
    return this.condicion.interpretar(e, arbol)
      ? this.exp_true.interpretar(e, arbol)
      : this.exp_false.interpretar(e, arbol);
  }

  getNodo() {
      const nodo=new NodoAST("TERNARIO");
      nodo.agregarHijo(this.condicion.getNodo());
      return nodo;
  }
}
