struct Persona{
    string nombre,
    string apellido,
    Persona[] hijos
};

int cambiarAtributo(Estructura s){
    s.x = 10;
}

void main(){
    
Persona p = Persona("Julio", "Fernando ",null);
Persona p2 = Persona("Julio", "Fernando ",[p]);

println(p2);
}