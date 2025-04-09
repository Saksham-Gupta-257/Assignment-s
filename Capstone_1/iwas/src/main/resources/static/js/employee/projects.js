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
