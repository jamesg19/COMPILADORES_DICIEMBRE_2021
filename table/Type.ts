import { Simbolo } from './simbolo';


export class Type{
  id: string|null;
  atributos: Map<String, Simbolo>;

  constructor(id: string, atributos: Map<String, Simbolo>){
      this.id= id;
      this.atributos = atributos;
    Object.assign(this, {id, atributos});
  }

  hasAtributo(id: string){
    return this.atributos.has(id);
  }

  getAtributo(id: string) : Simbolo|undefined{
    //return this.atributos.get(id);
    return this.atributos.get(id);
  }

  setAtributo(variable : Simbolo){
    this.atributos.set(variable.id, variable);
  }

  public toString(): string{
    let salida = '{';
    let i = 0;
    const size = this.atributos.size - 1;
    for (let [key, value] of this.atributos) {
      salida += `${key}: `;
      if(value instanceof Simbolo){
        salida += `${value.valor}`;
      }
      else{
        salida += `${value}`;
      }
      if(i != size){
        salida += ', '
      }
      i++;
    }
    salida += '}'
    return salida;
  }

  public getSalidaBase() : String{
    let salida = `${this.id} = {`;
    let i = 0;
    const size = this.atributos.size - 1;
    for (let [key, value] of this.atributos) {
      salida += `${key}`;
      if(i != size){
        salida += ', '
      }
      i++;
    }
    salida += '}'
    return salida;
  }
}
