"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Principal = void 0;
const arbol_1 = require("./table/arbol");
const tablasimbolos_1 = require("./table/tablasimbolos");
const funcion_1 = require("./instruccion/funcion");
const Parser = require('./analizador/analizador');
class Principal {
    ejecutar(code) {
        const instrucciones = Parser.parse(code);
        //tabla
        let ts_global = new tablasimbolos_1.TablaSimbolos(undefined);
        //ast
        const ast = new arbol_1.Arbol(ts_global, instrucciones);
        //interpreto
        instrucciones.forEach((element) => {
            if (element instanceof funcion_1.Funcion) {
                ast.funciones.push(element);
            }
            else
                element.interpretar(ts_global, ast);
        });
    }
}
exports.Principal = Principal;
let principa = new Principal();
var cadena = "function void holaMundo(int a, double c){\
println('hola mundo funcion');\
}\
holaMundo(1,13.4);\
println('cadena1','cadena2');\
";
principa.ejecutar("\
                  int[] a = [33,5,[4,[1,3,4],[6,7,8]] ];\
                   println(a);\
                   println(a[2][1].pop());\
                   println('[33,5,[4,[1,3],[6,7,8]]] ==> ',a);\
                   println(a[2][2]);\
                   println(a[2][2].push(1000));\
                   println(a);\
                   ");
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
