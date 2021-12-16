import { isNumber } from "util";
import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Simbolo } from "../../table/simbolo";
import { NodoAST } from "../../abs/nodo";

export class Rango_Complete extends Instruccion {
  id: string;
  

  constructor(id: string, fila: number, columna: number) {
    super(fila, columna);
    this.id = id;
    
  }
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    
    

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

    return array_val.valor;

    
  }

  getNodo() {
      const nodo= new NodoAST("RANGO");
      nodo.agregarHijo(this.id);
      return nodo;
  }
}
