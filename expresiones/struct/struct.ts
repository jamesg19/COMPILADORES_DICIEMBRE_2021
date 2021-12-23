import { Instruccion } from "../../abs/Instruccion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from "../../table/simbolo";
import { Type } from "../../table/Type";
import { Arbol } from "../../table/arbol";
import { Atributo } from "./atributo";
import { TIPO } from "../../table/tipo";
import { Dec_Struct } from './instancia_struct';
import { NodoAST } from "../../abs/nodo";

export class Struct extends Instruccion {
  //crep que esto es mejor guardarlo en un map
  //para verificar que no existan atributos repetidos
  lista_atributos: Atributo[];
  lista_simbolo: Map<string, Simbolo>;

  //var_list:Map<string,any>;
  id: string;
  /**
   * @param  {string} id nombre del struct
   * @param  {Atributo[]} lista_atributos
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(
    id: string,
    lista_atributos: Atributo[],
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.id = id;
    // this.lista_atributos = lista_atributos;
    this.lista_atributos = lista_atributos;
    //Object.assign(this, {lista_atributos});
    this.lista_simbolo = new Map();
    let contador = 0;
    
    
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   * @returns any
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
    const entorno_local = new TablaSimbolos(entorno);

    if (!arbol.structs.has(this.id)) {
      this.lista_atributos.forEach((atributo) => {
        //Validación objeto

        //Validacion de id unico
        let variable = entorno_local.getSimbolo(atributo.id);
        const reasignable = true;
        if (variable) {
          return new Excepcion(
            "Semantico",
            "atributo repetido",
            super.fila + "",
            super.columna + ""
          ); //Errores.getInstance().push(new Error({tipo: 'semantico', linea: this.linea, descripcion: `El id: ${id} esta repetido en el type`}));
        }

        //Si se puede asignar
        const valor = this.getValue(atributo.tipo);
        //{reasignable, id, valor}
        
      
        
        variable = new Simbolo(
          atributo.id,
          atributo.tipo,
          atributo.fila,
          atributo.columna,
          valor,
          this.arra,
          this.struct
        );
        //id: string, tipo: TIPO, fila: number, columna: number, valor: any, arreglo: boolean, struct: boolean
        //entorno.setSi(variable);

        this.lista_simbolo.set(atributo.id, variable);

        entorno_local.addSimbolo(variable);
      });
      //JSON.parse(JSON.stringify(this))
      arbol.structs.set(this.id, this);
      return new Type(this.id, entorno_local.tabla);
    }
    return new Excepcion(
      "Semantico",
      "Existe un Struct con " + this.id,
      super.fila + "",
      super.columna + ""
    );
  }

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

  getNodo() {
      const nodo= new NodoAST("STRUCT");
      nodo.agregarHijo(this.id);
      if(this.lista_atributos!= null || this.lista_atributos != undefined){
        
        const lista_atributos=new NodoAST("LISTA ATRIBUTOS");
        
        this.lista_atributos.forEach((element)=>{
          try{
          lista_atributos.agregarHijoNodo(element.getNodo());
          } catch(e){
            
          }

        });
        nodo.agregarHijoNodo(lista_atributos);
      }
      return nodo;

  }
}
