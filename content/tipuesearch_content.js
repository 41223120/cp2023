var tipuesearch = {"pages": [{'title': 'About', 'text': ' https://github.com/mdecycu/cmsite \n', 'tags': '', 'url': 'About.html'}, {'title': 'w6', 'text': '// https://en.wikipedia.org/wiki/Flag_of_the_Republic_of_China\n// 內政部國旗參考資料: https://www.moi.gov.tw/cp.aspx?n=10621\n// cc roc_flag_in_gd.c -lgd -lm to link with gd and math library\n// https://www.rapidtables.com/web/color/RGB_Color.html\n// 幾何形狀著色與繪圖練習\n// 以下 gd 繪圖程式嘗試畫出 ROC 國旗, 請根據下列程式內容完成後續的國旗繪圖\n#include <stdio.h>\n#include <gd.h>\n#include <math.h>\n\nvoid draw_roc_flag(gdImagePtr img);\nvoid draw_white_sun(gdImagePtr img, int x, int y, int size, int color);\n\nint main() {\n    // width 3: height 2\n    int width = 1200;\n    // 國旗長寬比為 3:2\n    int height = (int)(width*2.0 / 3.0);\n\n    gdImagePtr img = gdImageCreateTrueColor(width, height);\n    gdImageAlphaBlending(img, 0);\n\n    draw_roc_flag(img);\n\n    FILE *outputFile = fopen("./../images/roc_flag_in_gd.png", "wb");\n    if (outputFile == NULL) {\n        fprintf(stderr, "Error opening the output file.\\n");\n        return 1;\n    }\n    gdImagePngEx(img, outputFile, 9);\n    fclose(outputFile);\n    gdImageDestroy(img);\n    return 0;\n}\n\nvoid draw_roc_flag(gdImagePtr img) {\n    int width = gdImageSX(img);\n    int height = gdImageSY(img);\n    int red, white, blue;\n    // 白日位於青天面積正中央, 因此中心點座標為長寬各 1/4 處\n    int center_x = (int)(width/4);\n    int center_y = (int)(height/4);\n    // gdImageFilledEllipse 需以長寬方向的 diameter 作圖\n    // 由於中央白日圓形的半徑為青天寬度的 1/8\n    // 因此中央白日圓形的直徑為青天寬度的 1/4, 也就是國旗寬度的 1/8\n    // 而且白日十二道光芒的外圍圓形其半徑也是國旗寬度的1/8\n    int sun_radius = (int)(width/8);\n    // 中央白日圓形的直徑等於十二道光芒外圍圓形的半徑\n    int white_circle_dia = sun_radius;\n    // 中央藍色圓形半徑為中央白日的 1又 2/15\n    int blue_circle_dia = white_circle_dia +  white_circle_dia*2/15;\n    // 根據 https://www.moi.gov.tw/cp.aspx?n=10621 訂定國旗三種顏色值\n    red = gdImageColorAllocate(img, 255, 0, 0); // 紅色\n    white = gdImageColorAllocate(img, 255, 255, 255); // 白色\n    blue = gdImageColorAllocate(img, 0, 0, 149); // 藍色\n    // 根據畫布大小塗上紅色長方形區域\n    gdImageFilledRectangle(img, 0, 0, width, height, red);\n    // 青天面積為整面國旗的 1/4, 也是採用長方形塗色\n    gdImageFilledRectangle(img, 0, 0, (int)(width/2.0), (int)(height/2.0), blue);\n    // 先設法以填色畫出六個白色堆疊菱形\n    draw_white_sun(img, center_x, center_y, sun_radius, white);\n    // 利用一個藍色大圓與白色小圓畫出藍色環狀\n    gdImageFilledEllipse(img, center_x, center_y, blue_circle_dia, blue_circle_dia, blue);\n    gdImageFilledEllipse(img, center_x, center_y, white_circle_dia, white_circle_dia, white);\n\n}\n\nvoid draw_white_sun(gdImagePtr img, int center_x, int center_y, int sun_radius, int color) {\n    // M_PI 大小定義於 math.h 標頭檔中, 因為三角函數中採用徑度為角度單位\n    // 因此定義將角度轉為徑度的轉換變數為 deg, 角度值乘上 deg 就可轉為徑度\n    float deg = M_PI/180;\n    // 根據十二道光芒的每一尖角的角度為 15 度, 求出其對應直角三角形的另一角度為 75 度\n    // 求出十二道光芒中任一菱形的 small radius, 也就是菱形的另一個對應小圓的半徑大小\n    float sr = sun_radius/tan(75*deg);\n    int ax, ay, bx, by, dx, dy, ex, ey;\n    gdPoint points[4];\n    /* 在塗上十二道光芒中的單一菱形區域之前, 先以座標點畫線測試是否正確\n    ax = center_x;\n    ay = center_y - sun_radius;\n    bx = center_x - sun_radius*tan(15*deg);\n    by = center_y;\n    ex = center_x;\n    ey = center_y + sun_radius;\n    dx = center_x + sun_radius*tan(15*deg);\n    dy = center_y;\n    // AB\n    gdImageLine(img, ax, ay, bx, by, color);\n    // BE\n    gdImageLine(img, bx, by, ex, ey, color);\n    // ED\n    gdImageLine(img, ex, ey, dx, dy, color);\n    // DA\n    gdImageLine(img, dx, dy, ax, ay, color);\n    */\n    ax = center_x;\n    ay = center_y - sun_radius;\n    bx = center_x - sun_radius*tan(15*deg);\n    by = center_y;\n    ex = center_x;\n    ey = center_y + sun_radius;\n    dx = center_x + sun_radius*tan(15*deg);\n    dy = center_y;\n    // 確定單一菱形區域的塗色正確後, 利用迴圈每次轉動 30 度, 總共轉六次即可塗上十二道光芒區域\n    for (int i=1;i<=6;i++){\n    // A\n    points[0].x = ax+sun_radius*sin(30*deg*i);\n    points[0].y = ay+sun_radius-sun_radius*cos(30*deg*i);\n    // B\n    points[1].x = bx+sr-sr*cos(30*deg*i);\n    points[1].y = by-sr*sin(30*deg*i);\n    // E\n    points[2].x = ex-sun_radius*sin(30*deg*i);\n    points[2].y = ey-(sun_radius-sun_radius*cos(30*deg*i));\n    // D\n    points[3].x = dx-(sr-sr*cos(30*deg*i));\n    points[3].y = dy+sr*sin(30*deg*i);\n    // 對菱形區域範圍塗色\n    gdImageFilledPolygon(img, points, 4, color);\n    // 在菱形區域外圍畫線, 明確界定菱形範圍\n    gdImagePolygon(img, points, 4, color);\n    }\n} \n \n #include <stdio.h>\n#include <gd.h>\n#include <math.h>\n\nvoid draw_usa_flag(gdImagePtr img);\nvoid draw_star(gdImagePtr img, int x, int y, int size, int color, double rotation_angle);\n\nint main() {\n    int width = 800;\n    int height = (int)(width / 1.9);\n\n    gdImagePtr img = gdImageCreateTrueColor(width, height);\n    gdImageAlphaBlending(img, 0);\n\n    draw_usa_flag(img);\n\n    FILE *outputFile = fopen("./../images/usa_flag.png", "wb");\n    if (outputFile == NULL) {\n        fprintf(stderr, "打开输出文件时出错。\\n");\n        return 1;\n    }\n\n    gdImagePngEx(img, outputFile, 9);\n    fclose(outputFile);\n    gdImageDestroy(img);\n\n    return 0;\n}\n\nvoid draw_usa_flag(gdImagePtr img) {\n    int width = gdImageSX(img);\n    int height = gdImageSY(img);\n    int red, white, blue;\n    // 国旗颜色\n    red = gdImageColorAllocate(img, 178, 34, 52); // 红色条纹\n    white = gdImageColorAllocate(img, 255, 255, 255); // 白色条纹\n    blue = gdImageColorAllocate(img, 60, 59, 110); // 蓝色矩形\n\n    int stripe_height = height / 13;\n    int stripe_width = width;\n    int star_size = (int)(0.0308 * height); // 星星大小\n\n    for (int y = 0; y < height; y += stripe_height) {\n        if (y / stripe_height % 2 == 0) {\n            gdImageFilledRectangle(img, 0, y, stripe_width, y + stripe_height, red);\n        } else {\n            gdImageFilledRectangle(img, 0, y, stripe_width, y + stripe_height, white);\n        }\n    }\n\n    gdImageFilledRectangle(img, 0, 0, width * 2 / 5, stripe_height * 7, blue);\n\n    int star_spacing_x = (int)(0.129 * height); // 横向星星之间的间距\n    int star_spacing_y = (int)(0.054 * height); // 纵向星星之间的间距\n    int star_start_x = (int)(0.125 * height); // 星星的起始X位置\n    int star_start_y = (int)(0.0485 * height); // 星星的起始Y位置\n\n    for (int row = 0; row < 9; row++) {\n        int starsPerRow = (row % 2 == 0) ? 6 : 5;\n\n        // 计算2、4、6和8排星星的偏移量\n        int offset_x = (row % 2 == 0) ? star_spacing_x / -2 : 0;\n\n        for (int star = 0; star < starsPerRow; star++) {\n            int x = star_start_x + star * star_spacing_x + offset_x;\n\n            // 旋转角度（以弧度为单位）\n            double rotation_angle = M_PI / 5; // 忘記多少度的旋转\n\n            int y = star_start_y + row * star_spacing_y;\n            draw_star(img, x, y, star_size, white, rotation_angle);\n        }\n    }\n}\n\nvoid draw_star(gdImagePtr img, int x, int y, int size, int color, double rotation_angle) {\n    gdPoint points[10];\n\n    for (int i = 0; i < 10; i++) {\n        double angle = M_PI / 2 + i * 2 * M_PI / 10 + rotation_angle;\n        int radius = (i % 2 == 0) ? size : size / 2;\n        points[i].x = x + radius * cos(angle);\n        points[i].y = y + radius * sin(angle);\n    }\n\n    // 用指定的颜色填充星星\n    gdImageFilledPolygon(img, points, 10, color);\n} \n \n #include <stdio.h>\n#include <gd.h>\n#include <math.h>\n\nvoid draw_japan_flag(gdImagePtr img);\nvoid draw_red_sun(gdImagePtr img, int x, int y, int size, int color);\n\nint main() {\n    int originalWidth = 1200;\n    int originalHeight = (int)(originalWidth * 2.0 / 3.0);\n    gdImagePtr img = gdImageCreateTrueColor(originalWidth, originalHeight);\n    gdImageAlphaBlending(img, 0);\n\n    draw_japan_flag(img);\n\n    // 新的宽度和高度以适应 "images" 文件夹\n    int newWidth = 600;\n    int newHeight = (int)(newWidth * 2.0 / 3.0);\n\n    // 创建新图像并进行缩放\n    gdImagePtr resizedImage = gdImageCreateTrueColor(newWidth, newHeight);\n    gdImageAlphaBlending(resizedImage, 0);\n    gdImageCopyResampled(resizedImage, img, 0, 0, 0, 0, newWidth, newHeight, originalWidth, originalHeight);\n\n  FILE *outputFile = fopen("./../images/japan_flag.png", "wb");\n    if (outputFile == NULL) {\n        fprintf(stderr, "Error opening the output file.\\n");\n        return 1;\n    }\n    gdImagePng(resizedImage, outputFile);\n    fclose(outputFile);\n    gdImageDestroy(img);\n    gdImageDestroy(resizedImage);\n\n    return 0;\n}\n\nvoid draw_japan_flag(gdImagePtr img) {\n    int width = gdImageSX(img);\n    int height = gdImageSY(img);\n\n    // 创建一个白色背景\n    int white = gdImageColorAllocate(img, 255, 255, 255);\n    gdImageFilledRectangle(img, 0, 0, width - 1, height - 1, white);\n\n    // 绘制红色圆圈（太阳）\n    int red = gdImageColorAllocate(img, 255, 0, 0);\n    int center_x = width / 2;\n    int center_y = height / 2;\n    int radius = (int)((width * 2) / 3);\n    draw_red_sun(img, center_x, center_y, radius, red);\n}\n\nvoid draw_red_sun(gdImagePtr img, int x, int y, int size, int color) {\n  // 減小 size 的值,例如將他的值減半\n  size = size / 2;\n    gdImageArc(img, x, y, size, size, 0, 360, color);\n    gdImageFillToBorder(img, x, y, color, color);\n} \n \n', 'tags': '', 'url': 'w6.html'}, {'title': 'replit', 'text': '在 Replit C 程式環境中額外納入 gnuplot 套件的 replit.nix 設定: \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n 7 \n 8 \n 9 \n 10 \n \n \n \n { pkgs }: { \n \xa0\xa0\xa0\xa0 deps = [ \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 pkgs.sudo \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 pkgs.clang_12 \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 pkgs.ccls \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 pkgs.gdb \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 pkgs.gnumake \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 pkgs.gnuplot \n \xa0\xa0\xa0\xa0 ]; \n } \n \n \n \n \n \n \n \n C with gnuplot: \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n 7 \n 8 \n 9 \n 10 \n 11 \n 12 \n 13 \n 14 \n 15 \n 16 \n 17 \n 18 \n 19 \n 20 \n 21 \n 22 \n 23 \n 24 \n 25 \n 26 \n 27 \n 28 \n 29 \n 30 \n 31 \n 32 \n 33 \n 34 \n 35 \n 36 \n 37 \n 38 \n 39 \n 40 \n 41 \n 42 \n 43 \n 44 \n 45 \n 46 \n 47 \n 48 \n 49 \n 50 \n 51 \n \n \n \n #include <stdio.h> \n \xa0 \n int   main() { \n \xa0\xa0\xa0\xa0 // Open a file to write displacement and velocity data \n \xa0\xa0\xa0\xa0 FILE   *outputFile =  fopen ( "motion_data.txt" ,  "w" ); \n \xa0\xa0\xa0\xa0 if   (!outputFile) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 fprintf (stderr,  "Failed to create data file.\\n" ); \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 return   1; \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 // Simulate motion for 10 seconds and calculate displacement and velocity, while writing data to the file \n \xa0\xa0\xa0\xa0 double   x = 0.2;\xa0  // Initial displacement \n \xa0\xa0\xa0\xa0 double   v = 0.0;\xa0  // Initial velocity \n \xa0\xa0\xa0\xa0 double   dt = 0.01;  // Time step \n \xa0\xa0\xa0\xa0 double   t = 0.0;\xa0  // Time \n \xa0 \n \xa0\xa0\xa0\xa0 while   (t <= 10.0) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 double   acceleration = (-10.0 * x - 0.5 * v) / 1.0;  // Modified system parameters here \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 v += acceleration * dt; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 x += v * dt; \n \xa0 \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 fprintf (outputFile,  "%lf %lf %lf\\n" , t, x, v); \n \xa0 \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 t += dt; \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 // Close the data file \n \xa0\xa0\xa0\xa0 fclose (outputFile); \n \xa0 \n \xa0\xa0\xa0\xa0 // Start a Gnuplot process using popen \n \xa0\xa0\xa0\xa0 FILE   *gnuplotPipe = popen( "gnuplot -persistent" ,  "w" ); \n \xa0\xa0\xa0\xa0 if   (!gnuplotPipe) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 fprintf (stderr,  "Failed to start Gnuplot.\\n" ); \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 return   1; \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 // Use Gnuplot plotting commands, specify font and output as PNG \n \xa0\xa0\xa0\xa0 fprintf (gnuplotPipe,  "set terminal pngcairo enhanced font \'default,10\' size 800,400\\n" ); \n \xa0\xa0\xa0\xa0 fprintf (gnuplotPipe,  "set output \'motion_plot.png\'\\n" ); \n \xa0\xa0\xa0\xa0 fprintf (gnuplotPipe,  "set title \'Displacement and Velocity vs. Time\'\\n" ); \n \xa0\xa0\xa0\xa0 fprintf (gnuplotPipe,  "set xlabel \'Time (s)\'\\n" ); \n \xa0\xa0\xa0\xa0 fprintf (gnuplotPipe,  "set ylabel \'Displacement (m)\'\\n" ); \n \xa0\xa0\xa0\xa0 fprintf (gnuplotPipe, "plot  \'motion_data.txt\'   using   1:2 with lines lw 2 title  \'Displacement\' , \\ \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \'motion_data.txt\'   using   1:3 with lines lw 2 title  \'Velocity\' \\n"); \n \xa0 \n \xa0\xa0\xa0\xa0 // Close the Gnuplot process \n \xa0\xa0\xa0\xa0 fprintf (gnuplotPipe,  "exit\\n" ); \n \xa0\xa0\xa0\xa0 pclose(gnuplotPipe); \n \xa0 \n \xa0\xa0\xa0\xa0 return   0; \n } \n \n \n \n \n \n \n \n 在選擇 Python 作為 Language 的 repl 專案中, cc 已經內建, 若要加裝 gnuplot 套件則可在 replit.nix 設定檔案中加入 pkgs. gnuplot , pkgs. ncurses .dev, pkgs. gd , pkgs. vim HugeX 與 pkgs. raylib : \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n 7 \n 8 \n 9 \n \n \n \n { pkgs }: { \n \xa0\xa0\xa0\xa0 deps = [ \n \xa0\xa0\xa0\xa0\xa0\xa0 pkgs.gnuplot \n \xa0\xa0\xa0\xa0\xa0\xa0 pkgs.ncurses.dev \n \xa0\xa0\xa0\xa0\xa0\xa0 pkgs.gd \n \xa0\xa0\xa0\xa0\xa0\xa0 pkgs.vimHugeX \n \xa0\xa0\xa0\xa0\xa0\xa0 pkgs.raylib \n \xa0\xa0\xa0\xa0 ]; \n } \n \n \n \n \n \n \n \n', 'tags': '', 'url': 'replit.html'}, {'title': 'W5', 'text': '// 包含標準輸出入程式庫的標頭文件\n// https://blog.csdn.net/weixin_38468077/article/details/101069365\n// http://www.gnuplot.info/demo/\n// https://github.com/sysprog21/rv32emu\n// https://github.com/sysprog21/semu \n// https://docs.google.com/presentation/d/14N0cWG2SnBSqhc2cLF0_2VerB9FF8JN3\n// https://cs61c.org/fa23/\n// https://greenteapress.com/wp/think-python-2e/\n// https://github.com/ecalvadi/c99-examples\n// https://github.com/gouravthakur39/beginners-C-program-examples\n// https://github.com/ergenekonyigit/Numerical-Analysis-Examples\n// https://www.che.ncku.edu.tw/facultyweb/changct/html/teaching/CPPandMATLAB/Past/pdf%20Files/Chap02-Ling.pdf\n// https://gteceducation.com.sg/Brochures/PROGRAMMING/C%20PROGRAMMING%20FULL.pdf\n// https://jsommers.github.io/cbook/cbook.pdf\n// https://jsommers.github.io/cbook/index.html\n// http://student.itee.uq.edu.au/courses/csse2310/CProgrammingNotes.pdf\n// http://cslibrary.stanford.edu/101/EssentialC.pdf\n// https://publications.gbdirect.co.uk/c_book/\n// https://www.fossil-scm.org/fossil-book/doc/2ndEdition/fossilbook.pdf\n// ***** execute on replit \n// cd downloads\n// cc gnuplot_ex1.c -o gnuplot_ex1\n// ./gnuplot_ex1\n#include <stdio.h>\n\n// 主函式\nint main() {\n    // Start a Gnuplot process using popen\n    FILE *gnuplotPipe = popen("gnuplot -persistent", "w");\n    if (!gnuplotPipe) {\n        fprintf(stderr, "Failed to start Gnuplot.\\n");\n        return 1;\n    }\n\n    // Use Gnuplot plotting commands, specify font and output as PNG\n    fprintf(gnuplotPipe, "set terminal png font \'default,10\' size 800,400\\n");\n    fprintf(gnuplotPipe, "set output \'./../images/gnuplot_ex1.png\'\\n");\n    fprintf(gnuplotPipe, "plot sin(x)");\n    // Close popen\n    pclose(gnuplotPipe);\n\n    return 0;\n} \n \n', 'tags': '', 'url': 'W5.html'}, {'title': 'w9', 'text': 'w9 程式練習 : \n \n read_last_final1.c 原始碼: \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n 7 \n 8 \n 9 \n 10 \n 11 \n 12 \n 13 \n 14 \n 15 \n 16 \n 17 \n 18 \n 19 \n 20 \n 21 \n 22 \n 23 \n 24 \n 25 \n 26 \n 27 \n 28 \n 29 \n 30 \n 31 \n 32 \n 33 \n 34 \n 35 \n 36 \n 37 \n 38 \n 39 \n 40 \n 41 \n 42 \n 43 \n 44 \n 45 \n 46 \n 47 \n 48 \n 49 \n 50 \n 51 \n 52 \n 53 \n 54 \n 55 \n 56 \n 57 \n 58 \n 59 \n 60 \n 61 \n 62 \n 63 \n 64 \n 65 \n 66 \n 67 \n 68 \n 69 \n 70 \n 71 \n 72 \n 73 \n 74 \n 75 \n 76 \n 77 \n 78 \n 79 \n 80 \n 81 \n 82 \n 83 \n 84 \n 85 \n 86 \n 87 \n 88 \n 89 \n \n \n \n #include <stdio.h> \n #include <string.h> \n \xa0 \n int   main() { \n \xa0\xa0\xa0\xa0 // Open the user file for reading \n \xa0\xa0\xa0\xa0 FILE * user_file =  fopen ( "2b_user_list.txt" ,  "r" ); \n \xa0\xa0\xa0\xa0 if   (user_file == NULL) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 perror ( "Error opening user file" ); \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 return   1; \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 char   line[100];  // Assuming a maximum line length of 100 characters \n \xa0 \n \xa0\xa0\xa0\xa0 char   valid_users[100][20];  // Assuming a maximum of 100 valid users with a length of 20 characters each \n \xa0\xa0\xa0\xa0 int   valid_user_count = 0; \n \xa0 \n \xa0\xa0\xa0\xa0 // Read and store the student numbers from the user file \n \xa0\xa0\xa0\xa0 while   ( fgets (line,  sizeof (line), user_file)) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 line[ strcspn (line,  "\\n" )] =  \'\\0\' ;  // Remove the newline character \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 strcpy (valid_users[valid_user_count], line); \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 valid_user_count++; \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 // Close the user file \n \xa0\xa0\xa0\xa0 fclose (user_file); \n \xa0 \n \xa0\xa0\xa0\xa0 // Open the CAD file for reading \n \xa0\xa0\xa0\xa0 FILE * cad_file =  fopen ( "cad2023_2b_w8.txt" ,  "r" ); \n \xa0\xa0\xa0\xa0 if   (cad_file == NULL) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 perror ( "Error opening CAD file" ); \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 return   1; \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 char   unique_users[100][20];  // Assuming a maximum of 100 unique users with a length of 20 characters each \n \xa0\xa0\xa0\xa0 int   unique_user_count = 0; \n \xa0 \n \xa0\xa0\xa0\xa0 // Read the CAD file line by line \n \xa0\xa0\xa0\xa0 while   ( fgets (line,  sizeof (line), cad_file)) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 char * token =  strtok (line,  " " );  // Split the line by space \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 if   (token != NULL &&  strstr (token,  "cad" ) == token) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 // Extract the student number (skip "cad") \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 char   student_number[20];  // Assuming a maximum length of 20 characters for a student number \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 strcpy (student_number, token + 3);  // Skip "cad" \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0 \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 // Check if the student number is in the list of valid users and not a duplicate \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 int   is_valid = 0; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 for   ( int   i = 0; i < valid_user_count; i++) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 if   ( strcmp (valid_users[i], student_number) == 0) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 is_valid = 1; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 break ; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 } \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 } \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0 \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 // Add the student number to the unique_users list if it\'s valid and not a duplicate \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 if   (is_valid) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 int   is_duplicate = 0; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 for   ( int   i = 0; i < unique_user_count; i++) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 if   ( strcmp (unique_users[i], student_number) == 0) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 is_duplicate = 1; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 break ; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 } \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 } \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0 \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 if   (!is_duplicate) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 strcpy (unique_users[unique_user_count], student_number); \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 unique_user_count++; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 } \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 } \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 } \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 // Reverse the order of the unique student numbers \n \xa0\xa0\xa0\xa0 for   ( int   i = 0; i < unique_user_count / 2; i++) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 char   temp[20]; \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 strcpy (temp, unique_users[i]); \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 strcpy (unique_users[i], unique_users[unique_user_count - 1 - i]); \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 strcpy (unique_users[unique_user_count - 1 - i], temp); \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 // Print the unique student numbers in reverse order \n \xa0\xa0\xa0\xa0 for   ( int   i = 0; i < unique_user_count; i++) { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 printf ( "%s\\n" , unique_users[i]); \n \xa0\xa0\xa0\xa0 } \n \xa0 \n \xa0\xa0\xa0\xa0 // Close the CAD file \n \xa0\xa0\xa0\xa0 fclose (cad_file); \n \xa0 \n \xa0\xa0\xa0\xa0 return   0; \n } \n \n \n \n \n \n \n \n 若採用 Python 編寫: \n read_last.py 原始碼 \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n 7 \n 8 \n 9 \n 10 \n 11 \n 12 \n 13 \n 14 \n 15 \n 16 \n 17 \n 18 \n 19 \n 20 \n 21 \n 22 \n 23 \n 24 \n 25 \n 26 \n 27 \n 28 \n 29 \n 30 \n 31 \n 32 \n 33 \n 34 \n 35 \n 36 \n 37 \n 38 \n 39 \n \n \n \n # 讀取學號檔案 \n with  open ( "2b_user_list.txt" ,  \'r\' ) as user_file: \n \xa0\xa0\xa0\xa0 user_lines  =   user_file.read().splitlines() \n \xa0 \xa0 \n # 讀取 last 指令轉出的檔案, 以 last -w > cad2023_2b_w8.txt 建立檔案 \n with  open ( "cad2023_2b_w8.txt" ,  \'r\' ) as cad_file: \n \xa0\xa0\xa0\xa0 # 以下是利用跳行符號, 將每一行區隔成數列 \n \xa0\xa0\xa0\xa0 cad_lines  =   cad_file.read().splitlines() \n #print(cad_lines) \n \xa0 \xa0 \n # 從 cad_lines 建立所有登入使用者數列 \n login_users  =   [] \n for   i  in   cad_lines: \n \xa0\xa0\xa0\xa0 line_list  =   i.split( " " ) \n \xa0\xa0\xa0\xa0 login_users.append(line_list[ 0 ]) \n #print(login_users) \n \xa0 \xa0 \n # 根據 https://stackoverflow.com/questions/480214/how-do-i-remove-duplicates-from-a-list-while-preserving-order \n # 數列去除重複元素但仍保持原始次序 \n login_users  =   list ( dict .fromkeys(login_users)) \n #print(login_users) \n \xa0 \xa0 \n # 建立數列存放符合條件的使用者 \n valid_users  =   [] \n \xa0 \xa0 \n # 取出符合條件的使用者 \n for   line  in   login_users: \n \xa0\xa0\xa0\xa0 if   "cad"   in   line: \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 # 將 cad 字串去除 \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 user_number  =   line.replace( "cad" , "") \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 if   user_number  in   user_lines: \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 valid_users.append(user_number) \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0 \n # 利用 reverse() 將 valid_users 反向排序 \n valid_users.reverse() \n \xa0 \xa0 \n # , 最早登入者列在最前面 \n for   user  in   valid_users: \n \xa0\xa0\xa0\xa0 print (user) \n \n \n \n \n \n \n', 'tags': '', 'url': 'w9.html'}, {'title': 'w4', 'text': '近端執行: \n SciTE 與 Tiny C Compiler 若要設定為 Tools - Compile 之後產生可執行檔案 a.out, cpp.properties 設定檔案必須修改如下: \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n 7 \n 8 \n 9 \n 10 \n 11 \n 12 \n 13 \n 14 \n 15 \n 16 \n \n \n \n ccopts=-pedantic -Os \n #cc=g++ $(ccopts) -c $(FileNameExt) -o $(FileName).o \n #ccc=gcc $(ccopts) -c $(FileNameExt) -o $(FileName).o \n cc=tcc.exe -run  \n ccc=tcc.exe -o a.out \n \xa0 \n make.command=make \n #command.compile.*.c=$(ccc) -std=c99 \n command.compile.*.c=$(ccc) $(FileNameExt) \n command.build.*.c=$(make.command) \n command.build.*.h=$(make.command) \n command.clean.*.c=$(make.command) clean \n command.clean.*.h=$(make.command) clean \n # use tcc to run .c program \n #command.go.*.c=./$(FileName) \n command.go.*.c=$(cc) $(FileNameExt) \n \n \n \n \n \n \n \n 雲端執行: \n 範例: \xa0 https://replit.com/@wcms/cjavascriptpython \n 將位於個人 Github 帳號下的 cp2023 倉儲 (建議以 \xa0 https://github.com/mdecycu/cmsite \xa0 作為 template) import 進入 Replit, 以 git submodule update --init 取下子模組, 然後以 pip install flask flask_cors bs4 lxml pelican markdown gevent 安裝啟動編輯網站所需模組後, 將 config/config 密碼編碼移至 Secrets 頁面中的 config 變數後啟動. \n 修改 replit.nix 如下, 表示要安裝 gnuplot 套件: \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n \n \n \n { pkgs }: { \n \xa0\xa0 deps = [ \n \xa0\xa0\xa0\xa0 pkgs.gnuplot \n \xa0\xa0 ]; \n } \n \n \n \n \n \n \n \n 之後將所練習的 C 程式置於 downloads 目錄中, 其執行影像結果存入 images 後, 分別在網頁中引用. \n Exercises: \n 請從\xa0 jsliu_c_programming.pdf \xa0 (需要下載密碼)與\xa0 Introduction to C \xa0(經由校園網路或 VPN 下載)電子書中各擷取 10 個 C 程式範例, 分別: \n \n 在可攜程式環境中以 SciTE + Tiny C Compiler 編譯系統, 使用 Tools - Go 類編譯方式執行. \n 在可攜程式環境中以 SciTE + Tiny C Compiler 編譯系統, 使用 Tools - Compile 編譯連結後取得 a.out, 然後在命令列中以 a.out 執行. \n 在 Replit 全球資訊網 IDE 環境中的 Shell 頁面, 以 cc ex1.c 產生可執行檔案 a.out, 並以 ./a.out 執行, 或者以 cc ex1.c -o ex1 指定編譯連結後的可執行檔案名稱為 ex1 後, 以 ./ex1 執行. \n \n 最後將所選擇的 C 程式範例執行過程與相關說明內容, 整理在 個人 github 帳號下的 cp2023 倉儲網頁 中的 c_ex 頁面中. \n 參考: \n Introduction to the C programming Language ( 1 , \xa0 2 , \xa0 3 , or \xa0 download with password ) \n 使用者輸入兩個整數後相加的 C 程式範例: \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n 7 \n 8 \n 9 \n 10 \n 11 \n 12 \n 13 \n 14 \n 15 \n 16 \n 17 \n 18 \n 19 \n 20 \n 21 \n 22 \n 23 \n 24 \n 25 \n 26 \n \n \n \n /* Read in two integers , add them and display the answer */ \n #define _CRT_SECURE_NO_WARNINGS \n #include<stdio.h> \n int   main() \n { \n int   this_is_a_number1, this_is_a_number2, total; \n printf ( "Please enter an integer number:\\n " ); \n /* read number in */ \n if   ( scanf ( "%d" , &this_is_a_number1) == 1) { \n \xa0\xa0\xa0\xa0\xa0\xa0 printf ( "%d" , this_is_a_number1); \n \xa0\xa0\xa0\xa0 }  else   { \n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 printf ( "Failed to read integer.\\n" ); \n \xa0\xa0\xa0\xa0 } \n \xa0 \n printf ( "You entered %d\\n" , this_is_a_number1); \n printf ( "Please enter another number: \\n" ); \n if   ( scanf ( "%d" , &this_is_a_number2) == 1) { \n \xa0\xa0\xa0\xa0\xa0\xa0 printf ( "%d" , this_is_a_number1); \n \xa0\xa0\xa0\xa0 }  else   { \n \xa0\xa0\xa0\xa0\xa0\xa0 printf ( "Failed to read integer.\\n" ); \n \xa0\xa0\xa0\xa0 } \n printf ( "You entered %d\\n" , this_is_a_number2); \n total = this_is_a_number1 + this_is_a_number2; /* add two numbers */ \n printf ( "total is %d\\n" , total); \n return   0; \n } \n \n \n \n \n \n \n', 'tags': '', 'url': 'w4.html'}, {'title': 'W3', 'text': '有關電腦輔助設計室網路設定說明 \n 處理 .replit 與 replit.nix 中的舊 Python 設定問題 \n 說明如何為 site-個人github帳號 倉儲設定 Github Pages \n 採用 Github Classroom 建立作業倉儲的問題: \n 2023/09/26 在 1a w3 課程進行到建立各學員 site 作業時發現, 將 Replit 導入 Github 倉儲的流程中, 所產生的系統間權限設定, 必須由 Github Classroom 管理帳號 (以 cp2023 為例, 附屬在 mdecp2023 帳號下), 針對各用戶所提出的個別 Replit 權限 requests (以 site-scrum-1 倉儲為例, 只能透過 Replit 提出控管 mdecp2023/site-scrum-1 倉儲的權限) \xa0 逐一進行設定 . \n \n (上圖顯示共有三名用戶針對 mdecp2023 帳號下的 Github Classroom 倉儲提出 Replit 連線要求, 其中只有最上方用戶的 request 取得 mdecp2023/site-scrum-1 倉儲的維護權限, 其餘兩則 requests 則仍處於待審核階段. 意即若要讓各用戶整合 Replit, \xa0 每一個 Github Classroom 作業, 管理者都必須手動處理超過兩百則的 requests ) \n 為去除管理者的手動設定負擔, 決定 2023 cp 與 cad 等課程將放棄使用 Github Classroom. 改為由各學員自行針對課程建立用來評分的課程倉儲與網站 (cp 課程建立 cp2023 倉儲, cad 課程則建立 cad2023 倉儲), 直接附屬在學員的 Github 帳號下, 後續的 submodule 設定與倉儲協同權限則統一由各學員自行負責.', 'tags': '', 'url': 'W3.html'}, {'title': 'w2', 'text': '說明安裝 Apps, 如何設定網路, 查驗是否正確連網 \n 說明如何利用近端可攜系統執行 C 程式, 如何利用 ChatGPT 進行對話 \n 說明如何利用 Replit 協助編輯網頁內容 \n 說明如何 connect Replit to Github, 如何建立個人網站並利用 Replit 啟動編輯網站 \n', 'tags': '', 'url': 'w2.html'}, {'title': 'MSD', 'text': '', 'tags': '', 'url': 'MSD.html'}, {'title': 'w10', 'text': '項目1 到 項目3 就是各組必須在分組網站, 利用組員分工學習的方式, 將計算機程式的教學內容及作業進行整理. 且各組員所分配到的工作必須先在個人網站中整理後, 再放入各分組網站中. \n w11: 針對 s1511 伺服器, 新增別名 (在 DNS 術語中稱為 CNAME) s, 因此可以透過 \xa0 https://s.cycu.org/~pj2022/cpnote \xa0 擷取工作站室中的課堂筆記靜態網頁. \n 使用 Letsencrypy 中的 \xa0 certbot certonly -d s1511.cycu.org -d s.cycu.org \xa0 指令, 執行之前可以利用 sudo /etc/init.d/nginx stop 關掉 nginx, 並在上述擴充網域數位簽章的過程, 讓 certbot 指令啟動 local web server 進行主機認證, 即透過登記在 DNS 伺服器中的 IPv6 address 確認主機位址. \n 擴增伺服器別名後, 以 sudo /etc/init.d/nginx start 重新啟動全球資訊網伺服器, 並且以 sudo /etc/init.d/stunnel4 restart 重新啟動 https 代理伺服器. \n 項目1 : 如何快速設定電腦輔助設計室中的網路 - 採 IPv6 網路設定. \n 請檢查隨身碟中的網路設定程式, 確認帶有可攜程式環境以及網路設定相關檔案. \n 目的是能夠在啟動隨身系統之後, 可以透過 rsa private key 以 SSH 取下個人倉儲, 並能啟動編輯後轉檔, 擁有推送回 github 的權限. \n 各組組長能夠在取下分組倉儲後, 以個人 IPv6 位址啟動後, 允許分組組員登入修改網頁內容, 並透過組長的 rsa private key 推送回 github. \n 個人與分組組員能在近端編寫 C 程式, 完成編譯連結後將程式碼與結果放入網頁, 並編寫相關心得報告. \n 以上近端操作流程, 也可以在 s1511 與 Replit 伺服器上進行個人與分組倉儲及網頁的改版. \n w11_1a.7z \xa0(第十一週 1a 上課時建立的共用網路設定檔案) \n wink_ffmpeg.reg 設定檔案內容: \n \n \n \n \n \n \n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n \n \n \n Windows Registry Editor Version 5.00 \n \xa0 \xa0 \n [HKEY_CURRENT_USER\\SOFTWARE\\Debugmode] \n \xa0 \xa0 \n [HKEY_CURRENT_USER\\SOFTWARE\\Debugmode\\Wink\\Settings] \n "FfmpegPath" = "y:\\\\ffmpeg.exe" \n \n \n \n \n \n \n \n 2a_w10_start_ipv6_wink_reg.7z \xa0 (可以將此 \xa0 wink 登錄設定檔 , 連同 網路設定 , \xa0 Zoomit 啟動 與 \xa0 putty setting \xa0 設定, 以 \xa0 reg import \xa0 指令整合至 tinyc 可攜程式系統的 start_ipv6.bat 中). \n 以下為設定 w11_1a.mp4 的過程 ( w11_1a_1.txt ): \n \n w11_1b_1 操作影片, \xa0 w11_1b.wnk 下載 \xa0 (需要密碼) \n \n w11_1a 已經登入 s.cycu.org 的學員名單:\xa0 w11_1a_s_server_login.txt , 請問 如何 按照學號列出 w11 已經會登入 s.cycu.org 的學員名單? ( w11_1b_s_server_login.txt ) \n 已知:\xa0semester 變數,\xa0 1121 為 112 學年第 1 學期 \n courseno 變數, 1a: \xa0 0813 , 1b: \xa0 0826 , 2a: \xa0 0838 , 2b: \xa0 0851 \xa0(以 demo 帳號 AT stud.cycu.org 中的 \xa0 nfulist \xa0 網際程式直接進入學校教務主機擷取修課學員名單.) \n 使用 Brython 讀取登入歷程記錄檔案後, 可以 按照時間先後次序列出登入者名單 . \n 也可以按照學號排序, 列出 \xa0 w11 已經登入 s1511 主機的 1a 學員名單 (即時執行)或將資料取出:\xa0 w11_1a_login_s1511_users.txt \xa0( w11_1b_login_s1511_users.txt ) \n 接下來該如何利用程式方法, 得知使用者已經設定 rsa keys?\xa0 \n 假如能夠使用程式進入 s.cycu.org 讀取各用戶的 .ssh/id_rsa.pub, 就可以知道是否該用戶已經建立 rsa keys. 但是必須在 s.cycu.org 主機中設法建立網際程式, 並參考 這裡 的說明, 就可以根據各班學員名單逐一進入各用戶的目錄查驗其帳號下是否已經建立 id_rsa.pub 檔案. \n \n 項目2 : 請分別利用 Replit、s1511.cycu.org 或 localhost 維護個人與分組的網站內容, 並比較不同方法開發計算計程式的優缺點. \n Replit \xa0 必須先在 Github 安裝 Replit Application 授權之後, 再 import 倉儲. \n import 倉儲後, 必須先設定 Run 執行內容, 取下 submodule, 並安裝倉儲編輯所需的模組以及設定 secrets 頁面中的 config 變數後, 才能啟動編輯網頁. \n s1511 \xa0 則需要先設定 keys 與 session config, 然後才能將倉儲以 SSH clone 至個人帳號下, 修改個人或分組所分配到的內部連網埠號後, 以 python3 server.py 執行網頁編輯. 也可透過 acp 設法讓動態與靜態網站內容同步. \n localhost \xa0 則可以使用 s1511 中的 private key, 經由 puttygen 轉檔後使用, 以 SSH clone 至個人隨身碟後, 可以利用 cms 啟動編輯網站, 修改內容並轉為靜態網站後, 以 acp 將改版資料新增提交推送到 Github. 若修改倉儲中的 init.py, 置入所在電腦的外部 IPv6 位址, 則可以 cms 啟動後, 修改管理者密碼, 讓其他組員連線至所啟動的動態或靜態網站內容. \n 各學員在以上採多個不同方式維護個人與分組網站的過程, 可以在改版之前先行 git pull, 以減少合併的內容. \n 在 Windows 使用 pelican 建立網誌必須 pip install tzdata, 否則無法取得 TIMEZONE 設定. \n 項目3 : 程式練習: \n w8 之前所指令的程式 C 練習作業 : \n 上課內容 中的 Exercises \n w2-w5 \xa0 週任務中的 Exercises \n w6-w7 \xa0 週任務中的練習一與練習二 \n 請利用 C 結合 gd 繪圖程式庫, 畫出 \xa0 PROC ( 規格 ), \xa0 United Kingdom ( 規格 ), \xa0 Japan ( 規格 )與 \xa0 South Korea ( 規格 ) Flags. \n 參考: \n ROC flag \xa0in Brython, \xa0 PROC flag \xa0 in Brython, \xa0 USA flag \xa0 in Brython. \n graphics library examples: \xa0 1 , \xa0 2 , \xa0 3 , \xa0 4 . \n 各分組成員協同將 \xa0 jsliu_c_programming.pdf \xa0 (需要下載密碼) 內容整理後, 放入各分組網站. \n 上述以 C 語言編寫的程式, 假如採用 Javascript 或 Python 語言編寫, 對於機械與機電整合設計工程師, 分別有那些不同的應用範圍? \n w9 程式練習 : \n 2b w8 作業: 請根據\xa0 cad2023_2b_w8.txt \xa0檔案中的內容, 透過程式的讀取與篩選, 按照時間先後, 列出 2b 修課學員中已經登入 s1511.cycu.org 的學號. (修課學員名單\xa02a:\xa0 0838 , 2b:\xa0 0851 ) \n 假如在近端處理, 必須同時儲存兩個檔案後, 進行資料選取: \n get_stud_num_from_last_data.py \xa0(若採 Brython 編寫, 可以直接 列出結果 , 依照登入時間先後排序, 其中 41123227 為管理者最早測試時登入, 若採用 ANSI 編寫: \xa0 c_parse_last_cp2023.7z ) \n \n 1a 上課時所建立的檔案 (已經在 w10 2b 上課時改為系上 DNS 設定): \n cadlab_network_setting.7z \xa0 (需要下載密碼) - 電腦輔助設計室網路設定批次與 Powershell 檔案 (註: 使用中華電信 IPv6 DNS 設定, w10 星期四之後無法在校網使用 hinet IPv6 DNS server 設定). \n w10_2b_cadlab_network_setting.7z \xa0 (需要下載密碼) - 電腦輔助設計室網路設定批次與 Powershell 檔案. \n tinyc.7z \xa0 (需要下載密碼) - 使用 Tiny C Compiler 編譯 C 程式, 包含 gd 與 gnuplot. \n python3114_git_putty.7z \xa0 (需要下載密碼) - 將近端 cmsimde 啟動並改版後推向 Github 所需的檔案. \n \n 線上簡報、網誌與多媒體影片製作工具: \n Leo Editor \xa0 ( 討論群組 ) 為大綱管理系統, 可以當作程式開發的 IDE (Integrated Development Environment) 使用, 可用來編輯 reveal.js 簡報檔案中的 html 與 markdown, 也可用來編輯 Pelican 網誌 markdown 與轉檔, 並且在電腦輔助設計與分析過程中, 可以用來解讀 CoppeliaSim XML 格式檔案. \n 因為 Python 3.12.0 環境下 Leo Editor 還無法正常透過 pip 安裝, 因此必須手動安裝 PyQt5 之後, 再使用 pip install leo, 所完成的 Python 3.12.0:\xa0 Python312_leo_664_PyQt5.7z \xa0 (需要下載密碼) \n Wink \xa0 為操作流程影片製作套件, 可以在電腦操作過程, 儲存關鍵頁面與滑鼠點擊區域後, 加上輔助文字說明後製作成 mp4 影片檔. \n ShareX \xa0 為螢幕畫面取像或錄影套件, 可以擷取電腦畫面任一區域存為影像檔, 或者結合語音說明與滑鼠操作錄製說明影片. \n OBS \xa0 為電腦廣播製作系統, 可以結合各種語音、圖像與影片製作出多元的電腦操作說明影片. \n Wink 與 ShareX 都需要 \xa0 ffmpeq.exe . \n w2', 'tags': '', 'url': 'w10.html'}, {'title': 'w13', 'text': '在計算機課程中學到了許多電腦內部網路的設定，以及用程式撰寫出一些有特定含義圖形，這門課程將來也能運用在很多資訊類的地方可以用程式快速成型', 'tags': '', 'url': 'w13.html'}, {'title': 'Brython', 'text': 'https://en.wikipedia.org/wiki/Python_(programming_language) \n Examples: \n https://gist.github.com/mdecycu/d9082d678096bd58378d6afe2c7fa05d \n https://www.geeksforgeeks.org/python-programming-examples/ \n https://www.programiz.com/python-programming/examples \n https://www.freecodecamp.org/news/python-code-examples-sample-script-coding-tutorial-for-beginners/ \n Python Tutorial: \n https://docs.python.org/3/tutorial/ \n An informal introduction to Python \n Indentation (Python 採 4 個 Spaces 縮排, 以界定執行範圍) \n Variables ( Python Keywords ) \n Comments (# 單行註解, 三個單引號或三個雙引號標註多行註解) \n Numbers  (整數 int(), 浮點數 float()) \n Strings  (字串) \n print (Python 內建函式,  print()  函式) \n Python control flow tools \n for \n if \n range \n open \n read \n lists \n tuples \n dictionaries \n functions \n try ... except \n break \n pass \n classes \n 這個頁面 demo 如何在同一頁面下納入多個線上 Ace 編輯器與執行按鈕 ( practice_html.txt  動態頁面超文件). \n practice_html.txt  動態頁面超文件應該可以在啟動 Brython 時, 設定將 .py 檔案放入 downloads/py 目錄中引用. \n 亦即將所有對應的 html 也使用 Brython 產生, 然後寫為  class  後, 在範例導入時透過  instance  引用. \n <!-- 啟動 Brython -->\n<script>\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\',\'./../downloads/py/\']});\n}\n</script> \n 從 1 累加到 100: \n 1 add to 100 \n 將 iterable 與 iterator  相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n  導入 brython 程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src1"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n \n \n \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor1 結束   ##########################################  \n 從 1 累加到 100 part2: \n 1 add to 100 cango_three_gears BSnake AI Tetris Rotating Block \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src2"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  add 1 to 100 part2 開始  \n \n \n  add 1 to 100 part2 結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor2 結束  \n \n \n', 'tags': '', 'url': 'Brython.html'}]};