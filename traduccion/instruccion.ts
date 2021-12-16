import { Arbol } from '../table/arbol';
import { TablaSimbolos } from '../table/tablasimbolos';



export abstract class Instruccion_T {
    
    /**
     * Instruccion_T servira para traducir
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     */
    abstract traducir(entorno:TablaSimbolos,arbol:Arbol):string;
    
}