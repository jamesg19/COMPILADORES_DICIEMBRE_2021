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
holaMundo(1,13.4);";

principa.ejecutar (cadena);


//principa.ejecutar ('println((true && true) && (true && true));');