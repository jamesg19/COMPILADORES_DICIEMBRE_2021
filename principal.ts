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
import { NodoAST } from "./abs/nodo";
import { Nativas } from "./nativas";
import { Reporte } from "./analizador/reporte";
const Parser = require("./analizador/analizador");

export class Principal {
  static contador: number = 0;
  static temp: number = 0; //control de temporales
  static etiqueta = 0; //contro de etiquetas
  static posicion: number = 0; //guarda la poscion en el stack
  static heap: number = 0; //posicion en el heap    ???
  static historial: string = "";

  ejecutar(code: string) {
    const instrucciones = Parser.parse(code);
    
    const reporteE=instrucciones[1];
    
    
    reporteE.reporteGramatical.reverse().forEach((x)=>{
      console.log(x);
    })
    
    
    // reporteE.forEach((x)=>{
       console.log();
    // });


    //console.log(reporteE);
    //tabla
    let ts_global: TablaSimbolos = new TablaSimbolos(undefined);

    //ast
    const ast: Arbol = new Arbol(ts_global, instrucciones[0]);

    //interpreto 1ra pasada
    ast.instrucciones.forEach((element: Instruccion) => {
      if (element instanceof Funcion) {
        ast.funciones.push(element);
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
        element instanceof D_Id ||
        element instanceof Dec_Struct ||
        element instanceof Arreglo_Valor
      ) {
        console.log("ejecutar");
        let value = element.interpretar(ts_global, ast);

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

        let segunda_pasada = element.interpretar(ts_global, ast);

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

    // console.log("PROBANDO DOT.......*/*/*/*/");
    // //generacion de AST
    // const init=new NodoAST("RAIZ");
    // const instr=new NodoAST("INSTRUCCIONES");
    // ast.getInstrucciones().forEach((instruccion:Instruccion) => {
    //   instr.agregarHijoNodo(instruccion.getNodo());

    //});

    // init.agregarHijoNodo(instr);
    // //devuelve el codigo GRAPHIZ DEL AST
    // const grafo = ast.getDot(init);

    // console.log(grafo);
  }

  // /**************************************************Traduccion****************************************************** */
  // traducir(code: string) {
  //   const instrucciones = Parser.parse(code);
  //   //tabla
  //   let ts_global: TablaSimbolos = new TablaSimbolos(undefined);

  //   //ast
  //   const ast: Arbol = new Arbol(ts_global, instrucciones);

  //   //falta capturar los errores lexicos y sintacticos
  //   //1ra pasada
  //   //interpreto 1ra pasada
  //   let nativa: Nativas = new Nativas();
  //   let traducir = "";

  //   ast.instrucciones.forEach((element: Instruccion) => {
  //     //console.log(element);
  //     element.traducir(ts_global, ast);
  //   });
    
  //   let code_objeto = "";
  //   let print_nativa = nativa.print_function(ast);
  //   //console.log(nativa.print_function());

  //     code_objeto =
  //       ast.head + "\n" + ast.list_temporales() + "\n" + print_nativa + "\n";
    

  //   console.log(code_objeto + "\n" + Principal.historial);
  // }
}

//let principa: Principal = new Principal();

const fs = require("fs"),
  NOMBRE_ARCHIVO = "file.java";
fs.readFile(NOMBRE_ARCHIVO, "utf8", (error, datos) => {
  if (error) throw error;
  let principa: Principal = new Principal();
  // console.log(datos)
  principa.ejecutar(datos);
  //principa.traducir(datos);
  //console.log("El contenido es: ", datos);
});

// principa.ejecutar ('println(6>5);   '
//                     +'if(1>5){'
//                     +'println("entra if6>5");'
//                     +'} '
//                     +'else if(5>5){'
//                     +'println("entra else if 7>5 ");'
//                     +'} '
//                     +'else if(8>5){'
//                     +'println("entra else if 8>5 ");'
//                     +'} '
//                     +'else { println("entra AL FALSE");  } '
//                     +'println(true);'

//                     +'switch ("5+6"){'
//                     +'case "5+6":'
//                     +'println("ENTRA A SWITCH1");'
//                     +''
//                     +'case "5+6":'
//                     +'println("ENTRA A SWITCH2");'
//                     +'break;'
//                     +'default:'
//                     +' println("ENTRA A DEFAULT");'
//                     +'}'
//                     +''
//                     );

//principa.ejecutar ('println((true && true) && (true && true));');
