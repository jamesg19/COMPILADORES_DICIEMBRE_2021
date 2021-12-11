import { TIPO } from "../../table/TipoNativo";
import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';


export class Atributo {
    id: string;
    tipo: TIPO;
    fila: number;
    columna: number;
    valor: Instruccion;
    value:any;
    arreglo: boolean;
    //struct: boolean;
    constante:boolean;

    constructor(id: string, tipo: TIPO,arreglo:boolean ,fila:number, columna: number) {
        this.id = id;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        //this.valor = valor;
        this.arreglo = arreglo;
        //this.struct = struct;
        this.constante = false;
        this.valor = null;

    }
    interpretar(entorno:TablaSimbolos,arbol:Arbol){
     
            
    }


}