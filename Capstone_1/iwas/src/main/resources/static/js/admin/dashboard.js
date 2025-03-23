document.addEventListener("DOMContentLoaded", () => {
  loadDashboardStats()
  loadActiveProjects()
})

// Load dashboard statistics
function loadDashboardStats() {
  // Load total projects
  fetch("http://localhost:8080/api/projects")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("total-projects").textContent = data.length
    })
    .catch((error) => {
      console.error("Error loading projects:", error)
    })

  // Load total employees
  fetch("http://localhost:8080/api/users/employees")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("total-employees").textContent = data.length
    })
    .catch((error) => {
      console.error("Error loading employees:", error)
    })
}

// Load active projects
function loadActiveProjects() {
  fetch("http://localhost:8080/api/projects/active")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("projects-table-body")
      tableBody.innerHTML = ""

      if (data.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 4
        cell.textContent = "No active projects"
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

        const assignedToCell = document.createElement("td")
        if (project.assignedTo) {
          assignedToCell.textContent = project.assignedTo.name
        } else {
          assignedToCell.textContent = "Not assigned"
        }

        const statusCell = document.createElement("td")
        statusCell.textContent = project.status

        row.appendChild(nameCell)
        row.appendChild(descriptionCell)
        row.appendChild(assignedToCell)
        row.appendChild(statusCell)

        tableBody.appendChild(row)
      })
    })
    .catch((error) => {
      console.error("Error loading active projects:", error)
    })
}

