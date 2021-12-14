import { Excepcion } from './excepcion';
import { TablaSimbolos } from './tablasimbolos';
import { Instruccion } from '../abs/Instruccion';
import { Struct } from '../expresiones/struct/struct';
import { Funcion } from '../instruccion/funcion';
import { NodoAST } from '../abs/nodo';

export class Arbol{
    
    instrucciones:Instruccion[];
    excepciones:Array<Excepcion>;
    funciones:Array<Funcion>;
    structs:Map<string,Struct>;
    consola:string= ""
    TSglobal:TablaSimbolos; 
    contador:number=0;  
    dot:string="";
    
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
    
    updateConsolaError(texto:string){
        this.consola+=texto+'\n';
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
    getInstrucciones():Instruccion[]{
        return this.instrucciones;
    }

    getDot(raiz:NodoAST){
        this.dot="";
        this.dot+="digraph{ \n ";
        this.dot+="n0[label=\""+raiz.getValor()+ "\"];\n";
        this.contador=1;
        this.recorrerAST("n0",raiz);
        this.dot+="}"
        console.log("RETORNA DOT : )");
        return this.dot;

    }
    recorrerAST(idPadre:string,nodoPadre:NodoAST){

        nodoPadre.getHijos().forEach((hijo:NodoAST) => {

            const nombreHijo="n"+this.contador;
            this.dot+=nombreHijo+" [label=\""+hijo.getValor()+ "\"];\n"
            this.dot+=idPadre+"->"+nombreHijo+ ";\n";
            this.contador+=1;
            this.recorrerAST(nombreHijo,hijo);
        });

        // for(const hijo in nodoPadre.getHijos()){
        //     const nombreHijo="n"+this.contador;
        //     this.dot+=nombreHijo+" [label=\""+hijo.getValor()+ "\"];\n"
        //     this.dot+=idPadre+"->"+nombreHijo+ ";\n";
        //     this.contador+=1;
        //     this.recorrerAST(nombreHijo,hijo);
        // }
    }
    
}