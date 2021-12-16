import { Arbol } from "../table/arbol";
import { TablaSimbolos } from "../table/tablasimbolos";

export class Goto{
    id:string;
    fila:number;
    columna:number;


    constructor(id:string,fila:number,columna:number){
        this.id=id;
        this.fila=fila;
        this.columna=columna;
    }
    traducir(e: TablaSimbolos, arbol: Arbol):any{
        console.log(`\n`+'goto'+this.id+';');
    }
}