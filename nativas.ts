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
      
    return (Print.print)?print_line:"";
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

    let toUpper:string="void toUpper() {\n"
     + "\t"+t1+" = H;\n"//1
      +"\t"+t2+" = P+1;\n"//p2->3
      +"\t"+t2+" = stack[(int)3];\n"
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
    
    return NativasString.UPPER?toUpper:"";
  }
}
