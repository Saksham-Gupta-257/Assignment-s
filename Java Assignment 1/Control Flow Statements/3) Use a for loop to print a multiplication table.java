// 3) Use a for loop to print a multiplication table.

// Code:


import java.util.Scanner;

public class Table{

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int num = scanner.nextInt();

        System.out.println("Multiplication Table of " + num + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.println(num + " x " + i + " = " + (num * i));
        }

        scanner.close();
    }
}

// Output:
// Enter a number: 6
// Multiplication Table of 6:
// 6 x 1 = 6
// 6 x 2 = 12
// 6 x 3 = 18
// 6 x 4 = 24
// 6 x 5 = 30
// 6 x 6 = 36
// 6 x 7 = 42
// 6 x 8 = 48
// 6 x 9 = 54
// 6 x 10 = 60
