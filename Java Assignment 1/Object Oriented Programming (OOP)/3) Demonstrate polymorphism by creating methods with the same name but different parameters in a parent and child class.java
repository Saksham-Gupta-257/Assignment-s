// 3) Demonstrate polymorphism by creating methods with the same name but different parameters in a parent and child class.

// Code:

import java.util.Scanner;

class Circle_Rectangle {

    public void area(double r) {
        double result = 3.14 * r * r;
        System.out.printf("Area of Circle = " + result);
    }

    public void area(double l, double w) {
        double result = l * w;
        System.out.printf("Area of Rectangle = " + result);
    }
}

class Triangle extends Circle_Rectangle {

    @Override
    public void area(double b, double h) {
        double result = 0.5 * b * h;
        System.out.printf("Area of Triangle = " + result);
    }
}

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Choose the shape to calculate the area:");
        System.out.println("1. Circle");
        System.out.println("2. Rectangle");
        System.out.println("3. Triangle");

        System.out.print("Enter the number of your choice: ");
        int choice = scanner.nextInt();

        Circle_Rectangle cr = new Circle_Rectangle();
        Triangle t = new Triangle();

        switch (choice) {
            case 1:
                System.out.print("Enter the radius of the circle: ");
                double r = scanner.nextDouble();
                cr.area(r);
                break;

            case 2:
                System.out.print("Enter the length of the rectangle: ");
                double l = scanner.nextDouble();
                System.out.print("Enter the width of the rectangle: ");
                double w = scanner.nextDouble();
                cr.area(l, w);
                break;

            case 3:
                System.out.print("Enter the base of the triangle: ");
                double b = scanner.nextDouble();
                System.out.print("Enter the height of the triangle: ");
                double h = scanner.nextDouble();
                t.area(b, h);
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
// Enter the number of your choice: 3
// Enter the base of the triangle: 7
// Enter the height of the triangle: 8
// Area of Triangle = 28.0
