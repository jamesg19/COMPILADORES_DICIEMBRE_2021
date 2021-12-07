export class Excepcion{
    tipo:string;
    descripcion:string;
    fila:string;
    columna:string;
    
    constructor(tipo:string,desc:string,fila:string,columna:string){
        this.tipo = tipo;
        this.descripcion = desc;
        this.fila = fila;
        this.columna = columna;
            
          
    }
    toString():string{
        return `${this.tipo} - ${this.descripcion} - ${this.fila},${this.columna}`;
    }
}