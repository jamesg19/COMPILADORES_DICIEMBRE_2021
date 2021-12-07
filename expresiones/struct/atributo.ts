import { TIPO } from "../../table/tipo";
import { Instruccion } from '../../abs/Instruccion';


export class Atributo {
    id: string;
    tipo: TIPO;
    fila: number;
    columna: number;
    valor: Instruccion;
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

    }



}