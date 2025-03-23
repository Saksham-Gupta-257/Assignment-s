// Check if user is logged in
function checkAuth() {
  const currentPath = window.location.pathname

  //console.log("Current path:", currentPath)
  const filename = currentPath.split('/').pop()

  // Skip auth check for login and signup pages
  if (filename === "index.html" || currentPath === "/" || filename === "signup.html" || currentPath.endsWith("/")) {
    console.log("On login/signup page, skipping auth check")
    return
  }

  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) {
    window.location.href = "/Capstone_1/iwas/src/main/resources/static/index.html"
    return
  }

  // Check if user is accessing the correct dashboard
  if (currentPath.includes("/admin/") && user.role !== "ADMIN") {
    window.location.href = "./employee/dashboard.html"
  } else if (currentPath.includes("/employee/") && user.role !== "EMPLOYEE") {
    window.location.href = "./admin/dashboard.html"
  }
}

// Handle login form submission
document.addEventListener("DOMContentLoaded", () => {
  checkAuth()

  // Logout button
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      logout()
    })
  }

  // Login form
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const role = document.getElementById("role").value

      login(email, password, role)
    })
  }

  // Signup form
  const signupForm = document.getElementById("signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value

      if (password !== confirmPassword) {
        showError("signup-error", "Passwords do not match")
        return
      }

      signup(name, email, password)
    })
  }

  // Notification icon
  const notificationIcon = document.getElementById("notification-icon")
  const notificationPopup = document.getElementById("notification-popup")

  if (notificationIcon && notificationPopup) {
    notificationIcon.addEventListener("click", () => {
      if (notificationPopup.style.display === "block") {
        notificationPopup.style.display = "none"
      } else {
        notificationPopup.style.display = "block"
        loadNotifications()
      }
    })

    // Close popup when clicking outside
    document.addEventListener("click", (e) => {
      if (!notificationIcon.contains(e.target) && !notificationPopup.contains(e.target)) {
        notificationPopup.style.display = "none"
      }
    })

    // Mark all as read button
    const markAllReadBtn = document.getElementById("mark-all-read")
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener("click", () => {
        markAllNotificationsAsRead()
      })
    }
  }

  // Load notification count
  if (notificationIcon) {
    loadNotificationCount()
  }
})

// Login function
function login(email, password, role) {
  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.json()
    })
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data))

      if (data.role === "ADMIN") {
        window.location.href = "./admin/dashboard.html"
      } else {
        window.location.href = "./employee/dashboard.html"
      }
    })
    .catch((error) => {
      showError("login-error", error.message)
    })
}

// Signup function
function signup(name, email, password) {
  fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.json()
    })
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data))
      window.location.href = "./employee/dashboard.html"
    })
    .catch((error) => {
      showError("signup-error", error.message)
    })
}

// Logout function
function logout() {
  fetch("http://localhost:8080/api/auth/logout", {
    method: "POST",
  })
    .then(() => {
      localStorage.removeItem("user")
      window.location.href = "/Capstone_1/iwas/src/main/resources/static/index.html"
    })
    .catch((error) => {
      console.error("Logout error:", error)
      localStorage.removeItem("user")
      window.location.href = "/Capstone_1/iwas/src/main/resources/static/index.html"
    })
}

// Show error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.style.display = "block"
  }
}

// Load notifications
function loadNotifications() {
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) return

  fetch(`http://localhost:8080/api/notifications/user/${user.id}`)
    .then((response) => response.json())
    .then((data) => {
      const notificationList = document.getElementById("notification-list")
      notificationList.innerHTML = ""

      if (data.length === 0) {
        notificationList.innerHTML = '<div class="notification-item"><p>No notifications</p></div>'
        return
      }

      data.forEach((notification) => {
        const notificationItem = document.createElement("div")
        notificationItem.className = `notification-item ${notification.isRead ? "" : "unread"}`

        const message = document.createElement("p")
        message.textContent = notification.message

        const time = document.createElement("div")
        time.className = "time"
        time.textContent = new Date(notification.createdAt).toLocaleString()

        notificationItem.appendChild(message)
        notificationItem.appendChild(time)

        notificationItem.addEventListener("click", () => {
          markNotificationAsRead(notification.id)
        })

        notificationList.appendChild(notificationItem)
      })
    })
    .catch((error) => {
      console.error("Error loading notifications:", error)
    })
}

// Load notification count
function loadNotificationCount() {
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) return

  fetch(`http://localhost:8080/api/notifications/user/${user.id}/count`)
    .then((response) => response.json())
    .then((data) => {
      const notificationCount = document.getElementById("notification-count")
      notificationCount.textContent = data.count

      if (data.count > 0) {
        notificationCount.style.display = "flex"
      } else {
        notificationCount.style.display = "none"
      }
    })
    .catch((error) => {
      console.error("Error loading notification count:", error)
    })
}

// Mark notification as read
function markNotificationAsRead(id) {
  fetch(`http://localhost:8080/api/notifications/${id}/read`, {
    method: "POST",
  })
    .then(() => {
      loadNotifications()
      loadNotificationCount()
    })
    .catch((error) => {
      console.error("Error marking notification as read:", error)
    })
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) return

  fetch(`http://localhost:8080/api/notifications/user/${user.id}/read-all`, {
    method: "POST",
  })
    .then(() => {
      loadNotifications()
      loadNotificationCount()
    })
    .catch((error) => {
      console.error("Error marking all notifications as read:", error)
    })
}

