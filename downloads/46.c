#include <stdio.h>
int main() {
    double s=0, j=1, d, i;

    // Loop to calculate the series
    for(i=1; i<=7; i+=2){
        d = (i/j);
        s += d;
        j = j*2;
    }

    // Print the result
    printf("Value of series: %.2lf\n", s);

    return 0;
}