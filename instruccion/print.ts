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
import { Principal } from "../principal";

export class Print extends Instruccion {
  fila: number;
  columna: number;
  static print: boolean = false;

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
    if (this.value != undefined) {
      this.value.forEach((exp_print) => {
        let value = exp_print.interpretar(entorno, arbol);
        if (value instanceof Excepcion) {
          console.log(value);
          return value;
        }

        if (value != undefined) {
          if (exp_print instanceof Identificador) {
            let simbol = entorno.getSimbolo(exp_print.id);
            value = simbol.toString();
          } else value = value.toString();
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
    const nodo = new NodoAST("IMPRIMIR");

    this.value?.forEach((x) => {
      nodo.agregarHijoNodo(x.getNodo());
    });
    //un nodo

    return nodo;
  }
  traducir(entorno: TablaSimbolos, arbol: Arbol): string {
    let cadena: string = "";
    let value_cadena: string = "";
    //me sirve para agregarle las comillas a la cadena

    this.value?.forEach((x) => {  //print(4+3);
      
      let tr = x.traducir(entorno,arbol);
      
      
      

    
      
      

      
      //PRINT(5+6+7);

      //exp=5+6+7
      //exp.traducri

      //t1=5+6;
      //t2=t1+7;


      //return t2;


      //print(t2);
      

      
      //if(x instanceof Identificador) return this.print_Cadena(x.)
      
        if (TIPO.CADENA == x.tipo) {
          Print.print = true;

          cadena += "/*Imprimiendo secuencia de caracteres*/\n";
          cadena +=
            "/*Imprimiendo secuencia de caracteres\n---->" +
            tr +
            "<----\n*/\n";
          cadena += this.transform_cadena(tr, arbol);
          cadena += "printString();\n";
        }

        if (TIPO.ENTERO == x.tipo) {
          cadena += "/*Imprimiendo secuencia de caracteres*/\n";
          cadena +=
            "/*Imprimiendo secuencia de caracteres\n---->" +
            tr +
            "<----\n*/\n";
          cadena += 'printf("%d\\n",' + tr + ");\n";
        }

        if (TIPO.DECIMAL == x.tipo) {
          
          cadena += "/*Imprimiendo secuencia de caracteres*/\n";
          cadena +=
            "/*Imprimiendo secuencia de caracteres\n---->\n" +
            x.value +
            "<----\n*/\n";
          cadena += 'printf("%f\\n",' + tr + ");\n";
        }
      
      //if (TIPO.ENTERO == x.tipo) cadena += 'printf("%f"+stack['+x.posicion+']);';

      //cadena += " %f";

      // value_cadena += isCadena ? ', "' + x.value + '"' : "," + x.value;
      // isCadena = false;
    });

  Principal.historial += cadena;
    return "";
  }

  //TRANSFORMA CADENA A CODIGO ASCII DE CADA CARACTER QUE CONTENGA
  transform_cadena(x: string, arbol: Arbol): string {
    let return_string: string = "";

    return_string = "t" + Principal.temp + " = H;\n";
    //obtener codigo ASCII de cada caracter de la cadena
    //cadena en el heap
    for (let i = 0; i < x.length; i++) {
      let item: number = x.charCodeAt(i);
      return_string += "heap[(int)H] = " + item + " ;\n";
      return_string += "H = H + 1;\n";
      //console.log(item);
    }
    return_string += "heap[(int)H] = -1 ;\n";
    return_string += "H = H + 1;\n";

    //referencia de la cadena desde el stack
    Principal.posicion++;
    return_string +=
      "t" + Principal.posicion + " = P + " + Principal.posicion + ";\n";
    return return_string;
  }
}
