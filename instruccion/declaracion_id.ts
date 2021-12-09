import { Instruccion } from "../abs/Instruccion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Excepcion } from "../table/excepcion";
import { TIPO } from "../table/TipoNativo";
import { Arbol } from "../table/arbol";
import { Simbolo } from "../table/simbolo";

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
}
