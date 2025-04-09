document.addEventListener("DOMContentLoaded", () => {
  loadProjects()
  loadSkills()

  // Add project button
  const addProjectBtn = document.getElementById("add-project-btn")
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      const addProjectModal = document.getElementById("add-project-modal")
      if (addProjectModal) {
        addProjectModal.style.display = "block"
      }
    })
  }

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
  const addProjectForm = document.getElementById("add-project-form")
  if (addProjectForm) {
    addProjectForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("project-name").value
      const description = document.getElementById("project-description").value

      addProject(name, description)
    })
  }

  // Edit project form submission
  const editProjectForm = document.getElementById("edit-project-form")
  if (editProjectForm) {
    editProjectForm.addEventListener("submit", (e) => {
      e.preventDefault() // Prevent default form submission
      e.stopPropagation() // Stop event from bubbling up

      const id = document.getElementById("edit-project-id").value
      const name = document.getElementById("edit-project-name").value
      const description = document.getElementById("edit-project-description").value
      const status = document.getElementById("edit-project-status").value

      // First update the project details
      updateProject(id, name, description, status)
        .then(() => {
          // After successfully updating the project, check for any new skills
          const skillSelect = document.getElementById("edit-skill-select")
          if (skillSelect && skillSelect.value) {
            // If there's a selected skill, add it before closing the modal
            return addProjectSkill(id, skillSelect.value)
          }
          return Promise.resolve()
        })
        .then(() => {
          // Close the modal and refresh the projects list
          const editProjectModal = document.getElementById("edit-project-modal")
          if (editProjectModal) {
            editProjectModal.style.display = "none"
          }
          loadProjects()
          showPopupMessage("Project updated successfully")
        })
        .catch((error) => {
          console.error("Error in project update process:", error)
          showPopupMessage("Error updating project: " + error.message, "error")
        })
    })
  }

  // Add skill button
  const addSkillBtn = document.getElementById("add-skill-btn")
  if (addSkillBtn) {
    addSkillBtn.addEventListener("click", () => {
      const skillSelect = document.getElementById("skill-select")
      const projectId = document.getElementById("add-project-form").getAttribute("data-project-id")

      if (!skillSelect || !skillSelect.value) {
        alert("Please select a skill")
        return
      }

      addProjectSkill(projectId, skillSelect.value)
    })
  }

  // Edit add skill button
  const editAddSkillBtn = document.getElementById("edit-add-skill-btn")
  if (editAddSkillBtn) {
    editAddSkillBtn.addEventListener("click", () => {
      const skillSelect = document.getElementById("edit-skill-select")
      const projectId = document.getElementById("edit-project-id").value

      if (!skillSelect || !skillSelect.value) {
        alert("Please select a skill")
        return
      }

      addProjectSkill(projectId, skillSelect.value)
    })
  } else {
    console.warn("Element 'edit-add-skill-btn' not found in the document")
  }

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
      const tabPane = document.getElementById(`${tabId}-tab`)
      if (tabPane) {
        tabPane.classList.add("active")
      }
    })
  })

  // Confirmation modal
  const confirmYesBtn = document.getElementById("confirm-yes")
  const confirmNoBtn = document.getElementById("confirm-no")
  const confirmationModal = document.getElementById("confirmation-modal")

  if (confirmNoBtn && confirmationModal) {
    confirmNoBtn.addEventListener("click", () => {
      confirmationModal.style.display = "none"
    })
  }
})

