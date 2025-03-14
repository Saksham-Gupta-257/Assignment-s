// 2) Create a program to check if a number is even or odd.

// Code:

import java.util.Scanner;

public class EvenOrOdd{

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int num = scanner.nextInt();

        if(num%2 == 0){
            System.out.println(num + " is even");
        }else{
            System.out.println(num + " is odd");
        }
        
        scanner.close();
    }
}

// Output:
// Enter a number: 10
// 10 is even
