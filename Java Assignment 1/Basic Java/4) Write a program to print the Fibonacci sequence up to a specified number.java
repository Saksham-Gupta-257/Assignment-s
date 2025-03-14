// 4) Write a program to print the Fibonacci sequence up to a specified number.

// Code:

import java.util.Scanner;

public class FibonacciSequence {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = scanner.nextInt();

        int a = 0, b = 1;

        System.out.print("Fibonacci sequence up to " + num + ": ");
        
        while (a <= num) {
            System.out.print(a + " ");
            int next = a + b; 
            a = b; 
            b = next; 
        }
        
        scanner.close();
    }
}

// Output:
// Enter a number: 10
// Fibonacci sequence up to 10: 0 1 1 2 3 5 8 
