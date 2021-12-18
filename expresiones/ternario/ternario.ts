import { Instruccion } from "../../abs/Instruccion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { NodoAST } from "../../abs/nodo";
import { Principal } from '../../principal';

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
  traducir(e: TablaSimbolos, arbol: Arbol) {
    
    let x = this.condicion.traducir(e,arbol);
    let val1 = this.exp_true.traducir(e, arbol);
    let val2 = this.exp_false.traducir(e, arbol);
    
    let temp = Principal.temp;
    
    temp ++;
    let t:string = "t"+temp;
    
    Principal.addComentario(" Expresion Ternaria ");
    
    let lab = Principal.etiqueta;
    lab++;
    let l_verdadero:string = "L"+lab;
    lab++;
    let l_falso:string = "L"+lab;
    lab++;
    let l_salida:string = "L"+lab;
    
    
    
    Principal.historial += "if ("+x+") goto " +l_verdadero+";\n";
    Principal.historial += "goto "+l_falso+";\n";
    
    Principal.historial += l_verdadero+":\n" ;
    Principal.historial += t+" = " +val1+";\n" ;
    Principal.historial += "goto "+l_salida+";\n"
    
    Principal.historial += l_falso+":\n" ;
    Principal.historial += t+" = " +val2+";\n" ;
    
    Principal.historial += "goto "+l_salida+";\n"
    
    Principal.historial += l_salida+":"
    
    Principal.temp = temp;
    Principal.etiqueta = lab;
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
      const nodo=new NodoAST("TERNARIO");
      nodo.agregarHijo(this.condicion.getNodo());
      return nodo;
  }
}
