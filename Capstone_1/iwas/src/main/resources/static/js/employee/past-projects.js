document.addEventListener("DOMContentLoaded", () => {
  loadPastProjects()
})

// Load past projects
function loadPastProjects() {
  const user = JSON.parse(localStorage.getItem("user"))

  fetch(`http://localhost:8080/api/projects/user/${user.id}`)
    .then((response) => response.json())
    .then((projects) => {
      const tableBody = document.getElementById("past-projects-table-body")
      tableBody.innerHTML = ""

      // Filter for completed projects
      const pastProjects = projects.filter((project) => project.status === "COMPLETED")

      if (pastProjects.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 3
        cell.textContent = "No past projects found"
        cell.style.textAlign = "center"
        row.appendChild(cell)
        tableBody.appendChild(row)
        return
      }

      pastProjects.forEach((project) => {
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
          skillsCell.textContent = "No specific skills required"
        }

        row.appendChild(nameCell)
        row.appendChild(descriptionCell)
        row.appendChild(skillsCell)

        tableBody.appendChild(row)
      })
    })
    .catch((error) => {
      console.error("Error loading past projects:", error)
    })
}

