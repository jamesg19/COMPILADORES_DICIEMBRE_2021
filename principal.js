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
const nodo_1 = require("./abs/nodo");
const Parser = require("./analizador/analizador");
class Principal {
    ejecutar(code) {
        const instrucciones = Parser.parse(code);
        //tabla
        let ts_global = new tablasimbolos_1.TablaSimbolos(undefined);
        //ast
        const ast = new arbol_1.Arbol(ts_global, instrucciones);
        //falta capturar los errores lexicos y sintacticos
        //1ra pasada
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
                element instanceof declaracion_id_1.D_Id ||
                element instanceof instancia_struct_1.Dec_Struct ||
                element instanceof array_valor_1.Arreglo_Valor) {
                console.log("ejecutar");
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
        //3era pasada
        ast.instrucciones.forEach(element => {
            //if(!(element instanceof Main || ) )    
            //console.log("Sentencias fuera de Main")
        });
        console.log("PROBANDO DOT.......*/*/*/*/");
        //generacion de AST 
        const init = new nodo_1.NodoAST("RAIZ");
        const instr = new nodo_1.NodoAST("INSTRUCCIONES");
        ast.getInstrucciones().forEach((instruccion) => {
            instr.agregarHijoNodo(instruccion.getNodo());
        });
        init.agregarHijoNodo(instr);
        //devuelve el codigo GRAPHIZ DEL AST
        const grafo = ast.getDot(init);
        console.log(grafo);
    }
}
exports.Principal = Principal;
//let principa: Principal = new Principal();
const fs = require("fs"), NOMBRE_ARCHIVO = "file.java";
fs.readFile(NOMBRE_ARCHIVO, 'utf8', (error, datos) => {
    if (error)
        throw error;
    let principa = new Principal();
    // console.log(datos)
    principa.ejecutar(datos);
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
