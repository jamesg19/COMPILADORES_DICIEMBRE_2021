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
import { NativasString } from '../expresiones/nativas/nativas_string';

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
  let contador:number = 0;
    this.value?.forEach((x) => {  //print(4+3);
      
      contador++;
      
      let tr = x.traducir(entorno,arbol); //t[0]
      
        //console.log(x);
        // if(x instanceof NativasString){
        //   Print.print = true;
        //   Principal.addComentario("Imprimiendo una expresion cadena tr"+tr);
        //   Principal.historial += "P = "+tr+";\n";
        //   Principal.historial += "printString();\n";
          
          
        //   Principal.historial += "printf(\"%s\",\"\\n\");\n"
          
        // }else 
        if(x instanceof Identificador){
          Print.print = true;
          Principal.addComentario("Imprimiendo una expresion cadena tr"+tr);
          Principal.historial += "P = "+tr+";\n";
          Principal.historial += "printString();\n";
          Principal.historial += "printf(\"%s\",\"\\n\");\n"
          
        }else if (TIPO.CADENA == x.tipo) {
          Print.print = true;
          
          
                    
          cadena += this.transform_cadena(x.value, arbol);
          cadena += "printString();\n";
          Principal.historial += "printf(\"%s\",\"\\n\");\n"
          
        }else if (TIPO.ENTERO == x.tipo) {
          
          cadena += 'printf("%d",' + tr + ");\n";
        }else if (TIPO.BOOLEAN == x.tipo) {
          
          cadena += 'printf("%f",' + tr + ");\n";
        }else if (TIPO.DECIMAL == x.tipo) {
          Principal.addComentario("Imprimiendo Decimal")
          cadena += 'printf("%f",' + tr + ");\n";
          
          
        }else if (TIPO.CARACTER == x.tipo) {
          
          
          cadena += 'printf("%c",' + "(int)"+tr + ");\n";
          
          
        }
        
        /*
        encerrar en un if para ver si requiere saltos de linea 
         */
         cadena += 'printf("\\n");\n';
      
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
    if(!x) x="c";
    
    for (let i = 0; i < x.length-1; i++) {
      let item: number = x.charCodeAt(i);
      return_string += "heap[(int)H] = " + item + " ;\n";
      return_string += "H = H + 1;\n";
      //console.log(item);
    }
    return_string += "heap[(int)H] = -1 ;\n";
    return_string += "H = H + 1;\n";

    //referencia de la cadena desde el stack
    //Principal.posicion;
    return_string +=
      "t" + Principal.temp + " = P + " + Principal.posicion + ";\n";
      
    return return_string;
  }
}
