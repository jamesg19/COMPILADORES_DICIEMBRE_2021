import { Instruccion } from "../abs/Instruccion";
import { TIPO } from '../table/tipo';
import { TablaSimbolos } from "../table/tablasimbolos";
import { Arbol } from "../table/arbol";
import { NodoAST } from "../abs/nodo";
import { isNumber } from 'util';
import { Principal } from '../principal';

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
    if(this.tipo==TIPO.CADENA){
      return this.value.replace('\\n', '\n');
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
    
    let codigo
    if(isNumber(this.value)) this.tipo = TIPO.DECIMAL;
    codigo=this.value;
    if(this.tipo == TIPO.BOOLEAN)
      return (this.value)?1:0;
    
    if(this.tipo == TIPO.CADENA){
      codigo = this.transform_cadena(this.value);
    }
    
    return codigo;
  }

/**
 * @param  {string} x
 * @param  {Arbol} arbol
 * @returns string
 * cuando se tratan de constantes se usa la posicion actual libre como referencia
 * se devuelve el temporal que tiene la referencia hacia el heap
 * todas las cadenas se pasan al heap
 */
transform_cadena(x: string): string {
  let return_string: string = "";
  let temp = Principal.temp;
  temp++;
  let t  = "t"+temp;
  
  
  return_string = t+ " = H;\n"; //Asigno la referencia del heap al temporal
  
  Principal.temp = temp;
  Principal.addComentario("Pasando cadena al heap , '"+x+"'");
  if(!x) x="Undefined";
  
  for (let i = 0; i < x.length; i++) {
    let item: number = x.charCodeAt(i);
    return_string += "heap[(int)H] = " + item + " ;\n";
    return_string += "H = H + 1;\n";
    //console.log(item);
  }
  return_string += "heap[(int)H] = -1 ;\n";
  return_string += "H = H + 1;\n";

  //referencia de la cadena desde el stack
  //Principal.posicion;
  
  let temp2 = Principal.posicion+1+"";
  return_string +="stack[(int)"+(temp2)+"] = " +t+";\n";
  
  Principal.historial += return_string;
  
  Principal.addComentario("Fin de pasar cadena al heap")
    //"t" + Principal.temp + " = P + " + Principal.posicion + ";\n";
  
  
  return temp2;
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
