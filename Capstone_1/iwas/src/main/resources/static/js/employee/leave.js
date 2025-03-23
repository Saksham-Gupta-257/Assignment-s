document.addEventListener("DOMContentLoaded", () => {
  loadLeaveHistory()

  // Leave request form
  const leaveRequestForm = document.getElementById("leave-request-form")
  leaveRequestForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const type = document.getElementById("leave-type").value
    const fromDate = document.getElementById("from-date").value
    const toDate = document.getElementById("to-date").value
    const description = document.getElementById("description").value

    submitLeaveRequest(type, fromDate, toDate, description)
  })

  // Set min date for date inputs to today
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("from-date").min = today
  document.getElementById("to-date").min = today

  // Ensure to date is not before from date
  document.getElementById("from-date").addEventListener("change", function () {
    document.getElementById("to-date").min = this.value
  })
})

// Load leave history
function loadLeaveHistory() {
  const user = JSON.parse(localStorage.getItem("user"))

  fetch(`http://localhost:8080/api/leave-requests/user/${user.id}`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("leave-history-table-body")
      tableBody.innerHTML = ""

      if (data.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 5
        cell.textContent = "No leave requests found"
        cell.style.textAlign = "center"
        row.appendChild(cell)
        tableBody.appendChild(row)
        return
      }

      // Sort by date (newest first)
      data.sort((a, b) => new Date(b.fromDate) - new Date(a.fromDate))

      data.forEach((request) => {
        const row = document.createElement("tr")

        const typeCell = document.createElement("td")
        typeCell.textContent = formatLeaveType(request.type)

        const fromCell = document.createElement("td")
        fromCell.textContent = new Date(request.fromDate).toLocaleDateString()

        const toCell = document.createElement("td")
        toCell.textContent = new Date(request.toDate).toLocaleDateString()

        const descriptionCell = document.createElement("td")
        descriptionCell.textContent = request.description

        const statusCell = document.createElement("td")
        statusCell.textContent = formatLeaveStatus(request.status)
        statusCell.className = `status-${request.status.toLowerCase()}`

        row.appendChild(typeCell)
        row.appendChild(fromCell)
        row.appendChild(toCell)
        row.appendChild(descriptionCell)
        row.appendChild(statusCell)

        tableBody.appendChild(row)
      })
    })
    .catch((error) => {
      console.error("Error loading leave history:", error)
    })
}

// Submit leave request
function submitLeaveRequest(type, fromDate, toDate, description) {
  const user = JSON.parse(localStorage.getItem("user"))

  fetch("http://localhost:8080/api/leave-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.id,
      type,
      fromDate,
      toDate,
      description,
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
      // Reset form
      document.getElementById("leave-request-form").reset()

      // Reload leave history
      loadLeaveHistory()

      // Show success message
      showPopupMessage("Leave request submitted successfully")
    })
    .catch((error) => {
      console.error("Error submitting leave request:", error)
      showPopupMessage("Error submitting leave request: " + error.message, "error")
    })
}

// Format leave type
function formatLeaveType(type) {
  switch (type) {
    case "SICK":
      return "Sick Leave"
    case "VACATION":
      return "Vacation"
    case "OTHER":
      return "Other"
    default:
      return type
  }
}

// Format leave status
function formatLeaveStatus(status) {
  switch (status) {
    case "PENDING":
      return "Pending"
    case "APPROVED":
      return "Approved"
    case "REJECTED":
      return "Rejected"
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

