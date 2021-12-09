export class Excepcion{
    tipo:string;
    descripcion:string;
    fila:string;
    columna:string;
    
    /**
     * @param  {string} tipo
     * @param  {string} desc
     * @param  {string} fila
     * @param  {string} columna
     */
    constructor(tipo:string,desc:string,fila:string,columna:string){
        this.tipo = tipo;
        this.descripcion = desc;
        this.fila = fila;
        this.columna = columna;
            
          
    }
    /**
     * @returns string
     */
    toString():string{
        return `${this.tipo} - ${this.descripcion} - ${this.fila},${this.columna}`;
    }
}