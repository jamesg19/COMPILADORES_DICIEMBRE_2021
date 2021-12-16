import { Instruccion } from "../../abs/Instruccion";
import { Acceso_Struct } from "./acceso_struct";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from "../../table/simbolo";
import { timeStamp } from "console";
import { isNumber } from 'util';
import { TIPO } from "../../table/tipo";
import { NodoAST } from "../../abs/nodo";

export class Asignacion_VAR_STRUCT extends Instruccion {
  id: Instruccion;
  acceso: Acceso_Struct;

  /**
   * @param  {string} id
   * @param  {Acceso_Struct} acceso
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(
    id: Instruccion,
    acceso: Acceso_Struct,
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.id = id;
    this.acceso = acceso;
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    let value = this.id.interpretar(entorno,arbol);//entorno.getSimbolo(this.id);
    if (value instanceof Excepcion) return value;
    
    if (!value)
      return new Excepcion(
        "Semantico",
        "No existe la variable " + this.id,
        this.fila + "",
        this.columna + ""
      );

    let acceso_value = this.acceso.interpretar(entorno, arbol);

    
    if (acceso_value instanceof Excepcion) return acceso_value;

    
    if (!(acceso_value instanceof Simbolo))
      return new Excepcion(
        "Semantico",
        "error en el valor de struct ",
        this.fila + "",
        this.columna + ""
      );
      
      if((this.id.tipo == TIPO.ENTERO || this.id.tipo == TIPO.DECIMAL) && (acceso_value.tipo == TIPO.ENTERO || acceso_value.tipo==TIPO.DECIMAL) ){
        acceso_value.valor=Number(value);
        
     }else 
      if(acceso_value.tipo != this.id.tipo)
    return new Excepcion(
        "Semantico",
        "error en el valor de struct ",
        this.fila + "",
        this.columna + ""
      );
      
     // console.log(acceso_value);
      //value.valor = acceso_value.valor;
      acceso_value.valor = value;
      
  }
  getNodo() {
    const nodo= new NodoAST("ASIGNACION VAR STRUCT"); 
    nodo.agregarHijo(this.acceso.id);
    nodo.agregarHijoNodo(this.id.getNodo());

    return nodo;

  }
}
