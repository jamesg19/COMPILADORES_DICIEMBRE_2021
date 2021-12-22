import { Arbol } from "./table/arbol";
import { Principal } from "./principal";
import { Print } from "./instruccion/print";
import { NativasString } from "./expresiones/nativas/nativas_string";
export class Nativas {
  constructor() {}
  print_function(arbol: Arbol): string {
    
    let temp = Principal.temp;
    temp++;
    let t1 = "t" + temp;
    temp++
    let t2 = "t" + temp;
    temp++
    let t3 = "t" + temp;
    Principal.temp = temp;
    
    
    let etiqueta = Principal.etiqueta;
    
    etiqueta++;
    let label0 = "L"+etiqueta;
    etiqueta++;
    let label1 = "L"+etiqueta;
   Principal.etiqueta = etiqueta;
   
    let print_line: string =
      "/*------NATIVES------*/\n" +
      "void printString() {\n" +
      "\t"+t1+"= P;\n" +
      "\t"+t2+" = stack[(int)"+t1+"];\n" +
      "\t"+label1+":\n" +
      "\t"+t3+" = heap[(int)"+t2+"];\n" +
      "\tif("+t3+" == -1) goto "+label0+";\n" +
      "\tprintf(\"%c\", (char)"+t3+");\n" +
      "\t"+t2+" = "+t2+"+1;\n" +
      "\tgoto "+label1+";\n" +
      "\t"+label0+":\n" +
      "\treturn;\n" +
      "}\n";
      
    return print_line;
  }
  toUpper():string{
    
    let temp = Principal.temp;
    temp++;
    let t1 = "t" + temp;
    temp++
    let t2 = "t" + temp;
    temp++
    let t3 = "t" + temp;
    Principal.temp = temp;
    
    
    let etiqueta = Principal.etiqueta;

    etiqueta++;
    let l0 = "L"+etiqueta;
    etiqueta++;
    let l1 = "L"+etiqueta;
    etiqueta++;
    let l2 = "L"+etiqueta;
    Principal.etiqueta  = etiqueta;

    let toUpper:string="void toUpper() {\n"
     + "\t"+t1+" = H;\n"//1
      +"\t"+t2+" = P+1;\n"//p2->3
      +"\t"+t2+" = stack[(int)"+t2+"];\n"
      +"\t"+l0+":\n"
      +"\t"+t3+" = heap[(int)"+t2+"];\n"
      +"\t"+"if("+t3+" == -1) goto "+l2+";\n"
      +"\t"+"if("+t3+" < 97) goto "+l1+";\n"
      +"\t"+"if("+t3+" > 122) goto "+l1+";\n"
      +"\t"+t3+" = "+t3+"-32;\n"
      +"\t"+l1+":\n"
      +"\t"+"heap[(int)H] = "+t3+";\n"
      +"\t"+"H = H + 1;\n"
      +"\t"+t2+" = "+t2+"+1;\n"
      +"\t"+"goto "+l0+";\n"
      +"\t"+l2+":\n"
      +"\t"+"heap[(int)H] = -1;\n"
      +"\t"+"H = H + 1;\n"
      +"\t"+"stack[(int)P] = "+t1+";\n"
      +"\t"+"return;\n"
  +"}"
    
    return toUpper;
  }
  getLength():string{
    
    let temp = Principal.temp;
    temp++;
    let t1 = "t" + temp;
    temp++
    let t2 = "t" + temp;
    temp++
    let t3 = "t" + temp;
    temp++
    let t4 = "t" + temp;
    Principal.temp = temp;
    
    let etiqueta = Principal.etiqueta;
    etiqueta++;
    let L0 = "L"+etiqueta;
    etiqueta++;
    let L1 = "L"+etiqueta;
    Principal.etiqueta  = etiqueta;
    
    
    let len:string ="void len() {\n"
     +"\t"+t1+" = 0;\n"
     +"\t"+t2+" = P;\n"
     +"\t"+t3+" = stack[(int)"+t2+"];\n"
     +"\t"+t4+" = heap[(int)"+t3+"];\n"
     +"\t"+L1+":\n"
     +"\t"+"if("+t4+" == -1) goto "+L0+";\n"
     +"\t"+t3+" = "+t3+"+1;"
     +"\t"+t4+" = heap[(int)"+t3+"];\n"
     +"\t"+t1+" = "+t1+"+1;\n"
     +"\t"+"goto "+L1+";\n"
     +"\t"+L0+":\n"
     +"\t"+"stack[(int)P] ="+ t1+";\n"
     +"\t"+"return;\n"
  
  +"}\n"
    return len;
  }
  toLower():string{
    
    let temp = Principal.temp;
    temp++;
    let t1 = "t" + temp;
    temp++
    let t2 = "t" + temp;
    temp++
    let t3 = "t" + temp;
    Principal.temp = temp;
    
    
    let etiqueta = Principal.etiqueta;

    etiqueta++;
    let l0 = "L"+etiqueta;
    etiqueta++;
    let l1 = "L"+etiqueta;
    etiqueta++;
    let l2 = "L"+etiqueta;
    Principal.etiqueta  = etiqueta;

    let toUpper:string="void toLower() {\n"
     + "\t"+t1+" = H;\n"//1
      +"\t"+t2+" = P+1;\n"//p2->3
      +"\t"+t2+" = stack[(int)"+t2+"];\n"
      +"\t"+l0+":\n"
      +"\t"+t3+" = heap[(int)"+t2+"];\n"
      +"\t"+"if("+t3+" == -1) goto "+l2+";\n"
      +"\t"+"if("+t3+" < 65) goto "+l1+";\n"
      +"\t"+"if("+t3+" > 90) goto "+l1+";\n"
      +"\t"+t3+" = "+t3+"+32;\n"
      +"\t"+l1+":\n"
      +"\t"+"heap[(int)H] = "+t3+";\n"
      +"\t"+"H = H + 1;\n"
      +"\t"+t2+" = "+t2+"+1;\n"
      +"\t"+"goto "+l0+";\n"
      +"\t"+l2+":\n"
      +"\t"+"heap[(int)H] = -1;\n"
      +"\t"+"H = H + 1;\n"
      +"\t"+"stack[(int)P] = "+t1+";\n"
      +"\t"+"return;\n"
  +"}"
    
    return toUpper+"";
  }
  
