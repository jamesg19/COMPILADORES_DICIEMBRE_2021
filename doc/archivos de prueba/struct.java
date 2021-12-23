/***************** GRAFICAR TS*******************/
int x = 10;
string y = "Hola compi2";
boolean z = true;
int[] arreglo = [1,2,3,4,5];
boolean[] arreglo2 = [true, false];

struct t  {
string nombre,
int edad
};

struct x  {
string personaje,
boolean booleano
};

void main(){
  t persona = t("Calificacion",25);
  println(persona);
  
  persona.nombre = "Cambio";
  persona.edad = 40;
  
  println(persona);
  
  
  // persona = null;
  // println(persona);

int hola = 20;

funcion1();
funcion2(1, "2", true);
funcion3();
StructBasico();

}


void StructBasico(){
    t persona = t("Calificacion",25);
    println(persona);

    persona.nombre = "Cambio";
    persona.edad = 40;

    println(persona);


    persona = null;
    println(persona);

}


void funcion1() {
    graficar_ts(); //Grafica global
}

void funcion2(int param1, String param2, boolean param3) {
    graficar_ts(); //Grafica global + 3 parametros
}

void funcion3(){
    int x = 10;
    int y = 10;
    int z = 20;
    graficar_ts();//Grafica global + 3 variables
}