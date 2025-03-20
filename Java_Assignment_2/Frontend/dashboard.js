const BASE_URL = 'http://localhost:8080';
const token = localStorage.getItem('token');

let employeeToDelete = null;
let editingEmployeeId = null;

// Load Employees on Page Load
document.addEventListener('DOMContentLoaded', loadEmployees);

// Load Employees
async function loadEmployees() {
    try {
        showLoading();
        const response = await fetch(`${BASE_URL}/api/employees`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch employees');
        const employees = await response.json();
        displayEmployees(employees);
    } catch (error) {
        console.error('Error loading employees:', error);
        alert('Failed to load employees.');
    } finally {
        hideLoading();
    }
}

function displayEmployees(employees) {
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.email}</td>
            <td>${emp.salary}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="openEditModal(${emp.id}, '${emp.name}', '${emp.department}', '${emp.email}', ${emp.salary})">Edit</button>
                <button class="delete-btn" onclick="openDeleteModal(${emp.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Add/Edit Employee
const employeeForm = document.getElementById('employeeForm');

employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const employee = {
        name: document.getElementById('employee-name').value,
        department: document.getElementById('employee-department').value,
        email: document.getElementById('employee-email').value,
        salary: parseFloat(document.getElementById('employee-salary').value)
    };

    try {
        if (editingEmployeeId) {
            // Update existing employee
            await updateEmployee(editingEmployeeId, employee);
        } else {
            // Add new employee
            await createEmployee(employee);
        }
        closeModal();
        loadEmployees();
    } catch (error) {
        console.error('Error saving employee:', error);
        alert('Failed to save employee.');
    }
});

// Create Employee
async function createEmployee(employee) {
    const response = await fetch(`${BASE_URL}/api/employees`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });
    // if (!response.ok) throw new Error('Failed to add employee');
    // alert('Employee added successfully!');
}

// Update Employee
async function updateEmployee(id, employee) {
    const response = await fetch(`${BASE_URL}/api/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });
    // if (!response.ok) throw new Error('Failed to update employee');
    // alert('Employee updated successfully!');
}

// Open/Close Modal
function openAddModal() {
    editingEmployeeId = null;
    document.getElementById('employee-id').value = '';
    document.getElementById('employee-name').value = '';
    document.getElementById('employee-department').value = '';
    document.getElementById('employee-email').value = '';
    document.getElementById('employee-salary').value = '';
    document.getElementById('modal-title').innerText = 'Add Employee';
    document.getElementById('employeeModal').style.display = 'flex';
}

function openEditModal(id, name, department, email, salary) {
    editingEmployeeId = id;
    document.getElementById('employee-id').value = id;
    document.getElementById('employee-name').value = name;
    document.getElementById('employee-department').value = department;
    document.getElementById('employee-email').value = email;
    document.getElementById('employee-salary').value = salary;
    document.getElementById('modal-title').innerText = 'Edit Employee';
    document.getElementById('employeeModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
    employeeForm.reset();
}

// Delete Employee 
function openDeleteModal(id) {
    employeeToDelete = id;
    document.getElementById('deleteModal').style.display = 'flex';
}

async function confirmDelete() {
    try {
        const response = await fetch(`${BASE_URL}/api/employees/${employeeToDelete}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        // if (!response.ok) throw new Error('Failed to delete employee');
        // alert('Employee deleted successfully!');
        loadEmployees();
    } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee.');
    } finally {
        closeDeleteModal();
    }
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

// Logout
function logout() {
    localStorage.clear();
    localStorage.removeItem('token');
    window.location.replace('login.html');
}

// Loading Indicator
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerText = 'Loading...';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) loading.remove();
}

window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function () {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});