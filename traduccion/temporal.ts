export class Temporal{

    nombre:string;
    utilizado:boolean;

    constructor(nombre:string){
        this.nombre=nombre;
        this.utilizado=false;
    }
    obtener():string{
        return this.nombre;
    }

    utilizar():string{
        this.utilizado=true;
        return this.nombre;
    }




}