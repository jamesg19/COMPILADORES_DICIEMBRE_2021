import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/TipoNativo";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from "../../table/simbolo";

export class Arreglo extends Instruccion {
  id: string;
  tipo: TIPO;
  t_esperado: TIPO;
  corchete: number;
  lst_expresiones: Instruccion[];

  /**
   * @param  {string} id
   * @param  {TIPO} tipo
   * @param  {TIPO} t_esperado
   * @param  {number} corchete
   */
  constructor(
    tipo: TIPO,
    id: string,
    lst_expresiones: Instruccion[],
    t_esperado: TIPO,
    corchete: number,
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.id = id;
    this.lst_expresiones = lst_expresiones;
    this.tipo = tipo;
    this.t_esperado = t_esperado;
    this.corchete = corchete;
  }

  /**para array's de tipo int[] a = [lista_expresion]
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   * @returns any
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
    let value_array: any[] = [];

    this.lst_expresiones.forEach((x) => {
      let result_value;
      if (x instanceof Instruccion) {
        result_value = x.interpretar(entorno, arbol);

        if (x.tipo != this.tipo) {
          console.log(
            "x.tipo != this.tipo",
            x.tipo != this.tipo,
            x.tipo,
            this.tipo
          );
          return new Excepcion(
            "Semantico",
            "Se esta asigando un tipo de valor inesperado",
            "" + super.fila,
            "" + this.columna
          );
        }
      } else {
        result_value = this.copyExpDeep(entorno, arbol, x);
      }
      if (result_value instanceof Excepcion) return result_value;

      let value = JSON.parse(JSON.stringify(result_value));

      if (value instanceof Excepcion) return value;

      value_array.push(value);
    });

    let value_object = JSON.parse(JSON.stringify(value_array));

    let simbolo: Simbolo = new Simbolo(
      this.id,
      this.tipo,
      super.fila,
      super.columna,
      value_object,
      true,
      false
    );
    entorno.addSimbolo(simbolo);
  }



  copyExpDeep(
    entorno: TablaSimbolos,
    arbol: Arbol,
    element: Instruccion[]
  ): any[] {
    let value_array: any[] = [];
    let result_value;

    element.forEach((x: Instruccion) => {
      if (!(x instanceof Instruccion)) {
        result_value = this.copyExpDeep(entorno, arbol, x);
      } else {
        result_value = x.interpretar(entorno, arbol);
        if (x.tipo != this.tipo) {
          return new Excepcion(
            "Semantico",
            "Se esta asigando un tipo de valor inesperado",
            "" + super.fila,
            "" + this.columna
          );
        }
      }
      if (result_value instanceof Excepcion) return result_value;

      let value = JSON.parse(JSON.stringify(result_value));

      if (value instanceof Excepcion) return value;

      value_array.push(value);
    });
    return value_array;
  }
}
