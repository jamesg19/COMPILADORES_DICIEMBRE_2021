import { Instruccion } from '../abs/Instruccion';
import { NodoAST } from '../abs/nodo';
import { Arbol } from '../table/arbol';
import { Excepcion } from '../table/excepcion';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Break } from './break';
import { Principal } from '../principal';
export class Main extends Instruccion{
    instrucciones:Instruccion[];
    
    constructor(instrucciones:Instruccion[],fila:number,columna:number){
        super(fila,columna);
        this.instrucciones = instrucciones;    
    }
    interpretar(entorno:TablaSimbolos, arbol:Arbol){
        
        let entorno_local = new TablaSimbolos(entorno);
        
        this.instrucciones.forEach(element => {
            
            if(element instanceof Excepcion){
                arbol.excepciones.push(element);
                arbol.updateConsolaError(element.toString());
                console.log(element.toString());
            }else{

            let value = element.interpretar(entorno_local,arbol);
            
            if(value instanceof Excepcion){
                arbol.excepciones.push(value);
                arbol.updateConsolaError(value.toString());
                console.log(value);
            }
            if (value instanceof Break){
                let excepcion = new Excepcion("Semantico","Sentencia Break fuera de ciclo",this.fila+"",this.columna+"")
                arbol.excepciones.push(excepcion);
                arbol.updateConsolaError(excepcion.toString());
            }
        }
        });
        
        
    }

    getNodo():NodoAST{
        const nodo= new NodoAST("MAIN");
        const instruccioness= new NodoAST("INSTRUCCIONES");
        //if(t){
        this.instrucciones.forEach((instr:Instruccion) => {
            if(instr instanceof Excepcion){
                
            }    else{
                instruccioness.agregarHijoNodo(instr.getNodo());
            }

        });
        nodo.agregarHijoNodo(instruccioness);
        //}
        return nodo;
    }
    traducir(entorno:TablaSimbolos,arbol:Arbol):string{
        let cadena:string = "";
        
        let entorno_local = new TablaSimbolos(entorno);
        
        
        Principal.historial  += "/*------------Main---------*/\n"+"int main(){\n";
        this.instrucciones.forEach(element => {
            
            element.traducir(entorno_local,arbol);
            
            
        });
          
          cadena= "\t"+cadena+"}"
          
                            
        Principal.historial += cadena;
        return cadena;
    }
}