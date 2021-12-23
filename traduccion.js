"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traducir = void 0;
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
const principal_1 = require("./principal");
const repeticion_cadena_1 = require("./expresiones/nativas/repeticion_cadena");
const pow_1 = require("./expresiones/nativas/pow");
const acceso_1 = require("./expresiones/array/acceso");
class Traducir {
    traducir(code) {
        const instrucciones = Parser.parse(code);
        let ts_global = new tablasimbolos_1.TablaSimbolos(undefined);
        //ast
        const ast = new arbol_1.Arbol(ts_global, instrucciones[0]);
        ast.excepciones.forEach((element) => {
            console.log("excepciones", element);
        });
        //interpreto 1ra pasada
        ast.instrucciones.forEach((element) => {
            if (element instanceof funcion_1.Funcion) {
                let posicion = principal_1.Principal.posicion;
                posicion++;
                element.posicion = posicion;
                ast.funciones.push(element);
                element.traducir(ts_global, ast);
                principal_1.Principal.posicion = posicion;
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
                let value = element.traducir(ts_global, ast);
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
                let segunda_pasada = element.traducir(ts_global, ast);
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
        //3era pasada
        ast.instrucciones.forEach((element) => {
            //if(!(element instanceof Main || ) )
            //console.log("Sentencias fuera de Main")
        });
        let code_objeto = "";
        let nativa = new nativas_1.Nativas();
        let print_nativa = print_1.Print.print ? nativa.print_function(ast) : "";
        let string_upper = nativas_string_1.NativasString.UPPER ? nativa.toUpper() : "";
        let string_len = nativas_string_1.NativasString.LEN ? nativa.getLength() : "";
        let string_lower = nativas_string_1.NativasString.LOWER ? nativa.toLower() : "";
        let string_char = nativas_string_1.NativasString.LOWER ? nativa.charAt() : "";
        let potencia_str = repeticion_cadena_1.RepeticionCadena.REPETICION ? nativa.potencia_string() : "";
        let potencia_int = pow_1.Pow.Pow ? nativa.potencia_int() + "\n" : "";
        let acceso = acceso_1.Acceso.ACCCESO ? nativa.acceso_array() + "\n" : "";
        code_objeto = ast.head +
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
            potencia_str +
            "\n" +
            potencia_int +
            "\n" +
            acceso +
            "\n" +
            print_nativa +
            "\n";
        console.log(code_objeto + "\n" + principal_1.Principal.historial);
        let codeshare = code_objeto + "\n" + principal_1.Principal.historial + "";
        return codeshare;
    }
    // /**************************************************Traduccion****************************************************** */
    static addComentario(comentario) {
        principal_1.Principal.historial += "/* " + comentario + " */\n";
    }
}
exports.Traducir = Traducir;
Traducir.funciones = "";
//let principa: Principal = new Principal();
// const fs = require("fs"),
//   NOMBRE_ARCHIVO = "file.java";
// fs.readFile(NOMBRE_ARCHIVO, "utf8", (error, datos) => {
//   if (error) throw error;
//   let traducir: Traducir = new Traducir();
//   // console.log(datos)
//   traducir.traducir(datos);
//   //principa.ejecutar(datos);
//   //console.log("El contenido es: ", datos);
// });