  charAt():string{
    
    let temp = Principal.temp;
    temp++;
    let t1 = "t" + temp;
    temp++
    let t2 = "t" + temp;
    temp++
    let t3 = "t" + temp;
    temp++
    let t4 = "t" + temp;
    temp++
    let t5 = "t" + temp;
    Principal.temp = temp;
    
    
    let etiqueta = Principal.etiqueta;

    etiqueta++;
    let l0 = "L"+etiqueta;
    etiqueta++;
    let l1 = "L"+etiqueta;
    etiqueta++;
    let l2 = "L"+etiqueta;
    etiqueta++;
    let l3 = "L"+etiqueta;
    Principal.etiqueta  = etiqueta;
    
    let charAtS="void charAt() {\n"
    +"\t"+t1+" = H;\n"
    +"\t"+t3+" = P;\n"
    +"\t"+t2+" = stack[(int)"+t3+"];\n"
    +"\t"+t3+" = "+t3+"-1;\n"
    +"\t"+t3+" = stack[(int)"+t3+"];\n"
    +"\t"+t4+" = 0;"
    +"\t"+l0+":\n"
    +"\t"+t5+" = heap[(int)"+t3+"];\n"
    +"\t"+"if("+t5+" == -1) goto "+l1+";\n"
    +"\t"+"if("+t4+" == "+t2+") goto "+l2+";\n"
    +"\t"+t3+" = "+t3+"+1;\n"
    +"\t"+t4+" = "+t4+"+1;\n"
    +"\t"+"goto "+l0+";\n"
    +"\t"+l1+":\n"
    +"\t"+"heap[(int)H] = -1;\n"
    +"\t"+"H = H + 1;\n"
    +"\t"+"goto "+l3+";\n"
    +"\t"+l2+":  \n"
    +"\t"+t5+" = heap[(int)"+t3+"];\n"
    +"\t"+"heap[(int)H] = "+t5+";\n"
    +"\t"+"H = H + 1;\n"
    +"\t"+"heap[(int)H] = -1;\n"
    +"\t"+"H = H + 1;\n"
    +"\t"+l3+":\n"
    +"\t"+"stack[(int)P] = "+t5+";\n"
    +"\t"+"return;\n"
    +"\t"+"}\n"
    return charAtS;
  }
  
