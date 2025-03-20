# Java Assignment 2 - HR Portal

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Author](#author)

## Introduction
The **HR Portal** is a web-based application designed to manage employee data efficiently. It includes a backend built with Spring Boot and a frontend implemented using HTML, CSS, and JavaScript. The portal allows HR users to log in, manage employee records, and perform CRUD operations.

## Features
### Backend
- Secure login using JWT authentication.
- CRUD operations for managing employees.
- RESTful API endpoints for seamless integration.

### Frontend
- Login page for HR users.
- Dashboard with options to add, edit, and delete employees.
- Responsive design for better user experience.

## Technologies Used
- **Backend**: Spring Boot, JPA, PostgreSQL, JWT
- **Frontend**: HTML, CSS, JavaScript
- **Database**: PostgreSQL
- **Build Tool**: Maven

## Project Structure
Java_Assignment_2/ 
├── hr_portal/ 
│ ├── src/ 
│ │ ├── main/ 
│ │ │ ├── java/com/hrportal/hr_portal/ 
│ │ │ │ ├── controller/ # REST controllers 
│ │ │ │ ├── model/ # Entity classes 
│ │ │ │ ├── repository/ # JPA repositories 
│ │ │ │ ├── security/ # JWT and security configuration 
│ │ │ │ ├── service/ # Business logic 
│ │ │ │ └── HrPortalApplication.java 
│ │ │ ├── application.properties 
├── Frontend/ 
│ ├── login.html # Login page 
│ ├── employees.html # Employee dashboard 
│ ├── login.js # Login logic 
│ ├── employees.js # Employee management logic 
│ ├── styles.css # Styling for the login page
│ ├── style.css # Styling for the dashboard page
└── Databse.txt # commands for database creation
└── README.md # Project documentation

## How to Run
### Backend
1. Install Java 17 and Maven.
2. Configure PostgreSQL with the following credentials:
   - **Database Name**: `hr_portal`
   - **Username**: `postgres`
   - **Password**: 
3. Navigate to the `hr_portal` directory and run
   ./mvnw spring-boot:run
4. The backend will start on http://localhost:8080.

### Frontend
1. Open the Frontend folder.
2. Open login.html in a browser to access the application.

## API Endpoints
### Authentication
- **POST `/api/hr/login`** – HR users can log in using their credentials and receive a JWT token for authentication.

### Employee Management
- **GET `/api/employees`** – Retrieve all employees.
- **GET `/api/employees/{id}`** – Retrieve a specific employee by ID.
- **POST `/api/employees`** – Add a new employee.
- **PUT `/api/employees/{id}`** – Update an existing employee.
- **DELETE `/api/employees/{id}`** – Delete an employee.

## Frontend Features
- **Login Page** – HR users can log in using their credentials.
- **Employee Dashboard**:
  - View a list of employees.
  - Add new employees.
  - Edit existing employee details.
  - Delete employees.

## Technologies Used
- **Backend:** Java, Spring Boot, Spring Data JPA  
- **Frontend:** HTML, CSS, JavaScript  
- **Database:** PostgreSQL  
- **Security:** JWT Authentication  

## Author
**Saksham Gupta**