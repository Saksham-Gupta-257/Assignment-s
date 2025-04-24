document.addEventListener("DOMContentLoaded", () => {
  loadCurrentProject()

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

      projectCard.appendChild(projectHeader)
      projectCard.appendChild(projectDescription)

      currentProjectContainer.appendChild(projectCard)
    })
    .catch((error) => {
      console.error("Error loading current project:", error)
    })
}
