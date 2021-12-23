"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Principal = void 0;
const arbol_1 = require("./table/arbol");
const tablasimbolos_1 = require("./table/tablasimbolos");
const funcion_1 = require("./instruccion/funcion");
const struct_1 = require("./expresiones/struct/struct");
const excepcion_1 = require("./table/excepcion");
const declarar_array_1 = require("./expresiones/array/declarar_array");
const declaracion_idexp_1 = require("./instruccion/declaracion_idexp");
const asignacion_struct_1 = require("./expresiones/struct/asignacion_struct");
const declaracion_id_1 = require("./instruccion/declaracion_id");
const instancia_struct_1 = require("./expresiones/struct/instancia_struct");
const asignacion_1 = require("./instruccion/asignacion");
const array_valor_1 = require("./expresiones/array/array_valor");
const break_1 = require("./instruccion/break");
const main_1 = require("./instruccion/main");
const print_1 = require("./instruccion/print");
const nativas_string_1 = require("./expresiones/nativas/nativas_string");
const Parser = require("./analizador/analizador");
const nativas_1 = require("./nativas");
const list_declaracion_1 = require("./instruccion/list_declaracion");
const nodo_1 = require("./abs/nodo");
const TSreporte_1 = require("./instruccion/TSreporte");
const TSelemento_1 = require("./instruccion/TSelemento");
class Principal {
    ejecutar(code) {
        const instrucciones = Parser.parse(code);
        const reporteE = instrucciones[1];
        const reporteGramatical = new TSreporte_1.TSreporte();
        reporteE.reporteGramatical.reverse().forEach((x) => {
            let elemento = new TSelemento_1.TSelemento(x["produccion"], x["regla"], "", Number(""), Number(""));
            reporteGramatical.listaElementos.push(elemento);
        });
        this.reporteGramatica = reporteGramatical;
        // reporteE.forEach((x)=>{
        // });
        //console.log(reporteE);
        //tabla
        let ts_global = new tablasimbolos_1.TablaSimbolos(undefined);
        //ast
        const ast = new arbol_1.Arbol(ts_global, instrucciones[0]);
        ast.excepciones.forEach((element) => { console.log(element); });
        //interpreto 1ra pasada
        ast.instrucciones.forEach((element) => {
            if (element instanceof funcion_1.Funcion) {
                ast.funciones.push(element);
            }
            if (element instanceof struct_1.Struct) {
                if (ast.structs.has(element.id))
                    return new excepcion_1.Excepcion("Semantico", "Struct duplicado " + element.id, element.fila + "", element.columna + "");
                ast.structs.set(element.id, element);
            }
            //Declaracion y asignaciones) or isinstance(instruccion, Asignacion):
            if (element instanceof asignacion_1.Asignacion ||
                element instanceof asignacion_struct_1.Asignacion_Struct ||
                element instanceof declarar_array_1.Arreglo ||
                element instanceof declaracion_idexp_1.D_IdExp ||
                element instanceof list_declaracion_1.List_Declaracion ||
                element instanceof declaracion_id_1.D_Id ||
                element instanceof list_declaracion_1.List_Declaracion ||
                element instanceof instancia_struct_1.Dec_Struct ||
                element instanceof array_valor_1.Arreglo_Valor ||
                element instanceof declarar_array_1.Arreglo ||
                element instanceof instancia_struct_1.Dec_Struct) {
                //console.log("ejecutar");
                let value = element.interpretar(ts_global, ast);
                if (value instanceof excepcion_1.Excepcion) {
                    ast.excepciones.push(value);
                    ast.updateConsolaError(value.toString());
                }
                if (value instanceof break_1.Break) {
                    let e = new excepcion_1.Excepcion("Semantico", "Break fuera de ciclo", element.fila + "", element.columna + "");
                    ast.excepciones.push(e);
                    ast.updateConsolaError(e.toString());
                }
            }
        });
        //segunda pasada
        //
        let contador = 0;
        ast.instrucciones.forEach((element) => {
            if (element instanceof main_1.Main) {
                contador += 1;
                if (contador == 2) {
                    let e = new excepcion_1.Excepcion("Semantico", "Error en cantidad de Main", element.fila + "", element.columna + "");
                    ast.excepciones.push(e);
                    ast.updateConsolaError(e.toString);
                    return;
                }
                let segunda_pasada = element.interpretar(ts_global, ast);
                if (segunda_pasada instanceof excepcion_1.Excepcion) {
                    ast.excepciones.push(segunda_pasada);
                    ast.updateConsolaError(segunda_pasada.toString);
                }
                if (segunda_pasada instanceof break_1.Break) {
                    let e = new excepcion_1.Excepcion("Semantico", "Break fuera de ciclo", element.fila + "", element.columna + "");
                    ast.excepciones.push(e);
                    ast.updateConsolaError(e.toString());
                }
            }
        });
        ast.excepciones.forEach((x) => {
            console.log(x.toString());
        });
        //3era pasada
        ast.instrucciones.forEach((element) => {
            //if(!(element instanceof Main || ) )
            //console.log("Sentencias fuera de Main")
        });
        this.arbolG = ast;
        //this.graficarAST();
    }
    // /**************************************************Traduccion****************************************************** */
    traducir(code) {
        const instrucciones = Parser.parse(code);
        //tabla
        let ts_global = new tablasimbolos_1.TablaSimbolos(undefined);
        //ast
        const ast = new arbol_1.Arbol(ts_global, instrucciones[0]);
        // console.log(instrucciones[0]);
        // console.log(ast.instrucciones);
        //ast.instrucciones[0].interpretar(ts_global, ast);
        ast.instrucciones.forEach((element) => {
            //console.log(element);
            element.traducir(ts_global, ast);
        });
        let code_objeto = "";
        let nativa = new nativas_1.Nativas();
        let print_nativa = print_1.Print.print ? nativa.print_function(ast) : "";
        let string_upper = nativas_string_1.NativasString.UPPER ? nativa.toUpper() : "";
        let string_len = nativas_string_1.NativasString.LEN ? nativa.getLength() : "";
        let string_lower = nativas_string_1.NativasString.LOWER ? nativa.toLower() : "";
        let string_char = nativas_string_1.NativasString.LOWER ? nativa.charAt() : "";
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
    static addComentario(comentario) {
        Principal.historial += "/* " + comentario + " */\n";
    }
    graficarTS() {
        let codigoHTMLErrorr = " ";
        //RECORRE LA CANTIDAD DE TABLAS ALMACENADAS EN EL ARBOL
        this.arbolG.graficarts.forEach((graph) => {
            // console.log("----------INICIO TABLA----------- ");
            codigoHTMLErrorr += "<table id=\"example\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\">\n"
                + "<thead>\n"
                + "<tr>\n"
                + "<th>ID</th>\n"
                + "<th>TIPO</th>\n"
                + "<th>VALOR</th>\n"
                + "<th>FILA</th>\n"
                + "<th>COLUMNA</th>\n"
                + "</tr>\n"
                + "</thead>\n"
                + "<tbody>\n";
            graph.listaElementos.forEach((x) => {
                //console.log("ID "+x.id+" TIPO "+x.tipo+" VALOR "+x.valor+" FILA "+x.fila +" COLUMNA "+x.columna);
                codigoHTMLErrorr += "<tr>\n";
                codigoHTMLErrorr += "<td>" + x.id + "</td>\n";
                codigoHTMLErrorr += "<td>" + x.tipo + "</td>\n";
                codigoHTMLErrorr += "<td>" + x.valor + "</td>\n";
                codigoHTMLErrorr += "<td>" + x.fila + "</td>\n";
                codigoHTMLErrorr += "<td>" + x.columna + "</td>\n";
                codigoHTMLErrorr += "</tr>\n";
            });
            codigoHTMLErrorr += "</tbody>\n" + "</table>\n";
        });
        console.log("----------INICIO TABLA----------- ");
        console.log(codigoHTMLErrorr);
        console.log("----------FIN TABLA----------- ");
        return codigoHTMLErrorr;
    }
    graficarAST() {
        console.log("-----------GENERANDO AST-----------");
        //generacion de AST
        const init = new nodo_1.NodoAST("RAIZ");
        const instr = new nodo_1.NodoAST("INSTRUCCIONES");
        this.arbolG.getInstrucciones().forEach((instruccion) => {
            instr.agregarHijoNodo(instruccion.getNodo());
        });
        init.agregarHijoNodo(instr);
        //devuelve el codigo GRAPHIZ DEL AST
        const grafo = this.arbolG.getDot(init);
        return grafo;
    }
    getErrores() {
        let codigoHTMLError = "<table id=\"example\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\">\n"
            + "<thead>\n"
            + "<tr>\n"
            + "<th>TIPO</th>\n"
            + "<th>DESCRIPCCION</th>\n"
            + "<th>FILA</th>\n"
            + "<th>COLUMNA</th>\n"
            + "</tr>\n"
            + "</thead>\n"
            + "<tbody>\n";
        this.arbolG.excepciones.forEach((x) => {
            codigoHTMLError += "<tr>\n";
            codigoHTMLError += "<td>" + x.tipo + "</td>\n";
            codigoHTMLError += "<td>" + x.descripcion + "</td>\n";
            codigoHTMLError += "<td>" + x.fila + "</td>\n";
            codigoHTMLError += "<td>" + x.columna + "</td>\n";
            codigoHTMLError += "</tr>\n";
        });
        codigoHTMLError += "</tbody>\n"
            + "</table>\n";
        return codigoHTMLError;
    }
    getReporteGramatical() {
        let codigoHTMLError = "";
        codigoHTMLError += "<table id=\"example\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\">\n"
            + "<thead>\n"
            + "<tr>\n"
            + "<th>PRODUCCION</th>\n"
            + "<th>VALOR</th>\n"
            + "</tr>\n"
            + "</thead>\n"
            + "<tbody>\n";
        this.reporteGramatica.listaElementos.forEach((x) => {
            codigoHTMLError += "<tr>\n";
            codigoHTMLError += "<td>" + x.id + "</td>\n";
            codigoHTMLError += "<td>" + x.tipo + "</td>\n";
            codigoHTMLError += "</tr>\n";
        });
        codigoHTMLError += "</tbody>\n" + "</table>\n";
        // console.log("----------FIN TABLA----------- ");
        return codigoHTMLError;
    }
    getConsola() {
        return this.arbolG.consola;
    }
}
exports.Principal = Principal;
Principal.contador = 0;
Principal.temp = 0; //control de temporales
Principal.etiqueta = 0; //contro de etiquetas
Principal.posicion = 0; //guarda la poscion en el stack
Principal.heap = 0; //posicion en el heap    ???
Principal.historial = "";
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
