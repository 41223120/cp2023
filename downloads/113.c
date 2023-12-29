#include <stdio.h>

int main ()
{
    int a, b;

    // Loop to execute statements with changing values of 'a' and 'b'
    for (a = 1, b = 100; a <= 37, b >= 0; a += 5, b -= 10)
        printf("a=%d \t b=%d\n", a, b);
}