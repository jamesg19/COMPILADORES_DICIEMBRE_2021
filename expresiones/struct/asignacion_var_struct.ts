import { Instruccion } from "../../abs/Instruccion";
import { Acceso_Struct } from "./acceso_struct";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from "../../table/simbolo";
import { timeStamp } from "console";

export class Asignacion_VAR_STRUCT extends Instruccion {
  id: string;
  acceso: Acceso_Struct;

  /**
   * @param  {string} id
   * @param  {Acceso_Struct} acceso
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(
    id: string,
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
    let value = entorno.getSimbolo(this.id);
    if (value instanceof Excepcion) return value;
    if (value)
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
      
    if(acceso_value.tipo != value.tipo)
    return new Excepcion(
        "Semantico",
        "error en el valor de struct ",
        this.fila + "",
        this.columna + ""
      );
      
      value.valor = acceso_value.valor;
  }
}
