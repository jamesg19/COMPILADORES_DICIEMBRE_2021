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

struct otro{int p, mi_struct c,mi_struct d,int r};
void main()
{
    mi_struct m = mi_struct(2000,330);
    
    otro o = otro(1,m,m,90);
    //o.c.a = 40;
    println(o.c);
    
    int a = o.c.a;
    a = 32222;
    
    o.c.a = a;
    println(o.c.a);
    println("Valor A = 2000 ->" & a);
    
}
