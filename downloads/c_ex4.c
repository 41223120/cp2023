#include <stdio.h>
int main()
{
int a = 10, b = 5;
printf( " a == b is %d \n", a == b );
printf( " a > b is %d \n", a > b );
printf( " a < b is %d \n", a < b );
printf( " a >= b is %d \n", a >= b );
printf( " a <= b is %d \n", a <= b );
printf( " a != b is %d \n", a != b );
printf( "\n" );
b = 10;
printf( " a == b is %d \n", a == b );
printf( " a > b is %d \n", a > b );
printf( " a < b is %d \n", a < b );
printf( " a >= b is %d \n", a >= b );
printf( " a <= b is %d \n", a <= b );
printf( " a != b is %d \n", a != b );
return 0;
}