  potencia_string(): string {
    
    Principal.addComentario("Iniciando con Potencia")
    let temp = Principal.temp;
    temp++;
    let t1 = "t" + temp;
    temp++
    let t2 = "t" + temp;
    temp++
    let t3 = "t" + temp;
    temp++
    let tcantidad = "t" + temp;
    temp++
    let tref = "t" + temp;
    
    Principal.temp = temp;
    
    
    let etiqueta = Principal.etiqueta;
    
    etiqueta++;
    let label0 = "L"+etiqueta;
    etiqueta++;
    let label1 = "L"+etiqueta;
    etiqueta++;
    let label_discount = "L"+etiqueta;
   Principal.etiqueta = etiqueta;
   
    let print_line: string =
      "/*------- POTENCIA STRING ------*/\n" +
      //Principal.addComentario("creo que debo tambien almacenar el valor de H para reasignarlo, para evitar que se llene rapido");                               
      "void potencia_string() {\n" +
      "\t"+t1+"= P-1; //referencia a la cadena \n" +                         //referencia a la cadena                    //puntero disponible
      "\t"+tcantidad+"= stack[(int)(P+1)];//Numero de veces que se van a repetir\n" +  //cantidad de veces que se debera repetir la cadena
      "\t"+t2+" = stack[(int)"+t1+"];// posicion del heap donde inicia la cadena\n" +       //le asigno el primer caracteer 
      "\t"+tref+" = P+2;\n //encuentro la nueva posicion libre en la que se almacenara el resultado de la potencia\n" + 
      "\tstack[(int)"+tref+"] = H;\n\n" +        //guardo la referencia en donde se almacenara la cadena repetida

      "\t"+label1+":\n" +                        //etiqueta para un loop
      "\t"+t3+" = heap[(int)"+t2+"];\n" +        //le doy el caracter actual, en la primera iteracion seria la primera letra
      "\tif("+t3+" == -1) goto "+label_discount+";\n" +  //le pregunto  si ya llego al limite de la palabra
      "\theap[(int)H] = " + t3 + " ;\n"+
      "\tH = H + 1;\n"+
      "\t"+t2+" = "+t2+"+1;\n" +
      
      
      "\tgoto "+label1+";\n" +
      "\t"+label_discount+":\n"+
      "\t"+tcantidad+" = "+tcantidad+" - 1;\n"+
      "\n\tif("+tcantidad+" == 0) goto "+label0+";\n" +
      "\t"+t2+" = stack[(int)"+t1+"];// primer caracaeter\n" +   
      "\t goto "+label1+";\n"+
      //Principal.addComentario("Etiqueta de Salida")
      "\t"+label0+":\n" +
      "\theap[(int)H] = -1;\n"+
      "\tH = H+1;\n"+
      "\tP = "+tref+";\n"+
      "\treturn;\n" +
      "}\n";
      
      
      Principal.addComentario("Fin Potencia String")
    return print_line;
  }
  potencia_int(){
    
    Principal.addComentario("Potencia Enteros");
    let temp = Principal.temp;
    temp++;
    let tbase = "t" + temp;//valor que se multiplicara
    temp++
    let texponente = "t" + temp;//cantidad de veces que se multiplicara
    temp++
    let tresultado = "t" + temp;//cantidad de veces que se multiplicara
    temp++
    let tpos = "t" + temp;
    Principal.temp = temp;
    
    
    let etiqueta = Principal.etiqueta;
    
    etiqueta++;
    let label0 = "L"+etiqueta;
    etiqueta++;
    let label1 = "L"+etiqueta;
    etiqueta++;
    let label_salida = "L"+etiqueta;
   Principal.etiqueta = etiqueta;
   //
   //inicia proceso para realizar una potencia
   let potencia="\t"+tbase +" = P;\n"+
   "\t"+texponente+" = P+1;\n"+
   "\t"+tresultado+" = 1;\n"+
   
   "\t"+label0+":"+
   tresultado+"= "+tresultado+" * "+texponente+";\n"+
   texponente+" = "+texponente+" - 1;\n";
   "if("+texponente+"== 0) goto "+label0+";\n"+
   ""
   
   
   
   
   
   
  }
  
}
