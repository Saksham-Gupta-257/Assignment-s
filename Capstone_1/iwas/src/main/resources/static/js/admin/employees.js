document.addEventListener("DOMContentLoaded", () => {
  loadEmployees()
  loadSkills()

  // Add employee button
  const addEmployeeBtn = document.getElementById("add-employee-btn")
  const addEmployeeModal = document.getElementById("add-employee-modal")
  const addEmployeeForm = document.getElementById("add-employee-form")

  addEmployeeBtn.addEventListener("click", () => {
    addEmployeeModal.style.display = "block"
  })

  // Close modal buttons
  const closeButtons = document.querySelectorAll(".close")
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.style.display = "none"
      })
    })
  })

  // Add employee form submission
  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("employee-name").value
    const email = document.getElementById("employee-email").value
    const status = document.getElementById("employee-status").value

    addEmployee(name, email, status)
  })

  // Edit employee form submission
  const editEmployeeForm = document.getElementById("edit-employee-form")
  editEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const id = document.getElementById("edit-employee-id").value
    const name = document.getElementById("edit-employee-name").value
    const email = document.getElementById("edit-employee-email").value
    const status = document.getElementById("edit-employee-status").value

    updateEmployee(id, name, email, status)
  })

  // Add skill button
  const addSkillBtn = document.getElementById("add-skill-btn")
  addSkillBtn.addEventListener("click", () => {
    const skillSelect = document.getElementById("skill-select")
    const skillRating = document.getElementById("skill-rating")
    const employeeId = document.getElementById("edit-employee-id").value

    if (!skillSelect.value || !skillRating.value) {
      alert("Please select a skill and provide a rating")
      return
    }

    addEmployeeSkill(employeeId, skillSelect.value, skillRating.value)
  })

  // Confirmation modal
  const confirmYesBtn = document.getElementById("confirm-yes")
  const confirmNoBtn = document.getElementById("confirm-no")
  const confirmationModal = document.getElementById("confirmation-modal")

  confirmNoBtn.addEventListener("click", () => {
    confirmationModal.style.display = "none"
  })
})

// Load employees
function loadEmployees() {
  fetch("http://localhost:8080/api/users/employees")
    .then((response) => response.json())
    .then((data) => {
      const inProjectEmployees = document.getElementById("in-project-employees")
      const onLeaveEmployees = document.getElementById("on-leave-employees")
      const onBenchEmployees = document.getElementById("on-bench-employees")

      inProjectEmployees.innerHTML = ""
      onLeaveEmployees.innerHTML = ""
      onBenchEmployees.innerHTML = ""

      data.forEach((employee) => {
        const employeeCard = createEmployeeCard(employee)

        if (employee.status === "IN_PROJECT") {
          inProjectEmployees.appendChild(employeeCard)
        } else if (employee.status === "ON_LEAVE") {
          onLeaveEmployees.appendChild(employeeCard)
        } else {
          onBenchEmployees.appendChild(employeeCard)
        }
      })
    })
    .catch((error) => {
      console.error("Error loading employees:", error)
    })
}

// Create employee card
function createEmployeeCard(employee) {
  const card = document.createElement("div")
  card.className = "employee-card"

  const name = document.createElement("h4")
  name.textContent = employee.name

  const email = document.createElement("p")
  email.textContent = employee.email

  const actions = document.createElement("div")
  actions.className = "actions"

  const editBtn = document.createElement("button")
  editBtn.className = "btn btn-secondary"
  editBtn.innerHTML = '<i class="fas fa-edit"></i>'
  editBtn.addEventListener("click", () => {
    openEditEmployeeModal(employee.id)
  })

  const deleteBtn = document.createElement("button")
  deleteBtn.className = "btn btn-danger"
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
  deleteBtn.addEventListener("click", () => {
    confirmDeleteEmployee(employee.id, employee.name)
  })

  const promoteBtn = document.createElement("button")
  promoteBtn.className = "btn btn-primary"
  promoteBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  promoteBtn.title = "Promote to Admin"
  promoteBtn.addEventListener("click", () => {
    confirmPromoteEmployee(employee.id, employee.name)
  })

  actions.appendChild(editBtn)
  actions.appendChild(deleteBtn)
  actions.appendChild(promoteBtn)

  card.appendChild(name)
  card.appendChild(email)
  card.appendChild(actions)

  return card
}

// Add employee
function addEmployee(name, email, status) {
  // Default password: name without spaces + "@123"
  const password = name.replace(/\s+/g, "") + "@123";
  console.log("Generated Password:", password);
  status = status || "On Bench"; // Default status

  fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "EMPLOYEE",
      status,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Error adding employee");
        });
      }
      return response.json();
    })
    .then(() => {
      document.getElementById("add-employee-modal").style.display = "none";
      document.getElementById("add-employee-form").reset();
      loadEmployees(); // Refresh employee list

      // Show success message
      showPopupMessage("Employee added successfully", "success");
    })
    .catch((error) => {
      console.error("Error adding employee:", error);
      showPopupMessage("Error adding employee: " + error.message, "error");
    });
}

