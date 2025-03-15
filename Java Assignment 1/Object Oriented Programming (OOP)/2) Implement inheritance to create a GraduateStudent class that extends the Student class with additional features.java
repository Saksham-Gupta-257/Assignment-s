// 2) Implement inheritance to create a "GraduateStudent" class that extends the "Student" class with additional features.

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

class GraduateStudent extends Student {
    String degree;
    String branch;
    String specialization;
    float cgpa;

    public GraduateStudent() {}

    public GraduateStudent(String name, int roll_no, float marks, String degree, String branch, String specialization, float cgpa) {
        super(name, roll_no, marks);
        this.degree = degree;
        this.branch = branch;
        this.specialization = specialization;
        this.cgpa = cgpa;
    }

    @Override
    public void student_Info() {
        super.student_Info();
        System.out.println("Degree of the student: " + degree);
        System.out.println("Branch: " + branch);
        System.out.println("Specialization: " + specialization);
        System.out.println("CGPA: " + cgpa);
    }
}

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter student name: ");
        String name = scanner.nextLine();
        System.out.print("Enter roll number: ");
        int roll_no = scanner.nextInt();
        System.out.print("Enter marks: ");
        float marks = scanner.nextFloat();
        scanner.nextLine();

        System.out.print("Enter Degree of the Student: ");
        String degree = scanner.nextLine();
        System.out.print("Enter Branch: ");
        String branch = scanner.nextLine();
        System.out.print("Enter specialization: ");
        String specialization = scanner.nextLine();
        System.out.print("Enter CGPA between 0-10: ");
        float cgpa = scanner.nextFloat();

        GraduateStudent g1 = new GraduateStudent(name, roll_no, marks, degree, branch, specialization, cgpa);
        Student s1 = new Student(name, roll_no, marks);

        System.out.println("\n" + "-------------------------------------------" + "\n");
        System.out.println("Student details from Student Class: ");
        s1.student_Info();

        System.out.println("\n--------------------------------------------------------------\n");
        System.out.println("Student details from Graduate Class: ");
        g1.student_Info();

        scanner.close();
    }
}


// Output:
// Enter student name: Saksham
// Enter roll number: 59
// Enter marks: 76.65
// Enter Degree of the Student: B.Tech
// Enter Branch: CSE
// Enter specialization: AI
// Enter CGPA between 0-10: 8.58

// -------------------------------------------

// Student details from Student Class:
// Name: Saksham
// Roll number: 59
// Marks: 76.65

// --------------------------------------------------------------

// Student details from Graduate Class: 
// Name: Saksham
// Roll number: 59
// Marks: 76.65
// Degree of the student: B.Tech
// Branch: CSE
// Specialization: AI
// CGPA: 8.58
