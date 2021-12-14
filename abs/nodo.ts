export class NodoAST{

    hijos:NodoAST[];
    valor:string;
    constructor(valor:string){
        this.hijos=[];
        this.valor=valor;
    }

    agregarHijo(valorHijo:string){

        this.hijos.push(new NodoAST(valorHijo));
    }
    agregarHijoNodo(hijo:NodoAST){
        this.hijos.push(hijo);
    }
    getValor():string{
        return this.valor;

    }
    getHijos():NodoAST[]{
        return this.hijos;
    }

    // setHijos(hijos:NodoAST[]){
    //     this.hijos=hijos;
    // }
    // agregarHijos(hijos:NodoAST[]){

    //     for(hijo in hijos){
    //         this.hijos.push(hijo);
    //     }
    // }
}