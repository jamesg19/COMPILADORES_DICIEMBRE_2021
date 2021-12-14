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

struct Persona{
    string nombre,
    string apellido,
    Persona[] hij0    
};

void main()
{
    
Persona persona = Persona("Juan","Perez",null);
Persona persona2 = Persona("Llll","vvvv",[]);
println(persona2);


    // mi_struct m = mi_struct(2000,330);
    
    // otro o = otro(1,m,m,90);
    // //o.c.a = 40;
    // println(o.c);
    
    // int a = o.c.a;
    // a = 32222;
    
    // o.c.a = 312;
    // println(o.c.a);
    // println("Valor A = 2000 ->" & a);
    
//     int[] arr = [
//   [
//   	[5,10,15,20],
//     [25,30,35,40]
//   ],
//   [
//     [45,50,55,60],
//     [65,70,75,80]
//   ],
//   [
//     [85,90,95,100],
//     [105,110,115,120]
//   ]
// ]; //[3][2][4]

// println(arr);

// println(arr[0][0][0]);
// println(arr[0][0][1]);
// println(arr[0][0][2]);
// println(arr[0][0][3]);
// println(arr[0][1][0]);
// println(arr[0][1][1]);
// println(arr[0][1][2]);
// println(arr[0][1][3]);
// println(arr[1][0][0]);
// println(arr[1][0][1]);
// println(arr[1][0][2]);
// println(arr[1][0][3]);
// println(arr[1][1][0]);
// println(arr[1][1][1]);
// println(arr[1][1][2]);
// println(arr[1][1][3]);
// println(arr[2][0][0]);
// println(arr[2][0][1]);
// println(arr[2][0][2]);
// println(arr[2][0][3]);
// println(arr[2][1][0]);
// println(arr[2][1][1]);
// println(arr[2][1][2]);
// println(arr[2][1][3]);

// arr[0][0][0] = 120;
// arr[0][0][1] = 115;
// arr[0][0][2] = 110;
// arr[0][0][3] = 105;
// arr[0][1][0] = 100;
// arr[0][1][1] = 95;
// arr[0][1][2] = 90;
// arr[0][1][3] = 85;
// arr[1][0][0] = 80;
// arr[1][0][1] = 75;
// arr[1][0][2] = 70;
// arr[1][0][3] = 65;
// arr[1][1][0] = 60;
// arr[1][1][1] = 55;
// arr[1][1][2] = 50;
// arr[1][1][3] = 45;
// arr[2][0][0] = 40;
// arr[2][0][1] = 35;
// arr[2][0][2] = 30;
// arr[2][0][3] = 25;
// arr[2][1][0] = 20;
// arr[2][1][1] = 15;
// arr[2][1][2] = 10;
// arr[2][1][3] = 5;


// println(arr[0][0][0]);
// println(arr[0][0][1]);
// println(arr[0][0][2]);
// println(arr[0][0][3]);
// println(arr[0][1][0]);
// println(arr[0][1][1]);
// println(arr[0][1][2]);
// println(arr[0][1][3]);
// println(arr[1][0][0]);
// println(arr[1][0][1]);
// println(arr[1][0][2]);
// println(arr[1][0][3]);
// println(arr[1][1][0]);
// println(arr[1][1][1]);
// println(arr[1][1][2]);
// println(arr[1][1][3]);
// println(arr[2][0][0]);
// println(arr[2][0][1]);
// println(arr[2][0][2]);
// println(arr[2][0][3]);
// println(arr[2][1][0]);
// println(arr[2][1][1]);
// println(arr[2][1][2]);
// println(arr[2][1][3]);

// println(arr);
}
