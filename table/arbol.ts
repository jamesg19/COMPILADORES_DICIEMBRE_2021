import { Excepcion } from './excepcion';
import { TablaSimbolos } from './tablasimbolos';
import { Instruccion } from '../abs/Instruccion';
import { Struct } from '../expresiones/struct/struct';
import { Funcion } from '../instruccion/funcion';

export class Arbol{
    
    instrucciones:Instruccion[];
    excepciones:Array<Excepcion>;
    funciones:Array<Funcion>;
    structs:Map<string,Struct>;
    consola:string= ""
    TSglobal:TablaSimbolos;   
    
    /**
     * @param  {TablaSimbolos} TSglobal
     * @param  {Instruccion[]} instrucciones
     */
    constructor(TSglobal:TablaSimbolos,instrucciones:Instruccion[]){
        this.excepciones = 
        this.funciones = new Array();
        this.TSglobal = TSglobal;
        this.instrucciones = instrucciones;
        this.structs = new Map();
    }
    
    
    
    /**
     * @param  {string} nombre
     * @returns Funcion
     */
    getFunctionByName(nombre:string):Funcion{
        let funcion:Funcion;
        this.funciones.forEach((x)=>{
           if(x.id===nombre) funcion = x;
        });
        return funcion;
    }
    
}