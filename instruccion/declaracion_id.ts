import { Instruccion } from "../abs/Instruccion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Excepcion } from "../table/excepcion";
import { TIPO } from "../table/tipo";
import { Arbol } from "../table/arbol";
import { Simbolo } from "../table/simbolo";
import { NodoAST } from "../abs/nodo";
import { Principal } from '../principal';

export class D_Id extends Instruccion {
  tipo: TIPO;
  id: string;

  constante: boolean;

  /**
   * @param  {TIPO} tipo
   * @param  {string} id
   * @param  {boolean} constante
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(
    tipo: TIPO,
    id: string,
    constante: boolean,
    fila: number,
    columna: number
  ) {
    super(fila, columna);

    this.tipo = tipo;
    this.id = id;

    this.constante = constante;
  }

  /**
   * @param  {TablaSimbolos} e
   * @param  {Arbol} arbol
   * @returns any
   */
  interpretar(e: TablaSimbolos, arbol: Arbol): any {
    //Validacion de variable existente
    let variable = e.consultar_en_tabla_actual(this.id);  
    

    if (variable)
      return new Excepcion(
        "Semantico",
        " no se pueden declarar variables con el mismo nombre" + this.id,
        super.fila + "",
        super.columna + ""
      );

    //Creacion de variable en el entorno

    let valor = this.getValue(this.tipo);

    let simbolo = new Simbolo(
      this.id,
      this.tipo,
      super.fila,
      super.columna,
      valor,
      false,
      false
    );
    e.addSimbolo(simbolo); //valor: any, arreglo: boolean, struct: boolean
  }
  /**
   * @param  {TIPO} tipo
   */
  getValue(tipo: TIPO) {
    switch (tipo) {
      case TIPO.BOOLEAN:
        return false;
      case TIPO.ENTERO:
        return 0;
      case TIPO.DECIMAL:
        return 0.0;
      case TIPO.CARACTER:
        return "";
      case TIPO.CADENA:
        return "";
      case TIPO.ARREGLO:
      case TIPO.STRUCT:
        return undefined;
    }
  }

  getNodo(): NodoAST {
    const nodo = new NodoAST("DECLARACION");
    if (this.tipo == TIPO.ARREGLO) {
      nodo.agregarHijo("ARREGLO");
    } else if (this.tipo == TIPO.BOOLEAN) {
      nodo.agregarHijo("BOOLEAN");
    } else if (this.tipo == TIPO.CADENA) {
      nodo.agregarHijo("CADENA");
    } else if (this.tipo == TIPO.CARACTER) {
      nodo.agregarHijo("CARACTER");
    } else if (this.tipo == TIPO.DECIMAL) {
      nodo.agregarHijo("DECIMAL");
    } else if (this.tipo == TIPO.ENTERO) {
      nodo.agregarHijo("ENTERO");
    } else if (this.tipo == TIPO.NULL) {
      nodo.agregarHijo("NULL");
    } else if (this.tipo == TIPO.STRUCT) {
      nodo.agregarHijo("STRUCT");
    } else if (this.tipo == TIPO.VOID) {
      nodo.agregarHijo("VOID");
    }
    nodo.agregarHijo(this.id);
    //nodo.agregarHijoNodo(this.);
    return nodo;
  }
  traducir(e: TablaSimbolos, arbol: Arbol): any {
    //Validacion de variable existente
    let variable = e.getSimbolo(this.id); //e.getVariable(this.id);

    if (variable)
      return new Excepcion(
        "Semantico",
        " no se pueden declarar variables con el mismo nombre" + this.id,
        super.fila + "",
        super.columna + ""
      );

    //Creacion de variable en el entorno

    let valor = this.getValue(this.tipo);

    let simbolo = new Simbolo(
      this.id,
      this.tipo,
      super.fila,
      super.columna,
      valor,
      false,
      false
    );
    
    e.addSimbolo(simbolo); //valor: any, arreglo: boolean, struct: boolean
    
    let cadena = "/*Declaracion de Variales*/\n"+
    "stack[(int)"+simbolo.posicion+"] = "+simbolo.valor+";\n";
    Principal.historial += cadena;
  }

  transform_cadena(x: string, arbol: Arbol): string {
    let return_string: string = "";

    return_string = "t" + Principal.temp + " = H;\n";
    //obtener codigo ASCII de cada caracter de la cadena
    //cadena en el heap
    for (let i = 0; i < x.length; i++) {
      let item: number = x.charCodeAt(i);
      return_string += "heap[(int)H] = " + item + " ;\n";
      return_string += "H = H + 1;\n";
      //console.log(item);
    }
    return_string += "heap[(int)H] = -1 ;\n";
    return_string += "H = H + 1;\n";

    //referencia de la cadena desde el stack
    Principal.posicion++;
    return_string +=
      "t" + Principal.posicion + " = P + " + Principal.posicion + ";\n";
    return return_string;
  }
}
