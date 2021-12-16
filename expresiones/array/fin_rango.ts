import { isNumber } from "util";
import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Simbolo } from "../../table/simbolo";
import { NodoAST } from "../../abs/nodo";

export class Fin_Rango extends Instruccion {
  id: string;
  fin: Instruccion;

  constructor(id: string, fin: Instruccion, fila: number, columna: number) {
    super(fila, columna);
    this.id = id;
    this.fin = fin;
  }
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    let final_value = this.fin.interpretar(entorno, arbol);
    if (final_value instanceof Excepcion) return final_value;
    
    if (!final_value)
      return new Excepcion(
        "Semantico",
        " Se requiere una expresion ",
        this.fila + "",
        this.columna + ""
      );

    // if (!isNumber(final_value))
    //   return new Excepcion(
    //     "Semantico",
    //     " Se requiere una expresion  numerica",
    //     this.fila + "",
    //     this.columna + ""
    //   );

    let array_val = entorno.getSimbolo(this.id);

    if (!(array_val instanceof Simbolo))
      return new Excepcion(
        "Semantico",
        " Error al transpilar ",
        this.fila + "",
        this.columna + ""
      );

    if (!array_val.arreglo)
      return new Excepcion(
        "Semantico",
        " No es un Arreglo ",
        this.fila + "",
        this.columna + ""
      );

    if (!(array_val.valor instanceof Array))
      return new Excepcion(
        "Semantico",
        " No es un Arreglo ",
        this.fila + "",
        this.columna + ""
      );
    
    if (!(final_value <= array_val.valor.length && final_value >= 0))
      return new Excepcion(
        "Semantico",
        " expresion final excede la longitud del arreglo ",
        this.fila + "",
        this.columna + ""
      );

    return array_val.valor.slice(final_value, array_val.valor.length-1);
  }

  getNodo() {
    const nodo=new NodoAST(":END");
    
    nodo.agregarHijo(this.id);
    nodo.agregarHijoNodo(this.fin.getNodo());

    return nodo;

}

}
