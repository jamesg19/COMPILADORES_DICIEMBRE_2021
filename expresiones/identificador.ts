import { Instruccion } from "../abs/Instruccion";
import { TIPO } from "../table/tipo";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Arbol } from "../table/arbol";
import { Simbolo } from "../table/simbolo";
import { Excepcion } from "../table/excepcion";
import { NodoAST } from "../abs/nodo";
import { isNumber } from 'util';

export class Identificador extends Instruccion {
  id: string;
  fila: number;
  columna: number;
  tipo: TIPO | undefined;

  constructor(id: string, fila: number, columna: number) {
    super(fila, columna);

    this.id = id;
    this.fila = fila;
    this.columna = columna;
    this.tipo = TIPO.NULL;
  }

  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    try {
      //obtenemos el tipo
      let simbol = entorno.getSimboloJ(this.id);
      if(simbol == undefined){
        return new Excepcion('Semantico',`La variable no existe ${this.id} `,`${this.fila}`,`${this.columna}` );
      }
      //establecemos el tipo
      this.tipo = simbol?.tipo;
      return simbol?.valor;
    } catch (error) {
      return new Excepcion(
        "Semantico",
        `Error al obtener valor de identificador `,
        `${this.fila}`,
        `${this.columna}`
      );
    }
  }

  getNodo() {
    const nodo = new NodoAST("ID");
    nodo.agregarHijo(this.id);
    return nodo;
  }
  traducir(entorno: TablaSimbolos, arbol: Arbol) {
    try {
      //obtenemos el tipo
      let simbol = entorno.getSimbolo(this.id);
      //establecemos el tipo
      this.tipo = simbol?.tipo;
      //return simbol?.valor;
      if(this.tipo == TIPO.ENTERO) this.tipo = TIPO.DECIMAL;
      
      //console.log("TIpo========",simbol?.tipo);
      return "stack[(int)"+simbol?.posicion+"]";
      
    } catch (error) {
      return new Excepcion(
        "Semantico",
        `Error al obtener valor de identificador `,
        `${this.fila}`,
        `${this.columna}`
      );
    }
  }
}
