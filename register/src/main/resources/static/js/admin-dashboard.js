let ratioChartInstance;
let attendanceChartInstance;
let currentType = "student"; // default

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
// Switch Between Student/Teacher Tab
// =========================
function switchDataTab(type) {
    currentType = type;

    // Highlight the active tab
    document.querySelectorAll('.section-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.${type}-tab`).classList.add('active');

    // Show/Hide tables based on tab
    document.getElementById('teacher-table').style.display = type === 'teacher' ? 'block' : 'none';
    document.getElementById('student-table').style.display = type === 'student' ? 'block' : 'none';

    // Load the respective data
    if (type === 'teacher') loadTeacherTable();
    else loadStudentTable();
}

function showSection(section) {
    const sections = ['dashboard', 'students', 'teachers', 'classes', 'attendance', 'reports', 'settings'];
    sections.forEach(s => {
        const el = document.getElementById(`${s}-section`);
        if (el) el.style.display = s === section ? 'block' : 'none';
    });

    if(section === 'reports') loadReports();

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`.nav-link[onclick="showSection('${section}')"]`)?.classList.add('active');
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

        updateDashboardStats(students, 'student');
    } catch (err) {
        console.error(err);
        alert('Failed to load students');
    }
}

// =========================
// Load Teacher Table
// =========================
async function loadTeacherTable() {
    try {
        const res = await fetch('http://localhost:8080/api/admin/teachers');
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
// Initialize Attendance Chart
// =========================
function initializeAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (!ctx) return;

    attendanceChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Present %', 'Absent %'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#4CAF50', '#f44336']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// =========================
// Initialize Ratio Chart
// =========================
function initializeRatioChart() {
    const ctx = document.getElementById('ratioChart');
    if (!ctx) return;

    ratioChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Students', 'Teachers'],
            datasets: [{ data: [0, 0], backgroundColor: ['#2196F3', '#FFC107'] }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// =========================
// Load Attendance Overview & Stats
// =========================
async function loadAttendanceOverview() {
    try {
        const res = await fetch('http://localhost:8080/api/admin/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const stats = await res.json();

        document.getElementById('totalStudents').innerText = stats.totalStudents || 0;
        document.getElementById('totalTeachers').innerText = stats.totalTeachers || 0;
        document.getElementById('todaysAttendancePercent').innerText = (stats.todaysAttendancePercent || 0) + "%";

        if (attendanceChartInstance) {
            attendanceChartInstance.data.datasets[0].data = [
                stats.todaysAttendancePercent,
                100 - stats.todaysAttendancePercent
            ];
            attendanceChartInstance.update();
        }

        if (ratioChartInstance) {
            ratioChartInstance.data.datasets[0].data = [
                stats.totalStudents || 0,
                stats.totalTeachers || 0
            ];
            ratioChartInstance.update();
        }

    } catch (err) {
        console.error(err);
        alert('Failed to load attendance overview');
    }
}

// =========================
// Update Dashboard Stats
// =========================
function updateDashboardStats(data, type = 'student') {
    if (type === 'student') {
        document.getElementById('totalStudents').innerText = data.length;
        document.getElementById('totalClasses').innerText = [...new Set(data.map(s => s.className))].length;
    } else if (type === 'teacher') {
        document.getElementById('totalTeachers').innerText = data.length;
        document.getElementById('totalClasses').innerText = [...new Set(data.map(t => t.department || 'Unknown'))].length;
    }
}

// =========================
// Open Modal (Teacher/Student)
function openModal(type) {
    document.getElementById('modalTitle').innerText = `Add New ${type === 'student' ? 'Student' : 'Teacher'}`;
    document.getElementById('departmentField').style.display = type === 'teacher' ? 'block' : 'none';
    document.getElementById('classField').style.display = type === 'student' ? 'block' : 'none';
    document.getElementById('addModal').style.display = 'block';
}

// =========================
// Close Modal
// =========================
function closeModal() {
    document.getElementById('addForm').reset();
    document.getElementById('addModal').style.display = 'none';
}

// =========================
// Placeholder View/Edit/Delete
function viewStudent(rollNo) { alert(`View student: ${rollNo}`); }
function editStudent(rollNo) { alert(`Edit student: ${rollNo}`); }
function deleteStudent(rollNo) { alert(`Delete student: ${rollNo}`); }
function viewTeacher(id) { alert(`View teacher: ${id}`); }

// =========================
// Logout
function logout() { window.location.href = '../public/login.html'; }

// =========================
// Initial Load
document.addEventListener("DOMContentLoaded", function () {
    showSection('dashboard');
    initializeAttendanceChart();
    initializeRatioChart();
    loadAttendanceOverview();
    switchDataTab('teacher');
});