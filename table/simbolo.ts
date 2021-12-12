import { TIPO } from "./TipoNativo";

export class Simbolo {
    id: string;
    tipo: TIPO;
    fila: number;
    columna: number;
    valor: any;
    arreglo: boolean;
    struct: boolean;
    constante:boolean;
    name_struct:string;
    /**
     * @param  {string} id
     * @param  {TIPO} tipo
     * @param  {number} fila
     * @param  {number} columna
     * @param  {any} valor
     * @param  {boolean} arreglo
     * @param  {boolean} struct
     */
    constructor(id: string, tipo: TIPO, fila: number, columna: number, valor: any, arreglo: boolean, struct: boolean) {
        this.id = id;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.arreglo = arreglo;
        
        this.valor = valor;//arreglo? JSON.parse(JSON.stringify(valor)):valor;
        this.name_struct = "";
        this.struct = struct;
        this.constante = false;
        

    }
    /**
     */
    getID() {
        return this.id
    }
    /**
     * @param  {string} id
     */
    setID(id: string) {
        this.id = id
    }
    /**
     */
    getTipo():TIPO {
        return this.tipo
    }
    /**
     * @param  {TIPO} tipo
     */
    setTipo(tipo: TIPO) {
        this.tipo = tipo
    }
    /**
     */
    getValor() {
        return this.valor
    }
    /**
     * @param  {any} valor
     */
    setValor(valor: any) {
        this.valor = valor
    }
    /**
     */
    getArreglo() {
        return this.arreglo
    }
    /**
     */
    getStruct() {
        return this.struct
    }
    


}