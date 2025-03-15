// 2) Create a program to handle exceptions using try-catch blocks.

// Code:

import java.util.Scanner;

public class ExceptionHandling {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {

            System.out.print("Enter the number of elements: ");
            int n = scanner.nextInt();

            int[] arr = new int[n];

            System.out.println("Enter the elements of the array:");
            for (int i = 0; i < n; i++) {
                arr[i] = scanner.nextInt();
            }
            
            System.out.print("Enter index: ");
            int index = scanner.nextInt();
            System.out.println("Value at index " + index + ": " + arr[index]);

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: Index out of bound.");
        } finally {
            scanner.close();
        }
    }
}

// Output:
// Enter the number of elements: 4
// Enter the elements of the array:
// 2
// 6
// 8
// 9
// Enter index: 10
// Error: Index out of bound.
