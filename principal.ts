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
import { TIPO } from "./table/tipo";
import { NodoAST } from "./abs/nodo";
import { TSreporte } from "./instruccion/TSreporte";
import { TSelemento } from "./instruccion/TSelemento";

export class Principal {
  static contador: number = 0;
  static temp: number = 0; //control de temporales
  static etiqueta = 0; //contro de etiquetas
  static posicion: number = 0; //guarda la poscion en el stack
  static heap: number = 0; //posicion en el heap    ???
  static historial: string = "";
  arbolG:Arbol;
  reporteGramatica:TSreporte;

  ejecutar(code: string) {
    
    const instrucciones =  Parser.parse(code);
    
    const reporteE=instrucciones[1];
    
    const reporteGramatical=new TSreporte();
    reporteE.reporteGramatical.reverse().forEach((x)=>{

      let elemento=new TSelemento(x["produccion"],x["regla"],"",Number(""),Number(""));
      reporteGramatical.listaElementos.push(elemento);

    });
    this.reporteGramatica=reporteGramatical;

    // reporteE.forEach((x)=>{

    // });

    //console.log(reporteE);
    //tabla
    let ts_global: TablaSimbolos = new TablaSimbolos(undefined);

    //ast
    const ast: Arbol = new Arbol(ts_global, instrucciones[0]);
    
    ast.excepciones.forEach((element)=>{ console.log(element)});
    

    
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
        element instanceof List_Declaracion ||
        element instanceof D_Id ||
        element instanceof List_Declaracion ||
        element instanceof Dec_Struct ||
        element instanceof Arreglo_Valor ||
        element instanceof Arreglo||
        element instanceof Dec_Struct
      ) {
        //console.log("ejecutar");
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

    

    ast.excepciones.forEach((x)=>{
      console.log(x.toString());
    });



    //3era pasada
    ast.instrucciones.forEach((element) => {
      //if(!(element instanceof Main || ) )
      //console.log("Sentencias fuera de Main")
    });

    this.arbolG=ast;
    //this.graficarAST();
  }

  // /**************************************************Traduccion****************************************************** */
  traducir(code: string) {
    const instrucciones = Parser.parse(code);
    //tabla
    let ts_global: TablaSimbolos = new TablaSimbolos(undefined);

    //ast
    const ast: Arbol = new Arbol(ts_global, instrucciones[0]);
    // console.log(instrucciones[0]);
    // console.log(ast.instrucciones);
    //ast.instrucciones[0].interpretar(ts_global, ast);
     ast.instrucciones.forEach((element: Instruccion) => {
       //console.log(element);
       element.traducir(ts_global, ast);
     });

    
    let code_objeto = "";
    let nativa: Nativas = new Nativas();
    let print_nativa = Print.print ? nativa.print_function(ast) : "";
    let string_upper = NativasString.UPPER ? nativa.toUpper() : "";
    let string_len = NativasString.LEN ? nativa.getLength() : "";
    let string_lower = NativasString.LOWER ? nativa.toLower() : "";
    let string_char = NativasString.LOWER ? nativa.charAt() : "";

    code_objeto =
      ast.head +
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
      print_nativa +
      "\n";

    console.log(code_objeto + "\n" + Principal.historial);
  }
  static addComentario(comentario: string) {
    Principal.historial += "/* " + comentario + " */\n";
  }