// Load projects
function loadProjects() {
  // Fetch skills first to create a skill map
  Promise.all([
    fetch("http://localhost:8080/api/skills"),
    fetch("http://localhost:8080/api/projects"),
    fetch("http://localhost:8080/api/project-skills"),
    fetch("http://localhost:8080/api/users")
  ])
    .then(([skillsResponse, projectsResponse, projectSkillsResponse, usersResponse]) =>
      Promise.all([
        skillsResponse.json(),
        projectsResponse.json(),
        projectSkillsResponse.json(),
        usersResponse.json()
      ])
    )
    .then(([skills, projects, projectSkills, users]) => {
      // Create skills map
      const skillMap = skills.reduce((map, skill) => {
        map[skill.id] = skill.name;
        return map;
      }, {});

      const userMap = users.reduce((map, user) => {
        map[user.id] = user.name;
        return map;
      }, {});

      // console.log("User Map:", userMap);
      // Group project skills by project ID
      const projectSkillsMap = projectSkills.reduce((map, ps) => {
        const projectId = ps.project.id;
        const skillId = ps.skill.id;
      
        if (!map[projectId]) {
          map[projectId] = [];
        }
        map[projectId].push(skillId);
        return map;
      }, {});

      const projectAssignedToMap = projects.reduce((map, project) => {
        if (project.assignedTo) {
          map[project.id] = project.assignedTo.id;
        }
        return map;
      }, {});

      console.log("User Map:", projectSkillsMap);

      const tableBody = document.getElementById("projects-table-body");
      if (!tableBody) {
        console.error("Projects table body element not found");
        return;
      }

      tableBody.innerHTML = "";

      if (projects.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 6;
        cell.textContent = "No projects found";
        cell.style.textAlign = "center";
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
      }

      projects.forEach((project) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = project.name;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = project.description;

        const skillsCell = document.createElement("td");

        // Get skills for this specific project
        const projectSkillIds = projectSkillsMap[project.id] || [];

        if (projectSkillIds.length > 0) {
          const skillsList = document.createElement("div");
          skillsList.className = "skills-list";

          // Use unique skill IDs
          const uniqueSkillIds = [...new Set(projectSkillIds)];

          uniqueSkillIds.forEach((skillId, index) => {
            const skillName = skillMap[skillId] || `Skill ${skillId}`;
            const skillBadge = document.createElement("span");
            skillBadge.className = "skill-badge";
            skillBadge.textContent = skillName;
          
            skillsList.appendChild(skillBadge);
          
            // Add a comma if it's NOT the last skill
            if (index < uniqueSkillIds.length - 1) {
              skillsList.appendChild(document.createTextNode(", "));
            }
          });

          skillsCell.appendChild(skillsList);
        } else {
          skillsCell.textContent = "No skills required";
        }

        const assignedToCell = document.createElement("td");
        const projectAssignedToIds = projectAssignedToMap[project.id] || [];
        if(projectAssignedToIds.length > 0) {

        }
        if (project.assignedTo && project.assignedTo.id) {
          const assignedUserName = userMap[project.assignedTo.id];
          console.log("Assigned User Name:", assignedUserName);
          
          assignedToCell.textContent = assignedUserName || "Unknown User";
        } else {
          assignedToCell.textContent = "Not assigned";
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
function loadSkills() {
  fetch("http://localhost:8080/api/skills")
    .then((response) => response.json())
    .then((data) => {
      const editSkillSelect = document.getElementById("edit-skill-select")
      const skillSelect = document.getElementById("skill-select")

      const populateSelect = (selectElement) => {
        if (selectElement) {
          selectElement.innerHTML = "" // Clear existing options
          
          // Add a default "Select a skill" option
          const defaultOption = document.createElement("option")
          defaultOption.value = ""
          defaultOption.textContent = "Select a skill"
          selectElement.appendChild(defaultOption)

          // Add skills
          data.forEach((skill) => {
            const option = document.createElement("option")
            option.value = skill.id
            option.textContent = skill.name
            selectElement.appendChild(option)
          })
        }
      }

      // Populate both select elements
      populateSelect(editSkillSelect)
      populateSelect(skillSelect)
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
      const addProjectForm = document.getElementById("add-project-form")
      if (addProjectForm) {
        addProjectForm.setAttribute("data-project-id", project.id)
      }

      // Add skills to project
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
      const addProjectModal = document.getElementById("add-project-modal")
      if (addProjectModal) {
        addProjectModal.style.display = "none"
      }

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
      const editProjectId = document.getElementById("edit-project-id")
      const editProjectName = document.getElementById("edit-project-name")
      const editProjectDescription = document.getElementById("edit-project-description")
      const editProjectStatus = document.getElementById("edit-project-status")
      
      if (!editProjectId || !editProjectName || !editProjectDescription || !editProjectStatus) {
        console.error("One or more edit project form elements not found")
        return
      }
      
      editProjectId.value = project.id
      editProjectName.value = project.name
      editProjectDescription.value = project.description
      editProjectStatus.value = project.status

      // Load project skills
      const skillsList = document.getElementById("edit-project-skills-list")
      if (!skillsList) {
        console.error("Edit project skills list element not found")
        return
      }
      
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
          
          deleteBtn.addEventListener("click", function(event) {
            event.preventDefault() // Prevent default button behavior
            event.stopPropagation() // Stop event from bubbling up
            
            // Log to confirm function is triggered
            console.log(`Removing skill ${skill.id} from project ${projectId}`)
            
            // Call remove function
            removeProjectSkill(projectId, skill.id)
              .then(() => {
                skillItem.remove()
                
                if (skillsList.children.length === 0) {
                  skillsList.innerHTML = "<p>No skills required</p>"
                }
              })
              .catch(error => {
                console.error("Failed to remove skill:", error)
              })
          })

          skillItem.appendChild(skillName)
          skillItem.appendChild(deleteBtn)
          skillsList.appendChild(skillItem)
        })
      } else {
        skillsList.innerHTML = "<p>No skills required</p>"
      }

      const editProjectModal = document.getElementById("edit-project-modal")
      if (editProjectModal) {
        editProjectModal.style.display = "block"
      }
    })
    .catch((error) => {
      console.error("Error loading project details:", error)
    })
}

// Update project
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
      throw error 
    })
}

