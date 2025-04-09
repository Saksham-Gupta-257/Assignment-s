document.addEventListener("DOMContentLoaded", () => {
  loadLeaveRequests()

  // Tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active")
      })

      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("active")
      })

      this.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })
})

// Load leave requests
function loadLeaveRequests() {
  fetch("http://localhost:8080/api/leave-requests")
    .then((response) => response.json())
    .then((data) => {
      const pendingRequests = data.filter((request) => request.status === "PENDING")
      const approvedRequests = data.filter((request) => request.status === "APPROVED")
      const rejectedRequests = data.filter((request) => request.status === "REJECTED")

      // Load pending requests
      const pendingTableBody = document.getElementById("pending-requests-table-body")
      pendingTableBody.innerHTML = ""

      if (pendingRequests.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 6
        cell.textContent = "No pending leave requests"
        cell.style.textAlign = "center"
        row.appendChild(cell)
        pendingTableBody.appendChild(row)
      } else {
        pendingRequests.forEach((request) => {
          const row = createLeaveRequestRow(request, true)
          pendingTableBody.appendChild(row)
        })
      }

      // Load approved requests
      const approvedTableBody = document.getElementById("approved-requests-table-body")
      approvedTableBody.innerHTML = ""

      if (approvedRequests.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 5
        cell.textContent = "No approved leave requests"
        cell.style.textAlign = "center"
        row.appendChild(cell)
        approvedTableBody.appendChild(row)
      } else {
        approvedRequests.forEach((request) => {
          const row = createLeaveRequestRow(request, false)
          approvedTableBody.appendChild(row)
        })
      }

      // Load rejected requests
      const rejectedTableBody = document.getElementById("rejected-requests-table-body")
      rejectedTableBody.innerHTML = ""

      if (rejectedRequests.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 5
        cell.textContent = "No rejected leave requests"
        cell.style.textAlign = "center"
        row.appendChild(cell)
        rejectedTableBody.appendChild(row)
      } else {
        rejectedRequests.forEach((request) => {
          const row = createLeaveRequestRow(request, false)
          rejectedTableBody.appendChild(row)
        })
      }
    })
    .catch((error) => {
      console.error("Error loading leave requests:", error)
    })
}

// Create leave request row
function createLeaveRequestRow(request, includeActions) {
  const row = document.createElement("tr")

  const employeeCell = document.createElement("td")
  employeeCell.textContent = request.user.name

  const typeCell = document.createElement("td")
  typeCell.textContent = request.type

  const fromCell = document.createElement("td")
  fromCell.textContent = new Date(request.fromDate).toLocaleDateString()

  const toCell = document.createElement("td")
  toCell.textContent = new Date(request.toDate).toLocaleDateString()

  const descriptionCell = document.createElement("td")
  descriptionCell.textContent = request.description

  row.appendChild(employeeCell)
  row.appendChild(typeCell)
  row.appendChild(fromCell)
  row.appendChild(toCell)
  row.appendChild(descriptionCell)

  if (includeActions) {
    const actionsCell = document.createElement("td")
    actionsCell.className = "actions"

    const approveBtn = document.createElement("button")
    approveBtn.className = "btn btn-success btn-sm"
    approveBtn.innerHTML = '<i class="fas fa-check"></i>'
    approveBtn.title = "Approve"
    approveBtn.addEventListener("click", () => {
      approveLeaveRequest(request.id)
    })

    const rejectBtn = document.createElement("button")
    rejectBtn.className = "btn btn-danger btn-sm"
    rejectBtn.innerHTML = '<i class="fas fa-times"></i>'
    rejectBtn.title = "Reject"
    rejectBtn.addEventListener("click", () => {
      rejectLeaveRequest(request.id)
    })

    actionsCell.appendChild(approveBtn)
    actionsCell.appendChild(rejectBtn)

    row.appendChild(actionsCell)
  }

  return row
}

// Approve leave request
function approveLeaveRequest(requestId) {
  fetch(`http://localhost:8080/api/leave-requests/${requestId}/approve`, {
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
      loadLeaveRequests()

      // Show success message
      showPopupMessage("Leave request approved successfully")
    })
    .catch((error) => {
      console.error("Error approving leave request:", error)
      showPopupMessage("Error approving leave request: " + error.message, "error")
    })
}

// Reject leave request
function rejectLeaveRequest(requestId) {
  fetch(`http://localhost:8080/api/leave-requests/${requestId}/reject`, {
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
      loadLeaveRequests()

      // Show success message
      showPopupMessage("Leave request rejected successfully")
    })
    .catch((error) => {
      console.error("Error rejecting leave request:", error)
      showPopupMessage("Error rejecting leave request: " + error.message, "error")
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

