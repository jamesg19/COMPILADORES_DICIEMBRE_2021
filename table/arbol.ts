import { Excepcion } from './excepcion';
import { TablaSimbolos } from './tablasimbolos';
import { Instruccion } from '../abs/Instruccion';
import { Struct } from '../expresiones/struct/struct';
export class Arbol{
    
    instrucciones:Instruccion[];
    excepciones:Array<Excepcion>;
    funciones:Array<String>;
    structs:Map<string,Struct>;
    consola:string= ""
    TSglobal:TablaSimbolos;   
    
    constructor(TSglobal:TablaSimbolos,instrucciones:Instruccion[]){
        this.excepciones = 
        this.funciones = new Array();
        this.TSglobal = TSglobal;
        this.instrucciones = instrucciones;
        this.structs = new Map();
    }
    
    
    
    
    
}