// 3) Implement a program to find the factorial of a given number.

// Code:

import java.util.Scanner;

public class Factorial{

    public static long factorial(int n) {
        if (n == 0) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = scanner.nextInt();
        long factorial = factorial(num);

        System.out.println("Factorial of " + num + " is: " + factorial);
        scanner.close();
    }

}

// Output:
// Enter a number: 5
// Factorial of 5 is: 120
