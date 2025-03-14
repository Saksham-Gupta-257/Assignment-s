// 3) Create a program to convert a temperature from Celsius to Fahrenheit and vice versa.

// Code:

import java.util.Scanner;

public class TemperatureConverter {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Temperature Conversion:");
        System.out.println("1. Celsius to Fahrenheit");1
        System.out.println("2. Fahrenheit to Celsius");
        System.out.print("Enter your choice: ");
        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                System.out.print("Enter temperature in Celsius: ");
                double c = scanner.nextDouble();
                double f = (c * 9 / 5) + 32;
                System.out.printf("Temperature in Fahrenheit: " + f + "*F");
                break;

            case 2:
                System.out.print("Enter temperature in Fahrenheit: ");
                f = scanner.nextDouble();
                c = (f - 32) * 5 / 9;
                System.out.printf("Temperature in Celsius: " + c + "*C");
                break;

            default:
                System.out.println("Invalid choice. Please select 1 or 2.");
                break;
        }

        scanner.close();
    }
}

// Output:
// Temperature Conversion:
// 1. Celsius to Fahrenheit
// 2. Fahrenheit to Celsius
// Enter your choice: 1
// Enter temperature in Celsius: 31
// Temperature in Fahrenheit: 87.8*F
