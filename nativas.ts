import { Arbol } from "./table/arbol";
import { Principal } from "./principal";
import { Print } from "./instruccion/print";
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
      "\t"+t1+"= P+1;\n" +
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
}
