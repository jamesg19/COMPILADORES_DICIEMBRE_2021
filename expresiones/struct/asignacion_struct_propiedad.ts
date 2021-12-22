import { Acceso_Struct } from "./acceso_struct";
import { Instruccion } from "../../abs/Instruccion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { TIPO } from '../../table/tipo';
import { Simbolo } from "../../table/simbolo";
import { NodoAST } from "../../abs/nodo";

export class Asignacion_Struct_Struct extends Instruccion {
  acceso: Acceso_Struct;
  exp: Instruccion;

  constructor(
    acceso: Acceso_Struct,
    exp: Instruccion,
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.acceso = acceso;
    this.exp = exp;
  }

  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    let value_acceso = this.acceso.interpretar(entorno, arbol);

    if (value_acceso instanceof Excepcion) {
      arbol.excepciones.push(value_acceso);
      return value_acceso;
    }

    let value_exp = this.exp.interpretar(entorno, arbol);
    if (value_exp instanceof Excepcion) return value_exp;

    if (value_exp == undefined)
      return new Excepcion(
        "Semantico",
        "Se requiere de un valor para la asignacion en un struct",
        "" + this.fila,
        "" + this.columna
      );
    
    
    if (!(this.exp.tipo == value_acceso.tipo)) return  new Excepcion(
        "Semantico",
        "tipos diferentes en asignacion, struct: "+value_acceso.tipo,
        "" + this.fila,
        "" + this.columna
      );
    
    value_acceso.valor = value_exp;
  }

  getNodo(){
    const nodo=new NodoAST("ASIGNACION STRUCT");
    nodo.agregarHijo(this.acceso.id);
    nodo.agregarHijoNodo(this.exp.getNodo());
    return nodo;
  }
}
