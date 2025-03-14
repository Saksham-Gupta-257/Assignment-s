// 3) Create a program to search for a specific element within an array using linear search.

// Code:

// Program to search for an element in an array using Linear Search

import java.util.Scanner;

public class LinearSearch {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = scanner.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        System.out.print("Enter the element to search: ");
        int key = scanner.nextInt();

        int index = -1;
        for (int i = 0; i < n; i++) {
            if (arr[i] == key) {
                index = i;
                break;
            }
        }
        
        if (index != -1) {
            System.out.println(key + " found at index " + index);
        } else {
            System.out.println(key + " not found in the array");
        }

        scanner.close();
    }
}

// Output:
// Enter the number of elements: 6
// Enter the elements of the array:
// 5
// 6
// 9
// 22
// 1
// 56
// Enter the element to search: 45
// 45 not found in the array
