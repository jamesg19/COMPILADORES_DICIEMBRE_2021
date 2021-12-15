struct Estructura{
    int x
};

int cambiarAtributo(Estructura s){
    s.x = 10;
}

void main(){
    
Estructura a = Estructura(0);
println(a);             // Imprime 'Estructura(0)'
println(a.x);           // Imprime 0

cambiarAtributo(a);

println(a);             // Imprime 'Estructura(10)'
println(a.x);           // Imprime 10
}