// Confirm delete project
function confirmDeleteProject(projectId, projectName) {
  const confirmationModal = document.getElementById("confirmation-modal")
  const confirmationMessage = document.getElementById("confirmation-message")
  const confirmYesBtn = document.getElementById("confirm-yes")
  
  if (!confirmationModal || !confirmationMessage || !confirmYesBtn) {
    console.error("One or more confirmation modal elements not found")
    return
  }

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
      const editProjectModal = document.getElementById("edit-project-modal")
      if (editProjectModal && editProjectModal.style.display === "block") {
        openEditProjectModal(projectId)
      } else {
        // Add skill to the list in the add project modal
        const skillsList = document.getElementById("project-skills-list")
        if (skillsList) {
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
  console.log(`removeProjectSkill called with projectId=${projectId}, skillId=${skillId}`)
  
  return fetch(`http://localhost:8080/api/projects/${projectId}/skills/${skillId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      console.log(`Skill ${skillId} successfully removed from project ${projectId}`)
      return response.text()
    })
    .then(() => {
      // Show success message
      showPopupMessage("Skill removed successfully")
      
      return Promise.resolve()
    })
    .catch((error) => {
      console.error("Error removing skill from project:", error)
      showPopupMessage("Error removing skill from project: " + error.message, "error")
      return Promise.reject(error)
    })
}

// Open assign project modal
function openAssignProjectModal(projectId) {
  const assignProjectModal = document.getElementById("assign-project-modal")
  if (!assignProjectModal) {
    console.error("Assign project modal element not found")
    return
  }

  // Set active tab to suggested
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.classList.remove("active")
  })
  
  const suggestedTab = document.querySelector('[data-tab="suggested"]')
  const suggestedTabPane = document.getElementById("suggested-tab")
  
  if (suggestedTab) {
    suggestedTab.classList.add("active")
  }
  
  if (suggestedTabPane) {
    suggestedTabPane.classList.add("active")
  }

  // Load suggested employees
  Promise.all([
    fetch(`http://localhost:8080/api/projects/${projectId}/suggest`),
    fetch(`http://localhost:8080/api/user-skills`),
    fetch(`http://localhost:8080/api/users`)
  ])
    .then(([suggestedResponse, skillRatingsResponse, usersResponse]) => 
      Promise.all([
        suggestedResponse.json(), 
        skillRatingsResponse.json(),
        usersResponse.json()
      ])
    )
    .then(([employees, userSkills, users]) => {
      // Filter out admin users
      const nonAdminEmployees = employees.filter(employee => 
        !users.find(user => user.id === employee.id && user.role === 'ADMIN')
      )

      const suggestedList = document.getElementById("suggested-employees-list")
      if (!suggestedList) {
        console.error("Suggested employees list element not found")
        return
      }
      
      suggestedList.innerHTML = ""

      if (nonAdminEmployees.length === 0) {
        suggestedList.innerHTML = "<p>No suggested non-admin employees found</p>"
        return
      }

      nonAdminEmployees.forEach((employee) => {
        const employeeItem = document.createElement("div")
        employeeItem.className = "employee-item"

        const employeeInfo = document.createElement("div")
        employeeInfo.className = "employee-info"
        
        // Filter user skills for this employee
        const employeeSkills = userSkills.filter(us => us.userId === employee.id)

        // Create matched skills display with ratings
        const matchedSkillsHtml = employee.transientMatchedSkills
          ? employee.transientMatchedSkills
              .map(skill => {
                // Find the rating for this skill
                const skillRating = employeeSkills.find(us => us.skillId === skill.id)?.rating || 0

                return `
                  <div class="skill-rating-item">
                    <span class="skill-badge">${skill.name}</span>
                    <span class="skill-rating">${skillRating}/10</span>
                  </div>
                `
              })
              .join('')
          : 'No specific skills matched'

        employeeInfo.innerHTML = `
          <h4>${employee.name}</h4>
          <p>${employee.email}</p>
          <div class="matched-skills">
            <strong>Matched Skills:</strong> 
            ${matchedSkillsHtml}
          </div>
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
      if (!employeeSelect) {
        console.error("Employee select element not found")
        return
      }
      
      employeeSelect.innerHTML = ""

      // Filter out admin users
      const nonAdminEmployees = employees.filter(employee => employee.role !== 'ADMIN')

      if (nonAdminEmployees.length === 0) {
        const option = document.createElement("option")
        option.textContent = "No available non-admin employees"
        employeeSelect.appendChild(option)
        return
      }

      nonAdminEmployees.forEach((employee) => {
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
  if (manualAssignBtn) {
    manualAssignBtn.onclick = () => {
      const employeeSelect = document.getElementById("employee-select")
      if (employeeSelect && employeeSelect.value) {
        assignProject(projectId, employeeSelect.value)
      } else {
        showPopupMessage("Please select an employee", "error")
      }
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
      const assignProjectModal = document.getElementById("assign-project-modal")
      if (assignProjectModal) {
        assignProjectModal.style.display = "none"
      }
      
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