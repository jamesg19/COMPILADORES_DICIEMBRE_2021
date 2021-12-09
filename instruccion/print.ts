import { Instruccion } from '../abs/Instruccion';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';
import { TIPO } from '../table/tipo';
import { Excepcion } from '../table/excepcion';

export class Print extends Instruccion {

    fila: number;
    columna: number;

    value?: Instruccion[];
    /**
     * @param  {number} fila
     * @param  {number} columna
     * @param  {Instruccion[]} value?
     */
    constructor(fila: number, columna: number, value?: Instruccion[]) {
        super(fila, columna);
        this.fila = fila;
        this.columna = columna;
        this.value = value;

    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {

        //console.log('antes: ',this.expresion);

        //const value = this.value.interpretar(entorno,arbol);
        if (this.value != undefined) {

            this.value.forEach((exp_print) => {
                const value = exp_print.interpretar(entorno, arbol);
                if (value instanceof Excepcion) {
                    console.log(value);
                    return value;
                }

                arbol.consola += value;
                console.log(value);
            })
        }
    }
}