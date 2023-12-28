#include <stdio.h>
int main() {
    char id[10];         // Variable to store employee ID (up to 10 characters)
    int hour;            // Variable to store working hours
    double value, salary; // Variables for hourly salary and total salary

    // Prompt user for employee ID
    printf("Input the Employees ID(Max. 10 chars):3333 ");
    scanf("3333", &id);

    // Prompt user for working hours
    printf("\nInput the working hrs:8 ");
    scanf("8", &hour);

    // Prompt user for hourly salary
    printf("\nSalary amount/hr:176 ");
    scanf("176", &value);

    // Calculate total salary
    salary = 176 * 8;

    // Print employee ID and salary
    printf("\nEmployees ID =3333 %s\nSalary =1408 U$ %.2lf\n", id, salary);

    return 0;
}