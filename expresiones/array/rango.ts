import { isNumber } from "util";
import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Simbolo } from "../../table/simbolo";
import { NodoAST } from "../../abs/nodo";

export class Rango extends Instruccion {
  id: string;
  fin: Instruccion;
  inicio:Instruccion;

  constructor(id: string,inicio:Instruccion, fin: Instruccion, fila: number, columna: number) {
    super(fila, columna);
    this.id = id;
    this.fin = fin;
    this.inicio = inicio;
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
    final_value = Number(final_value);
    if (!isNumber(final_value))
      return new Excepcion(
        "Semantico",
        " Se requiere una expresion  numerica",
        this.fila + "",
        this.columna + ""
      );
      let init_value = this.inicio.interpretar(entorno, arbol);
      
      if (init_value instanceof Excepcion) return final_value;
      if (!init_value)
        return new Excepcion(
          "Semantico",
          " Se requiere una expresion ",
          this.fila + "",
          this.columna + ""
        );
  
        init_value = Number(final_value);
      if (!isNumber(init_value))
        return new Excepcion(
          "Semantico",
          " Se requiere una expresion  numerica",
          this.fila + "",
          this.columna + ""
        );

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
    
    if((init_value >= 0 && init_value <= array_val.valor.length))
    return array_val.valor.slice(init_value, final_value);
    
    return new Excepcion(
        "Semantico",
        " Expresiones ingresadas exceden los limites del Arreglo ",
        this.fila + "",
        this.columna + ""
      );
    
  }

  getNodo() {
    const nodo= new NodoAST("RANGO");
    const inicio= new NodoAST("INICIO");
    const fin= new NodoAST("FIN");

    nodo.agregarHijo(this.id);

    inicio.agregarHijoNodo(this.inicio.getNodo());
    fin.agregarHijoNodo(this.fin.getNodo());

    nodo.agregarHijoNodo(inicio);
    nodo.agregarHijoNodo(fin);

    return nodo;
  }

}
