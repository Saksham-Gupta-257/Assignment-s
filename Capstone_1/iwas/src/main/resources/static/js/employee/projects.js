document.addEventListener("DOMContentLoaded", () => {
  loadProjects()
  loadSkills()

  // Add project button
  const addProjectBtn = document.getElementById("add-project-btn")
  const addProjectModal = document.getElementById("add-project-modal")
  const addProjectForm = document.getElementById("add-project-form")

  addProjectBtn.addEventListener("click", () => {
    addProjectModal.style.display = "block"
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

  // Add project form submission
  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("project-name").value
    const description = document.getElementById("project-description").value

    addProject(name, description)
  })

  // // Edit project form submission
  // const editProjectForm = document.getElementById("edit-project-form")
  // editProjectForm.addEventListener("submit", (e) => {
  //   e.preventDefault()

  //   const id = document.getElementById("edit-project-id").value
  //   const name = document.getElementById("edit-project-name").value
  //   const description = document.getElementById("edit-project-description").value
  //   const status = document.getElementById("edit-project-status").value

  //   updateProject(id, name, description, status)
  // })
  // Edit project form submission
  const editProjectForm = document.getElementById("edit-project-form")
  editProjectForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const id = document.getElementById("edit-project-id").value
    const name = document.getElementById("edit-project-name").value
    const description = document.getElementById("edit-project-description").value
    const status = document.getElementById("edit-project-status").value

    // First update the project details
    updateProject(id, name, description, status)
      .then(() => {
        // After successfully updating the project, check for any new skills
        const skillSelect = document.getElementById("edit-skill-select")
        if (skillSelect.value) {
          // If there's a selected skill, add it before closing the modal
          return addProjectSkill(id, skillSelect.value)
        }
        return Promise.resolve()
      })
      .then(() => {
        // Close the modal and refresh the projects list
        document.getElementById("edit-project-modal").style.display = "none"
        loadProjects()
        showPopupMessage("Project updated successfully with all skills")
      })
      .catch((error) => {
        console.error("Error in project update process:", error)
        showPopupMessage("Error updating project: " + error.message, "error")
      })
  })

  // Add skill button
  const addSkillBtn = document.getElementById("add-skill-btn")
  addSkillBtn.addEventListener("click", () => {
    const skillSelect = document.getElementById("skill-select")
    const projectId = document.getElementById("add-project-form").getAttribute("data-project-id")

    if (!skillSelect.value) {
      alert("Please select a skill")
      return
    }

    addProjectSkill(projectId, skillSelect.value)
  })

  // Edit add skill button
  const editAddSkillBtn = document.getElementById("edit-add-skill-btn")
  if (editAddSkillBtn) {
    editAddSkillBtn.addEventListener("click", () => {
      const skillSelect = document.getElementById("edit-skill-select")
      const projectId = document.getElementById("edit-project-id").value

      if (!skillSelect.value) {
        alert("Please select a skill")
        return
      }

      addProjectSkill(projectId, skillSelect.value)
    })
  }

  // Tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Remove active class from all buttons
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active")
      })

      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Confirmation modal
  const confirmYesBtn = document.getElementById("confirm-yes")
  const confirmNoBtn = document.getElementById("confirm-no")
  const confirmationModal = document.getElementById("confirmation-modal")

  confirmNoBtn.addEventListener("click", () => {
    confirmationModal.style.display = "none"
  })
})

