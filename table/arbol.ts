import { Excepcion } from './excepcion';
import { TablaSimbolos } from './tablasimbolos';
import { Instruccion } from '../abs/Instruccion';
export class Arbol{
    instrucciones:Instruccion[];
    excepciones:Array<Excepcion>;
    funciones:Array<String>;
    consola:string= ""
    TSglobal:TablaSimbolos;   
    
    constructor(TSglobal:TablaSimbolos,instrucciones:Instruccion[]){
        this.excepciones = 
        this.funciones = new Array();
        this.TSglobal = TSglobal;
        this.instrucciones = instrucciones;
    }
    
    
    
    
}