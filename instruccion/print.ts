import { Instruccion } from "../abs/Instruccion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Arbol } from "../table/arbol";
import { TIPO } from "../table/tipo";
import { Excepcion } from "../table/excepcion";
import { Simbolo } from "../table/simbolo";
import { Acceso_Struct } from "../expresiones/struct/acceso_struct";
import { Identificador } from "../expresiones/identificador";
import { Primitivo } from "../expresiones/primitivo";
import { Dec_Struct } from "../expresiones/struct/instancia_struct";
import { sign } from "crypto";
import { NodoAST } from "../abs/nodo";

export class Print extends Instruccion {
  fila: number;
  columna: number;

  value?: Instruccion[];
  /**
   * @param  {number} fila
   * @param  {number} columna
   * @param  {Instruccion[]} value?
   */
  constructor(fila: number, columna: number, value?: Instruccion[]) {
    super(fila, columna);
    this.fila = fila;
    this.columna = columna;
    this.value = value;
  }
  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   * @returns any
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
    //console.log('antes: ',this.expresion);

    //const value = this.value.interpretar(entorno,arbol);
    if (this.value != undefined) {
      this.value.forEach((exp_print) => {
        let value = exp_print.interpretar(entorno, arbol);
        if (value instanceof Excepcion) {
          console.log(value);
          return value;
        }

        if (value != undefined) {
          if(exp_print instanceof Identificador){
            let simbol = entorno.getSimbolo(exp_print.id);
            value = simbol.toString();
          }else
         
          value = value.toString()

        } else {
          value = "Indefinido";
        }

        arbol.consola += value;
        console.log(value);
      });
    }
  }

  print_struct(exp: Simbolo): string {
    let formato: string = exp.name_struct + " ( ";
    if (exp.valor instanceof Map) {
      exp.valor.forEach((element) => {
        console.log(element);
      });
    }
    return formato;
  }

  getNodo() {
    const nodo = new  NodoAST("IMPRIMIR");
    
    this.value?.forEach((x)=>{
      nodo.agregarHijoNodo(x.getNodo());  
    })
    //un nodo
    

    return nodo;
  }
}
