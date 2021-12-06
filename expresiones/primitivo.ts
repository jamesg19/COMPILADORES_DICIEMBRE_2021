import { Instruccion } from "../abs/Instruccion";
import { TIPO } from "../table/tipo";
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';


export class Primitivo extends Instruccion {
    fila: number;
    columna: number;
    tipo: TIPO;
    value: any;
   

    constructor(fila: number, columna: number, tipo: TIPO, value: any) {
        super(fila,columna);
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.value = value;  
            
    }
    
    interpretar(entorno:TablaSimbolos,arbol:Arbol){
        return this.value;            
    }
}