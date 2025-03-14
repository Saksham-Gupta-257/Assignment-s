// 2) Write a program to demonstrate the use of arithmetic, logical, and relational operators.

// Code:

public class Operators {
    public static void main(String[] args) {

        int a = 10, b = 5;

        System.out.println("Arithmetic Operators");
        System.out.println("Addition -> (a + b) = " + (a + b));
        System.out.println("Subtraction -> (a - b) = " + (a - b));
        System.out.println("Multiplication -> (a * b) = " + (a * b));
        System.out.println("Division -> (a / b) = " + (a / b));
        System.out.println("Modulus -> (a % b) = " + (a % b));

        System.out.println("\nRelational Operators");
        System.out.println("Equal to -> a == b : " + (a == b));
        System.out.println("Not equal to -> a != b : " + (a != b));
        System.out.println("Greater than -> a > b  : " + (a > b));
        System.out.println("Less than -> a < b  : " + (a < b));
        System.out.println("Greater than or equal to -> a >= b : " + (a >= b));
        System.out.println("Less than or equal to -> a <= b : " + (a <= b));

        boolean x = true, y = false;
      
        System.out.println("\nLogical Operators");
        System.out.println("Logical AND -> x && y : " + (x && y));
        System.out.println("Logical OR -> x || y : " + (x || y));
        System.out.println("Logical NOT -> !x : " + (!x));
    }
}

// Output:
// Arithmetic Operators
// Addition -> (a + b) = 15
// Subtraction -> (a - b) = 5
// Multiplication -> (a * b) = 50
// Division -> (a / b) = 2
// Modulus -> (a % b) = 0

// Relational Operators
// Equal to -> a == b : false
// Not equal to -> a != b : true
// Greater than -> a > b  : true
// Less than -> a < b  : false
// Greater than or equal to -> a >= b : true
// Less than or equal to -> a <= b : false

// Logical Operators
// Logical AND -> x && y : false
// Logical OR -> x || y : true
// Logical NOT -> !x : false
