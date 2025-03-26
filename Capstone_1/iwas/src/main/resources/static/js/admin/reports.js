document.addEventListener("DOMContentLoaded", () => {
  loadReports()
})

// Load reports
function loadReports() {
  // Load employee status distribution
  fetch("http://localhost:8080/api/users/employees")
    .then((response) => response.json())
    .then((data) => {
      const inProject = data.filter((employee) => employee.status === "IN_PROJECT").length
      const onLeave = data.filter((employee) => employee.status === "ON_LEAVE").length
      const onBench = data.filter((employee) => employee.status === "ON_BENCH").length

      createEmployeeStatusChart(inProject, onLeave, onBench)
    })
    .catch((error) => {
      console.error("Error loading employee status data:", error)
    })

  // Load skill distribution
  fetch("http://localhost:8080/api/skills")
    .then((response) => response.json())
    .then((skills) => {
      // Fetch user skills data to count unique users per skill
      return fetch("http://localhost:8080/api/user-skills")
        .then((response) => {
          // Check if the response is ok
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((userSkills) => {
          // Process skills and user skills
          const skillStats = skills.map((skill) => {
            // Count unique users for each skill
            const uniqueUsers = new Set(
              userSkills
                .filter((us) => us.skillId === skill.id)
                .map((us) => us.userId)
            ).size

            return {
              name: skill.name,
              userCount: uniqueUsers
            }
          })

          // Separate skill names and counts for chart
          const skillNames = skillStats.map((stat) => stat.name)
          const skillCounts = skillStats.map((stat) => stat.userCount)

          createSkillDistributionChart(skillNames, skillCounts)
        })
    })
    .catch((error) => {
      console.error("Error loading skill distribution data:", error)
      // Optionally, show an error message to the user
      document.getElementById("skill-distribution-chart").innerHTML =
        `<p>Error loading skill distribution: ${error.message}</p>`
    })

  // Load leave requests by type
  fetch("http://localhost:8080/api/leave-requests")
    .then((response) => response.json())
    .then((data) => {
      const sickLeave = data.filter((request) => request.type === "SICK").length
      const vacation = data.filter((request) => request.type === "VACATION").length
      const other = data.filter((request) => request.type === "OTHER").length

      createLeaveTypeChart(sickLeave, vacation, other)
    })
    .catch((error) => {
      console.error("Error loading leave request data:", error)
    })
}

// Create employee status chart
function createEmployeeStatusChart(inProject, onLeave, onBench) {
  const ctx = document.getElementById("employee-status-chart").getContext("2d")

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["In Project", "On Leave", "On Bench"],
      datasets: [
        {
          data: [inProject, onLeave, onBench],
          backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Employee Status Distribution",
      },
    },
  })
}

// Create skill distribution chart
function createSkillDistributionChart(skillNames, skillCounts) {
  const ctx = document.getElementById("skill-distribution-chart").getContext("2d")

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: skillNames,
      datasets: [
        {
          label: "Number of Employees",
          data: skillCounts,
          backgroundColor: "#4caf50",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            precision: 0,
            callback: function(value) {
              // Ensure only whole numbers are displayed
              if (Number.isInteger(value)) {
                return value;
              }
            }
          },
          grid: {
            display: true
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Skill Distribution Among Employees",
        }
      }
    },
  })
}

// Create leave type chart
function createLeaveTypeChart(sickLeave, vacation, other) {
  const ctx = document.getElementById("leave-type-chart").getContext("2d")

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Sick Leave", "Vacation", "Other"],
      datasets: [
        {
          data: [sickLeave, vacation, other],
          backgroundColor: ["#f44336", "#2196f3", "#ff9800"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Leave Requests by Type",
      },
    },
  })
}