// Open edit employee modal
function openEditEmployeeModal(employeeId) {
  fetch(`http://localhost:8080/api/users/${employeeId}`)
    .then((response) => response.json())
    .then((employee) => {
      document.getElementById("edit-employee-id").value = employee.id
      document.getElementById("edit-employee-name").value = employee.name
      document.getElementById("edit-employee-email").value = employee.email
      document.getElementById("edit-employee-status").value = employee.status

      // Load employee skills
      const skillsList = document.getElementById("employee-skills-list")
      skillsList.innerHTML = ""

      if (employee.skills && employee.skills.length > 0) {
        employee.skills.forEach((skill) => {
          const skillItem = document.createElement("div")
          skillItem.className = "skill-item"

          const skillInfo = document.createElement("div")
          skillInfo.innerHTML = `<span class="skill-name">${skill.skillName}</span> - <span class="skill-rating">${skill.rating}/10</span>`

          const deleteBtn = document.createElement("button")
          deleteBtn.className = "btn btn-danger btn-sm"
          deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
          deleteBtn.addEventListener("click", () => {
            deleteEmployeeSkill(employee.id, skill.id)
          })

          skillItem.appendChild(skillInfo)
          skillItem.appendChild(deleteBtn)
          skillsList.appendChild(skillItem)
        })
      } else {
        skillsList.innerHTML = "<p>No skills added yet</p>"
      }

      document.getElementById("edit-employee-modal").style.display = "block"
    })
    .catch((error) => {
      console.error("Error loading employee details:", error)
    })
}

// Update employee
function updateEmployee(id, name, email, status) {
  fetch(`http://localhost:8080/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      status,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.json()
    })
    .then(() => {
      document.getElementById("edit-employee-modal").style.display = "none"
      loadEmployees()

      // Show success message
      showPopupMessage("Employee updated successfully")
    })
    .catch((error) => {
      console.error("Error updating employee:", error)
      showPopupMessage("Error updating employee: " + error.message, "error")
    })
}

// Confirm delete employee
function confirmDeleteEmployee(employeeId, employeeName) {
  const confirmationModal = document.getElementById("confirmation-modal")
  const confirmationMessage = document.getElementById("confirmation-message")
  const confirmYesBtn = document.getElementById("confirm-yes")

  confirmationMessage.textContent = `Are you sure you want to delete ${employeeName}?`
  confirmationModal.style.display = "block"

  confirmYesBtn.onclick = () => {
    deleteEmployee(employeeId)
    confirmationModal.style.display = "none"
  }
}

// Delete employee
function deleteEmployee(employeeId) {
  fetch(`http://localhost:8080/api/users/${employeeId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.text()
    })
    .then(() => {
      loadEmployees()

      // Show success message
      showPopupMessage("Employee deleted successfully")
    })
    .catch((error) => {
      console.error("Error deleting employee:", error)
      showPopupMessage("Error deleting employee: " + error.message, "error")
    })
}

// Confirm promote employee
function confirmPromoteEmployee(employeeId, employeeName) {
  const confirmationModal = document.getElementById("confirmation-modal")
  const confirmationMessage = document.getElementById("confirmation-message")
  const confirmYesBtn = document.getElementById("confirm-yes")

  confirmationMessage.textContent = `Are you sure you want to promote ${employeeName} to Admin?`
  confirmationModal.style.display = "block"

  confirmYesBtn.onclick = () => {
    promoteEmployee(employeeId)
    confirmationModal.style.display = "none"
  }
}

// Promote employee to admin
function promoteEmployee(employeeId) {
  fetch(`http://localhost:8080/api/users/${employeeId}/promote`, {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.json()
    })
    .then(() => {
      loadEmployees()

      // Show success message
      showPopupMessage("Employee promoted to Admin successfully")
    })
    .catch((error) => {
      console.error("Error promoting employee:", error)
      showPopupMessage("Error promoting employee: " + error.message, "error")
    })
}

// Load skills
function loadSkills() {
  fetch("http://localhost:8080/api/skills")
    .then((response) => response.json())
    .then((data) => {
      const skillSelect = document.getElementById("skill-select")
      skillSelect.innerHTML = ""

      data.forEach((skill) => {
        const option = document.createElement("option")
        option.value = skill.id
        option.textContent = skill.name
        skillSelect.appendChild(option)
      })
    })
    .catch((error) => {
      console.error("Error loading skills:", error)
    })
}

// Add employee skill
function addEmployeeSkill(employeeId, skillId, rating) {
  fetch(`http://localhost:8080/api/users/${employeeId}/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skillId,
      rating: Number.parseInt(rating),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.json()
    })
    .then(() => {
      openEditEmployeeModal(employeeId)

      // Show success message
      showPopupMessage("Skill added successfully")
    })
    .catch((error) => {
      console.error("Error adding skill:", error)
      showPopupMessage("Error adding skill: " + error.message, "error")
    })
}

// Delete employee skill
function deleteEmployeeSkill(employeeId, skillId) {
  fetch(`http://localhost:8080/api/users/${employeeId}/skills/${skillId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.text()
    })
    .then(() => {
      openEditEmployeeModal(employeeId)

      // Show success message
      showPopupMessage("Skill removed successfully")
    })
    .catch((error) => {
      console.error("Error removing skill:", error)
      showPopupMessage("Error removing skill: " + error.message, "error")
    })
}

// Show popup message
function showPopupMessage(message, type = "success") {
  // Create popup element if it doesn't exist
  let popup = document.getElementById("popup-message")
  if (!popup) {
    popup = document.createElement("div")
    popup.id = "popup-message"
    document.body.appendChild(popup)

    // Add styles
    popup.style.position = "fixed"
    popup.style.bottom = "20px"
    popup.style.right = "20px"
    popup.style.padding = "10px 20px"
    popup.style.borderRadius = "4px"
    popup.style.color = "white"
    popup.style.zIndex = "9999"
    popup.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)"
  }

  // Set message and type
  popup.textContent = message
  popup.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336"

  // Show popup
  popup.style.display = "block"

  // Hide popup after 3 seconds
  setTimeout(() => {
    popup.style.display = "none"
  }, 3000)
}

