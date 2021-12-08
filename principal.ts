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

principa.ejecutar ('println(6>5);   '
                    +'if(1>5){'
                    +'println("entra if6>5");'
                    +'} '
                    +'else if(7>5){'
                    +'println("entra else if 7>5 ");'
                    +'} '
                    +'else { println("entra AL FALSE");  } '
                    +'println(true);'
                    
                    );


//principa.ejecutar ('println((true && true) && (true && true));');