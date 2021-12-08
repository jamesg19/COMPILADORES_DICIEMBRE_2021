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
                    +'else if(5>5){'
                    +'println("entra else if 7>5 ");'
                    +'} '
                    +'else if(8>5){'
                    +'println("entra else if 8>5 ");'
                    +'} '
                    +'else { println("entra AL FALSE");  } '
                    +'println(true);'

                    +'switch ("5+6"){'
                    +'case "5+6":'
                    +'println("ENTRA A SWITCH1");'
                    +''
                    +'case "5+6":'
                    +'println("ENTRA A SWITCH2");'
                    +'break;'
                    +'default:'
                    +' println("ENTRA A DEFAULT");'
                    +'}'
                    +''
                    );


//principa.ejecutar ('println((true && true) && (true && true));');