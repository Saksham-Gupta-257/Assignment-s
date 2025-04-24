document.addEventListener("DOMContentLoaded", () => {
  loadPastProjects()
})

function loadPastProjects() {
  const user = JSON.parse(localStorage.getItem("user"))
  
  // Fetch skills along with projects
  Promise.all([
    fetch("http://localhost:8080/api/skills"),
    fetch(`http://localhost:8080/api/projects/user/${user.id}`)
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
        
        // Check if project has skills associated
        if (project.requiredSkills && project.requiredSkills.length > 0) {
          const skillsList = document.createElement("div")
          skillsList.className = "skills-list"

          project.requiredSkills.forEach((skill, index) => {
            const skillBadge = document.createElement("span")
            skillBadge.className = "skill-badge"
            
            skillBadge.textContent = skillMap[skill.id] || skill.name
            skillsList.appendChild(skillBadge)

            // Add a comma if it's NOT the last skill
            if (index < project.requiredSkills.length - 1) {
              skillsList.appendChild(document.createTextNode(", "));
            }
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
      
      // Optional: Show a user-friendly error message
      const tableBody = document.getElementById("past-projects-table-body")
      const row = document.createElement("tr")
      const cell = document.createElement("td")
      cell.colSpan = 3
      cell.textContent = "Unable to load past projects. Please try again later."
      cell.style.textAlign = "center"
      cell.style.color = "red"
      row.appendChild(cell)
      tableBody.appendChild(row)
    })
}