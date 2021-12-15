 
	int fibonacci(int num){
        if(num == 0){
        	return 0;
        }
        else if (num == 1){
        	return 1;
        }
        else{
        	return fibonacci(num - 1) + fibonacci(num - 2);
        }
    }	 
void main(){  
            
    println("*****FIBONACCI*****");
   	println(string(fibonacci(0))&", ");
    println(string(fibonacci(1))&", ");
    println(string(fibonacci(2))&", ");
    println(string(fibonacci(3))&", ");
    println(string(fibonacci(4))&", ");
    println(string(fibonacci(5))&", ");
    println(string(fibonacci(6))&", ");
    println(string(fibonacci(7))&", ");
    println(string(fibonacci(8))&", ");
    println(string(fibonacci(9))&", ");
	println(string(fibonacci(10)));

	return;
}