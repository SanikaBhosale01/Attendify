let currentType = "student"; // default
let attendanceChartInstance;

// =========================
// Show Section
// =========================
function showSection(section) {
    const sections = ['dashboard', 'students', 'teachers', 'classes', 'attendance', 'reports', 'settings'];
    sections.forEach(s => {
        const el = document.getElementById(`${s}-section`);
        if (el) el.style.display = s === section ? 'block' : 'none';
    });

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`.nav-link[onclick="showSection('${section}')"]`)?.classList.add('active');
}

// =========================
// Switch Between Student/Teacher View (Admin Only)
// =========================
function switchDataTab(type) {
    currentType = type;
    document.querySelectorAll('.section-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.${type}-tab`).classList.add('active');

    document.getElementById('teacher-table').style.display = type === 'teacher' ? 'block' : 'none';
    document.getElementById('student-table').style.display = type === 'student' ? 'block' : 'none';

    if (type === 'student') loadStudentTable();
    else loadTeacherTable(); // Admin sees teacher table
}

// =========================
// Load Student Table
// =========================
async function loadStudentTable() {
    try {
        const res = await fetch('http://localhost:8080/api/student');
        if (!res.ok) throw new Error('Failed to fetch students');
        const students = await res.json();
        const tbody = document.getElementById('studentTableBody');
        tbody.innerHTML = '';

        if (students.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No students found.</td></tr>`;
            return;
        }

        students.forEach(s => {
            tbody.innerHTML += `
            <tr>
                <td>${s.rollNo}</td>
                <td>${s.name}</td>
                <td>${s.className}</td>
                <td>${s.email}</td>
                <td>--</td>
                <td><span class="status-badge status-active">Active</span></td>
                <td>
                    <button onclick="viewStudent('${s.rollNo}')">View</button>
                    <button onclick="editStudent('${s.rollNo}')">Edit</button>
                    <button onclick="deleteStudent('${s.rollNo}')">Delete</button>
                </td>
            </tr>`;
        });

        updateDashboardStats(students);
    } catch (err) {
        console.error(err);
        alert('Failed to load students');
    }
}

// =========================
// Load Teacher Table (Admin Only)
async function loadTeacherTable() {
    try {
        const res = await fetch('http://localhost:8080/api/admin/teachers'); // Admin endpoint
        if (!res.ok) throw new Error('Failed to fetch teachers');
        const teachers = await res.json();
        const tbody = document.getElementById('teacherTableBody');
        tbody.innerHTML = '';

        if (teachers.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No teachers found.</td></tr>`;
            return;
        }

        teachers.forEach(t => {
            tbody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.name}</td>
                <td>${t.department || '--'}</td>
                <td>${t.email}</td>
                <td>${t.mobilenumber || '--'}</td>
                <td>
                    <button onclick="viewTeacher('${t.id}')">View</button>
                </td>
            </tr>`;
        });

        updateDashboardStats(teachers, 'teacher');
    } catch (err) {
        console.error(err);
        alert('Failed to load teachers');
    }
}

// =========================
// Load Attendance Overview
// =========================
async function loadAttendanceOverview() {
    try {
        const res = await fetch('http://localhost:8080/api/admin/stats');
        if (!res.ok) throw new Error('Failed to fetch attendance stats');

        const stats = await res.json();

        // Assuming you have elements with these IDs in dashboard
        document.getElementById('totalStudents').innerText = stats.totalStudents || 0;
        document.getElementById('totalTeachers').innerText = stats.totalTeachers || 0;
        document.getElementById('todaysAttendancePercent').innerText = stats.todaysAttendancePercent || '0%';

        // Optional: update a chart if you have a canvas
        if (attendanceChartInstance) {
            attendanceChartInstance.data.datasets[0].data = [
                stats.todaysAttendancePercent,
                100 - stats.todaysAttendancePercent
            ];
            attendanceChartInstance.update();
        }

    } catch (err) {
        console.error(err);
        alert('Failed to load attendance overview');
    }
}

// Initial load
showSection('dashboard');
loadAttendanceOverview(); // <-- add this
if (currentType === 'student') loadStudentTable();
else loadTeacherTable();



// =========================
// Update Dashboard Stats
function updateDashboardStats(data, type = 'student') {
    if(type === 'student') {
        document.getElementById('totalStudents').innerText = data.length;
        document.getElementById('totalClasses').innerText = [...new Set(data.map(s => s.className))].length;
    } else if(type === 'teacher') {
        document.getElementById('totalTeachers').innerText = data.length;
        document.getElementById('totalClasses').innerText = [...new Set(data.map(t => t.department))].length;
    }
}

// =========================
// Placeholder View/Edit Functions
function viewStudent(rollNo) { alert(`View student: ${rollNo}`); }
function editStudent(rollNo) { alert(`Edit student: ${rollNo}`); }
function viewTeacher(id) { alert(`View teacher: ${id}`); }

// =========================
// Logout
function logout() { window.location.href = 'login.html'; }

// =========================
// Initial Load (for Admin)
if (currentType === 'student') loadStudentTable();
else loadTeacherTable();
showSection('dashboard');