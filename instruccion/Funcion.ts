import { Instruccion } from '../abs/Instruccion';
import { TIPO } from '../table/TipoNativo';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Simbolo } from '../table/simbolo';
import { Arbol } from '../table/arbol';
import { Excepcion } from '../table/excepcion';


export class Funcion extends Instruccion{
  id: string;
  instrucciones: Array<Instruccion>;
  tipo_return: TIPO;
  tipo:TIPO;
  lista_parametros?: Array<Simbolo>;

  constructor(id: string, instrucciones: Array<Instruccion>, 
              tipo_return: TIPO = TIPO.VOID,
              fila:number,columna:number,
               lista_parametros?: Array<Simbolo>
               ){
                   
    super(fila,columna);
    this.id = id;
    this.instrucciones = instrucciones;
    this.tipo = tipo_return;
    this.lista_parametros = lista_parametros;
    this.tipo_return = tipo_return;
    Object.assign(this, {id, instrucciones, tipo_return, lista_parametros});
  }
    interpretar(entorno:TablaSimbolos, arbol:Arbol){
        let entorno_local:TablaSimbolos = new TablaSimbolos(entorno);
        
        this.instrucciones.forEach((instruccion)=>{
            let value = instruccion.interpretar(entorno_local,arbol);
            
            if(value instanceof Excepcion ){
                arbol.excepciones.push(value);
                arbol.consola = arbol.consola + value;
            }
            console.log("clase funcion, se deben de comparar el break y return")
                        
            
        })  ;      
    }
  hasReturn() : boolean{
    return this.tipo_return != TIPO.VOID;
  }

  hasParametros() : boolean{
    return this.lista_parametros != null;
  }

  getParametrosSize() : number{
    return 0;//return this.hasParametros() ? this.lista_parametros.length : 0;
  }

  public toString() : string{
    const parametros = this.lista_parametros != null ? this.lista_parametros.length : 0;
    let salida = `Funcion: ${this.id} - Parametros: ${parametros} - Return Asignado: ${this.hasReturn()?'Si':'No'}`;
    return salida;
  }
}
