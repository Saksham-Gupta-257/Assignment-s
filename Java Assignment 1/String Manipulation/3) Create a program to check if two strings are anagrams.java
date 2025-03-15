// 3) Create a program to check if two strings are anagrams.

// Code:

import java.util.Scanner;
import java.util.Arrays;

public class Anagrams {
    public static boolean areAnagrams(String str1, String str2) {

        if (str1.length() != str2.length()) {
            return false;
        }

        char[] arr1 = str1.toCharArray();
        char[] arr2 = str2.toCharArray();
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        return Arrays.equals(arr1, arr2);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first string: ");
        String str1 = scanner.nextLine();
        System.out.print("Enter second string: ");
        String str2 = scanner.nextLine();
        if (areAnagrams(str1, str2)) {
            System.out.println("The strings are anagrams.");
        } else {
            System.out.println("The strings are NOT anagrams.");
        }
        
        scanner.close();
    }
}


// Output:
// Enter first string: act
// Enter second string: cat
// The strings are anagrams.