// Load projects
function loadProjects() {
  fetch("http://localhost:8080/api/projects")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("projects-table-body")
      tableBody.innerHTML = ""

      if (data.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 6
        cell.textContent = "No projects found"
        cell.style.textAlign = "center"
        row.appendChild(cell)
        tableBody.appendChild(row)
        return
      }

      data.forEach((project) => {
        const row = document.createElement("tr")

        const nameCell = document.createElement("td")
        nameCell.textContent = project.name

        const descriptionCell = document.createElement("td")
        descriptionCell.textContent = project.description

        const skillsCell = document.createElement("td")
        if (project.requiredSkills && project.requiredSkills.length > 0) {
          const skillsList = document.createElement("div")
          skillsList.className = "skills-list"

          project.requiredSkills.forEach((skill) => {
            const skillBadge = document.createElement("span")
            skillBadge.className = "skill-badge"
            skillBadge.textContent = skill.name
            skillsList.appendChild(skillBadge)
          })

          skillsCell.appendChild(skillsList)
        } else {
          skillsCell.textContent = "No skills required"
        }

        const assignedToCell = document.createElement("td")
        if (project.assignedTo) {
          assignedToCell.textContent = project.assignedTo.name
        } else {
          assignedToCell.textContent = "Not assigned"
        }

        const statusCell = document.createElement("td")
        statusCell.textContent = project.status

        const actionsCell = document.createElement("td")
        actionsCell.className = "actions"

        const editBtn = document.createElement("button")
        editBtn.className = "btn btn-secondary btn-sm"
        editBtn.innerHTML = '<i class="fas fa-edit"></i>'
        editBtn.addEventListener("click", () => {
          openEditProjectModal(project.id)
        })

        const deleteBtn = document.createElement("button")
        deleteBtn.className = "btn btn-danger btn-sm"
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        deleteBtn.addEventListener("click", () => {
          confirmDeleteProject(project.id, project.name)
        })

        const assignBtn = document.createElement("button")
        assignBtn.className = "btn btn-primary btn-sm"
        assignBtn.innerHTML = '<i class="fas fa-user-plus"></i>'
        assignBtn.title = "Assign Project"
        assignBtn.addEventListener("click", () => {
          openAssignProjectModal(project.id)
        })

        actionsCell.appendChild(editBtn)
        actionsCell.appendChild(deleteBtn)
        actionsCell.appendChild(assignBtn)

        row.appendChild(nameCell)
        row.appendChild(descriptionCell)
        row.appendChild(skillsCell)
        row.appendChild(assignedToCell)
        row.appendChild(statusCell)
        row.appendChild(actionsCell)

        tableBody.appendChild(row)
      })
    })
    .catch((error) => {
      console.error("Error loading projects:", error)
    })
}

// Load skills
// For the second error in loadSkills function
function loadSkills() {
  fetch("http://localhost:8080/api/skills")
    .then((response) => response.json())
    .then((data) => {
      const skillSelect = document.getElementById("skill-select")
      const editSkillSelect = document.getElementById("edit-skill-select")

      // Add null checks before using these elements
      if (skillSelect) {
        skillSelect.innerHTML = ""

        data.forEach((skill) => {
          const option = document.createElement("option")
          option.value = skill.id
          option.textContent = skill.name
          skillSelect.appendChild(option.cloneNode(true))
        })
      }

      if (editSkillSelect) {
        editSkillSelect.innerHTML = ""

        data.forEach((skill) => {
          const option = document.createElement("option")
          option.value = skill.id
          option.textContent = skill.name
          editSkillSelect.appendChild(option)
        })
      }
    })
    .catch((error) => {
      console.error("Error loading skills:", error)
    })
}

