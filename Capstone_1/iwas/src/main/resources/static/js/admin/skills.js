document.addEventListener("DOMContentLoaded", () => {
  loadSkills()

  // Add skill button
  const addSkillBtn = document.getElementById("add-skill-btn")
  const addSkillModal = document.getElementById("add-skill-modal")
  const addSkillForm = document.getElementById("add-skill-form")

  addSkillBtn.addEventListener("click", () => {
    addSkillModal.style.display = "block"
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

  // Add skill form submission
  addSkillForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("skill-name").value

    addSkill(name)
  })

  // Edit skill form submission
  const editSkillForm = document.getElementById("edit-skill-form")
  editSkillForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const id = document.getElementById("edit-skill-id").value
    const name = document.getElementById("edit-skill-name").value

    updateSkill(id, name)
  })

  // Confirmation modal
  const confirmYesBtn = document.getElementById("confirm-yes")
  const confirmNoBtn = document.getElementById("confirm-no")
  const confirmationModal = document.getElementById("confirmation-modal")

  confirmNoBtn.addEventListener("click", () => {
    confirmationModal.style.display = "none"
  })
})

// Load skills
function loadSkills() {
  fetch("http://localhost:8080/api/skills")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("skills-table-body")
      tableBody.innerHTML = ""

      if (data.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 2
        cell.textContent = "No skills found"
        cell.style.textAlign = "center"
        row.appendChild(cell)
        tableBody.appendChild(row)
        return
      }

      data.forEach((skill) => {
        const row = document.createElement("tr")

        const nameCell = document.createElement("td")
        nameCell.textContent = skill.name

        const actionsCell = document.createElement("td")
        actionsCell.className = "actions"

        const editBtn = document.createElement("button")
        editBtn.className = "btn btn-secondary btn-sm"
        editBtn.innerHTML = '<i class="fas fa-edit"></i>'
        editBtn.addEventListener("click", () => {
          openEditSkillModal(skill.id, skill.name)
        })

        const deleteBtn = document.createElement("button")
        deleteBtn.className = "btn btn-danger btn-sm"
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        deleteBtn.addEventListener("click", () => {
          confirmDeleteSkill(skill.id, skill.name)
        })

        actionsCell.appendChild(editBtn)
        actionsCell.appendChild(deleteBtn)

        row.appendChild(nameCell)
        row.appendChild(actionsCell)

        tableBody.appendChild(row)
      })
    })
    .catch((error) => {
      console.error("Error loading skills:", error)
    })
}

// Add skill
function addSkill(name) {
  fetch("http://localhost:8080/api/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
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
      document.getElementById("add-skill-modal").style.display = "none"
      document.getElementById("add-skill-form").reset()
      loadSkills()

      // Show success message
      showPopupMessage("Skill added successfully")
    })
    .catch((error) => {
      console.error("Error adding skill:", error)
      showPopupMessage("Error adding skill: " + error.message, "error")
    })
}

// Open edit skill modal
function openEditSkillModal(id, name) {
  document.getElementById("edit-skill-id").value = id
  document.getElementById("edit-skill-name").value = name
  document.getElementById("edit-skill-modal").style.display = "block"
}

// Update skill
function updateSkill(id, name) {
  fetch(`http://localhost:8080/api/skills/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
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
      document.getElementById("edit-skill-modal").style.display = "none"
      loadSkills()

      // Show success message
      showPopupMessage("Skill updated successfully")
    })
    .catch((error) => {
      console.error("Error updating skill:", error)
      showPopupMessage("Error updating skill: " + error.message, "error")
    })
}

// Confirm delete skill
function confirmDeleteSkill(skillId, skillName) {
  const confirmationModal = document.getElementById("confirmation-modal")
  const confirmationMessage = document.getElementById("confirmation-message")
  const confirmYesBtn = document.getElementById("confirm-yes")

  confirmationMessage.textContent = `Are you sure you want to delete skill "${skillName}"?`
  confirmationModal.style.display = "block"

  confirmYesBtn.onclick = () => {
    deleteSkill(skillId)
    confirmationModal.style.display = "none"
  }
}

// Delete skill
function deleteSkill(skillId) {
  fetch(`http://localhost:8080/api/skills/${skillId}`, {
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
      loadSkills()

      // Show success message
      showPopupMessage("Skill deleted successfully")
    })
    .catch((error) => {
      console.error("Error deleting skill:", error)
      showPopupMessage("Error deleting skill: " + error.message, "error")
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

