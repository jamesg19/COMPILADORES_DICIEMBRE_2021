import { Instruccion } from "../abs/Instruccion";
import { TIPO } from "../table/tipo";
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';


export class Primitivo implements Instruccion {
    fila: number;
    columna: number;
    tipo: TIPO;
    value: any;
    struct:boolean;
    arra:boolean;

    constructor(fila: number, columna: number, tipo: TIPO, value: any) {
        //super(fila,columna);
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.value = value;  
        this.struct = false;
        this.arra = false;      
    }
    
    interpretar(entorno:TablaSimbolos,arbol:Arbol){
        return this.value;            
    }
}