// Add project
function addProject(name, description) {
  fetch("http://localhost:8080/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      status: "ACTIVE",
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
    .then((project) => {
      // Store project ID for adding skills
      document.getElementById("add-project-form").setAttribute("data-project-id", project.id)

      // Add skills to project - with null check
      const skillsList = document.getElementById("project-skills-list")

      // Check if skillsList exists before trying to use it
      if (skillsList) {
        const skillItems = skillsList.querySelectorAll(".skill-item")
        const addSkillPromises = []

        if (skillItems && skillItems.length > 0) {
          skillItems.forEach((item) => {
            const skillId = item.getAttribute("data-skill-id")
            if (skillId) {
              addSkillPromises.push(addProjectSkill(project.id, skillId))
            }
          })

          return Promise.all(addSkillPromises).then(() => project)
        }
      }

      // If there are no skills or the skillsList doesn't exist, just return the project
      return project
    })
    .then(() => {
      document.getElementById("add-project-modal").style.display = "none"

      // Reset the form safely
      const addProjectForm = document.getElementById("add-project-form")
      if (addProjectForm) {
        addProjectForm.reset()
      }

      // Clear skills list if it exists
      const skillsList = document.getElementById("project-skills-list")
      if (skillsList) {
        skillsList.innerHTML = ""
      }

      loadProjects()

      // Show success message
      showPopupMessage("Project added successfully")
    })
    .catch((error) => {
      console.error("Error adding project:", error)
      showPopupMessage("Error adding project: " + error.message, "error")
    })
}

// Open edit project modal
function openEditProjectModal(projectId) {
  fetch(`http://localhost:8080/api/projects/${projectId}`)
    .then((response) => response.json())
    .then((project) => {
      document.getElementById("edit-project-id").value = project.id
      document.getElementById("edit-project-name").value = project.name
      document.getElementById("edit-project-description").value = project.description
      document.getElementById("edit-project-status").value = project.status

      // Load project skills
      const skillsList = document.getElementById("edit-project-skills-list")
      skillsList.innerHTML = ""

      if (project.requiredSkills && project.requiredSkills.length > 0) {
        project.requiredSkills.forEach((skill) => {
          const skillItem = document.createElement("div")
          skillItem.className = "skill-item"
          skillItem.setAttribute("data-skill-id", skill.id)

          const skillName = document.createElement("span")
          skillName.className = "skill-name"
          skillName.textContent = skill.name

          const deleteBtn = document.createElement("button")
          deleteBtn.className = "btn btn-danger btn-sm"
          deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
          deleteBtn.addEventListener("click", () => {
            removeProjectSkill(project.id, skill.id)
          })

          skillItem.appendChild(skillName)
          skillItem.appendChild(deleteBtn)
          skillsList.appendChild(skillItem)
        })
      } else {
        skillsList.innerHTML = "<p>No skills required</p>"
      }

      document.getElementById("edit-project-modal").style.display = "block"
    })
    .catch((error) => {
      console.error("Error loading project details:", error)
    })
}

// Update project
// function updateProject(id, name, description, status) {
//   fetch(`http://localhost:8080/api/projects/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       description,
//       status,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         return response.text().then((text) => {
//           throw new Error(text)
//         })
//       }
//       return response.json()
//     })
//     .then(() => {
//       document.getElementById("edit-project-modal").style.display = "none"
//       loadProjects()

//       // Show success message
//       showPopupMessage("Project updated successfully")
//     })
//     .catch((error) => {
//       console.error("Error updating project:", error)
//       showPopupMessage("Error updating project: " + error.message, "error")
//     })
// }
function updateProject(id, name, description, status) {
  return fetch(`http://localhost:8080/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
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
    .catch((error) => {
      console.error("Error updating project:", error)
      showPopupMessage("Error updating project: " + error.message, "error")
      throw error // Re-throw to allow proper Promise chaining
    })
}

// Confirm delete project
function confirmDeleteProject(projectId, projectName) {
  const confirmationModal = document.getElementById("confirmation-modal")
  const confirmationMessage = document.getElementById("confirmation-message")
  const confirmYesBtn = document.getElementById("confirm-yes")

  confirmationMessage.textContent = `Are you sure you want to delete project "${projectName}"?`
  confirmationModal.style.display = "block"

  confirmYesBtn.onclick = () => {
    deleteProject(projectId)
    confirmationModal.style.display = "none"
  }
}

// Delete project
function deleteProject(projectId) {
  fetch(`http://localhost:8080/api/projects/${projectId}`, {
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
      loadProjects()

      // Show success message
      showPopupMessage("Project deleted successfully")
    })
    .catch((error) => {
      console.error("Error deleting project:", error)
      showPopupMessage("Error deleting project: " + error.message, "error")
    })
}

