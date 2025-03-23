document.addEventListener("DOMContentLoaded", () => {
  loadProfile()
  loadSkills()

  // Edit profile button
  const editProfileBtn = document.getElementById("edit-profile-btn")
  const editProfileModal = document.getElementById("edit-profile-modal")
  const editProfileForm = document.getElementById("edit-profile-form")

  editProfileBtn.addEventListener("click", () => {
    // Populate form with current user data
    const user = JSON.parse(localStorage.getItem("user"))
    document.getElementById("edit-name").value = user.name
    document.getElementById("edit-email").value = user.email
    document.getElementById("edit-password").value = ""

    editProfileModal.style.display = "block"
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

  // Edit profile form submission
  editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem("user"))
    const name = document.getElementById("edit-name").value
    const password = document.getElementById("edit-password").value

    updateProfile(user.id, name, password)
  })

  // Add skill button
  const addSkillBtn = document.getElementById("add-skill-btn")
  const addSkillModal = document.getElementById("add-skill-modal")
  const addSkillForm = document.getElementById("add-skill-form")

  addSkillBtn.addEventListener("click", () => {
    // Load available skills
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

        addSkillModal.style.display = "block"
      })
      .catch((error) => {
        console.error("Error loading skills:", error)
      })
  })

  // Add skill form submission
  addSkillForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem("user"))
    const skillId = document.getElementById("skill-select").value
    const rating = document.getElementById("skill-rating").value

    addUserSkill(user.id, skillId, rating)
  })

  // Edit skill form submission
  const editSkillForm = document.getElementById("edit-skill-form")
  editSkillForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem("user"))
    const skillId = document.getElementById("edit-skill-id").value
    const rating = document.getElementById("edit-skill-rating").value

    updateUserSkill(user.id, skillId, rating)
  })
})

// Load profile
function loadProfile() {
  const user = JSON.parse(localStorage.getItem("user"))

  fetch(`http://localhost:8080/api/users/${user.id}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("profile-name").textContent = data.name
      document.getElementById("profile-email").textContent = data.email
      document.getElementById("profile-status").textContent = formatStatus(data.status)
    })
    .catch((error) => {
      console.error("Error loading profile:", error)
    })
}

// Load skills
function loadSkills() {
  const user = JSON.parse(localStorage.getItem("user"))

  fetch(`http://localhost:8080/api/users/${user.id}`)
    .then((response) => response.json())
    .then((data) => {
      const skillsList = document.getElementById("skills-list")
      skillsList.innerHTML = ""

      if (data.skills && data.skills.length > 0) {
        data.skills.forEach((skill) => {
          const skillItem = document.createElement("div")
          skillItem.className = "skill-item"

          const skillInfo = document.createElement("div")
          skillInfo.innerHTML = `
                        <span class="skill-name">${skill.skillName}</span>
                        <span class="skill-rating">${skill.rating}/10</span>
                    `

          const editBtn = document.createElement("button")
          editBtn.className = "btn btn-secondary btn-sm"
          editBtn.innerHTML = '<i class="fas fa-edit"></i>'
          editBtn.addEventListener("click", () => {
            openEditSkillModal(skill.id, skill.skillName, skill.rating)
          })

          const deleteBtn = document.createElement("button")
          deleteBtn.className = "btn btn-danger btn-sm"
          deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
          deleteBtn.addEventListener("click", () => {
            deleteUserSkill(user.id, skill.id)
          })

          skillItem.appendChild(skillInfo)
          skillItem.appendChild(editBtn)
          skillItem.appendChild(deleteBtn)

          skillsList.appendChild(skillItem)
        })
      } else {
        skillsList.innerHTML = "<p>No skills added yet</p>"
      }
    })
    .catch((error) => {
      console.error("Error loading skills:", error)
    })
}

// Update profile
function updateProfile(userId, name, password) {
  const data = { name }

  if (password) {
    data.password = password
  }

  fetch(`http://localhost:8080/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.json()
    })
    .then((user) => {
      // Update user in local storage
      const currentUser = JSON.parse(localStorage.getItem("user"))
      currentUser.name = user.name
      localStorage.setItem("user", JSON.stringify(currentUser))

      document.getElementById("edit-profile-modal").style.display = "none"
      loadProfile()

      // Show success message
      showPopupMessage("Profile updated successfully")
    })
    .catch((error) => {
      console.error("Error updating profile:", error)
      showPopupMessage("Error updating profile: " + error.message, "error")
    })
}

// Add user skill
function addUserSkill(userId, skillId, rating) {
  fetch(`http://localhost:8080/api/users/${userId}/skills`, {
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
function openEditSkillModal(skillId, skillName, rating) {
  document.getElementById("edit-skill-id").value = skillId
  document.getElementById("edit-skill-name").value = skillName
  document.getElementById("edit-skill-rating").value = rating
  document.getElementById("edit-skill-modal").style.display = "block"
}

// Update user skill
function updateUserSkill(userId, skillId, rating) {
  fetch(`http://localhost:8080/api/users/${userId}/skills/${skillId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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

// Delete user skill
function deleteUserSkill(userId, skillId) {
  fetch(`http://localhost:8080/api/users/${userId}/skills/${skillId}`, {
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

// Format status
function formatStatus(status) {
  switch (status) {
    case "IN_PROJECT":
      return "In Project"
    case "ON_LEAVE":
      return "On Leave"
    case "ON_BENCH":
      return "On Bench"
    default:
      return status
  }
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