  graficarTS(){
    let codigoHTMLErrorr=" ";
    //RECORRE LA CANTIDAD DE TABLAS ALMACENADAS EN EL ARBOL
    this.arbolG.graficarts.forEach((graph)=>{
        // console.log("----------INICIO TABLA----------- ");
        codigoHTMLErrorr+="<table id=\"example\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\">\n"
              +"<thead>\n"
                +"<tr>\n"
                  +"<th>ID</th>\n"
                    +"<th>TIPO</th>\n"
                    +"<th>VALOR</th>\n"
                    +"<th>FILA</th>\n"
                    +"<th>COLUMNA</th>\n"
                  +"</tr>\n"
              +"</thead>\n"
          +"<tbody>\n";
        graph.listaElementos.forEach((x)=>{
           //console.log("ID "+x.id+" TIPO "+x.tipo+" VALOR "+x.valor+" FILA "+x.fila +" COLUMNA "+x.columna);
         
           codigoHTMLErrorr+="<tr>\n";
           codigoHTMLErrorr+="<td>"+x.id+"</td>\n";
           codigoHTMLErrorr+="<td>"+x.tipo+"</td>\n";
           codigoHTMLErrorr+="<td>"+x.valor+"</td>\n";
           codigoHTMLErrorr+="<td>"+x.fila+"</td>\n";
           codigoHTMLErrorr+="<td>"+x.columna+"</td>\n";
           codigoHTMLErrorr+="</tr>\n";
         
         
          });

          codigoHTMLErrorr+="</tbody>\n"+"</table>\n";

      });
      console.log("----------INICIO TABLA----------- ");
      console.log(codigoHTMLErrorr);
    console.log("----------FIN TABLA----------- ");
      return codigoHTMLErrorr;
  }



  graficarAST():string{
    console.log("-----------GENERANDO AST-----------");
    //generacion de AST
    const init=new NodoAST("RAIZ");
    const instr=new NodoAST("INSTRUCCIONES");
    this.arbolG.getInstrucciones().forEach((instruccion:Instruccion) => {
      instr.agregarHijoNodo(instruccion.getNodo());

    });

    init.agregarHijoNodo(instr);
    //devuelve el codigo GRAPHIZ DEL AST
    const grafo = this.arbolG.getDot(init);

    return grafo;
  }

  getErrores(){
    let codigoHTMLError="<table id=\"example\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\">\n"
    +"<thead>\n"
    +"<tr>\n"
        +"<th>TIPO</th>\n"
            +"<th>DESCRIPCCION</th>\n"
            +"<th>FILA</th>\n"
            +"<th>COLUMNA</th>\n"
            +"</tr>\n"
        +"</thead>\n"
    +"<tbody>\n"

    this.arbolG.excepciones.forEach((x)=>{
      
      codigoHTMLError+="<tr>\n";
      codigoHTMLError+="<td>"+x.tipo+"</td>\n";
      codigoHTMLError+="<td>"+x.descripcion+"</td>\n";
      codigoHTMLError+="<td>"+x.fila+"</td>\n";
      codigoHTMLError+="<td>"+x.columna+"</td>\n";
      codigoHTMLError+="</tr>\n";
    });
    codigoHTMLError+="</tbody>\n"
    +"</table>\n";
    return codigoHTMLError;
  }

  getReporteGramatical(){
    let codigoHTMLError="";
    codigoHTMLError+="<table id=\"example\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\">\n"
          +"<thead>\n"
          +"<tr>\n"
              +"<th>PRODUCCION</th>\n"
                  +"<th>VALOR</th>\n"
                  +"</tr>\n"
              +"</thead>\n"
          +"<tbody>\n";   
    this.reporteGramatica.listaElementos.forEach((x)=>{
      
            codigoHTMLError+="<tr>\n";
           codigoHTMLError+="<td>"+x.id+"</td>\n";
           codigoHTMLError+="<td>"+x.tipo+"</td>\n";
           codigoHTMLError+="</tr>\n";
    });

          codigoHTMLError+="</tbody>\n"+"</table>\n";

        // console.log("----------FIN TABLA----------- ");

      return codigoHTMLError;
  }




  getConsola():string{
    return this.arbolG.consola;
  }
}

// let principa: Principal = new Principal();

// const fs = require("fs"),NOMBRE_ARCHIVO = "file.java";

// fs.readFile(NOMBRE_ARCHIVO, "utf8", (error, datos) => {
//   if (error) throw error;
//   let principa: Principal = new Principal();
//   //console.log(datos)
//   principa.ejecutar(datos);
//   //principa.traducir(datos);
//   //console.log("El contenido es: ", datos);
// });