// Add project skill
function addProjectSkill(projectId, skillId) {
  return fetch(`http://localhost:8080/api/projects/${projectId}/skills/${skillId}`, {
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
    .then((skill) => {
      // If editing a project, refresh the skills list
      if (document.getElementById("edit-project-modal").style.display === "block") {
        openEditProjectModal(projectId)
      } else {
        // Add skill to the list in the add project modal
        const skillsList = document.getElementById("project-skills-list")

        // Check if "No skills required" message is present
        if (skillsList.innerHTML.includes("No skills required")) {
          skillsList.innerHTML = ""
        }

        const skillItem = document.createElement("div")
        skillItem.className = "skill-item"
        skillItem.setAttribute("data-skill-id", skill.skillId)

        const skillName = document.createElement("span")
        skillName.className = "skill-name"
        skillName.textContent = skill.skillName

        const deleteBtn = document.createElement("button")
        deleteBtn.className = "btn btn-danger btn-sm"
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
        deleteBtn.addEventListener("click", () => {
          skillItem.remove()

          // If no skills left, show message
          if (skillsList.children.length === 0) {
            skillsList.innerHTML = "<p>No skills required</p>"
          }
        })

        skillItem.appendChild(skillName)
        skillItem.appendChild(deleteBtn)
        skillsList.appendChild(skillItem)
      }

      return skill
    })
    .catch((error) => {
      console.error("Error adding skill to project:", error)
      showPopupMessage("Error adding skill to project: " + error.message, "error")
    })
}

// Remove project skill
function removeProjectSkill(projectId, skillId) {
  fetch(`http://localhost:8080/api/projects/${projectId}/skills/${skillId}`, {
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
      // Refresh the skills list
      openEditProjectModal(projectId)
    })
    .catch((error) => {
      console.error("Error removing skill from project:", error)
      showPopupMessage("Error removing skill from project: " + error.message, "error")
    })
}

// Open assign project modal
function openAssignProjectModal(projectId) {
  const assignProjectModal = document.getElementById("assign-project-modal")

  // Set active tab to suggested
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.classList.remove("active")
  })
  document.querySelector('[data-tab="suggested"]').classList.add("active")
  document.getElementById("suggested-tab").classList.add("active")

  // Load suggested employees
  fetch(`http://localhost:8080/api/projects/${projectId}/suggest`)
    .then((response) => response.json())
    .then((employees) => {
      const suggestedList = document.getElementById("suggested-employees-list")
      suggestedList.innerHTML = ""

      if (employees.length === 0) {
        suggestedList.innerHTML = "<p>No suggested employees found</p>"
        return
      }

      employees.forEach((employee) => {
        const employeeItem = document.createElement("div")
        employeeItem.className = "employee-item"

        const employeeInfo = document.createElement("div")
        employeeInfo.className = "employee-info"
        employeeInfo.innerHTML = `
                    <h4>${employee.name}</h4>
                    <p>${employee.email}</p>
                `

        const assignBtn = document.createElement("button")
        assignBtn.className = "btn btn-primary"
        assignBtn.textContent = "Assign"
        assignBtn.addEventListener("click", () => {
          assignProject(projectId, employee.id)
        })

        employeeItem.appendChild(employeeInfo)
        employeeItem.appendChild(assignBtn)
        suggestedList.appendChild(employeeItem)
      })
    })
    .catch((error) => {
      console.error("Error loading suggested employees:", error)
    })

  // Load available employees for manual assignment
  fetch("http://localhost:8080/api/users/available")
    .then((response) => response.json())
    .then((employees) => {
      const employeeSelect = document.getElementById("employee-select")
      employeeSelect.innerHTML = ""

      if (employees.length === 0) {
        const option = document.createElement("option")
        option.textContent = "No available employees"
        employeeSelect.appendChild(option)
        return
      }

      employees.forEach((employee) => {
        const option = document.createElement("option")
        option.value = employee.id
        option.textContent = `${employee.name} (${employee.email})`
        employeeSelect.appendChild(option)
      })
    })
    .catch((error) => {
      console.error("Error loading available employees:", error)
    })

  // Set up manual assign button
  const manualAssignBtn = document.getElementById("manual-assign-btn")
  manualAssignBtn.onclick = () => {
    const employeeId = document.getElementById("employee-select").value
    if (employeeId) {
      assignProject(projectId, employeeId)
    } else {
      showPopupMessage("Please select an employee", "error")
    }
  }

  assignProjectModal.style.display = "block"
}

// Assign project to employee
function assignProject(projectId, employeeId) {
  fetch(`http://localhost:8080/api/projects/${projectId}/assign/${employeeId}`, {
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
      document.getElementById("assign-project-modal").style.display = "none"
      loadProjects()

      // Show success message
      showPopupMessage("Project assigned successfully")
    })
    .catch((error) => {
      console.error("Error assigning project:", error)
      showPopupMessage("Error assigning project: " + error.message, "error")
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

