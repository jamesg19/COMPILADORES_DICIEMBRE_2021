import { Excepcion } from './excepcion';
import { TablaSimbolos } from './tablasimbolos';
import { Instruccion } from '../abs/Instruccion';
import { Struct } from '../expresiones/struct/struct';
import { Funcion } from '../instruccion/funcion';
import { NodoAST } from '../abs/nodo';
import { createNoSubstitutionTemplateLiteral } from 'typescript';
import { Principal } from '../principal';
import { Print } from '../instruccion/print';
import { Nativas } from '../nativas';
import { TSreporte } from '../instruccion/TSreporte';


export class Arbol{
    
    instrucciones:Instruccion[];
    excepciones:Array<Excepcion>;
    funciones:Array<Funcion>;
    structs:Map<string,Struct>;
    consola:string= ""
    TSglobal:TablaSimbolos; 
    posicion:number;
    dot:string="";
    graficarts:Array<TSreporte>;
    
    head:string = "#include <stdio.h>\n";
    
    etiqueta:string=""; //para crear los saltos
    contador:number=0;  //para llevar el conteo de las etiquetas
    //no confundir la variable anterior con la que esta en tablasimbolos
    //este contador es para etiquetas y el otro es para los temporales
    
    
    /**
     * @param  {TablaSimbolos} TSglobal
     * @param  {Instruccion[]} instrucciones
     */
    constructor(TSglobal:TablaSimbolos,instrucciones:Instruccion[]){
        this.excepciones = new Array()
        this.graficarts = new Array();
        this.funciones = new Array();
        this.TSglobal = TSglobal;
        this.instrucciones = instrucciones;
        this.structs = new Map();
        this.head +="#include <math.h>\n\ndouble heap[30101999];\n" ;
        this.head += "double stack[30101999];\n\ndouble P;\ndouble H;\n\n";
        this.posicion= 0;
        this.graficarts=new Array();
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
    
    list_temporales():string{
        //.slice(0, value.length - 2);
        let temporales:string = "";
        //console.log("contador",TablaSimbolos.contador);
        //console.log("Temporales ", Principal.temp);
        
        for(let con:number = 0;con<=(Principal.temp+1);con++){
            temporales += " t"+con+", ";
        }
        
        
        return (temporales.length >0 )?"double "+temporales.slice(0,temporales.length-2)+";":"";
        
    }
    getGraficarTS(){
        return this.graficarts;
    }
    addGraficarTS(table:TablaSimbolos){
        this.graficarts.push(table);
    }
}