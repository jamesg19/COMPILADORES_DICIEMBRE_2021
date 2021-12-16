import { Arbol } from "../table/arbol";
import { TablaSimbolos } from "../table/tablasimbolos";

export class Etiqueta{
    id:string;
    linea:string;
    columna:string;

    constructor(id:string,linea:string,columna:string){
        this.id=id;
        this.linea=linea;
        this.columna=columna;
    }

    traducir(entorno:TablaSimbolos,arbol:Arbol){
        console.log(`\n`+this.id+':');
    }

}