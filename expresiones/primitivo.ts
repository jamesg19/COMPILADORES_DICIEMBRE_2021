import { Instruccion } from "../abs/Instruccion";
import { TIPO } from "../table/tipo";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Arbol } from "../table/arbol";
import { NodoAST } from "../abs/nodo";
import { isNumber } from 'util';

export class Primitivo extends Instruccion {
  fila: number;
  columna: number;
  tipo: TIPO;
  value: any;

  /**
   * @param  {TIPO} tipo
   * @param  {any} value
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(tipo: TIPO, value: any, fila: number, columna: number) {
    super(fila, columna);
    this.fila = fila;
    this.columna = columna;
    this.tipo = tipo;
    this.value = value;
  }
  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    //console.log(this.value);
    if(this.tipo==TIPO.ENTERO || this.tipo== TIPO.DECIMAL){
      return this.value;
    }
    return this.value;
  }
  getNodo(){
    const nodo=new NodoAST("PRIMITIVO");
    nodo.agregarHijo(this.value);
    return nodo;
  }

  traducir(entorno:TablaSimbolos, arbol:Arbol):any{
    
    // let temp:string = "t"
    // let temp += super.temp;
    
    if(isNumber(this.value)) this.tipo = TIPO.DECIMAL;
    let codigo=this.value;
    
    
    return codigo;
  }
}


// def traducir(self,ent,arbol):
//         resultado3D = Resultado3D()
//         resultado3D.codigo3D = ""


//         if isinstance(self.valor, str):
//             resultado3D.tipo = Tipo.CHAR
//         elif isinstance(self.valor, int):
//             resultado3D.tipo = Tipo.ENTERO
//         elif isinstance(self.valor, float):
//             resultado3D.tipo = Tipo.FLOAT

//         if(resultado3D.tipo == Tipo.CHAR):
//             resultado3D.temporal = Temporal("\""+self.valor+"\"")
//         else:
//             resultado3D.temporal = Temporal(str(self.valor))

//         return resultado3D
