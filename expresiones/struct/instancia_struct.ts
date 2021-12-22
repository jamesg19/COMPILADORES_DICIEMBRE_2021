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
  id_struct: string;

  id: string;

  values_atributos: Instruccion[];
  
  list_simbolos: Map<string, Simbolo>;
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
    
    
    this.list_simbolos = new Map();
    
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
    let create_struct = entorno.consultar_en_tabla_actual(this.id);
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
    //console.log("template",template);
    //console.log(template);

    // //comparo que las listas sean del mismo tama;o
    // //para saber si los parametros son en misma cantidad que los
    // //atributos en el struct

    if (this.values_atributos.length != template?.lista_atributos.length)
      return new Excepcion(
        "Semantico",
        "se esperaba una cantidad diferente de atributos para el Struct " +
          this.template_struct,
        "" + this.fila,
        "" + this.columna
      );
    //hago una copia de los atributos del struct
    //let lst_simbolos:Map<string,Simbolo> = new Map();

    //  lst_simbolos = JSON.parse(JSON.stringify(template?.lista_simbolo));

    //    console.log("lst_simbolos",lst_simbolos);
    let contador: number = 0;

    template?.lista_atributos.forEach((x) => {
      
      let result = this.values_atributos[contador].interpretar(entorno, arbol);


      if (this.values_atributos[contador].tipo != x.tipo)
        return new Excepcion(
          "Semantico",
          "El tipo de parametro no coince con el del struct",
          this.fila + "",
          this.columna + ""
        );

      if (result instanceof Excepcion) return result;

      let sim: Simbolo = JSON.parse(JSON.stringify(x));
      
      if(x.struct){
      
        sim.name_struct = sim.valor;
        sim.struct = true;
        
      }
      
      sim.valor = result;
      contador++;
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
    simbolo.name_struct = template.id;
    
    
    entorno.addSimbolo(simbolo);
    //console.log("this", this);
    // //recorro la lista de valores para que se asigen a
    // //los valores del struct

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

    //     //comparo los tipos del atributo
    //   if (template?.lista_atributos[contador].tipo != x.tipo)
    //     return new Excepcion(
    //       "Semantico",
    //       "Existen atributos con tipos diferentes",
    //       this.fila + "",
    //       this.columna + ""
    //     );

    //   console.log(simbolo);

    //     let sim: Simbolo = new Simbolo(
    //       this.list_atributos[contador].id,
    //       this.list_atributos[contador].tipo,
    //       super.fila,
    //       super.columna,
    //       value,
    //       x.arra,
    //       x.struct
    //     );

    //     entorno_local.addSimbolo(sim);
    //   });

    //   entorno.addSimbolo
    // });
  }

  getNodo() {
        const nodo=new NodoAST("INSTANCIA STRUCT");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo(this.id_struct);
        const atributos=new NodoAST("ATRIBUTOS");
        
        if(this.values_atributos != null || this.values_atributos != undefined ){
          this.values_atributos.forEach((element)=>{
            atributos.agregarHijoNodo(element.getNodo());

          });
          nodo.agregarHijoNodo(atributos);
        }
        return nodo;
  }

}
