struct Estructura{
    int x,
    int[] i

};

function cambiarAtributo(Estructura s){
    s.x = 10;
}


void main(){
    
    boolean r = (0 == 0) != (44.3 < 44.4) == (pow(2,5) == 31 + 2 % 1);
    println(r);
    
    // int [] arr = [1,2,[4,3]];
    // println(arr);
    // Estructura a = Estructura(0,arr);
    // println(a.i[2][1]);           

// cambiarAtributo(a);
// println(a);             // Imprime 'Estructura(10)'
// println(a.x);   
return 0;  

}