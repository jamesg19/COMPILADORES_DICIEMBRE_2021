import { Arbol } from './table/arbol';
import { TablaSimbolos } from './table/tablasimbolos';
import { Instruccion } from './abs/Instruccion';
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
         
         element.interpretar(ts_global,ast);
         
     });
     
    }
}

let principa:Principal = new Principal();

principa.ejecutar ('println((4+4)+(4+4+5));');

principa.ejecutar ('println((true || false ));')
//principa.ejecutar ('println((true && true) && (true && true));');