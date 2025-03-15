// 1) Create a class to represent a student with attributes like name, roll number, and marks.

// Code:

import java.util.Scanner;

class Student {

    String name;
    int roll_no;
    float marks;

    public Student() {}

    public Student(String name, int roll_no, float marks) {
        this.name = name;
        this.roll_no = roll_no;
        this.marks = marks;
    }

    public void student_Info() {
        System.out.println("Name: " + name);
        System.out.println("Roll number: " + roll_no);
        System.out.println("Marks: " + marks);
    }
}

public class Main extends Student {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter student name: ");
        String name = scanner.nextLine();
        System.out.print("Enter roll number: ");
        int roll_no = scanner.nextInt();
        System.out.print("Enter marks: ");
        float marks = scanner.nextFloat();

        Student s1 = new Student(name, roll_no, marks);

        System.out.println("\n" + "-------------------------------------------" + "\n");

        s1.student_Info();

        scanner.close();
    }
}

// Output:
// Enter student name: Saksham
// Enter roll number: 59
// Enter marks: 76.65

// -------------------------------------------

// Name: Saksham
// Roll number: 59
// Marks: 76.65
