// 1) Write a program to find the average of elements in an array.

// Code:

import java.util.Scanner;

public class Average {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = scanner.nextInt();

        int[] arr = new int[n];
        int sum = 0;

        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
            sum += arr[i];
        }

        double average = (double) sum / n;
        System.out.printf("Average of array elements:" + average);

        scanner.close();
    }
}

// Output:
// Enter the number of elements: 4
// Enter the elements of the array:
// 5
// 10
// 15
// 20
// Average of array elements:12.5
