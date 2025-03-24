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
      const skillNames = skills.map((skill) => skill.name)
      const skillCounts = []

      const promises = skills.map((skill) => {
        return fetch(`http://localhost:8080/api/users/skills/${skill.id}`)
          .then((response) => response.json())
          .then((users) => {
            skillCounts.push(users.length)
          })
      })

      Promise.all(promises).then(() => {
        createSkillDistributionChart(skillNames, skillCounts)
      })
    })
    .catch((error) => {
      console.error("Error loading skill distribution data:", error)
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
        y: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Skill Distribution Among Employees",
      },
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

