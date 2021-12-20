import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";

import { Excepcion } from "../../table/excepcion";
import { TIPO } from "../../table/tipo";
import { TIPO_NATIVA_CADENA } from "./tiponativacadena";
import { Primitivo } from "../primitivo";
import { Console } from "console";
import { NodoAST } from "../../abs/nodo";
import { Principal } from "../../principal";
import { Identificador } from "../identificador";
import { isIdentifier } from "typescript";

export class NativasString extends Instruccion {
  identificador: Instruccion;
  tipo_operacion: TIPO_NATIVA_CADENA;
  inicio: Instruccion;
  final: Instruccion;
  fila: number;
  columna: number;
  tipo: TIPO;
  lista_nativas:NativasString[];
  static UPPER: boolean = false;
  static LOWER: boolean = false;
  static LEN: boolean = false;
  static CHAR: boolean = false;

  /**
   * CONSTRUCTOR DE OPERACION TANGENTE()
   * @param operador
   * @param identificador
   * @param fila
   * @param columna
   */
  constructor(
    id: Instruccion,
    tipo: TIPO_NATIVA_CADENA,
    inicio: Instruccion,
    final: Instruccion,
    fila: number,
    columna: number,
    lista_nativas?:NativasString[]
  ) {
    super(fila, columna);
    this.identificador = id;
    this.tipo_operacion = tipo;
    this.inicio = inicio;
    this.final = final;
    this.fila = fila;
    this.columna = columna;
    this.tipo = TIPO.CADENA;
    this.lista_nativas =lista_nativas;
  }
  interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
    try {

      if (this.identificador instanceof Identificador) {
        //VERIFICA QUE LA VARIABLE O ID EXISTAN
        const variable = entorno.getSimbolo(this.identificador.id);
        if (variable == null) {
          return new Excepcion(
            "Semantico","No existe la variable " + `${this.identificador}`,`${this.fila}`,`${this.columna}`);
        }
        //VERIFICA QUE SEA TIPO CADENA

        if (variable.tipo == TIPO.NULL) {
          return new Excepcion("Semantico","Error de operacion en variable NULL",`${this.fila}`,`${this.columna}`);
        }

        //VERIFICACION DE OPERACIONES NATIVAS EN ARREGLOS
        if (variable.arreglo) {
          if (this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT) {
            //codigo para length
            this.tipo=TIPO.ENTERO;
            if(this.lista_nativas == null || this.lista_nativas == undefined ){
              return variable.valor.length;
            }else{
              //variable
              let dato=cadena.length;
              //ciclo
              this.lista_nativas.forEach((x)=>{
                //new NativasString(id,tipo,inicio,fin,linea,columna);
                const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
                const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna,null)
  
                dato=temp.interpretar(entorno,arbol);
              });
              return dato;
            }
          }
        }

        if (variable.tipo != TIPO.CADENA) {
          return new Excepcion("Semantico","Error de operacion en variable diferente a Cadena",`${this.fila}`,`${this.columna}`);
        }

        //DETERMINA SI ES LOWER_CASE
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOLOWER) {
          var cadena = variable.getValor() + "";
          this.tipo=TIPO.CADENA;
          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.toLowerCase();
          }else{
            
            //variable
            let dato=cadena.toLowerCase();
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna)
              
              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
        }

        //DETERMINA SI ES UPPER_CASE
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOUPPER) {
          var cadena = variable.getValor() + "";
          this.tipo=TIPO.CADENA;
          
          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.toUpperCase();
          }else{
            //variable
            let dato=cadena.toUpperCase();
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna,null)

              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
          
        }
        //DETERMINA SI ES LENGTH
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT) {
          if (this.tipo_operacion.tipo == TIPO.ARREGLO) {
          }
          var cadena = variable.getValor() + "";
          this.tipo=TIPO.ENTERO;
          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.length;
          }else{
            //variable
            let dato=cadena.length;
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna,null)

              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
        }

        //DETERMINA SI ES SUBSTRING
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.SUBSTRING) {
          const aa = this.inicio.interpretar(entorno, arbol);
          const b = this.final.interpretar(entorno, arbol);
          //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
          if (aa instanceof Excepcion) {
            return aa;
          }
          if (b instanceof Excepcion) {
            return b;
          }
          var cadena = variable.getValor() + "";

          if (this.inicio.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro inicio en subString no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          if (this.final.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en subString no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          if (
            this.inicio.interpretar(entorno, arbol) < 0 &&
            this.final.interpretar(entorno, arbol) < 0
          ) {
            return new Excepcion(
              "Semantico",
              "Parametro negativo en Substring",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.final.interpretar(entorno, arbol) > cadena.length) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en subString fuera de los limites",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          this.tipo=TIPO.CADENA;
          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.substring(aa,b);
          }else{
            //variable
            let dato=cadena.substring(aa,b);
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna,null)

              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
        }

        //DETERMINA SI ES CARACTER OF POSITION
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.CARACTER_POSITION) {
          const aa = this.inicio.interpretar(entorno, arbol);

          //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
          if (aa instanceof Excepcion) {
            return aa;
          }

          var cadena = variable.getValor() + "";

          if (this.inicio.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro inicio en caracterOfPosition no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.inicio.interpretar(entorno, arbol) < 0) {
            return new Excepcion(
              "Semantico",
              "Parametro negativo en caracterOfPosition",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.inicio.interpretar(entorno, arbol) > cadena.length) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en caracterOfPosition fuera de los limites",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          this.tipo=TIPO.CADENA;
          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.charAt(aa);
          }else{
            //variable
            let dato=cadena.charAt(aa);
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna,null)

              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
        }
      } 
      ///
      ///
      ///
      else {
        //console.log("ENTRA AQUI"+this.identificador);
        //VERIFICA QUE LA VARIABLE O ID EXISTAN
        const variable = this.identificador;

        //DETERMINA SI ES LOWER_CASE
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOLOWER) {
          var cadena = variable + "";
          this.tipo=TIPO.CADENA;

          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.toLowerCase();
          }else{
            
            //variable
            var dato=cadena.toLowerCase();
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna)
              
              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
        }

        //DETERMINA SI ES UPPER_CASE
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOUPPER) {
          var cadena = variable + "";
          this.tipo=TIPO.CADENA;

          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.toUpperCase();
          }else{
            
            //variable
            let dato=cadena.toUpperCase();
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna)
              
              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
        }
        //DETERMINA SI ES LENGTH
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT) {
          if (this.tipo_operacion.tipo == TIPO.ARREGLO) {
          }
          //console.log(this.tipo_operacion.tipo);
          var cadena = variable + "";
          this.tipo=TIPO.ENTERO;

          return cadena.length;
        }

        //DETERMINA SI ES SUBSTRING
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.SUBSTRING) {
          const aa = this.inicio.interpretar(entorno, arbol);
          const b = this.final.interpretar(entorno, arbol);
          //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
          if (aa instanceof Excepcion) {
            return aa;
          }
          if (b instanceof Excepcion) {
            return b;
          }
          var cadena = variable + "";

          if (this.inicio.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro inicio en subString no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          if (this.final.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en subString no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          if (
            this.inicio.interpretar(entorno, arbol) < 0 &&
            this.final.interpretar(entorno, arbol) < 0
          ) {
            return new Excepcion(
              "Semantico",
              "Parametro negativo en Substring",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.final.interpretar(entorno, arbol) > cadena.length) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en subString fuera de los limites",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          this.tipo=TIPO.CADENA;

          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.substring(aa,b);
          }else{
            //variable
            let dato=cadena.substring(aa,b);
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna,null)

              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
        }

        //DETERMINA SI ES CARACTER OF POSITION
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.CARACTER_POSITION) {
          const aa = this.inicio.interpretar(entorno, arbol);

          //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
          if (aa instanceof Excepcion) {
            return aa;
          }

          var cadena = variable + "";

          if (this.inicio.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro inicio en caracterOfPosition no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.inicio.interpretar(entorno, arbol) < 0) {
            return new Excepcion(
              "Semantico",
              "Parametro negativo en caracterOfPosition",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.inicio.interpretar(entorno, arbol) > cadena.length) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en caracterOfPosition fuera de los limites",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          this.tipo=TIPO.CADENA;

          if(this.lista_nativas == null || this.lista_nativas == undefined ){
            return cadena.charAt(aa);
          }else{
            //variable
            let dato=cadena.charAt(aa);
            //ciclo
            this.lista_nativas.forEach((x)=>{
              //new NativasString(id,tipo,inicio,fin,linea,columna);
              const primitivo=new Primitivo(TIPO.CADENA,dato,this.fila,this.columna);
              const temp=new NativasString(primitivo.interpretar(entorno,arbol),x.tipo_operacion,x.inicio,x.final,this.fila,this.columna,null)

              dato=temp.interpretar(entorno,arbol);
            });
            return dato;
          }
        }
      }

      return new Excepcion(
        "Semantico",
        `Tipo de datos invalido para metodo nativo string() `,
        `${this.fila}`,
        `${this.columna}`
      );
    } catch (error) {
      return new Excepcion(
        "Semantico",
        "QUETZAL Null Poiter .toLowercase() tipo dato incorrecto ",
        `${this.fila}`,
        `${this.columna}`
      );
    }
  }

  getNodo() {
    const nodo = new NodoAST("NATIVAS STRING");
    if (this.tipo_operacion == TIPO_NATIVA_CADENA.BOOLEANPARSE) {
      nodo.agregarHijo("BOOLEANPARSE");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.CARACTER_POSITION) {
      nodo.agregarHijo("CARACTER_POSITION");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.DOUBLEPARSE) {
      nodo.agregarHijo("DOUBLEPARSE");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.INTPARSE) {
      nodo.agregarHijo("INTPARSE");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT) {
      nodo.agregarHijo("LENGHT");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.REPETICION) {
      nodo.agregarHijo("REPETICION");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.SUBSTRING) {
      nodo.agregarHijo("SUBSTRING");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.TODOUBLE) {
      nodo.agregarHijo("TODOUBLE");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOINT) {
      nodo.agregarHijo("TOINT");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOLOWER) {
      nodo.agregarHijo("TOLOWER");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOSTRING) {
      nodo.agregarHijo("TOSTRING");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOUPPER) {
      nodo.agregarHijo("TOUPPER");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.TYPEOF) {
      nodo.agregarHijo("TYPEOF");
    } else if (this.tipo_operacion == TIPO_NATIVA_CADENA.STRING) {
      nodo.agregarHijo("STRING");
    }
    nodo.agregarHijoNodo(this.identificador.getNodo());
    return nodo;
  }

  obtenerVal(tipo: TIPO, val: string): any {
    try {
      if (tipo === TIPO.ENTERO || tipo === TIPO.DECIMAL) {
        return Number(val);
      } else if (tipo === TIPO.BOOLEAN) {
        if (val.toLowerCase() === "true") {
          return true;
        } else {
          return false;
        }
      } else if (tipo === TIPO.CADENA) {
        return val;
      } else {
        return val;
      }
    } catch (error) {
      return new Excepcion(
        "Semantico",
        `No se pudo obtener el valor en Sen() `,
        `${this.fila}`,
        `${this.columna}`
      );
    }
  }
  ///--------------------------------------TRADUCIR------------------------------
  ///--------------------------------------TRADUCIR------------------------------
  ///--------------------------------------TRADUCIR------------------------------
  traducir(entorno: TablaSimbolos, arbol: Arbol) {
    try {
      //VERIFICA QUE LA VARIABLE O ID EXISTAN
      if (this.identificador instanceof Identificador) {
        const variable = entorno.getSimbolo(this.identificador.id);
        if (variable == null) {
          return new Excepcion(
            "Semantico",
            "No existe la variable " + `${this.identificador.id}`,
            `${this.fila}`,
            `${this.columna}`
          );
        }
        
        //VERIFICA QUE SEA TIPO CADENA

        if (variable.tipo == TIPO.NULL) {
          return new Excepcion(
            "Semantico",
            "Error de operacion en variable NULL",
            `${this.fila}`,
            `${this.columna}`
          );
        }

        //VERIFICACION DE OPERACIONES NATIVAS EN ARREGLOS
        if (variable.arreglo) {
          if (this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT) {
            //codigo para length
            //return variable.valor.length;
          
          }
        }

        if (variable.tipo != TIPO.CADENA) {
          return new Excepcion(
            "Semantico",
            "Error de operacion en variable diferente a Cadena",
            `${this.fila}`,
            `${this.columna}`
          );
        }

        //DETERMINA SI ES LOWER_CASE
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOLOWER) {
          Principal.addComentario("=========>ToLowerCase<============");

          Principal.historial += "P = " + variable.posicion + ";\n";
          Principal.historial += "toLower();\n";
          NativasString.LOWER = true;

          Principal.addComentario("=========>Fin TO ToLowerCase<============");

          return "P";
        }

        //DETERMINA SI ES UPPER_CASE
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOUPPER) {
          //////traduccion
          Principal.addComentario("=========>toUpperCase<============");

          Principal.historial += "P = " + variable.posicion + ";\n";
          Principal.historial += "toUpper();\n";
          NativasString.UPPER = true;

          Principal.addComentario("=========>Fin TO Uppercase<============");

          return "P";
        }
        //DETERMINA SI ES LENGTH
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT) {
          if (this.tipo_operacion.tipo == TIPO.ARREGLO) {
          }
          this.tipo = TIPO.DECIMAL;
          Principal.addComentario("=========>Length<============");
          NativasString.LEN = true;
          Principal.historial += "P = " + variable.posicion + ";\n";
          Principal.historial += "len();\n";

          Principal.addComentario("=========>Fin TO Length<============");

          return "stack[(int)P]";
        }

        //DETERMINA SI ES SUBSTRING
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.SUBSTRING) {
          const aa = this.inicio.traducir(entorno, arbol);
          const b = this.final.traducir(entorno, arbol);
          //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
          if (aa instanceof Excepcion) {
            return aa;
          }
          if (b instanceof Excepcion) {
            return b;
          }
          var cadena = variable.getValor() + "";

          if (this.inicio.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro inicio en subString no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          if (this.final.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en subString no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          if (
            this.inicio.traducir(entorno, arbol) < 0 &&
            this.final.traducir(entorno, arbol) < 0
          ) {
            return new Excepcion(
              "Semantico",
              "Parametro negativo en Substring",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.final.traducir(entorno, arbol) > cadena.length) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en subString fuera de los limites",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          return cadena.substring(aa, b);
        }

        //DETERMINA SI ES CARACTER OF POSITION
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.CARACTER_POSITION) {
          const aa = this.inicio.traducir(entorno, arbol);

          //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
          if (aa instanceof Excepcion) {
            return aa;
          }

          var cadena = variable.getValor() + "";

          if (this.inicio.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro inicio en caracterOfPosition no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.inicio.traducir(entorno, arbol) < 0) {
            return new Excepcion(
              "Semantico",
              "Parametro negativo en caracterOfPosition",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.inicio.traducir(entorno, arbol) > cadena.length) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en caracterOfPosition fuera de los limites",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          //return cadena.charAt(this.inicio.interpretar(entorno,arbol));
          Principal.addComentario("=========>CharAt<============");
          let temp = Principal.posicion;
          temp++;

          NativasString.CHAR = true;

          let tempE = Principal.temp;
          tempE++;
          let t = "t" + tempE + ";\n";
          Principal.temp = tempE;
          //this.inicio.traducir(entorno,arbol)
          t = this.inicio.traducir(entorno, arbol); //obtengo el indice
          Principal.historial += "stack[(int)" + (temp+1) + "] = " + (t) + ";\n"; //posicion de donde se guarda el indice

          Principal.historial += "P = " + (temp+1) + ";\n";
          Principal.historial += "charAt();\n";
          this.tipo = TIPO.CARACTER;
          Principal.addComentario("=========>Fin char at<============");

          return "stack[(int)P]";
        }
      } else {
        //console.log("ENTRA AQUI"+this.identificador);
        //VERIFICA QUE LA VARIABLE O ID EXISTAN
        
        const variable = this.identificador;
        

        //DETERMINA SI ES LOWER_CASE
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOLOWER) {
          var cadena = variable + "";
          //xxxxxxxxxxxxxxxxxxxxxx

          let transf = this.transform_cadena(cadena, arbol);

          Principal.addComentario(
            "=========>ToLowerCase para Cadena<============" + cadena
          );

          Principal.historial += "P = " + Principal.posicion + ";\n";
          Principal.historial += "toLower();\n";
          NativasString.LOWER = true;

          Principal.addComentario(
            "=========>Fin TO ToLowerCase para Cadena<============"
          );

          return transf; //"P";
        }

        //DETERMINA SI ES UPPER_CASE
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.TOUPPER) {
          var cadena = variable + "";

          Principal.addComentario(
            "=========>toUpperCase Para Una Cadena<============"
          );

          let transf = this.transform_cadena(cadena, arbol);

          Principal.historial += "P = " + Principal.posicion + ";\n";
          Principal.historial += "toUpper();\n";
          NativasString.UPPER = true;

          Principal.addComentario(
            "=========>Fin TO Uppercase Para Cadena<============"
          );

          return "P";
        }
        //DETERMINA SI ES LENGTH
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT) {
          if (this.tipo_operacion.tipo == TIPO.ARREGLO) {
          }
          //console.log(this.tipo_operacion.tipo);
          var cadena = variable + "";

          this.tipo = TIPO.DECIMAL;
          Principal.addComentario("=========>Length Para Cadenas<============");
          NativasString.LEN = true;
          Principal.historial += "P = " + Principal.posicion + ";\n";
          Principal.historial += "len();\n";

          Principal.addComentario(
            "=========>Fin TO Length Para Cadenas<============"
          );

          return "stack[(int)P]";
        }

        //DETERMINA SI ES SUBSTRING
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.SUBSTRING) {
          const aa = this.inicio.interpretar(entorno, arbol);
          const b = this.final.interpretar(entorno, arbol);
          //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
          if (aa instanceof Excepcion) {
            return aa;
          }
          if (b instanceof Excepcion) {
            return b;
          }
          var cadena = variable + "";

          if (this.inicio.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro inicio en subString no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          if (this.final.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en subString no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }
          if (
            this.inicio.interpretar(entorno, arbol) < 0 &&
            this.final.interpretar(entorno, arbol) < 0
          ) {
            return new Excepcion(
              "Semantico",
              "Parametro negativo en Substring",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.final.interpretar(entorno, arbol) > cadena.length) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en subString fuera de los limites",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          return cadena.substring(aa, b);
        }

        //DETERMINA SI ES CARACTER OF POSITION
        if (this.tipo_operacion == TIPO_NATIVA_CADENA.CARACTER_POSITION) {
          const aa = this.inicio.interpretar(entorno, arbol);

          //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
          if (aa instanceof Excepcion) {
            return aa;
          }

          var cadena = variable + "";

          if (this.inicio.tipo != TIPO.ENTERO) {
            return new Excepcion(
              "Semantico",
              "Parametro inicio en caracterOfPosition no es Entero",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.inicio.interpretar(entorno, arbol) < 0) {
            return new Excepcion(
              "Semantico",
              "Parametro negativo en caracterOfPosition",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          if (this.inicio.interpretar(entorno, arbol) > cadena.length) {
            return new Excepcion(
              "Semantico",
              "Parametro fin en caracterOfPosition fuera de los limites",
              `${this.fila}`,
              `${this.columna}`
            );
          }

          //return cadena.charAt(this.inicio.interpretar(entorno, arbol));

          Principal.addComentario("=========>CharAt Para Cadena<============");
          let temp = Principal.posicion;//posicion actual
          temp++;

          NativasString.CHAR = true;

          let tempE = Principal.temp;
          tempE++;
          let t = "t" + tempE + ";\n";
          Principal.temp = tempE;
          //this.inicio.traducir(entorno,arbol)
          t = this.inicio.traducir(entorno, arbol); //obtengo el indice
          Principal.historial += "stack[(int)" + temp + "] = " + t + ";\n"; //posicion de donde se guarda el indice

          Principal.historial += "P = " + temp + ";\n";
          Principal.historial += "charAt();\n";

          this.tipo = TIPO.CARACTER;
          
          Principal.addComentario(
            "=========>Fin char at Para Cadena<============"
          );
        
        
        let tempLabel = Principal.temp;
        tempLabel++;
        let tLabel = "t"+tempLabel;
        
        tempLabel++;
        let tLabel2 = "t"+tempLabel;
        
        Principal.historial += tLabel+" = stack[(int)P];\n ";
        
        
          return tLabel;
          
        }
      }
      return new Excepcion(
        "Semantico",
        `Tipo de datos invalido para metodo nativo string() `,
        `${this.fila}`,
        `${this.columna}`
      );
    } catch (error) {
      return new Excepcion(
        "Semantico",
        "QUETZAL Null Poiter .toLowercase() tipo dato incorrecto ",
        `${this.fila}`,
        `${this.columna}`
      );
    }
  }

  transform_cadena(x: string, arbol: Arbol): string {
    Principal.addComentario("Transformando Cadena");

    let temp = Principal.temp; //nuevo temporal
    temp++;

    let t0: string = "t" + temp;
    Principal.addComentario("Agregando Cadena " + x + " en " + t0);
    
    Principal.historial += t0 + " = H;\n";//se almacena el puntero del heap que seencuentra en el tope del "monticulo"
    Principal.temp = temp;

    //obtener codigo ASCII de cada caracter de la cadena
    //cadena en el heap
    for (let i = 0; i < x.length; i++) {
      let item: number = x.charCodeAt(i);
      Principal.historial += "heap[(int)H] = " + item + " ;\n";
      Principal.historial += "H = H + 1;\n";
      //console.log(item);
    }
    Principal.historial += "heap[(int)H] = -1 ;\n";
    Principal.historial += "H = H + 1;\n";

    //referencia de la cadena desde el stack
    //Principal.posicion;
    let cont = Principal.temp;
    cont++;
    
    let t: string = "t" + cont;

    Principal.historial += t + " = " + (Principal.posicion+1) + ";\n";//posicion actual disponible

    //Principal.historial += t + "= " + t + " + " + 1 + ";\n";

    Principal.historial += "stack[(int)" + t + "] = " + t0 + ";\n";

    Principal.addComentario(
      "Fin transformacion decadena, se devuelve el puntero"
    );
    return t;
  }
}
