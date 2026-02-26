// ----------------- GET LOGGED-IN USER -----------------
const user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
    window.location.href = "public/login.html";

}

// ----------------- UPDATE WELCOME & PROFILE INFO -----------------
document.getElementById("welcomeText").innerText = "Welcome, " + user.name + " 👋";
document.getElementById("profileName").innerText = user.name;
document.getElementById("profileEmail").innerText = user.email;
document.getElementById("profileRoll").innerText = user.rollNo;
document.getElementById("profileClass").innerText = user.className;

// ----------------- FETCH DASHBOARD DATA -----------------
fetch(`http://localhost:8080/api/student/dashboard/${user.id}`)
    .then(res => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
    })
    .then(data => {
        // Update main cards
        document.querySelector(".card.blue p").innerText = data.totalClasses;
        document.querySelector(".card.green p").innerText = data.present;
        document.querySelector(".card.red p").innerText = data.absent;
        document.querySelector(".card.purple p").innerText = data.percentage + "%";
        document.getElementById("attendancePercent").innerText = data.percentage + "%";

        

        // Update Attendance Stats Cards
        const statCards = document.querySelectorAll(".attendance-stats .stat-card");

        // Present
        statCards[0].querySelector(".stat-value").innerText = data.present;
        statCards[0].querySelector(".stat-progress-bar.present").style.width = data.percentage + "%";

        // Absent
        statCards[1].querySelector(".stat-value").innerText = data.absent;
        statCards[1].querySelector(".stat-progress-bar.absent").style.width = (100 - data.percentage) + "%";

        // Load chart
        loadChart(data.present, data.absent);
        
    })
    .catch(err => {
        console.error(err);
        alert("Could not load dashboard data. Please try again later.");
    });

// ----------------- FETCH ATTENDANCE TABLE -----------------
fetch(`http://localhost:8080/api/student/attendance/${user.id}`)
    .then(res => {
        if (!res.ok) throw new Error("Failed to fetch attendance records");
        return res.json();
    })
    .then(records => {
        const tbody = document.querySelector("#attendance table tbody");
        tbody.innerHTML = ""; // clear previous rows

        records.forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${r.date}</td>
                <td>${r.subject}</td>
                <td class="${r.status.toLowerCase()}">${r.status}</td>
            `;
            tbody.appendChild(tr);
        });

        setupFilters(); // initialize filter buttons after loading
    })
    .catch(err => {
        console.error(err);
        alert("Could not load attendance records. Please try again later.");
    });

// ----------------- LOAD CHART -----------------
function loadChart(present, absent) {
    const ctx = document.getElementById("attendanceChart");

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Present", "Absent"],
            datasets: [{
                data: [present, absent],
                backgroundColor: ["#1cc88a", "#e74a3b"],
                borderWidth: 0
            }]
        },
        options: {
            plugins: { legend: { position: "bottom" } },
            cutout: "70%"
        }
    });
}

// ----------------- SECTION SWITCH -----------------
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec =>
        sec.classList.add("hidden")
    );
    document.getElementById(id).classList.remove("hidden");
}

// ----------------- LOGOUT -----------------
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

// ----------------- ATTENDANCE FILTERS -----------------
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.innerText.toLowerCase(); // "all", "present", "absent", "this month"
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            document.querySelectorAll("#attendance table tbody tr").forEach(tr => {
                const status = tr.children[2].innerText.toLowerCase();
                const date = new Date(tr.children[0].innerText);
                const now = new Date();

                if (filter === "all") {
                    tr.style.display = "";
                } else if (filter === "this month") {
                    tr.style.display = (date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()) ? "" : "none";
                } else {
                    tr.style.display = (status === filter) ? "" : "none";
                }
            });
        });
    });
}


fetch("http://localhost:8080/api/settings")
.then(res => res.json())
.then(setting => {

    const threshold = setting.attendanceThreshold;

    if (data.percentage < threshold) {
        document.querySelector(".card.purple p").style.color = "red";
        document.getElementById("attendancePercent").style.color = "red";
    } else {
        document.querySelector(".card.purple p").style.color = "green";
        document.getElementById("attendancePercent").style.color = "green";
    }
});



async function checkAttendanceStatus() {
    try {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const studentId = user.id;

        const response = await fetch(`http://localhost:8080/api/attendance/check/${studentId}`);
        const message = await response.text();

        showAttendanceNotification(message);

    } catch (error) {
        console.error("Error checking attendance:", error);
    }
}
function showAttendanceNotification(message) {

    const notificationDiv = document.getElementById("attendanceAlert");

    notificationDiv.innerText = message;

    if (message.includes("Warning")) {
        notificationDiv.style.backgroundColor = "#ffcccc";
        notificationDiv.style.color = "red";
    } else {
        notificationDiv.style.backgroundColor = "#ccffcc";
        notificationDiv.style.color = "green";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    checkAttendanceStatus();
});

const notesList = document.getElementById("notesList");

fetch("http://localhost:8080/api/notes/all")
    .then(res => res.json())
    .then(data => {

        notesList.innerHTML = "";

        data.forEach(note => {

            const noteCard = `
                <div class="note-card">
                    <div>
                        <div class="note-title">${note.fileName}</div>
                        <div class="note-subject">Subject: ${note.subject}</div>
                    </div>
                    <a href="http://localhost:8080/${note.filePath}" 
                       target="_blank" 
                       class="note-btn">
                       📥 Download
                    </a>
                </div>
            `;

            notesList.innerHTML += noteCard;
        });
    });

    // ================== LEAVE SYSTEM ==================

function submitLeave() {

  if (!user || !user.id) {
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
    return;
  }

  const leaveData = {
    studentId: user.id,              // ✅ directly from loggedUser
    studentName: user.name,          // ✅ important for teacher table
    className: user.className,       // ✅ important for teacher table
    fromDate: document.getElementById("fromDate").value,
    toDate: document.getElementById("toDate").value,
    reason: document.getElementById("reason").value
  };

  if (!leaveData.fromDate || !leaveData.toDate || !leaveData.reason) {
    alert("All fields are required!");
    return;
  }

  fetch("http://localhost:8080/api/leave/submit", {   // ✅ corrected (no 'leaves')
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leaveData)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
    //   loadStudentLeaves();
    })
    .catch(err => console.error("Submit error:", err));
}


function loadStudentLeaves() {

  if (!user || !user.id) {
    console.error("User not found");
    return;
  }

  fetch(`http://localhost:8080/api/leave/student/${user.id}`)  // ✅ use user.id
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch leave data");
      return res.json();
    })
    .then(data => {

      const tbody = document.querySelector("#leaveTable tbody");
      tbody.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No Leave Requests</td></tr>`;
        return;
      }

      data.forEach(leave => {
        tbody.innerHTML += `
          <tr>
            <td>${leave.fromDate}</td>
            <td>${leave.toDate}</td>
            <td>${leave.reason}</td>
            <td>${leave.status}</td>
          </tr>
        `;
      });

    })
    .catch(err => console.error("Student load error:", err));
}

document.addEventListener("DOMContentLoaded", function () {
    checkAttendanceStatus();
    loadStudentLeaves();   // ✅ ADD THIS LINE
});