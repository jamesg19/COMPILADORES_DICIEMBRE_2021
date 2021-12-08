import { Instruccion } from "../abs/Instruccion";


export class Llamada extends Instruccion{
    
    id:string;
    lista_parametros?: Array<Instruccion>;
    
    constructor(id:string, fila:number,columna:number,lista_parmetros?:Array<Instruccion> ){
        super(fila,columna);
        this.id = id;
        
    }
    
    
    
    
}