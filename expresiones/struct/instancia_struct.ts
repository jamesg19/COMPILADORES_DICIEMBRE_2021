import { Atributo } from "./atributo";
import { Struct } from "./struct";
import { Instruccion } from "../../abs/Instruccion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from "../../table/simbolo";

export class Dec_Struct extends Instruccion {
  template_struct: string; //tipo de estruct a crear
  id_struct: string;

  id: string;

  values_atributos: Instruccion[];
  list_atributos: Atributo[];

  constructor(
    template_struct: string,
    id: string,
    id_struct: string,
    values_atributos: Instruccion[],
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.template_struct = template_struct;
    this.id = id;
    this.values_atributos = values_atributos;
    this.id_struct = id_struct;
    this.list_atributos = null;
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    if (this.id_struct != this.template_struct)
      return new Excepcion(
        "Semantico",
        "Nombre de Struct y constructor no coinciden",
        this.fila + "",
        this.columna + ""
      );

    let entorno_local: TablaSimbolos = new TablaSimbolos(entorno);
    //verifico que el struct exista
    if (!arbol.structs.has(this.template_struct))
      return new Excepcion(
        "Semantico",
        "Struct: " + this.template_struct + ", no existe ",
        this.fila + "",
        this.columna + ""
      );

    //getsimbolo para verificar  si existe una variable con el mismo id
    let create_struct = entorno.getSimbolo(this.id);

    if (!create_struct)
      return new Excepcion(
        "Semantico",
        "Existe una variable con " +
          this.id +
          ", no se pueden duplicar variables ",
        this.fila + "",
        this.columna + ""
      );

    //obtengo el struct
    let template: Struct | undefined = arbol.structs.get(this.template_struct);

    console.log(template);
    //hago una copia de los atributos del struct
    //   = JSON.parse(JSON.stringify(template));

    // //comparo que las listas sean del mismo tama;o
    // //para saber si los parametros son en misma cantidad que los
    // //atributos en el struct
    // if (this.list_atributos.length != this.values_atributos.length)
    //   return new Excepcion(
    //     "Semantico",
    //     "se esperaba una cantidad diferente de atributos para el Struct " +
    //       this.template_struct,
    //     "" + this.fila,
    //     "" + this.columna
    //   );

    // //recorro la lista de valores para que se asigen a
    // //los valores del struct
    // let contador: number = 0;
    // this.values_atributos.forEach((x) => {
    //   let value = x.interpretar(entorno, arbol);

    //   if (!value)
    //     return new Excepcion(
    //       "Semantico",
    //       "Se requiere de un valor",
    //       this.fila + "",
    //       this.columna + ""
    //     );

    //   if (value instanceof Excepcion) return value;

    //   //comparo los tipos del atributo
    //   if (this.list_atributos[contador].tipo != x.tipo)
    //     return new Excepcion(
    //       "Semantico",
    //       "Existen atributos con tipos diferentes",
    //       this.fila + "",
    //       this.columna + ""
    //     );

    //   let sim: Simbolo = new Simbolo(
    //     this.list_atributos[contador].id,
    //     this.list_atributos[contador].tipo,
    //     super.fila,
    //     super.columna,
    //     value,
    //     x.arra,
    //     x.struct
    //   );

    //   entorno_local.addSimbolo(sim);
    // });

    //entorno.addSimbolo
  }
}
