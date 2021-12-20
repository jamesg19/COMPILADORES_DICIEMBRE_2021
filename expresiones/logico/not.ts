import { Instruccion } from "../../abs/Instruccion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Excepcion } from "../../table/excepcion";
import { Arbol } from "../../table/arbol";
import { TIPO } from "../../table/tipo";
import { Primitivo } from "../primitivo";
import { NodoAST } from "../../abs/nodo";
import { Principal } from '../../principal';

export class Not extends Instruccion {
  expression: Primitivo;
  /**
   * @param  {Primitivo} expression
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(expression: Primitivo, fila: number, columna: number) {
    super(fila, columna);
    this.expression = expression;
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   * @returns any
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
    const expression1 = this.expression.interpretar(entorno, arbol);

    if (expression1 === undefined || expression1 == null)
      return new Excepcion(
        "Semantico",
        "No se puede negar, indefinido",
        super.fila + "",
        super.columna + ""
      );

    if (expression1 instanceof Excepcion) return expression1;

    if (this.expression.tipo === TIPO.BOOLEAN){
      this.tipo=TIPO.BOOLEAN
      return !expression1;
    }
    
    return new Excepcion(
      "Semantico",
      "Se requiere un tipo Boolean ",
      super.fila + "",
      super.columna + ""
    );
  }

  getNodo() {
    const nodo = new NodoAST("LOGICA");

    nodo.agregarHijo("NOT");
    nodo.agregarHijoNodo(this.expression.getNodo());
    return nodo;
  }

  traducir(entorno: TablaSimbolos, arbol: Arbol): any {
    const expression1 = this.expression.traducir(entorno, arbol);

    if (expression1 === undefined || expression1 == null)
      return new Excepcion(
        "Semantico",
        "No se puede negar, indefinido",
        super.fila + "",
        super.columna + ""
      );

    if (expression1 instanceof Excepcion) return expression1;

    if (this.expression.tipo === TIPO.BOOLEAN) {
      let temp = Principal.temp;
      temp++;
      
      let t = "t"+temp;
      let value = (expression1 == true )?0:1;
      Principal.temp = temp;
      Principal.historial += t +" = "+value+";\n";
      return t;
    }
    console.log("ERROR EN !  not");
    return new Excepcion(
      "Semantico",
      "Se requiere un tipo Boolean ",
      super.fila + "",
      super.columna + ""
    );
  }
}
