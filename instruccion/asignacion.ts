import { Instruccion } from "../abs/Instruccion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TIPO } from "../table/tipo";
import { NodoAST } from "../abs/nodo";
import { Principal } from "../principal";
import { visitParameterList } from "typescript";

export class Asignacion extends Instruccion {
  id: string;
  exp: Instruccion;

  /**
   * @param  {string} id
   * @param  {Instruccion} exp
   * @param  {number} linea
   * @param  {number} columna
   */
  constructor(id: string, exp: Instruccion, linea: number, columna: number) {
    super(linea, columna);
    this.id = id;
    this.exp = exp;
  }

  /**
   * @param  {TablaSimbolos} e
   * @param  {Arbol} arbol
   * @returns any
   */
  interpretar(e: TablaSimbolos, arbol: Arbol): any {
    const variable = e.getSimbolo(this.id);

    if (!variable) {
      return new Excepcion(
        "Semantico",
        "No existe la variable " + this.id,
        super.fila + "",
        super.columna + ""
      );
    }

    //verifico si es una constante
    if (variable.constante) {
      return new Excepcion(
        "Semantico",
        "No se puede cambiar de valor a una constante " + this.id,
        super.fila + "",
        super.columna + ""
      );
    }
    
    if ((this.exp == undefined || this.exp == null) && variable.arreglo) {
      variable.valor = [];
      e.actualizarSimboloEnTabla(variable);
      return;
    } else {
      let valor = this.exp.interpretar(e, arbol);
      let value = JSON.parse(JSON.stringify(valor));

      if (valor instanceof Array) {
        if (variable.valor instanceof Array) {
          variable.valor = value;
          e.actualizarSimboloEnTabla(variable);
          return;
        }

        return new Excepcion(
          "Semantico",
          "Se esperaba almacenar un Arreglo dentro de un arreglo " + this.id,
          super.fila + "",
          super.columna + ""
        );
      }

      //let value = JSON.parse(JSON.stringify(valor));
      if (
        (variable.tipo == TIPO.ENTERO || variable.tipo == TIPO.DECIMAL) &&
        (this.exp.tipo == TIPO.ENTERO || this.exp.tipo == TIPO.DECIMAL)
      ) {
        variable.valor = value;
      } else if (this.exp.tipo != variable.tipo) {
        //console.log(this.exp.tipo+" -> "+variable.tipo);
        return new Excepcion(
          "Semantico",
          "Tipos diferentes " + this.id,
          super.fila + "",
          super.columna + ""
        );
      }
      variable.valor = value;
      variable.tipo = this.exp.tipo;
      e.actualizarSimboloEnTabla(variable);
    }
  }

  getNodo(){
    const nodo=new NodoAST("ASIGNACION");
    nodo.agregarHijo(this.id+" ID ");
    try {
      
    
    nodo.agregarHijoNodo(this.exp.getNodo());
  } catch (error) {
      
  }
    return nodo;
  }
  // getNodo() {
  //   const nodo = new NodoAST("ASIGNACION");
  //   nodo.agregarHijo(this.id + " ID ");
  //   nodo.agregarHijoNodo(this.exp.getNodo());
  //   return nodo;
  // }

  traducir(e: TablaSimbolos, arbol: Arbol): any {
    const variable = e.getSimbolo(this.id);

    if (!variable) {
      return new Excepcion(
        "Semantico",
        "No existe la variable " + this.id,
        super.fila + "",
        super.columna + ""
      );
    }

    //verifico si es una constante
    if (variable.constante) {
      return new Excepcion(
        "Semantico",
        "No se puede cambiar de valor a una constante " + this.id,
        super.fila + "",
        super.columna + ""
      );
    }

    let valor = this.exp.traducir(e, arbol);

    if (valor instanceof Array) {
      if (variable.valor instanceof Array) {
        Principal.historial += "/*Asingacion entre arreglos*/";
        Principal.historial +=
          "stack[(int) " + variable.posicion + "] =" + valor + ";\n";

        return;
      }

      return new Excepcion(
        "Semantico",
        "Se esperaba almacenar un Arreglo dentro de un arreglo " + this.id,
        super.fila + "",
        super.columna + ""
      );
    }

    //let value = JSON.parse(JSON.stringify(valor));
    if (
      (variable.tipo == TIPO.ENTERO || variable.tipo == TIPO.DECIMAL) &&
      (this.exp.tipo == TIPO.ENTERO || this.exp.tipo == TIPO.DECIMAL)
    ) {
      Principal.historial += "/*Asignacion de Variables*/\n";
      Principal.historial +=
        "stack[(int)" + variable.posicion + "] =" + valor + ";\n";
    } else if (this.exp.tipo != variable.tipo) {
      return new Excepcion(
        "Semantico",
        "Tipos diferentes " + this.id,
        super.fila + "",
        super.columna + ""
      );
    }

    Principal.historial += "/*Asignacion de Variables*/\n";
    Principal.historial +=
      "stack[(int)" + variable.posicion + "] =" + valor + ";\n";
  }
}
