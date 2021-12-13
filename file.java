// int ackerman(int m, int n)
// {    
//     if (m == 0){
//         return n + 1;
//     }else if (m > 0 && n == 0){
//         return ackerman(m - 1, 1);
//     }else{
//         return ackerman(m - 1, ackerman(m, n - 1));
//     }
// }

// void hanoi( int discos, int origen, int auxiliar, int destino)
// {
//     println(discos);
    
//     // if (discos == 1){
//     //     println("Mover de " + origen + " a " + destino);
//     // }else{
//     //     hanoi(discos - 1, origen, destino, auxiliar);
//     //     println("Mover de " + origen + " a " + destino);
//     //     hanoi(discos - 1, auxiliar, origen, destino);
//     // }
// }

// int factorial(int num){
    
//     //println(num);
//     if (num == 1){
//         return 1;
//     }else{
//         return num * factorial(num - 1);
//     }

// }

struct mi_struct{int a, int b};
struct otro{int c, mi_struct c};
void main()
{
    // println("=====================================================");
    // println("=========== Struct======================");
    // println("=====================================================");
    // println("");
    int[] v = [1,2,3,4];
    int a ,b,c,d;
    println(a,b,c,d);
    mi_struct m = mi_struct(1,v);
    otro o = otro(1,m);
    println (m.a);
    println(o);

}
