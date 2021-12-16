import { Atributo } from "./atributo";
import { Struct } from "./struct";
import { Instruccion } from "../../abs/Instruccion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from "../../table/simbolo";
import { TIPO } from "../../table/tipo";
import { NodoAST } from "../../abs/nodo";

export class Dec_Struct extends Instruccion {
  template_struct: string; //tipo de estruct a crear


  id: string;
  list_simbolos: Map<string, Simbolo>;

  /**
   * @param  {string} template_struct
   * @param  {string} id
   * @param  {string} id_struct
   * @param  {Instruccion[]} values_atributos
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(
    template_struct: string,
    id: string,
    id_struct: string,
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.template_struct = template_struct;
    this.id = id;
    this.list_simbolos = new Map();
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    

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
    //console.log(!create_struct);
    if (create_struct)
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

    template?.lista_simbolo.forEach((x) => {
      
      let sim: Simbolo = JSON.parse(JSON.stringify(x));
      this.list_simbolos.set(sim.id, sim);
      
    });

    let simbolo: Simbolo = new Simbolo(
      this.id,
      TIPO.STRUCT,
      this.fila,
      this.columna,
      this.list_simbolos,
      false,
      true
    );
    entorno.addSimbolo(simbolo);
    
  }
  getNodo(){ 
    const nodo=new NodoAST("PARAMETRO STRUCT");
    nodo.agregarHijo(this.id);
    nodo.agregarHijo(this.template_struct);
    return nodo;
  }
}
