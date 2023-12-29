#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <limits.h>
#include <float.h>
int main( void )
{
    // Print header for integer data types
    printf( "Ranges for integer data types in C\n\n" );

    // Print separator line
    printf( "------------------------------------------------------------\n");

    // Print range for int8_t
    printf( "int8_t    %20d  %20d\n"     , SCHAR_MIN , SCHAR_MAX  );

    // Print range for int16_t
    printf( "int16_t   %20d  %20d\n"     , SHRT_MIN  , SHRT_MAX   );

    // Print range for int32_t
    printf( "int32_t   %20d  %20d\n"     , INT_MIN   , INT_MAX    );

    // Print range for int64_t
    printf( "int64_t   %20lld  %20lld\n" , LLONG_MIN , LLONG_MAX  );

    // Print range for uint8_t
    printf( "uint8_t   %20d  %20d\n"     , 0         , UCHAR_MAX  );

    // Print range for uint16_t
    printf( "uint16_t  %20d  %20d\n"     , 0         , USHRT_MAX  );

    // Print range for uint32_t
    printf( "uint32_t  %20d  %20u\n"     , 0         , UINT_MAX   );

    // Print range for uint64_t
    printf( "uint64_t  %20d  %20llu\n"   , 0         , ULLONG_MAX );

    // Print separator line
    printf( "\n" );

    // Print separator line
    printf( "============================================================\n\n");

    // Print header for real number data types
    printf( "Ranges for real number data types in C\n\n" );

    // Print separator line
    printf( "------------------------------------------------------------\n");

    // Print range for float
    printf( "float        %14.7g  %14.7g\n"   , FLT_MIN  , FLT_MAX  );

    // Print range for double
    printf( "double       %14.7g  %14.7g\n"   , DBL_MIN  , DBL_MAX  );

    // Print range for long double
    printf( "long double  %14.7Lg  %14.7Lg\n" , LDBL_MIN , LDBL_MAX );

    // Print separator line
    printf( "\n" );

    return 0;
}