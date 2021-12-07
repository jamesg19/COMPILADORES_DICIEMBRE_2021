import { TIPO } from "./tipo";

export class Simbolo {
    id: string;
    tipo: TIPO;
    fila: number;
    columna: number;
    valor: any;
    arreglo: boolean;
    struct: boolean;
    constante:boolean;

    constructor(id: string, tipo: TIPO, fila: number, columna: number, valor: any, arreglo: boolean, struct: boolean) {
        this.id = id;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
        this.arreglo = arreglo;
        this.struct = struct;
        this.constante = false;

    }
    getID() {
        return this.id
    }

    setID(id: string) {
        this.id = id
    }

    getTipo() {
        return this.tipo
    }
    setTipo(tipo: TIPO) {
        this.tipo = tipo
    }

    getValor() {
        return this.valor
    }

    setValor(valor: any) {
        this.valor = valor
    }

    getArreglo() {
        return this.arreglo
    }

    getStruct() {
        return this.struct
    }



}