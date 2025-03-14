// 1) Write a program to calculate the area of a circle, rectangle, or triangle based on user input.

// Code: 

import java.util.Scanner;

public class Area{

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Choose the shape to calculate the area:");
        System.out.println("1. Circle");
        System.out.println("2. Rectangle");
        System.out.println("3. Triangle");
        
        System.out.print("Enter the number of your choice: ");
        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                System.out.print("Enter the radius of the circle: ");
                double r = scanner.nextDouble();
                double circleArea = 3.14 * r * r;
                System.out.printf("The area of the circle is %f\n", circleArea);
                break;

            case 2:
                System.out.print("Enter the length of the rectangle: ");
                double l = scanner.nextDouble();
                System.out.print("Enter the width of the rectangle: ");
                double w = scanner.nextDouble();
                double rectangleArea = l * w;
                System.out.printf("The area of the rectangle is %f\n", rectangleArea);
                break;

            case 3:
                System.out.print("Enter the base of the triangle: ");
                double b = scanner.nextDouble();
                System.out.print("Enter the height of the triangle: ");
                double h = scanner.nextDouble();
                double triangleArea = 0.5 * b * h;
                System.out.printf("The area of the triangle is %f\n", triangleArea);
                break;

            default:
                System.out.println("Invalid choice. Please select 1, 2, or 3.");
                break;
        }

        scanner.close();
    }
}

// Output:

// Choose the shape to calculate the area:
// 1. Circle
// 2. Rectangle
// 3. Triangle
// Enter the number of your choice: 1
// Enter the radius of the circle: 8
// The area of the circle is 200.960000
