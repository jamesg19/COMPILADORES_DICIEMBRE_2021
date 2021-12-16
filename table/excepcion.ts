import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Arbol } from "./arbol";
import { TablaSimbolos } from "./tablasimbolos";

export class Excepcion extends Instruccion{

    tipo:string;
    descripcion:string;
    filaa:string;
    columnaa:string;
    
    /**
     * @param  {string} tipo
     * @param  {string} desc
     * @param  {string} fila
     * @param  {string} columna
     */
    constructor(tipo:string,desc:string,fila:string,columna:string){
        super(Number(fila),Number(columna));
        this.tipo = tipo;
        this.descripcion = desc;
        this.filaa = fila;
        this.columnaa = columna;
            
          
    }
    /**
     * @returns string
     */
    toString():string{
        return `${this.tipo} - ${this.descripcion} - ${this.filaa},${this.columnaa}`;
    }
    interpretar(e: TablaSimbolos, arbol: Arbol): any {
        const err=new Excepcion(this.tipo,this.descripcion,this.filaa, this.columnaa)
        return this ; 
    }
    traducir(entorno: TablaSimbolos, arbol: Arbol): string {
       return "";
    }
    getNodo() {
        return new NodoAST("err");
    }
}