// 5) Use loops to print patterns like a triangle or square.

// Code:

import java.util.Scanner;

public class Patterns {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Choose a pattern to print:");
        System.out.println("1. Right Angle Triangle ");
        System.out.println("2. Equilateral Triangle ");
        System.out.println("3. Square ");

        System.out.print("Enter the number of your choice: ");
        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                System.out.print("Enter the number of rows for Right Angle Triangle: ");
                int rows = scanner.nextInt();
                for (int i = 1; i <= rows; i++) {
                    for (int j = 1; j <= i; j++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
                break;

            case 2:
                System.out.print("Enter the number of rows for the equilateral triangle: ");
                int rowsE = scanner.nextInt();
                for (int i = 1; i <= rowsE; i++) {
                    for (int j = i; j < rowsE; j++) {
                        System.out.print(" ");
                    }
                    for (int j = 1; j <= (2 * i - 1); j++) {
                        System.out.print("*");
                    }
                    System.out.println();
                }
                break;

            case 3:
                System.out.print("Enter the size of the square: ");
                int size = scanner.nextInt();
                for (int i = 1; i <= size; i++) {
                    for (int j = 1; j <= size; j++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
                break;

            default:
                System.out.println("Invalid choice. Please select 1, 2, or 3.");
                break;
        }

        scanner.close();
    }
}


// Output:
// Choose a pattern to print:
// 1. Right Angle Triangle 
// 2. Equilateral Triangle 
// 3. Square
// Enter the number of your choice: 1
// Enter the number of rows for Right Angle Triangle: 8
// * 
// * * 
// * * * 
// * * * * 
// * * * * * 
// * * * * * * 
// * * * * * * * 
// * * * * * * * * 
