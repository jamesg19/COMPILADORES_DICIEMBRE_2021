import { TIPO } from "./tipo";

export class Simbolo {
  id: string;
  tipo: TIPO;
  fila: number;
  columna: number;
  valor: any;
  arreglo: boolean;
  struct: boolean;
  constante: boolean;
  name_struct: string;
  print_text: string;
  posicion:number;
  /**
   * @param  {string} id
   * @param  {TIPO} tipo
   * @param  {number} fila
   * @param  {number} columna
   * @param  {any} valor
   * @param  {boolean} arreglo
   * @param  {boolean} struct
   */
  constructor(
    id: string,
    tipo: TIPO,
    fila: number,
    columna: number,
    valor: any,
    arreglo: boolean,
    struct: boolean
  ) {
    this.id = id;
    this.tipo = tipo;
    this.fila = fila;
    this.columna = columna;
    this.arreglo = arreglo;

    this.valor = valor; //arreglo? JSON.parse(JSON.stringify(valor)):valor;
    this.name_struct = "";
    this.struct = struct;
    this.constante = false;
    this.posicion = 0;
    
  }
  
  /**
   */
  getID() {
    return this.id;
  }
  /**
   * @param  {string} id
   */
  setID(id: string) {
    this.id = id;
  }
  /**
   */
  getTipo(): TIPO {
    return this.tipo;
  }
  /**
   * @param  {TIPO} tipo
   */
  setTipo(tipo: TIPO) {
    this.tipo = tipo;
  }
  /**
   */
  getValor() {
    return this.valor;
  }
  /**
   * @param  {any} valor
   */
  setValor(valor: any) {
    this.valor = valor;
  }
  /**
   */
  getArreglo() {
    return this.arreglo;
  }
  /**
   */
  getStruct() {
    return this.struct;
  }
  
  toString(): string {
    let value: string = this.valor;

    if (this.struct) {
      value = "";

      value = this.name_struct + "( ";

      if (this.valor instanceof Map) {
        //sim.valor.map((x)=> console.log(x));
        this.valor.forEach((x) => {
          if(x.struct){
            
            let simbolo:Simbolo = Object.setPrototypeOf((x),Simbolo.prototype);
            value += x.id + " = "+simbolo.toString()+" )";
                       
          }else
          value += x.id + " = " + x.valor + ", "; //x.toString()//x();
        });
        
        value = value.slice(0, value.length - 2);
        value += " )";
      }
      //else if(this.valor instanceof )
    }
    return value;
  }
   getTuPe():number{
    
    let pos_stack = this.posicion;
    this.posicion ++;
    
    return pos_stack;
  }
  
}
