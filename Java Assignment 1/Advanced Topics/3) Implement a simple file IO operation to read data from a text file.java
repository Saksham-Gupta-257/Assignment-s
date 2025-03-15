// 3) Implement a simple file IO operation to read data from a text file.

// Note: Use Test.txt (given in the same folder)

// Code:

import java.io.*;
import java.util.Scanner;

public class IO_Operation{

    public static void main(String[] args) {
        try {
            File Obj = new File("Test.txt");
            Scanner scanner = new Scanner(Obj);
            while (scanner.hasNextLine()) {
                String data = scanner.nextLine();
                System.out.println(data);
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            System.out.println("Error: File Not Found ");
        }
    }
}

// Output:
// This is a txt file for Java Assignment 1.
