#include<stdio.h>
void main()
{
int a,b;
a = 15;
b = 1;
printf("%d \n", a | b ); /* a OR b */
printf("%d \n", a & b ); /* a AND b */
printf("%d \n", a ^ b ); /* a XOR b */
printf("%d \n", a << 1 ); /* a 位元左移 1 位 */
printf("%d \n", a >> 1 ); /* a 位元右移一位 */
printf("%d \n", ~a ); /* A 的補數運算 */
}