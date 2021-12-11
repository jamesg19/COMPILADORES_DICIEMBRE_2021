import { Arbol } from './table/arbol';
import { TablaSimbolos } from './table/tablasimbolos';
import { Instruccion } from './abs/Instruccion';
import { Funcion } from './instruccion/funcion';
const Parser = require('./analizador/analizador');



export class Principal{
    
    
    ejecutar(code:string){
        
     const instrucciones = Parser.parse(code);
     
     //tabla
     let ts_global:TablaSimbolos = new TablaSimbolos(undefined);
     
     //ast
     const ast:Arbol = new Arbol(ts_global,instrucciones);
     
     //interpreto
     instrucciones.forEach((element:Instruccion) => {
         //console.log(element)
         if(element instanceof Funcion){
             ast.funciones.push(element)
         }else
         element.interpretar(ts_global,ast);
         
     });
     
    }
}

let principa:Principal = new Principal();
var cadena = "function void holaMundo(int a, double c){\
println('hola mundo funcion');\
}\
holaMundo(1,13.4);\
println('cadena1','cadena2');\
";

principa.ejecutar("\
                  \
                struct mi_struct{int v};\
                  mi_struct m = mi_struct(10);\
                  m.v = 43234;\
                  println(m.v);\
                  \
                  \ ");
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