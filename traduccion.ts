import { Arbol } from "./table/arbol";
import { TablaSimbolos } from "./table/tablasimbolos";
import { Instruccion } from "./abs/Instruccion";
import { Funcion } from "./instruccion/funcion";
import { Struct } from "./expresiones/struct/struct";
import { Excepcion } from "./table/excepcion";
import { Arreglo } from "./expresiones/array/declarar_array";
import { D_IdExp } from "./instruccion/declaracion_idexp";
import { Asignacion_Struct } from "./expresiones/struct/asignacion_struct";
import { D_Id } from "./instruccion/declaracion_id";
import { Dec_Struct } from "./expresiones/struct/instancia_struct";
import { Asignacion } from "./instruccion/asignacion";
import { Arreglo_Valor } from "./expresiones/array/array_valor";
import { Break } from "./instruccion/break";
import { Main } from "./instruccion/main";
import { Print } from "./instruccion/print";
import { NativasString } from "./expresiones/nativas/nativas_string";
//import { Reporte } from "./analizador/reporte";
import { Reporte } from "./analizador/reporte";
const Parser = require("./analizador/analizador");
import { Nativas } from "./nativas";
import { List_Declaracion } from "./instruccion/list_declaracion";
import { Principal } from "./principal";
import { Potencia } from './expresiones/artimetica/potencia';
import { RepeticionCadena } from './expresiones/nativas/repeticion_cadena';
import { Pow } from './expresiones/nativas/pow';
import { Acceso } from './expresiones/array/acceso';

export class Traducir {
  static funciones: string = "";

  traducir(code: string) {
    const instrucciones = Parser.parse(code);

    let ts_global: TablaSimbolos = new TablaSimbolos(undefined);

    //ast
    const ast: Arbol = new Arbol(ts_global, instrucciones[0]);

    ast.excepciones.forEach((element) => {
      console.log("excepciones",element);
    });
    //interpreto 1ra pasada
    ast.instrucciones.forEach((element: Instruccion) => {
      if (element instanceof Funcion) {
        let posicion = Principal.posicion;
        posicion++;
        element.posicion = posicion;
        ast.funciones.push(element);
        element.traducir(ts_global, ast);
        Principal.posicion = posicion;
      }
      if (element instanceof Struct) {
        if (ast.structs.has(element.id))
          return new Excepcion(
            "Semantico",
            "Struct duplicado " + element.id,
            element.fila + "",
            element.columna + ""
          );

        ast.structs.set(element.id, element);
      }
      //Declaracion y asignaciones) or isinstance(instruccion, Asignacion):
      if (
        element instanceof Asignacion ||
        element instanceof Asignacion_Struct ||
        element instanceof Arreglo ||
        element instanceof D_IdExp ||
        element instanceof List_Declaracion ||
        element instanceof D_Id ||
        element instanceof List_Declaracion ||
        element instanceof Dec_Struct ||
        element instanceof Arreglo_Valor ||
        element instanceof Arreglo ||
        element instanceof Dec_Struct
      ) {
        //console.log("ejecutar");
        let value = element.traducir(ts_global, ast);

        if (value instanceof Excepcion) {
          ast.excepciones.push(value);
          ast.updateConsolaError(value.toString());
        }
        if (value instanceof Break) {
          let e = new Excepcion(
            "Semantico",
            "Break fuera de ciclo",
            element.fila + "",
            element.columna + ""
          );
          ast.excepciones.push(e);
          ast.updateConsolaError(e.toString());
        }
      }
    });

    //segunda pasada
    //
    let contador: number = 0;
    ast.instrucciones.forEach((element) => {
      if (element instanceof Main) {
        contador += 1;
        if (contador == 2) {
          let e = new Excepcion(
            "Semantico",
            "Error en cantidad de Main",
            element.fila + "",
            element.columna + ""
          );
          ast.excepciones.push(e);
          ast.updateConsolaError(e.toString);
          return;
        }

        let segunda_pasada = element.traducir(ts_global, ast);

        if (segunda_pasada instanceof Excepcion) {
          ast.excepciones.push(segunda_pasada);
          ast.updateConsolaError(segunda_pasada.toString);
        }
        if (segunda_pasada instanceof Break) {
          let e = new Excepcion(
            "Semantico",
            "Break fuera de ciclo",
            element.fila + "",
            element.columna + ""
          );
          ast.excepciones.push(e);
          ast.updateConsolaError(e.toString());
        }
      }
    });

    //3era pasada
    ast.instrucciones.forEach((element) => {
      //if(!(element instanceof Main || ) )
      //console.log("Sentencias fuera de Main")
    });

    let code_objeto = "";
    let nativa: Nativas = new Nativas();
    let print_nativa = Print.print ? nativa.print_function(ast) : "";
    let string_upper = NativasString.UPPER ? nativa.toUpper() : "";
    let string_len = NativasString.LEN ? nativa.getLength() : "";
    let string_lower = NativasString.LOWER ? nativa.toLower() : "";
    let string_char = NativasString.LOWER ? nativa.charAt() : "";
    let potencia_str = RepeticionCadena.REPETICION ? nativa.potencia_string() : "";
    let potencia_int = Pow.Pow? nativa.potencia_int()+"\n" : "";
    let acceso = Acceso.ACCCESO? nativa.acceso_array()+"\n" : "";
    code_objeto =ast.head +
      "\n" +
      ast.list_temporales() +
      "\n" +
      string_upper +
      "\n" +
      string_lower +
      "\n" +
      string_len +
      "\n" +
      string_char +
      "\n" +
      potencia_str+  
      "\n" +
      potencia_int+
      "\n"+
      acceso+
      "\n"+
      print_nativa +
      "\n";

    console.log(code_objeto + "\n" + Principal.historial);
  }

  // /**************************************************Traduccion****************************************************** */

  static addComentario(comentario: string) {
    Principal.historial += "/* " + comentario + " */\n";
  }
}

//let principa: Principal = new Principal();

const fs = require("fs"),
  NOMBRE_ARCHIVO = "file.java";

fs.readFile(NOMBRE_ARCHIVO, "utf8", (error, datos) => {
  if (error) throw error;
  let traducir: Traducir = new Traducir();
  // console.log(datos)
  traducir.traducir(datos);
  //principa.ejecutar(datos);
  //console.log("El contenido es: ", datos);
});
