#include<stdio.h>
int main()
{
    int x;

    /* Print column names */
    printf("Number\tSquare\tCube\n");
    printf("=========================\n");

    // Loop to calculate and print squares and cubes
    for(x=0; x<=20; x++)
        printf("%d\t%d\t%d\n", x, x*x, x*x*x);

    return 0;
}