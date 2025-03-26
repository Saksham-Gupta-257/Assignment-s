document.addEventListener("DOMContentLoaded", () => {
  loadCurrentProject()
  loadAvailableProjects()

  // Tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Remove active class from all buttons and panes
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active")
      })

      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("active")
      })

      // Add active class to clicked button and corresponding pane
      this.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
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
})

// Load current project
function loadCurrentProject() {
  const user = JSON.parse(localStorage.getItem("user"))

  fetch(`http://localhost:8080/api/projects/user/${user.id}`)
    .then((response) => response.json())
    .then((projects) => {
      const currentProjectContainer = document.getElementById("current-project")
      currentProjectContainer.innerHTML = ""

      // Filter for active projects
      const activeProjects = projects.filter((project) => project.status === "ACTIVE")

      if (activeProjects.length === 0) {
        currentProjectContainer.innerHTML = `
                    <div class="empty-state">
                        <h3>No Current Project</h3>
                        <p>You are not assigned to any project at the moment.</p>
                        <p>Check the "Available Projects" tab to see if there are any projects you can apply for.</p>
                    </div>
                `
        return
      }

      // Display the first active project (assuming an employee can only be assigned to one active project)
      const project = activeProjects[0]

      const projectCard = document.createElement("div")
      projectCard.className = "project-detail-card"

      const projectHeader = document.createElement("div")
      projectHeader.className = "project-header"

      const projectTitle = document.createElement("h3")
      projectTitle.textContent = project.name

      const projectStatus = document.createElement("span")
      projectStatus.className = "project-status"
      projectStatus.textContent = project.status

      projectHeader.appendChild(projectTitle)
      projectHeader.appendChild(projectStatus)

      const projectDescription = document.createElement("p")
      projectDescription.className = "project-description"
      projectDescription.textContent = project.description

      const skillsSection = document.createElement("div")
      skillsSection.className = "project-skills-section"

      const skillsTitle = document.createElement("h4")
      skillsTitle.textContent = "Required Skills"

      const skillsList = document.createElement("div")
      skillsList.className = "skills-list"

      if (project.requiredSkills && project.requiredSkills.length > 0) {
        project.requiredSkills.forEach((skill) => {
          const skillBadge = document.createElement("span")
          skillBadge.className = "skill-badge"
          skillBadge.textContent = skill.name
          skillsList.appendChild(skillBadge)
        })
      } else {
        const noSkills = document.createElement("p")
        noSkills.textContent = "No specific skills required"
        skillsList.appendChild(noSkills)
      }

      skillsSection.appendChild(skillsTitle)
      skillsSection.appendChild(skillsList)

      projectCard.appendChild(projectHeader)
      projectCard.appendChild(projectDescription)
      projectCard.appendChild(skillsSection)

      currentProjectContainer.appendChild(projectCard)
    })
    .catch((error) => {
      console.error("Error loading current project:", error)
    })
}

// Load available projects
function loadAvailableProjects() {
  // Fetch skills along with projects
  Promise.all([
    fetch("http://localhost:8080/api/skills"),
    fetch("http://localhost:8080/api/projects/active")
  ])
    .then(([skillsResponse, projectsResponse]) => 
      Promise.all([
        skillsResponse.json(), 
        projectsResponse.json()
      ])
    )
    .then(([skills, projects]) => {
      // Create a skill map for easy lookup
      const skillMap = skills.reduce((map, skill) => {
        map[skill.id] = skill.name;
        return map;
      }, {});

      const availableProjectsContainer = document.getElementById("available-projects")
      availableProjectsContainer.innerHTML = ""

      // Filter for projects that are not assigned to anyone
      const availableProjects = projects.filter((project) => !project.assignedTo)

      if (availableProjects.length === 0) {
        availableProjectsContainer.innerHTML = `
          <div class="empty-state">
            <h3>No Available Projects</h3>
            <p>There are no available projects at the moment.</p>
            <p>Check back later for new opportunities.</p>
          </div>
        `
        return
      }

      availableProjects.forEach((project) => {
        const projectCard = document.createElement("div")
        projectCard.className = "project-card"

        const projectTitle = document.createElement("h3")
        projectTitle.textContent = project.name

        const projectDescription = document.createElement("p")
        projectDescription.textContent = project.description

        const skillsContainer = document.createElement("div")
        skillsContainer.className = "skills"

        // Check if project has skills associated
        if (project.requiredSkills && project.requiredSkills.length > 0) {
          project.requiredSkills.forEach((skill) => {
            const skillBadge = document.createElement("span")
            skillBadge.className = "skill-badge"
            // Use the skill map to get skill name, fallback to skill.name
            skillBadge.textContent = skillMap[skill.id] || skill.name
            skillsContainer.appendChild(skillBadge)
          })
        } else {
          const noSkills = document.createElement("span")
          noSkills.textContent = "No specific skills required"
          skillsContainer.appendChild(noSkills)
        }

        const viewDetailsBtn = document.createElement("button")
        viewDetailsBtn.className = "btn btn-primary"
        viewDetailsBtn.textContent = "View Details"
        viewDetailsBtn.addEventListener("click", () => {
          openProjectDetailsModal(project)
        })

        projectCard.appendChild(projectTitle)
        projectCard.appendChild(projectDescription)
        projectCard.appendChild(skillsContainer)
        projectCard.appendChild(viewDetailsBtn)

        availableProjectsContainer.appendChild(projectCard)
      })
    })
    .catch((error) => {
      console.error("Error loading available projects:", error)
      showPopupMessage("Unable to load projects. Please try again later.", "error")
    })
}

// Open project details modal
function openProjectDetailsModal(project) {
  // Fetch skills to ensure we have the most up-to-date skill names
  fetch("http://localhost:8080/api/skills")
    .then(response => response.json())
    .then(skills => {
      // Create skill map
      const skillMap = skills.reduce((map, skill) => {
        map[skill.id] = skill.name;
        return map;
      }, {});

      document.getElementById("project-name").textContent = project.name
      document.getElementById("project-description").textContent = project.description

      const skillsList = document.getElementById("project-skills-list")
      skillsList.innerHTML = ""

      if (project.requiredSkills && project.requiredSkills.length > 0) {
        project.requiredSkills.forEach((skill) => {
          const skillItem = document.createElement("li")
          // Use the skill map to get skill name, fallback to skill.name
          skillItem.textContent = skillMap[skill.id] || skill.name
          skillsList.appendChild(skillItem)
        })
      } else {
        const noSkills = document.createElement("li")
        noSkills.textContent = "No specific skills required"
        skillsList.appendChild(noSkills)
      }

      const applyBtn = document.getElementById("apply-project-btn")
      applyBtn.onclick = () => {
        applyForProject(project.id)
      }

      document.getElementById("project-details-modal").style.display = "block"
    })
    .catch(error => {
      console.error("Error fetching skills:", error)
      showPopupMessage("Unable to load project details. Please try again.", "error")
    })
}

// Apply for project
function applyForProject(projectId) {
  const user = JSON.parse(localStorage.getItem("user"))

  fetch(`http://localhost:8080/api/projects/${projectId}/apply/${user.id}`, {
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
      document.getElementById("project-details-modal").style.display = "none"

      // Show success message
      showPopupMessage("Application submitted successfully. The admin will review your application.")

      // Reload projects
      loadCurrentProject()
      loadAvailableProjects()
    })
    .catch((error) => {
      console.error("Error applying for project:", error)
      showPopupMessage("Error applying for project: " + error.message, "error")
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
