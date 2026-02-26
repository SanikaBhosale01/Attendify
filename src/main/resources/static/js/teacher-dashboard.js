// ================= BASE CONFIG =================

// Change this when using ngrok
const API_BASE = "https://kia-unogled-lionheartedly.ngrok-free.dev";

let currentQRLink = "";
let countdownInterval = null;

// =============== PERFECT LANGUAGE SYSTEM - 100% WORKING ===============
// Simple translations
const langData = {
  en: {
    Dashboard: "Dashboard",
    "Generate QR": "Generate QR",
    Classes: "Classes",
    Students: "Students",
    "My Profile": "My Profile",
    Reports: "Reports",
    Settings: "Settings",
    Logout: "Logout",
    "Teacher Dashboard": "Teacher Dashboard",
    Welcome: "Welcome",
    Overview: "Overview",
    "Select Class": "Select Class",
    "Select Division": "Select Division",
    "QR Validity Duration": "QR Validity Duration",
    "Generate QR Code": "Generate QR Code",
    finalize: "Finalize",
    "Class List": "Class List",
    "Add New Class": "Add New Class",
    "Student List": "Student List",
    "Add Student": "Add Student",
    "Manual Attendance": "Manual Attendance",
    "Edit Profile": "Edit Profile",
    "Change Password": "Change Password",
    "General Settings": "General Settings",
    "Institute Name": "Institute Name",
    "Time Zone": "Time Zone",
    "Date Format": "Date Format",
    Language: "Language",
    "Save Changes": "Save Changes",
    Reset: "Reset",
    "Clear Form": "Clear Form",
    "Add Class": "Add Class",
    "Full Name": "Full Name",
    "Student ID": "Student ID",
    Email: "Email",
    Phone: "Phone",
    Cancel: "Cancel",
    Save: "Save",
    Present: "Present",
    Absent: "Absent",
    Late: "Late",
    "Load Students": "Load Students",
    "All Classes": "All Classes",
    "All subjects": "All subjects",
    "All Divisions": "All Divisions",
    Status: "Status",
    Remarks: "Remarks",
    "Save Attendance": "Save Attendance",
    Clear: "Clear",
    "Attendance Setting": "Attendance Setting",
    "System Settings": "System Settings",
    "View Leave Requests": "View Leave Requests",
    Security: "Security",
    "Generate Report": "Generate Report",
    "View Report": "View Report",
    "Export Now": "Export Now",
    "Roll No": "Roll No",
    Name: "Name",
    Class: "Class",
    Division: "Division",
    Actions: "Actions",
    View: "View",
    Edit: "Edit",
    Delete: "Delete",
    "Mark Attendance": "Mark Attendance",
    "No students found": "No students found for the selected criteria",
    "Failed to load student list": "Failed to load student list",
    "Please select at least one filter": "Please select at least one filter",
    "Loading students": "Loading students from database...",
    "View Student": "View Student",
    "Edit Student": "Edit Student",
    "Delete Student": "Delete Student",
    "Are you sure you want to delete this student?":
      "Are you sure you want to delete this student?",
    "Student deleted successfully": "Student deleted successfully",
    "Failed to delete student": "Failed to delete student",
    "Student updated successfully": "Student updated successfully",
    "Student added successfully": "Student added successfully",
    "Update Student": "Update Student",
    "Add Student": "Add Student",
  },
  hi: {
    Dashboard: "डैशबोर्ड",
    "Generate QR": "क्यूआर जनरेट करें",
    Classes: "कक्षाएं",
    Students: "छात्र",
    "My Profile": "मेरी प्रोफाइल",
    Reports: "रिपोर्ट्स",
    Settings: "सेटिंग्स",
    Logout: "लॉग आउट",
    "Teacher Dashboard": "शिक्षक डैशबोर्ड",
    Welcome: "स्वागत है",
    Overview: "अवलोकन",
    "Select Class": "कक्षा चुनें",
    "Select Division": "विभाग चुनें",
    "QR Validity Duration": "क्यूआर वैधता अवधि",
    "Generate QR Code": "क्यूआर कोड बनाएं",
    finalize: "अंतिम रूप दें",
    "Class List": "कक्षा सूची",
    "Add New Class": "नई कक्षा जोड़ें",
    "Student List": "छात्र सूची",
    "Add Student": "छात्र जोड़ें",
    "Manual Attendance": "मैन्युअल उपस्थिति",
    "Edit Profile": "प्रोफाइल संपादित करें",
    "Change Password": "पासवर्ड बदलें",
    "General Settings": "सामान्य सेटिंग्स",
    "Institute Name": "संस्थान का नाम",
    "Time Zone": "समय क्षेत्र",
    "Date Format": "दिनांक प्रारूप",
    Language: "भाषा",
    "Save Changes": "बदलाव सहेजें",
    Reset: "रीसेट",
    "Clear Form": "फॉर्म साफ़ करें",
    "Add Class": "कक्षा जोड़ें",
    "Full Name": "पूरा नाम",
    "Student ID": "छात्र आईडी",
    Email: "ईमेल",
    Phone: "फोन",
    Cancel: "रद्द करें",
    Save: "सहेजें",
    Present: "उपस्थित",
    Absent: "अनुपस्थित",
    Late: "विलंब",
    "Load Students": "छात्र लोड करें",
    "All Classes": "सभी कक्षाएं",
    "All subjects": "सभी विषय",
    "All Divisions": "सभी विभाग",
    Status: "स्थिति",
    Remarks: "टिप्पणी",
    "Save Attendance": "उपस्थिति सहेजें",
    Clear: "साफ़ करें",
    "System Settings": "सिस्टम सेटिंग्स",
    "Attendance Settings": "उपस्थिति सेटिंग्स",
    "View Leave Requests": "अवकाश अनुरोध देखें",
    Security: "सुरक्षा",
    "Generate Report": "रिपोर्ट बनाएं",
    "View Report": "रिपोर्ट देखें",
    "Export Now": "अभी एक्सपोर्ट करें",
    "Roll No": "रोल नंबर",
    Name: "नाम",
    Class: "कक्षा",
    Division: "विभाग",
    Actions: "कार्रवाई",
    View: "देखें",
    Edit: "संपादित करें",
    Delete: "हटाएँ",
    "Mark Attendance": "उपस्थिति दर्ज करें",
    "No students found": "चयनित मानदंड के लिए कोई छात्र नहीं मिला",
    "Failed to load student list": "छात्र सूची लोड करने में विफल",
    "Please select at least one filter": "कृपया कम से कम एक फ़िल्टर चुनें",
    "Loading students": "डेटाबेस से छात्र लोड हो रहे हैं...",
    "View Student": "छात्र देखें",
    "Edit Student": "छात्र संपादित करें",
    "Delete Student": "छात्र हटाएँ",
    "Are you sure you want to delete this student?":
      "क्या आप इस छात्र को हटाना चाहते हैं?",
    "Student deleted successfully": "छात्र सफलतापूर्वक हटा दिया गया",
    "Failed to delete student": "छात्र हटाने में विफल",
    "Student updated successfully": "छात्र सफलतापूर्वक अपडेट किया गया",
    "Student added successfully": "छात्र सफलतापूर्वक जोड़ा गया",
    "Update Student": "छात्र अपडेट करें",
    "Add Student": "छात्र जोड़ें",
  },
  mr: {
    Dashboard: "डॅशबोर्ड",
    "Generate QR": "क्यूआर तयार करा",
    Classes: "वर्ग",
    Students: "विद्यार्थी",
    "My Profile": "माझे प्रोफाइल",
    Reports: "अहवाल",
    Settings: "सेटिंग्ज",
    Logout: "लॉग आउट",
    "Teacher Dashboard": "शिक्षक डॅशबोर्ड",
    Welcome: "स्वागत आहे",
    Overview: "विहंगावलोकन",
    "Select Class": "वर्ग निवडा",
    "Select Division": "विभाग निवडा",
    "QR Validity Duration": "क्यूआर वैधता कालावधी",
    "Generate QR Code": "क्यूआर कोड तयार करा",
    finalize: "अंतिम करा",
    "Class List": "वर्ग यादी",
    "Add New Class": "नवीन वर्ग जोडा",
    "Student List": "विद्यार्थी यादी",
    "Add Student": "विद्यार्थी जोडा",
    "Manual Attendance": "मॅन्युअल उपस्थिती",
    "Edit Profile": "प्रोफाइल संपादित करा",
    "Change Password": "पासवर्ड बदला",
    "General Settings": "सामान्य सेटिंग्ज",
    "Institute Name": "संस्थेचे नाव",
    "Time Zone": "वेळ क्षेत्र",
    "Date Format": "दिनांक स्वरूप",
    Language: "भाषा",
    "Save Changes": "बदल जतन करा",
    Reset: "रीसेट",
    "Clear Form": "फॉर्म साफ करा",
    "Add Class": "वर्ग जोडा",
    "Full Name": "पूर्ण नाव",
    "Student ID": "विद्यार्थी आयडी",
    Email: "ईमेल",
    Phone: "फोन",
    Cancel: "रद्द करा",
    Save: "जतन करा",
    Present: "उपस्थित",
    Absent: "अनुपस्थित",
    Late: "उशीर",
    "Load Students": "विद्यार्थी लोड करा",
    "All Classes": "सर्व वर्ग",
    "All subjects": "सर्व विषय",
    "All Divisions": "सर्व विभाग",
    Status: "स्थिती",
    Remarks: "टिप्पणी",
    "Save Attendance": "उपस्थिती जतन करा",
    Clear: "साफ करा",
    "System Settings": "सिस्टम सेटिंग्ज",
    "Attendance Settings": "उपस्थिती सेटिंग्ज",
    "View Leave Requests": "रजा विनंती पहा",
    Notifications: "सूचना",
    Security: "सुरक्षा",
    "Generate Report": "अहवाल तयार करा",
    "View Report": "अहवाल पहा",
    "Export Now": "आता एक्सपोर्ट करा",
    "Roll No": "रोल क्रमांक",
    Name: "नाव",
    Class: "वर्ग",
    Division: "विभाग",
    Actions: "क्रिया",
    View: "पहा",
    Edit: "संपादित करा",
    Delete: "काढा",
    "Mark Attendance": "उपस्थिती नोंदवा",
    "No students found":
      "निवडलेल्या निकषांनुसार कोणतेही विद्यार्थी सापडले नाहीत",
    "Failed to load student list": "विद्यार्थी यादी लोड करण्यात अयशस्वी",
    "Please select at least one filter": "कृपया किमान एक फिल्टर निवडा",
    "Loading students": "डेटाबेसमधून विद्यार्थी लोड होत आहेत...",
    "View Student": "विद्यार्थी पहा",
    "Edit Student": "विद्यार्थी संपादित करा",
    "Delete Student": "विद्यार्थी काढा",
    "Are you sure you want to delete this student?":
      "तुम्हाला हा विद्यार्थी काढायचा आहे का?",
    "Student deleted successfully": "विद्यार्थी यशस्वीरित्या काढला गेला",
    "Failed to delete student": "विद्यार्थी काढण्यात अयशस्वी",
    "Student updated successfully": "विद्यार्थी यशस्वीरित्या अपडेट केला",
    "Student added successfully": "विद्यार्थी यशस्वीरित्या जोडला गेला",
    "Update Student": "विद्यार्थी अपडेट करा",
    "Add Student": "विद्यार्थी जोडा",
  },
};

// ENGLISH VERSION - Store this as the source of truth
const ENGLISH_TEXTS = {};

// Store original English text on page load
function storeEnglishText() {
  // Store all English texts
  const elements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, span, p, a, label, button, th, td, option, legend",
  );
  elements.forEach((el) => {
    if (el.children.length === 0 && el.textContent.trim()) {
      const text = el.textContent.trim();
      // Don't store if it looks like a name placeholder
      if (text && text !== "John Doe" && text !== "JD") {
        el.setAttribute("data-english", text);
      }
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    setupUploadNotes();
    loadUploadedNotes();
  });

  // Store placeholders
  document.querySelectorAll("[placeholder]").forEach((el) => {
    const text = el.getAttribute("placeholder");
    if (text) {
      el.setAttribute("data-english-placeholder", text);
    }
  });
}

// Get saved language or default to English
let currentLang = localStorage.getItem("appLang") || "en";

// SIMPLE TRANSLATION FUNCTION - Uses English as key ALWAYS
function translatePage(lang) {
  // If language is English, restore from data-english
  if (lang === "en") {
    // Restore all elements from data-english
    document.querySelectorAll("[data-english]").forEach((el) => {
      const englishText = el.getAttribute("data-english");
      if (englishText) {
        el.textContent = englishText;
      }
    });

    // Restore placeholders
    document.querySelectorAll("[data-english-placeholder]").forEach((el) => {
      const englishText = el.getAttribute("data-english-placeholder");
      if (englishText) {
        el.setAttribute("placeholder", englishText);
      }
    });

    // Page title
    document.title = "Teacher Dashboard - Smart QR Attendance";

    return;
  }

  // For Hindi/Marathi - use the English text from data-english as key
  document.querySelectorAll("[data-english]").forEach((el) => {
    const englishText = el.getAttribute("data-english");
    if (englishText && langData[lang] && langData[lang][englishText]) {
      el.textContent = langData[lang][englishText];
    }
  });

  // Translate placeholders
  document.querySelectorAll("[data-english-placeholder]").forEach((el) => {
    const englishText = el.getAttribute("data-english-placeholder");
    if (englishText && langData[lang] && langData[lang][englishText]) {
      el.setAttribute("placeholder", langData[lang][englishText]);
    }
  });

  // Page title
  if (langData[lang]["Teacher Dashboard"]) {
    document.title =
      langData[lang]["Teacher Dashboard"] + " - Smart QR Attendance";
  }
}

// Set language function
window.setLanguage = function (lang) {
  if (!langData[lang]) return;

  // Save to localStorage
  localStorage.setItem("appLang", lang);
  currentLang = lang;

  // Update button styles
  const btnEn = document.getElementById("langBtnEn");
  const btnHi = document.getElementById("langBtnHi");
  const btnMr = document.getElementById("langBtnMr");

  if (btnEn)
    btnEn.style.background =
      lang === "en" ? "#4361ee" : "rgba(255,255,255,0.1)";
  if (btnHi)
    btnHi.style.background =
      lang === "hi" ? "#4361ee" : "rgba(255,255,255,0.1)";
  if (btnMr)
    btnMr.style.background =
      lang === "mr" ? "#4361ee" : "rgba(255,255,255,0.1)";

  // Translate page
  translatePage(lang);
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // First, store all English text
  storeEnglishText();

  // Then set language from localStorage
  setTimeout(function () {
    window.setLanguage(currentLang);
  }, 50);
});
// =============== END OF LANGUAGE SYSTEM ===============

// DOM Elements
const navLinks = document.querySelectorAll(".nav-link");
const tabContents = document.querySelectorAll(".tab-content");
const pageTitle = document.getElementById("pageTitle");
let editingClassId = null;
let editingStudentId = null;

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", function () {
  // Check authentication
  const role = localStorage.getItem("role");
  const userData = JSON.parse(localStorage.getItem("loggedUser"));

  // Security check
  if (!userData || role !== "teacher") {
    window.location.href = "index.html";
    return;
  }

  console.log("Teacher Logged In:", userData);

  const name =
    userData.name ||
    userData.fullName ||
    userData.teacherName ||
    userData.username ||
    "Teacher";

  // Update all name elements
  const nameElements = document.querySelectorAll(
    '[id*="TeacherName"], [id*="teacherName"], #headerName',
  );
  nameElements.forEach((element) => {
    element.textContent = name;
  });

  const classTeacherInput = document.getElementById("classTeacher");
  if (classTeacherInput) {
    classTeacherInput.value = name;
  }
  // Update avatar
  const headerAvatar = document.getElementById("headerAvatar");
  if (headerAvatar) {
    const initials = getInitials(name);
    headerAvatar.textContent = initials;
    headerAvatar.style.backgroundColor = stringToColor(name);
  }

  // Initialize date and time
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Setup event listeners
  setupEventListeners();

  // Show initial tab (dashboard)
  showTab("dashboard");

  // Set active nav link
  setActiveNavLink("dashboard");
});

// Get initials for avatar
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Generate color from string
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

// Update date and time
function updateDateTime() {
  const now = new Date();

  // Format date
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateElement = document.getElementById("currentDate");
  if (dateElement) {
    dateElement.textContent = now.toLocaleDateString("en-US", dateOptions);
  }

  // Format time
  const timeElement = document.getElementById("currentTime");
  if (timeElement) {
    timeElement.textContent = now.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}

// Setup event listeners
function setupEventListeners() {
  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const tab = this.getAttribute("data-tab");
      showTab(tab);
      setActiveNavLink(tab);
    });
  });

  // QR Generator
  setupQRGenerator();

  // Classes tab
  setupClassesTab();

  // Students tab
  setupStudentsTab();

  // Teacher Profile
  setupTeacherProfile();

  // Reports
  setupReportsTab();

  loadTeacherSubjectsForNotes();

  // Settings
  setupSettingsTab();
}

// Show specific tab
function showTab(tabName) {
  // Hide all tabs
  tabContents.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected tab
  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.add("active");

    // Update page title
    const tabTitles = {
      dashboard: "Teacher Dashboard",
      "qr-generator": "Generate QR Code",
      classes: "My Classes",
      students: "Student Management",
      "teacher-profile": "My Profile",
      reports: "Attendance Reports",
      settings: "System Settings",
    };

    if (pageTitle) {
      pageTitle.textContent = tabTitles[tabName] || "Dashboard";
    }

    // Load tab-specific content
    loadTabContent(tabName);
  }
}

// Set active navigation link
function setActiveNavLink(tabName) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-tab") === tabName) {
      link.classList.add("active");
    }
  });
}

// Load tab-specific content
function loadTabContent(tabName) {
  switch (tabName) {
    case "dashboard":
      loadDashboardContent();
      break;
    case "qr-generator":
      loadQRGeneratorContent();
      break;
    case "classes":
      loadClassesContent();
      break;
    case "students":
      loadStudentsContent();
      break;
    case "teacher-profile":
      loadTeacherProfileContent();
      break;
    case "reports":
      loadReportsContent();
      break;
    case "settings":
      loadSettingsContent();
      break;
  }
}

// =============== QR GENERATOR WITH NGROK INTEGRATION ===============
// Setup QR Generator functionality
function setupQRGenerator() {
  const generateQRBtn = document.getElementById("generateQRBtn");
  const qrDisplay = document.getElementById("qrDisplay");

  if (generateQRBtn) {
    generateQRBtn.addEventListener("click", function () {
      const classSelect = document.getElementById("classSelect");
      const divisionSelect = document.getElementById("divisionSelect");
      const durationSelect = document.getElementById("durationSelect");

      const selectedClass = classSelect.value;
      const selectedDivision = divisionSelect.value;
      const duration = parseInt(durationSelect.value);

      if (!selectedClass || !selectedDivision) {
        alert("Please select both class and division");
        return;
      }

      // Show QR display
      if (qrDisplay) {
        qrDisplay.style.display = "flex";

        // Update QR info
        const classText = classSelect.options[classSelect.selectedIndex].text;
        document.getElementById("qrClassInfo").textContent =
          `${classText} - Division ${selectedDivision}`;

        // Update teacher name
        const teacherName = document.getElementById("headerName").textContent;
        document.getElementById("qrTeacherName").textContent = teacherName;

        // Update timestamp
        const now = new Date();
        document.getElementById("qrTimestamp").textContent =
          `Today, ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

        // Update timer text
        document.getElementById("qrTimerText").textContent =
          `${duration} minutes`;

        // Generate QR code
        generateQRCode(selectedClass, selectedDivision, duration);
      }
    });
  }
}

// Generate QR code with
function generateQRCode(className, division, duration) {
  const qrImage = document.getElementById("qrImage");
  const qrTimer = document.getElementById("qrTimer");
  const teacherName = document.getElementById("headerName").textContent.trim();
  const timestamp = Date.now();

  // Automatically detect domain (localhost OR ngrok)
  const baseUrl = window.location.origin;

  // Build actual attendance URL
  currentQRLink =
    `${API_BASE}/student-attendance.html` +
    `?class=${encodeURIComponent(className)}` +
    `&division=${encodeURIComponent(division)}` +
    `&teacher=${encodeURIComponent(teacherName)}` +
    `&ts=${timestamp}`;

  // Generate QR image
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentQRLink)}`;

  // Clear old timer
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  startCountdown(duration * 60, qrTimer);

  addShareButtons();
}

// Start countdown timer
function startCountdown(seconds, timerElement) {
  let timeLeft = seconds;

  // Clear any existing timer
  if (window.qrTimerInterval) {
    clearInterval(window.qrTimerInterval);
  }

  window.qrTimerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(window.qrTimerInterval);
      timerElement.textContent = "00:00";

      // Show expired message
      const qrDisplay = document.getElementById("qrDisplay");
      if (qrDisplay) {
        // Remove existing expired message if any
        const existingMsg = qrDisplay.querySelector(".expired-message");
        if (existingMsg) existingMsg.remove();

        const expiredMsg = document.createElement("div");
        expiredMsg.className = "expired-message";
        expiredMsg.innerHTML =
          '<i class="fas fa-exclamation-circle"></i> QR Code has expired!';
        qrDisplay.appendChild(expiredMsg);
      }

      return;
    }

    const minutes = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    timeLeft--;
  }, 1000);
}

// Add share buttons
function addShareButtons() {
  const qrDisplay = document.getElementById("qrDisplay");
  if (!qrDisplay) return;

  // Remove existing share buttons
  const existingShare = qrDisplay.querySelector(".share-buttons");
  if (existingShare) {
    existingShare.remove();
  }

  // Remove existing expired message if any
  const existingMsg = qrDisplay.querySelector(".expired-message");
  if (existingMsg) {
    existingMsg.remove();
  }

  // Create share buttons container
  const shareButtons = document.createElement("div");
  shareButtons.className = "share-buttons";
  shareButtons.innerHTML = `
        <h4>Share QR Code:</h4>
        <div class="share-options">
            <button class="btn btn-whatsapp" id="shareWhatsAppBtn">
                <i class="fab fa-whatsapp"></i> Share to WhatsApp
            </button>
            <button class="btn btn-secondary" id="downloadQRBtn">
                <i class="fas fa-download"></i> Download QR
            </button>
            <button class="btn btn-secondary" id="copyQRBtn">
                <i class="fas fa-copy"></i> Copy QR Link
            </button>
        </div>
    `;

  qrDisplay.appendChild(shareButtons);

  // Add event listeners to share buttons
  document
    .getElementById("shareWhatsAppBtn")
    ?.addEventListener("click", shareToWhatsApp);
  document
    .getElementById("downloadQRBtn")
    ?.addEventListener("click", downloadQRCode);
  document.getElementById("copyQRBtn")?.addEventListener("click", copyQRCode);
}

// Share to WhatsApp
function shareToWhatsApp() {
  const classInfo = document.getElementById("qrClassInfo").textContent;
  const teacherName = document.getElementById("qrTeacherName").textContent;
  const duration = document.getElementById("qrTimerText").textContent;

  const message =
    `📱 Attendance QR Code\n\n` +
    `📚 ${classInfo}\n` +
    `👨‍🏫 Teacher: ${teacherName}\n\n` +
    `🔗 Open Attendance Link:\n${currentQRLink}\n\n` +
    `⏰ Valid for: ${duration}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}

// Download QR code
function downloadQRCode() {
  const qrImage = document.getElementById("qrImage");
  const classInfo = document
    .getElementById("qrClassInfo")
    .textContent.replace(/[^a-zA-Z0-9]/g, "_");

  // Create temporary link
  const link = document.createElement("a");
  link.href = qrImage.src;
  link.download = `QR_Attendance_${classInfo}_${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("QR Code downloaded successfully!");
}

// Copy QR code URL
function copyQRCode() {
  if (!currentQRLink) {
    alert("QR not generated yet!");
    return;
  }

  navigator.clipboard
    .writeText(currentQRLink)
    .then(() => {
      alert("Attendance link copied successfully!");
    })
    .catch(() => {
      alert("Failed to copy link.");
    });
}
// =============== END QR GENERATOR ===============

// ================= INITIALIZE CLASSES TAB =================
document.addEventListener("DOMContentLoaded", function () {
  setupClassesTab(); // Important: initialize class tab logic

  // ================= FIX: Auto Load Class List When Sidebar Clicked =================
  const classesSidebarLink = document.querySelector(
    '.nav-link[data-tab="classes"]',
  );

  if (classesSidebarLink) {
    classesSidebarLink.addEventListener("click", function () {
      setTimeout(() => {
        // Activate Class List tab
        const classTabs = document.querySelectorAll("#classes-tab .tab");
        classTabs.forEach((t) => t.classList.remove("active"));

        const classListTab = document.querySelector(
          '#classes-tab .tab[data-subtab="class-list"]',
        );
        if (classListTab) classListTab.classList.add("active");

        // Activate Class List content
        const subContents = document.querySelectorAll(
          "#classes-tab .tab-content",
        );
        subContents.forEach((tc) => tc.classList.remove("active"));

        const classListContent = document.getElementById("class-list-subtab");
        if (classListContent) classListContent.classList.add("active");

        // Ensure container exists
        ensureClassesContainer();

        // Load classes immediately
        if (typeof loadClassesContent === "function") {
          console.log("Loading classes from sidebar click");
          loadClassesContent();
        }
      }, 100);
    });
  }
});

// ================= SETUP CLASSES TAB =================
function setupClassesTab() {
  const classTabs = document.querySelectorAll("#classes-tab .tab");

  classTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const subtab = this.getAttribute("data-subtab");

      let subtabId;
      if (subtab === "class-list") {
        subtabId = "class-list-subtab";
      } else if (subtab === "add-class") {
        subtabId = "add-class-subtab";
      }

      if (subtabId) {
        showSubTab("classes-tab", subtabId);
      }

      // Update active class tab
      classTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // If class-list subtab is clicked, load classes
      if (subtab === "class-list") {
        setTimeout(() => {
          ensureClassesContainer();
          if (typeof loadClassesContent === "function") {
            console.log("Loading classes from subtab click");
            loadClassesContent();
          }
        }, 150);
      }
    });
  });

  // Add click handler for Add New Class button
  const addNewClassBtn = document.getElementById("addNewClassBtn");
  if (addNewClassBtn) {
    addNewClassBtn.addEventListener("click", function () {
      const addClassTab = document.querySelector(
        '#classes-tab .tab[data-subtab="add-class"]',
      );
      if (addClassTab) {
        addClassTab.click();
      }
    });
  }

  // ================= ADD OR UPDATE CLASS =================
  function addOrUpdateClass() {
    const teacherName = document.getElementById("headerName").textContent;

    const data = {
      className: document.getElementById("className").value,
      subject: document.getElementById("subjectName").value,
      schedule: document.getElementById("classSchedule").value,
      room: document.getElementById("classRoom").value,
      divisions: [
        ...document.querySelectorAll('input[name="divisions"]:checked'),
      ]
        .map((cb) => cb.value)
        .join(","),
      teacherName: teacherName,
      description: document.getElementById("classDescription").value,
    };

    const url = editingClassId
      ? `http://localhost:8080/api/classes/update/${editingClassId}`
      : `http://localhost:8080/api/classes/add`;

    const method = editingClassId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Save failed");
        return res.json();
      })
      .then(() => {
        alert(editingClassId ? "✅ Class updated" : "✅ Class added");

        document.getElementById("addClassForm").reset();
        editingClassId = null;

        document.querySelector(
          '#addClassForm button[type="submit"]',
        ).textContent = "Add Class";

        loadClassesContent();
        loadDashboardContent();

        // Switch to class list tab after successful save
        setTimeout(() => {
          const classListTab = document.querySelector(
            '#classes-tab .tab[data-subtab="class-list"]',
          );
          if (classListTab) {
            classListTab.click();
          }
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Operation failed");
      });
  }

  // Add class form submission
  const addClassForm = document.getElementById("addClassForm");
  if (addClassForm) {
    addClassForm.addEventListener("submit", function (e) {
      e.preventDefault();
      addOrUpdateClass();
    });
  }
}

// ================= SHOW SUBTAB =================
function showSubTab(parentTabId, subtabId) {
  const parentTab = document.getElementById(parentTabId);
  const subtabs = parentTab.querySelectorAll(".tab-content");

  subtabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const selectedSubtab = document.getElementById(subtabId);
  if (selectedSubtab) {
    selectedSubtab.classList.add("active");
  }
}

// ================= ENSURE CLASS CONTAINER =================
function ensureClassesContainer() {
  const classListSubtab = document.getElementById("class-list-subtab");

  if (classListSubtab) {
    if (!document.getElementById("classesContainer")) {
      console.log("Creating classes container in class-list-subtab");

      const container = document.createElement("div");
      container.id = "classesContainer";
      container.className = "classes-container";

      classListSubtab.appendChild(container);
    }
  }
}

// ------------------ AUTO TRANSLATION WRAPPER ------------------

// Keep reference if function already exists
const originalLoadStudentsForSelectedClass =
  window.loadStudentsForSelectedClass;

window.loadStudentsForSelectedClass = function () {
  if (originalLoadStudentsForSelectedClass) {
    originalLoadStudentsForSelectedClass.apply(this, arguments);
  }

  setTimeout(function () {
    if (typeof storeEnglishText === "function") storeEnglishText();
    if (typeof translatePage === "function") translatePage(currentLang);
  }, 100);
};

// -------------------View Students list--------------------

document.addEventListener("DOMContentLoaded", function () {
  // ================= GLOBAL STORAGE =================
  let allStudents = [];

  // ================= SIDEBAR NAVIGATION =================
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const tabName = this.dataset.tab;

      // Remove active from sidebar
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Hide all main tabs
      document.querySelectorAll(".tab-content").forEach((tab) => {
        tab.classList.remove("active");
      });

      // Show selected main tab
      const mainTab = document.getElementById(tabName + "-tab");
      if (mainTab) {
        mainTab.classList.add("active");
      }

      // ================= STUDENTS SPECIAL =================
      if (tabName === "students") {
        document
          .querySelectorAll("#students-tab .tab")
          .forEach((t) => t.classList.remove("active"));

        document
          .querySelectorAll("#students-tab .tab-content")
          .forEach((tc) => tc.classList.remove("active"));

        const studentListTab = document.querySelector(
          '[data-subtab="student-list"]',
        );
        const studentListContent = document.getElementById(
          "student-list-subtab",
        );

        if (studentListTab) studentListTab.classList.add("active");
        if (studentListContent) studentListContent.classList.add("active");

        loadStudentsContent();
      }
    });
  });

  // ================= SUBTAB SWITCH =================
  document.querySelectorAll("#students-tab .tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      const subtabName = this.dataset.subtab;

      document
        .querySelectorAll("#students-tab .tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll("#students-tab .tab-content")
        .forEach((tc) => tc.classList.remove("active"));

      this.classList.add("active");

      const subtabContent = document.getElementById(subtabName + "-subtab");
      if (subtabContent) {
        subtabContent.classList.add("active");
      }

      if (subtabName === "student-list") {
        loadStudentsContent();
      }
    });
  });

  // ================= LOAD STUDENTS =================
  function loadStudentsContent() {
    console.log("Loading student list...");

    fetch("http://localhost:8080/api/attendance/teacher/student-list")
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => parseInt(a.rollNo) - parseInt(b.rollNo));
        allStudents = data;

        renderStudents(allStudents);
      })
      .catch((err) => {
        console.error("Error loading students:", err);
      });
  }

  // ================= RENDER TABLE =================
  function renderStudents(studentList) {
    const tbody = document.getElementById("studentTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (studentList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No students found</td></tr>`;
      return;
    }

    studentList.forEach((s) => {
      tbody.innerHTML += `
                <tr>
                    <td>${s.rollNo}</td>
                    <td>${s.name}</td>
                    <td>${s.className}</td>
                    <td>${s.subject || "-"}</td>
                    <td>${s.status || "-"}</td>
                </tr>
            `;
    });
  }

  // ================= SEARCH =================
  const searchInput = document.getElementById("searchStudent");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();

      const filteredStudents = allStudents.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(searchValue)) ||
          (s.rollNo && s.rollNo.toLowerCase().includes(searchValue)) ||
          (s.className && s.className.toLowerCase().includes(searchValue)) ||
          (s.subject && s.subject.toLowerCase().includes(searchValue)),
      );

      renderStudents(filteredStudents);
    });
  }
});

// =============== SIMPLIFIED STUDENT TAB SETUP ===============
function setupStudentsTab() {
  const studentTabs = document.querySelectorAll("#students-tab .tab");
  studentTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const subtab = this.getAttribute("data-subtab");

      // Fix: Use the correct subtab ID based on data-subtab
      let subtabId;
      if (subtab === "student-list") {
        subtabId = "student-list-subtab";
      } else if (subtab === "add-student") {
        subtabId = "add-student-subtab";
      } else if (subtab === "manual-attendance") {
        subtabId = "manual-attendance-subtab";
      }

      if (subtabId) {
        showSubTab("students-tab", subtabId);
      }

      studentTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const addStudentBtn = document.getElementById("addStudentBtn");
  if (addStudentBtn) {
    addStudentBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showSubTab("students-tab", "add-student-subtab");
    });
  }

  const addStudentForm = document.getElementById("addStudentForm");
  if (addStudentForm) {
    addStudentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      addNewStudent();
    });
  }

  const manualAttendanceForm = document.getElementById("manualAttendanceForm");
  if (manualAttendanceForm) {
    manualAttendanceForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveManualAttendance();
    });
  }
}

// Simple add new student function
function addNewStudent() {
  const name = document.getElementById("newStudentName").value;
  const studentId = document.getElementById("newStudentId").value;
  const studentClass = document.getElementById("newStudentClass").value;
  const division = document.getElementById("newStudentDivision")?.value || "A";
  const email = document.getElementById("newStudentEmail").value;
  const phone = document.getElementById("newStudentPhone").value;
  const address = document.getElementById("newStudentAddress")?.value || "";

  if (!name || !studentId || !studentClass) {
    alert("Please fill all required fields");
    return;
  }

  // Here you would typically send this data to your backend
  console.log("Adding student:", {
    name,
    studentId,
    studentClass,
    division,
    email,
    phone,
    address,
  });

  alert(`Student ${name} added successfully! (Demo mode)`);
  document.getElementById("addStudentForm").reset();
  showSubTab("students-tab", "student-list-subtab");
}

// Simple save manual attendance function
function saveManualAttendance() {
  const studentId = document.getElementById("manualStudentId").value;
  const studentClass = document.getElementById("manualClassSelect").value;
  const division = document.getElementById("manualDivisionSelect").value;
  const status = document.getElementById("attendanceStatusSelect").value;
  const remarks = document.getElementById("attendanceRemarks").value;

  if (!studentId || !studentClass || !division) {
    alert("Please fill all required fields");
    return;
  }

  // Here you would typically send this data to your backend
  console.log("Saving attendance:", {
    studentId,
    studentClass,
    division,
    status,
    remarks,
  });

  alert(
    `Attendance marked successfully for Student ID: ${studentId} (Demo mode)`,
  );
  document.getElementById("manualAttendanceForm").reset();
}

// Setup Teacher Profile
function setupTeacherProfile() {
  const editProfileBtn = document.getElementById("editTeacherProfileBtn");
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", function () {
      openEditProfileModal();
    });
  }
}

// =============== FIX FOR TEACHER NAME OVERWRITE ===============
// Store teacher name separately
let teacherName = "";

// Override the setLanguage function to preserve teacher name
const originalSetLanguage = window.setLanguage;

window.setLanguage = function (lang) {
  // Get current teacher name before translation
  const nameElement = document.getElementById("headerName");
  const currentTeacherName = nameElement ? nameElement.textContent : "";

  // Call original translation
  originalSetLanguage(lang);

  // Restore teacher name
  if (nameElement && currentTeacherName && currentTeacherName !== "John Doe") {
    nameElement.textContent = currentTeacherName;

    // Update data-english attribute with correct name
    nameElement.setAttribute("data-english", currentTeacherName);
  }

  // Update welcome teacher name
  const welcomeName = document.getElementById("welcomeTeacherName");
  if (welcomeName && currentTeacherName) {
    welcomeName.textContent = currentTeacherName;
  }

  // Update avatar
  const headerAvatar = document.getElementById("headerAvatar");
  if (headerAvatar && currentTeacherName) {
    const initials = getInitials(currentTeacherName);
    headerAvatar.textContent = initials;
    headerAvatar.style.backgroundColor = stringToColor(currentTeacherName);
  }
};

// Fix for loadTeacherProfileContent function
function loadTeacherProfileContent() {
  const userData = JSON.parse(localStorage.getItem("loggedUser"));

  if (!userData?.email) {
    console.error("No user email found in localStorage");
    return;
  }

  fetch(
    `http://localhost:8080/api/teachers/${encodeURIComponent(userData.email)}`,
  )
    .then((res) => res.json())
    .then((t) => {
      // Store teacher name globally
      teacherName = t.name || "Teacher";

      // ===== HEADER SAFE UPDATE =====
      const headerName = document.getElementById("headerName");
      if (headerName) {
        headerName.textContent = teacherName;
        // Update data-english attribute
        headerName.setAttribute("data-english", teacherName);
      }

      const headerRole = document.getElementById("headerRole");
      if (headerRole) headerRole.textContent = "Teacher";

      const headerAvatar = document.getElementById("headerAvatar");
      if (headerAvatar) {
        const initials = getInitials(teacherName);
        headerAvatar.textContent = initials;
        headerAvatar.style.backgroundColor = stringToColor(teacherName);
        // Update data-english attribute
        headerAvatar.setAttribute("data-english", initials);
      }

      // ===== WELCOME NAME =====
      const welcomeName = document.getElementById("welcomeTeacherName");
      if (welcomeName) {
        welcomeName.textContent = teacherName;
        welcomeName.setAttribute("data-english", teacherName);
      }

      // ===== PROFILE CARD SAFE UPDATE =====
      const nameEl = document.getElementById("teacherName");
      if (nameEl) {
        nameEl.textContent = teacherName;
        nameEl.setAttribute("data-english", teacherName);
      }

      const emailEl = document.getElementById("teacherEmail");
      if (emailEl) {
        emailEl.textContent = t.email || "-";
        emailEl.setAttribute("data-english", t.email || "-");
      }

      const phoneEl = document.getElementById("teacherPhone");
      if (phoneEl) {
        phoneEl.textContent = t.mobilenumber || "-";
        phoneEl.setAttribute("data-english", t.mobilenumber || "-");
      }

      const deptEl = document.getElementById("teacherDepartment");
      if (deptEl) {
        deptEl.textContent = t.department || "-";
        deptEl.setAttribute("data-english", t.department || "-");
      }

      // ===== PROFILE AVATAR =====
      const profileAvatar = document.getElementById("teacherAvatar");
      if (profileAvatar) {
        const initials = getInitials(teacherName);
        profileAvatar.textContent = initials;
        profileAvatar.style.backgroundColor = stringToColor(teacherName);
        profileAvatar.setAttribute("data-english", initials);
      }

      // ===== ACCOUNT SETTINGS =====
      const accName = document.getElementById("accountTeacherName");
      if (accName) accName.value = teacherName || "";

      const accEmail = document.getElementById("accountTeacherEmail");
      if (accEmail) accEmail.value = t.email || "";

      const accPhone = document.getElementById("accountTeacherPhone");
      if (accPhone) accPhone.value = t.mobilenumber || "";

      const accDept = document.getElementById("accountDepartment");
      if (accDept) accDept.value = t.department || "";

      // ===== EDIT MODAL =====
      const editName = document.getElementById("editTeacherName");
      if (editName) editName.value = teacherName || "";

      const editEmail = document.getElementById("editTeacherEmail");
      if (editEmail) editEmail.value = t.email || "";

      const editPhone = document.getElementById("editTeacherPhone");
      if (editPhone) editPhone.value = t.mobilenumber || "";

      const editDept = document.getElementById("editTeacherDepartment");
      if (editDept) editDept.value = t.department || "";
    })
    .catch((err) => console.error("Profile load error:", err));
}

// Setup Reports Tab
function setupReportsTab() {
  const generateReportBtn = document.getElementById("generateReportBtn");
  if (generateReportBtn) {
    generateReportBtn.addEventListener("click", function () {
      generateReport();
    });
  }
}

// Setup Settings Tab
function setupSettingsTab() {
  // Settings menu items
  const settingsItems = document.querySelectorAll(".settings-item");
  settingsItems.forEach((item) => {
    item.addEventListener("click", function () {
      const settingsType = this.getAttribute("data-settings");
      showSettingsSection(settingsType);

      // Update active item
      settingsItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Initialize security settings
  setupSecuritySettings();
}

// Show settings section
function showSettingsSection(settingsType) {
  const sections = document.querySelectorAll(".settings-section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const selectedSection = document.getElementById(`${settingsType}-settings`);
  if (selectedSection) {
    selectedSection.classList.add("active");

    // Update login display when security tab is shown
    if (settingsType === "security") {
      setTimeout(() => {
        updateLoginDisplay();
      }, 100);
    }
  }
}

// =============== SECURITY SETTINGS PASSWORD FUNCTIONALITY ===============

// Track login history
let loginHistory = {
  lastLogin: null,
  lastIP: null,
  lastDevice: null,
};

// Initialize login tracking
function initLoginTracking() {
  // Get stored login history or create new
  const stored = localStorage.getItem("loginHistory");
  if (stored) {
    loginHistory = JSON.parse(stored);
  } else {
    // First time login - capture current info
    captureLoginInfo();
  }

  // Update display
  updateLoginDisplay();
}

// Capture login information
function captureLoginInfo() {
  const now = new Date();
  loginHistory.lastLogin = now.toISOString();

  // Get device info
  const userAgent = navigator.userAgent;
  let device = "Unknown";

  if (userAgent.indexOf("Windows") !== -1) device = "Windows";
  else if (userAgent.indexOf("Mac") !== -1) device = "macOS";
  else if (userAgent.indexOf("Linux") !== -1) device = "Linux";
  else if (userAgent.indexOf("Android") !== -1) device = "Android";
  else if (userAgent.indexOf("iOS") !== -1) device = "iOS";

  // Get browser
  let browser = "Unknown";
  if (userAgent.indexOf("Chrome") !== -1) browser = "Chrome";
  else if (userAgent.indexOf("Firefox") !== -1) browser = "Firefox";
  else if (userAgent.indexOf("Safari") !== -1) browser = "Safari";
  else if (userAgent.indexOf("Edge") !== -1) browser = "Edge";
  else if (
    userAgent.indexOf("MSIE") !== -1 ||
    userAgent.indexOf("Trident") !== -1
  )
    browser = "Internet Explorer";

  loginHistory.lastDevice = `${browser} on ${device}`;

  // Get IP (using a free API)
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      loginHistory.lastIP = data.ip;
      localStorage.setItem("loginHistory", JSON.stringify(loginHistory));
      updateLoginDisplay();
    })
    .catch(() => {
      loginHistory.lastIP = "Unable to detect";
      localStorage.setItem("loginHistory", JSON.stringify(loginHistory));
      updateLoginDisplay();
    });
}

// Update login display
function updateLoginDisplay() {
  const lastLoginEl = document.getElementById("lastLoginTime");
  const lastIPEl = document.getElementById("lastLoginIP");
  const lastDeviceEl = document.getElementById("lastLoginDevice");

  if (lastLoginEl && loginHistory.lastLogin) {
    const date = new Date(loginHistory.lastLogin);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    lastLoginEl.textContent = date.toLocaleDateString("en-US", options);
  } else if (lastLoginEl) {
    lastLoginEl.textContent = "Not available";
  }

  if (lastIPEl) {
    lastIPEl.textContent = loginHistory.lastIP || "Not available";
  }

  if (lastDeviceEl) {
    lastDeviceEl.textContent = loginHistory.lastDevice || "Not available";
  }
}

// Show password popup in security tab
function showSecurityPasswordPopup(message, success) {
  const popup = document.getElementById("securityPasswordSuccessPopup");
  if (!popup) return;

  popup.style.display = "flex";
  popup.innerHTML = `
        <i class="fas ${success ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
        <span>${message}</span>
    `;

  popup.style.background = success ? "#e6f9ec" : "#fdeaea";
  popup.style.color = success ? "#2e7d32" : "#c62828";

  // Auto hide after 3 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// Reset security form
function resetSecurityForm() {
  document.getElementById("securityPasswordForm").reset();
}

// Change password from security tab
function changePasswordFromSecurity() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user || !user.id) {
    showSecurityPasswordPopup("User not logged in", false);
    return;
  }

  const oldPwd = document.getElementById("securityCurrentPassword").value;
  const newPwd = document.getElementById("securityNewPassword").value;
  const confirmPwd = document.getElementById("securityConfirmPassword").value;

  // Validation
  if (!oldPwd || !newPwd || !confirmPwd) {
    showSecurityPasswordPopup("All fields are required ❗", false);
    return;
  }

  if (newPwd !== confirmPwd) {
    showSecurityPasswordPopup("Passwords do not match ❌", false);
    return;
  }

  if (newPwd.length < 8) {
    showSecurityPasswordPopup(
      "Password must be at least 8 characters long",
      false,
    );
    return;
  }

  fetch(`http://localhost:8080/api/teachers/change-password/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPassword: oldPwd,
      newPassword: newPwd,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Old password incorrect");
      return res.text();
    })
    .then(() => {
      showSecurityPasswordPopup("Password Updated Successfully ✅", true);
      document.getElementById("securityPasswordForm").reset();
    })
    .catch((err) => {
      showSecurityPasswordPopup(err.message, false);
    });
}

// Setup security settings
function setupSecuritySettings() {
  const securityForm = document.getElementById("securityPasswordForm");
  if (securityForm) {
    // Remove any existing event listeners
    const newForm = securityForm.cloneNode(true);
    securityForm.parentNode.replaceChild(newForm, securityForm);

    // Add new event listener
    newForm.addEventListener("submit", function (e) {
      e.preventDefault();
      changePasswordFromSecurity();
    });
  }

  // Initialize login tracking
  initLoginTracking();
}

function loadDashboardContent() {
  const teacherName = document.getElementById("headerName").textContent;

  fetch(`http://localhost:8080/api/classes/teacher/${teacherName}`)
    .then((res) => res.json())
    .then((classes) => {
      const container = document.querySelector(
        "#dashboard-tab .classes-container",
      );
      if (!container) return;

      container.innerHTML = classes
        .map(
          (cls) => `
                <div class="class-card">
                    <div class="class-title">${cls.className} - ${cls.subject}</div>
                    <p>${cls.schedule} | ${cls.room}</p>
                </div>
            `,
        )
        .join("");
    });
}

// Load QR Generator content
function loadQRGeneratorContent() {
  const classSelect = document.getElementById("classSelect");
  const teacherName = document.getElementById("headerName").textContent.trim();

  if (!teacherName) {
    console.error("Teacher name not found in header");
    return;
  }

  fetch(`http://localhost:8080/api/classes/teacher/${teacherName}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch classes");
      return res.json();
    })
    .then((classes) => {
      console.log("Classes from DB:", classes);
      classSelect.innerHTML = `<option value="">Select Class</option>`;

      classes.forEach((cls) => {
        const option = document.createElement("option");
        option.value = cls.subject;
        option.textContent = `${cls.className} - ${cls.subject}`;
        classSelect.appendChild(option);
      });
    })
    .catch((err) => console.error("Error loading classes:", err));
}

// =============== FIXED LOAD CLASSES CONTENT - WITH BETTER ERROR HANDLING ===============
function loadClassesContent() {
  console.log("loadClassesContent called");

  // Try multiple possible container IDs
  const container =
    document.getElementById("classesContainer") ||
    document.querySelector(".classes-container") ||
    document.querySelector("#class-list-subtab .classes-container");

  if (!container) {
    console.error(
      "Classes container not found! Looking for: classesContainer, .classes-container",
    );

    // Log all available containers for debugging
    console.log("Available containers:", {
      byId: document.getElementById("classesContainer"),
      byClass: document.querySelector(".classes-container"),
      inSubtab: document.querySelector("#class-list-subtab .classes-container"),
    });

    // Create container if it doesn't exist
    const classListSubtab = document.getElementById("class-list-subtab");
    if (classListSubtab) {
      console.log("Creating classes container dynamically");
      const newContainer = document.createElement("div");
      newContainer.id = "classesContainer";
      newContainer.className = "classes-container";
      classListSubtab.appendChild(newContainer);
      loadClassesContent(); // Retry with new container
    }
    return;
  }

  const headerEl = document.getElementById("headerName");
  if (!headerEl || !headerEl.textContent.trim()) {
    console.warn("Teacher name not available yet");
    container.innerHTML = `<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Waiting for teacher data...</div>`;
    setTimeout(loadClassesContent, 500);
    return;
  }

  const teacherName = headerEl.textContent.trim();
  console.log("Loading classes for teacher:", teacherName);

  container.innerHTML = `<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading classes...</div>`;

  // Add cache-busting parameter
  const url = `http://localhost:8080/api/classes/teacher/${encodeURIComponent(teacherName)}?_=${Date.now()}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((classes) => {
      console.log("Classes fetched:", classes);

      if (!Array.isArray(classes) || classes.length === 0) {
        container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-school" style="font-size: 40px; color: #ccc; margin-bottom: 10px;"></i>
                        <h3>No Classes Found</h3>
                        <p>Add your first class to get started</p>

                    </div>`;
        return;
      }

      let html = "";
      classes.forEach((cls) => {
        // Parse divisions if it's a string
        const divisions = cls.divisions
          ? cls.divisions.split(",").filter((d) => d.trim())
          : [];

        html += `
                <div class="class-card" data-class-id="${cls.id}">
                    <div class="class-header">
                        <div class="class-title">
                            <i class="fas fa-book-open" style="margin-right: 8px;"></i>
                            ${cls.className || "N/A"} - ${cls.subject || "N/A"}
                        </div>
                        <div class="class-actions">
                            <i class="fa-solid fa-pen edit-icon" 
                               title="Edit Class" 
                               onclick="editClass(${cls.id})"></i>
                            <i class="fa-solid fa-trash delete-icon" 
                               title="Delete Class" 
                               onclick="deleteClass(${cls.id})"></i>
                            <i class="fa-solid fa-qrcode" 
                               title="Generate QR" 
                               onclick="generateQRForClass('${cls.className}', '${divisions[0] || "A"}')" 
                               style="color: #4361ee; cursor: pointer; margin-left: 8px;"></i>
                        </div>
                    </div>
                    
                    <div class="class-info">
                        <p><i class="fas fa-calendar-alt"></i> <strong>Schedule:</strong> ${cls.schedule || "Not set"}</p>
                        <p><i class="fas fa-door-open"></i> <strong>Room:</strong> ${cls.room || "Not set"}</p>
                        <p><i class="fas fa-users"></i> <strong>Divisions:</strong> ${divisions.length > 0 ? divisions.join(", ") : "Not set"}</p>
                        <p><i class="fas fa-align-left"></i> <strong>Description:</strong> ${cls.description || "No description"}</p>
                    </div>
                    
                    <div class="class-stats">
                        <div class="stat-item">
                            <div class="stat-value">${cls.studentCount || 0}</div>
                            <div class="stat-label">Students</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${cls.attendancePercent || "0%"}</div>
                            <div class="stat-label">Attendance</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${cls.qrToday || 0}</div>
                            <div class="stat-label">QR Today</div>
                        </div>
                    </div>
                </div>
            `;
      });

      container.innerHTML = html;
      console.log("Classes rendered successfully");
    })
    .catch((err) => {
      console.error("Error loading classes:", err);
      container.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #dc3545; margin-bottom: 16px;"></i>
                    <h3>Error Loading Classes</h3>
                    <p>${err.message}</p>
                    <button class="btn btn-primary" onclick="loadClassesContent()" style="margin-top: 16px;">
                        <i class="fas fa-sync-alt"></i> Retry
                    </button>
                </div>`;
    });
}

// Helper function to switch to add class tab
function showAddClassTab() {
  // Switch to classes tab if not already there
  showTab("classes");

  // Show add class subtab
  const addClassTab = document.querySelector(
    '#classes-tab .tab[data-subtab="add-class"]',
  );
  if (addClassTab) {
    addClassTab.click();
  }
}

function loadDashboardClasses(classes) {
  const container = document.getElementById("dashboard-classes");
  container.innerHTML = "";

  if (!classes || classes.length === 0) {
    container.innerHTML = "<p>No classes available</p>";
    return;
  }

  classes.forEach((cls) => {
    const card = document.createElement("div");
    card.classList.add("dashboard-class-card");

    card.innerHTML = `
            <h4>${cls.className} - ${cls.subject}</h4>
            <p><strong>Schedule:</strong> ${cls.schedule}</p>
            <p><strong>Room:</strong> ${cls.room}</p>
            <p><strong>Division:</strong> ${cls.divisions}</p>
        `;

    container.appendChild(card);
  });
}

fetch("http://localhost:8080/api/classes")
  .then((res) => res.json())
  .then((data) => {
    loadDashboardClasses(data);
  })
  .catch((err) => console.error(err));

// Load Reports content
function loadReportsContent() {
  // Initialize reports tab
  console.log("Reports tab loaded");
}

// Load Settings content
function loadSettingsContent() {
  setupSettingsTab();
}

function saveSettings() {
  const settingsData = {
    attendanceThreshold: parseInt(
      document.getElementById("attendanceThreshold").value,
    ),
    lateArrivalMinutes: parseInt(
      document.getElementById("lateArrivalMinutes").value,
    ),
    autoMarkAbsentMinutes: parseInt(
      document.getElementById("autoMarkAbsentMinutes").value,
    ),
    manualOverride: document.getElementById("manualOverride").checked,
    sendAlerts: document.getElementById("sendAlerts").checked,
  };

  fetch("http://localhost:8080/api/settings/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settingsData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Server error: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      alert("Settings saved successfully ✅");
    })
    .catch((error) => {
      console.error("Save error:", error);
      alert("Error saving settings ❌");
    });
}

// ================= SETTINGS NAVIGATION =================

document.querySelectorAll(".settings-item").forEach((item) => {
  item.addEventListener("click", function () {
    const settingType = this.getAttribute("data-settings");

    // Hide all settings sections
    document.querySelectorAll(".settings-section").forEach((section) => {
      section.classList.add("hidden");
    });

    // Remove active state
    document.querySelectorAll(".settings-item").forEach((i) => {
      i.classList.remove("active");
    });

    // Show selected section
    this.classList.add("active");

    if (settingType === "attendance") {
      document.getElementById("attendance-settings").classList.remove("hidden");
    }

    if (settingType === "leave") {
      document.getElementById("leave-settings").classList.remove("hidden");
      loadAllLeaves(); // auto load leave requests
    }
  });
});

function loadAllLeaves() {
  fetch("http://localhost:8080/api/leave/all")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch leaves");
      return res.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#leaveTable tbody");
      tbody.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">No Leave Requests</td></tr>`;
        return;
      }

      data.forEach((leave) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${leave.studentName}</td>
          <td>${leave.className}</td>
          <td>${leave.fromDate}</td>
          <td>${leave.toDate}</td>
          <td>${leave.reason}</td>
          <td>${leave.status}</td>
          <td>
            ${
              leave.status === "Pending"
                ? `
                  <button onclick="approveLeave(${leave.id})">Approve</button>
                  <button onclick="rejectLeave(${leave.id})">Reject</button>
                `
                : "-"
            }
          </td>
        `;

        tbody.appendChild(row);
      });
    })
    .catch((err) => console.error("Teacher load error:", err));
}

function approveLeave(id) {
  fetch(`http://localhost:8080/api/leave/approve/${id}`, {
    method: "PUT",
  })
    .then((res) => res.text())
    .then((message) => {
      alert(message);
      loadAllLeaves(); // Refresh table
    })
    .catch((error) => console.error("Approve error:", error));
}

function rejectLeave(id) {
  fetch(`http://localhost:8080/api/leave/reject/${id}`, {
    method: "PUT",
  })
    .then((res) => res.text())
    .then((message) => {
      alert(message);
      loadAllLeaves(); // Refresh table
    })
    .catch((error) => console.error("Reject error:", error));
}

// ===============================
// BUTTON REFERENCES
// ===============================
const editBtn = document.getElementById("editTeacherProfileBtn");
const saveBtn = document.getElementById("saveTeacherProfileBtn");
const cancelBtn = document.getElementById("cancelTeacherProfileBtn");

// ===============================
// BUTTON EVENTS
// ===============================
if (editBtn) editBtn.addEventListener("click", openEditProfileModal);
if (saveBtn) saveBtn.addEventListener("click", saveTeacherProfile);
if (cancelBtn) cancelBtn.addEventListener("click", closeEditProfileModal);

// ===============================
// LOAD PROFILE INTO UI
// ===============================
function loadTeacherProfile() {
  const userData = JSON.parse(localStorage.getItem("loggedUser"));
  if (!userData) return;

  document.getElementById("teacherName").innerText = userData.name || "-";
  document.getElementById("teacherEmail").innerText = userData.email || "-";
  document.getElementById("teacherPhone").innerText =
    userData.mobilenumber || "-";
  document.getElementById("teacherDepartment").innerText =
    userData.department || "-";

  // Avatar initials
  const initials = userData.name
    ? userData.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "T";
  document.getElementById("teacherAvatar").innerText = initials;
}

/* ===============================
   OPEN EDIT PROFILE MODAL
================================ */

document
  .getElementById("editTeacherProfileBtn")
  .addEventListener("click", openEditProfileModal);

function openEditProfileModal() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) return;

  document.getElementById("editTeacherProfileModal").style.display = "flex";

  document.getElementById("editTeacherName").value = user.name || "";
  document.getElementById("editTeacherEmail").value = user.email || "";
  document.getElementById("editTeacherPhone").value = user.mobilenumber || "";
  document.getElementById("editTeacherDepartment").value =
    user.department || "";
}

/* ===============================
   CLOSE MODAL
================================ */
function closeEditProfileModal() {
  document.getElementById("editTeacherProfileModal").style.display = "none";
}

document
  .getElementById("closeEditProfileBtn")
  .addEventListener("click", closeEditProfileModal);

document
  .getElementById("cancelEditProfileBtn")
  .addEventListener("click", closeEditProfileModal);

// close on outside click
window.addEventListener("click", (e) => {
  const modal = document.getElementById("editTeacherProfileModal");
  if (e.target === modal) {
    closeEditProfileModal();
  }
});

/* ===============================
   SAVE PROFILE (DB + UI)
================================ */
document
  .getElementById("editProfileForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    saveTeacherProfile();
  });

function saveTeacherProfile() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user || !user.id) {
    alert("User not logged in");
    return;
  }

  const updatedData = {
    name: document.getElementById("editTeacherName").value,
    email: document.getElementById("editTeacherEmail").value,
    mobilenumber: document.getElementById("editTeacherPhone").value,
    department: document.getElementById("editTeacherDepartment").value,
  };

  fetch(`http://localhost:8080/api/teachers/update/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    })
    .then((updatedTeacher) => {
      // ✅ update localStorage
      localStorage.setItem("loggedUser", JSON.stringify(updatedTeacher));

      // ✅ update UI instantly
      document.getElementById("teacherName").innerText = updatedTeacher.name;
      document.getElementById("teacherEmail").innerText = updatedTeacher.email;
      document.getElementById("teacherPhone").innerText =
        updatedTeacher.mobilenumber;
      document.getElementById("teacherDepartment").innerText =
        updatedTeacher.department;

      // ✅ show popup INSIDE modal
      const popup = document.getElementById("profileSuccessPopup");
      popup.style.display = "flex";

      setTimeout(() => {
        popup.style.display = "none";
        closeEditProfileModal();
      }, 2000);
    })
    .catch(() => alert("Profile update failed ❌"));
}

/* ===============================
   OPEN CHANGE PASSWORD MODAL
================================ */
document.getElementById("changePasswordBtn")?.addEventListener("click", () => {
  document.getElementById("changePasswordModal").style.display = "flex";
  hidePasswordPopup();
});

/* ===============================
   CLOSE CHANGE PASSWORD MODAL
================================ */
function closeChangePassword() {
  document.getElementById("changePasswordModal").style.display = "none";
  document.getElementById("changePasswordForm").reset();
  hidePasswordPopup();
}

/* ===============================
   CLOSE & CANCEL BUTTONS
================================ */
document
  .getElementById("closeChangePasswordBtn")
  ?.addEventListener("click", closeChangePassword);

document
  .getElementById("cancelChangePasswordBtn")
  ?.addEventListener("click", closeChangePassword);

// Click outside modal
window.addEventListener("click", (e) => {
  const modal = document.getElementById("changePasswordModal");
  if (e.target === modal) {
    closeChangePassword();
  }
});

/* ===============================
   FORM SUBMIT
================================ */
document
  .getElementById("changePasswordForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    changePassword();
  });

/* ===============================
   CHANGE PASSWORD FUNCTION
================================ */
function changePassword() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user || !user.id) return;

  const oldPwd = document.getElementById("currentPasswordModal").value;
  const newPwd = document.getElementById("newPasswordModal").value;
  const confirmPwd = document.getElementById("confirmPasswordModal").value;

  // 🔹 Validation
  if (!oldPwd || !newPwd || !confirmPwd) {
    showPasswordPopup("All fields are required ❗", false);
    return;
  }

  if (newPwd !== confirmPwd) {
    showPasswordPopup("Passwords do not match ❌", false);
    return;
  }

  fetch(`http://localhost:8080/api/teachers/change-password/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPassword: oldPwd,
      newPassword: newPwd,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Old password incorrect");
      return res.text();
    })
    .then(() => {
      showPasswordPopup("Password Updated Successfully ✅", true);

      // Auto close after 2 sec
      setTimeout(() => {
        closeChangePassword();
      }, 2000);
    })
    .catch((err) => {
      showPasswordPopup(err.message, false);
    });
}

/* ===============================
   POPUP HANDLER
================================ */
function showPasswordPopup(message, success) {
  const popup = document.getElementById("passwordSuccessPopup");
  popup.style.display = "flex";

  popup.innerHTML = `
        <i class="fas ${success ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
        <span>${message}</span>
    `;

  popup.style.background = success ? "#e6f9ec" : "#fdeaea";
  popup.style.color = success ? "#2e7d32" : "#c62828";
}

/* ===============================
   HIDE POPUP
================================ */
function hidePasswordPopup() {
  const popup = document.getElementById("passwordSuccessPopup");
  if (popup) popup.style.display = "none";
}

// Generate QR for specific class
function generateQRForClass(className, division) {
  // Switch to QR generator tab
  showTab("qr-generator");

  // Pre-select class and division
  const classSelect = document.getElementById("classSelect");
  const divisionSelect = document.getElementById("divisionSelect");

  if (classSelect && divisionSelect) {
    // Find and select the class
    for (let i = 0; i < classSelect.options.length; i++) {
      if (classSelect.options[i].text.includes(className)) {
        classSelect.selectedIndex = i;
        break;
      }
    }

    // Select division
    divisionSelect.value = division;

    // Auto-generate QR after a short delay
    setTimeout(() => {
      document.getElementById("generateQRBtn").click();
    }, 100);
  }
}

// Generate report
let reportData = [];
function generateReport() {
  const classElement = document.getElementById("reportClass");

  if (!classElement) {
    alert("Report class dropdown not found!");
    return;
  }

  const classFilter = classElement.value;

  if (!classFilter) {
    alert("Please select class");
    return;
  }

  fetch(
    `http://localhost:8080/api/attendance/report?className=${encodeURIComponent(classFilter)}`,
  )
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch report");
      return res.json();
    })
    .then((data) => {
      const table = document.getElementById("reportTable");
      const tbody = document.getElementById("reportTableBody");

      tbody.innerHTML = "";

      if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">No Data Found</td></tr>`;
        table.style.display = "table";
        return;
      }

      data.forEach((r) => {
        const row = `
                    <tr>
                        <td>${r.date}</td>
                        <td>${r.subject}</td>
                        <td>${r.rollNo}</td>
                        <td>${r.name}</td>
                        <td>${r.status}</td>
                    </tr>
                `;
        tbody.innerHTML += row;
      });

      table.style.display = "table";
    })
    .catch((err) => {
      console.error("Report error:", err);
      alert("Error generating report");
    });
}

function downloadReport() {
  const classElement = document.getElementById("reportClass");

  if (!classElement) {
    alert("Report class dropdown not found!");
    return;
  }

  const classFilter = classElement.value;

  if (!classFilter) {
    alert("Please select class");
    return;
  }

  // Fetch again separately
  fetch(
    `http://localhost:8080/api/attendance/report?className=${encodeURIComponent(classFilter)}`,
  )
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch report");
      return res.json();
    })
    .then((data) => {
      if (data.length === 0) {
        alert("No data available to download");
        return;
      }

      let csvContent = "Date,Subject,Roll No,Name,Status\n";

      data.forEach((r) => {
        csvContent += `${r.date},${r.subject},${r.rollNo},${r.name},${r.status}\n`;
      });

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "attendance_report.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((err) => {
      console.error("Download error:", err);
      alert("Error downloading report");
    });
}

let attendanceChart = null;

function generateAnalytics() {
  const type = document.getElementById("analysisType").value;

  if (!type) {
    alert("Please select analysis type");
    return;
  }

  let url = "";
  if (type === "subject")
    url = "http://localhost:8080/api/attendance/analytics/subject";
  else if (type === "department")
    url = "http://localhost:8080/api/attendance/analytics/department";
  else if (type === "date")
    url = "http://localhost:8080/api/attendance/analytics/date";

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Server Error: " + res.status);
      return res.json();
    })
    .then((data) => {
      if (!data || data.length === 0) {
        alert("No Data Found");
        return;
      }

      // 1️⃣ Populate HTML Table
      const tbody = document.getElementById("analyticsTableBody");
      tbody.innerHTML = "";

      data.forEach((item) => {
        // Determine category based on DTO
        let category;
        if (type === "date") category = item.date;
        else if (type === "department")
          category = item.subject; // subject field holds className in dept analytics
        else category = item.subject; // subject-wise

        const total = item.total;
        const present = item.present;
        const absent = item.absent;
        const percent = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${category}</td>
                    <td>${total}</td>
                    <td>${present}</td>
                    <td>${absent}</td>
                    <td>${percent}%</td>
                `;
        tbody.appendChild(row);
      });

      document.getElementById("analyticsTable").style.display = "table";

      // 2️⃣ Prepare Chart
      const labels = data.map((item) => {
        if (type === "date") return item.date;
        else return item.subject; // subject or department
      });
      const presentData = data.map((item) => item.present);
      const absentData = data.map((item) => item.absent);

      const ctx = document.getElementById("attendanceChart").getContext("2d");

      if (attendanceChart) attendanceChart.destroy();

      attendanceChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            { label: "Present", data: presentData, backgroundColor: "#4CAF50" },
            { label: "Absent", data: absentData, backgroundColor: "#F44336" },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text:
                type === "subject"
                  ? "Subject-wise Attendance Analysis"
                  : type === "department"
                    ? "Department-wise Attendance Analysis"
                    : "Date-wise Attendance Analysis",
            },
          },
          scales: { y: { beginAtZero: true } },
        },
      });
    })
    .catch((err) => {
      console.error("Analytics error:", err);
      alert("Error generating analytics: " + err.message);
    });
}

// Edit class
function editClass(id) {
  fetch(`http://localhost:8080/api/classes/${id}`)
    .then((res) => res.json())
    .then((cls) => {
      document.getElementById("className").value = cls.className;
      document.getElementById("subjectName").value = cls.subject;
      document.getElementById("classSchedule").value = cls.schedule;
      document.getElementById("classRoom").value = cls.room;
      document.getElementById("classDescription").value = cls.description || "";

      document.querySelectorAll('input[name="divisions"]').forEach((cb) => {
        cb.checked = cls.divisions.includes(cb.value);
      });

      editingClassId = id;

      document.querySelector(
        '#addClassForm button[type="submit"]',
      ).textContent = "Update Class";

      // Switch to add class subtab
      const addClassTab = document.querySelector(
        '#classes-tab .tab[data-subtab="add-class"]',
      );
      if (addClassTab) {
        addClassTab.click();
      }
    });
}

// Delete class
function deleteClass(id) {
  if (!confirm("Are you sure you want to delete this class?")) return;

  fetch(`http://localhost:8080/api/classes/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Delete failed");
      loadClassesContent();
      loadDashboardContent();
      alert("🗑️ Class deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Failed to delete class");
    });
}

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

function finalizeAttendance() {
  const classSelect = document.getElementById("classSelect");

  if (!classSelect) {
    alert("Class dropdown not found");
    return;
  }

  const subject = classSelect.value;

  if (!subject || subject.trim() === "") {
    alert("Please select a class before finalizing attendance");
    return;
  }

  // 👇 Extract class name from visible text
  const selectedText = classSelect.options[classSelect.selectedIndex].text;
  const className = selectedText.split(" - ")[0].trim();

  console.log("FINALIZE →", subject, className);

  fetch(
    `http://localhost:8080/api/attendance/finalize?subject=${encodeURIComponent(subject)}&className=${encodeURIComponent(className)}`,
    { method: "POST" },
  )
    .then((res) => {
      if (!res.ok) throw new Error("Failed");
      return res.text();
    })
    .then((msg) => alert(msg))
    .catch((err) => {
      console.error(err);
      alert("Error finalizing attendance");
    });
}

// ===============================
// 1️⃣ Load Teacher Subjects for Notes
// ===============================
// Load teacher subjects
function loadTeacherSubjectsForNotes() {
  const teacherName = document
    .getElementById("headerName")
    ?.textContent?.trim();
  if (!teacherName) return;

  fetch(`http://localhost:8080/api/classes/teacher/${teacherName}`)
    .then((res) => res.json())
    .then((classes) => {
      const dropdown = document.getElementById("notesSubject");
      dropdown.innerHTML = `<option value="">Select Subject</option>`;
      const uniqueSubjects = new Set(classes.map((c) => c.subject));
      uniqueSubjects.forEach(
        (sub) =>
          (dropdown.innerHTML += `<option value="${sub}">${sub}</option>`),
      );
    })
    .catch((err) => console.error(err));
}

// Upload Notes
function setupUploadNotes() {
  const form = document.getElementById("uploadNotesForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const subject = document.getElementById("notesSubject").value;
    const file = document.getElementById("notesFile").files[0];
    if (!subject || !file) return alert("Select subject & file");

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("file", file);

      const res = await fetch("http://localhost:8080/api/notes/upload", {
        method: "POST",
        body: formData,
      });
      const msg = await res.text();
      alert(msg);
      form.reset();
      loadUploadedNotes();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  });
}

// Load uploaded notes
async function loadUploadedNotes() {
  const tableBody = document.getElementById("uploadedNotesTableBody");

  if (!tableBody) {
    console.error("Table body not found!");
    return;
  }

  tableBody.innerHTML = "";

  try {
    const res = await fetch("http://localhost:8080/api/notes/all");
    const data = await res.json();

    console.log("Notes from API:", data);

    if (!data || data.length === 0) {
      tableBody.innerHTML = `
                <tr>
                    <td colspan="4">No notes found</td>
                </tr>
            `;
      return;
    }

    data.forEach((note) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${note.subject}</td>
                <td>${note.fileName}</td>
                <td>${note.uploadTime ? note.uploadTime.replace("T", " ") : "-"}</td>
                <td>
    <a href="http://localhost:8080/uploads/${note.fileUrl.split("/").pop()}" 
       target="_blank" 
       class="btn btn-sm btn-secondary">
        View
    </a>

    <a href="http://localhost:8080/api/notes/download/${note.id}" 
       class="btn btn-sm btn-primary">
        Download
    </a>

    <button 
        class="btn btn-sm btn-danger"
        onclick="deleteNote(${note.id})">
        Delete
    </button>
</td>
            `;

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading notes:", err);
    tableBody.innerHTML = `
            <tr>
                <td colspan="4">Error loading notes</td>
            </tr>
        `;
  }
}
async function deleteNote(id) {

    if (!confirm("Are you sure you want to delete this note?")) {
        return;
    }

    try {
        const res = await fetch(`http://localhost:8080/api/notes/delete/${id}`, {
            method: "DELETE"
        });

        const message = await res.text();
        alert(message);

        loadUploadedNotes(); // refresh table

    } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete note");
    }
}
// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadTeacherSubjectsForNotes();
  setupUploadNotes();
  loadUploadedNotes();
});

// Export functions for onclick attributes
window.logout = logout;
window.generateReport = generateReport;
window.editClass = editClass;
window.deleteClass = deleteClass;
window.generateQRForClass = generateQRForClass;
window.addNewStudent = addNewStudent;
window.saveManualAttendance = saveManualAttendance;
window.finalizeAttendance = finalizeAttendance;
window.closeEditProfileModal = closeEditProfileModal;
window.saveTeacherProfile = saveTeacherProfile;
window.closeChangePassword = closeChangePassword;
window.changePasswordFromSecurity = changePasswordFromSecurity;
window.resetSecurityForm = resetSecurityForm;
window.showSubTab = showSubTab;
window.openEditProfileModal = openEditProfileModal;

// =============== FIXED CLASSES TAB OVERRIDES - MATCHES HTML STRUCTURE ===============

// Override the showTab function to ensure classes load properly
(function () {
  // Store reference to original showTab if it exists
  const originalShowTab = window.showTab;

  // Override showTab
  window.showTab = function (tabName) {
    // Call original function if it exists
    if (originalShowTab) {
      originalShowTab(tabName);
    }

    // If classes tab is shown, load content after a small delay
    if (tabName === "classes") {
      setTimeout(() => {
        ensureClassesContainer();
        if (typeof loadClassesContent === "function") {
          console.log("Loading classes from showTab override");
          loadClassesContent();
        }
      }, 150);
    }
  };

  console.log("showTab override installed");
})();

// Fix for class tabs click events
document.addEventListener("DOMContentLoaded", function () {
  // Add click handlers for class subtabs
  const classTabs = document.querySelectorAll("#classes-tab .tab");
  classTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const subtab = this.getAttribute("data-subtab");

      // If class-list subtab is clicked, load classes
      if (subtab === "class-list") {
        setTimeout(() => {
          ensureClassesContainer();
          if (typeof loadClassesContent === "function") {
            console.log("Loading classes from subtab click");
            loadClassesContent();
          }
        }, 150);
      }
    });
  });

  // Also handle navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const tab = this.getAttribute("data-tab");
      if (tab === "classes") {
        setTimeout(() => {
          ensureClassesContainer();
          if (typeof loadClassesContent === "function") {
            console.log("Loading classes from nav click");
            loadClassesContent();
          }
        }, 150);
      }
    });
  });

  // Ensure container exists on page load
  ensureClassesContainer();

  console.log("Classes tab event handlers installed");
});

// Enhance the existing addOrUpdateClass function to switch to class list tab after save
if (typeof window.addOrUpdateClass === "function") {
  const originalAddOrUpdateClass = window.addOrUpdateClass;

  window.addOrUpdateClass = function () {
    // Call original function
    const result = originalAddOrUpdateClass.apply(this, arguments);

    // After save, switch to class list tab
    setTimeout(() => {
      const classListTab = document.querySelector(
        '#classes-tab .tab[data-subtab="class-list"]',
      );
      if (classListTab) {
        classListTab.click();
      }
    }, 500);

    return result;
  };
}

// Force load classes when the page is fully loaded
window.addEventListener("load", function () {
  // Check if classes tab is active
  const activeTab = document.querySelector(".tab-content.active");
  if (activeTab && activeTab.id === "classes-tab") {
    // Check if class-list subtab is active
    const activeSubtab = activeTab.querySelector(".tab-content.active");
    if (activeSubtab && activeSubtab.id === "class-list-subtab") {
      setTimeout(() => {
        ensureClassesContainer();
        if (typeof loadClassesContent === "function") {
          console.log("Loading classes on page load");
          loadClassesContent();
        }
      }, 200);
    }
  }
});

console.log("Classes tab fixes loaded successfully");

// =============== LANGUAGE DROPDOWN FUNCTIONALITY ===============
// Language Dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  const langBtn = document.getElementById("langDropdownBtn");
  const langDropdown = document.getElementById("langDropdown");
  const selectedLangText = document.getElementById("selectedLangText");

  if (langBtn && langDropdown) {
    // Toggle dropdown on button click
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove("show");
      }
    });

    // Prevent dropdown from closing when clicking inside it
    langDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
});

// Override setLanguage to update dropdown text and active state
const originalSetLanguageWithDropdown = window.setLanguage;
window.setLanguage = function (lang) {
  // Call original function
  if (originalSetLanguageWithDropdown) {
    originalSetLanguageWithDropdown(lang);
  }

  // Update dropdown button text
  const selectedLangText = document.getElementById("selectedLangText");
  const langNames = {
    en: "English",
    hi: "हिंदी",
    mr: "मराठी",
  };

  if (selectedLangText) {
    selectedLangText.textContent = langNames[lang] || "English";
  }

  // Update active state in dropdown
  const dropdownLinks = document.querySelectorAll(".dropdown-content a");
  dropdownLinks.forEach((link) => {
    const linkLang = link.getAttribute("data-lang");
    if (linkLang === lang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close dropdown after selection
  const langDropdown = document.getElementById("langDropdown");
  if (langDropdown) {
    langDropdown.classList.remove("show");
  }
};

// General Setting
// ==========================
// Translation data
// ==========================
const translations = {
  en: {
    // General Settings
    generalTitle: "General Settings",
    instituteNameLabel: "Institute Name",
    timeZoneLabel: "Time Zone",
    dateFormatLabel: "Date Format",
    languageLabel: "Language",
    saveBtn: "Save Changes",
    resetBtn: "Reset",
    savedAlert: "Settings saved successfully!",

    // Dashboard / Common
    dashboardTitle: "Dashboard",
    welcomeText: "Welcome",
    logoutBtn: "Logout",
    studentTableHeader: "Student Name",
    attendanceBtn: "Mark Attendance",
    addStudentBtn: "Add Student",
    editBtn: "Edit",
    deleteBtn: "Delete",
    noDataText: "No data available",
  },
  hi: {
    generalTitle: "सामान्य सेटिंग्स",
    instituteNameLabel: "संस्थान का नाम",
    timeZoneLabel: "समय क्षेत्र",
    dateFormatLabel: "दिनांक प्रारूप",
    languageLabel: "भाषा",
    saveBtn: "परिवर्तन सहेजें",
    resetBtn: "रीसेट",
    savedAlert: "सेटिंग्स सफलतापूर्वक सहेज ली गई!",

    dashboardTitle: "डैशबोर्ड",
    welcomeText: "स्वागत है",
    logoutBtn: "लॉग आउट",
    studentTableHeader: "छात्र का नाम",
    attendanceBtn: "हाज़िरी अंकित करें",
    addStudentBtn: "छात्र जोड़ें",
    editBtn: "संपादित करें",
    deleteBtn: "हटाएँ",
    noDataText: "कोई डेटा उपलब्ध नहीं है",
  },
  mr: {
    generalTitle: "सामान्य सेटिंग्ज",
    instituteNameLabel: "संस्थेचे नाव",
    timeZoneLabel: "वेळेचा प्रदेश",
    dateFormatLabel: "दिनांक स्वरूप",
    languageLabel: "भाषा",
    saveBtn: "सुरक्षित करा",
    resetBtn: "रीसेट",
    savedAlert: "सेटिंग्ज यशस्वीरीत्या जतन केले!",

    dashboardTitle: "डॅशबोर्ड",
    welcomeText: "स्वागत आहे",
    logoutBtn: "लॉग आउट",
    studentTableHeader: "विद्यार्थ्याचे नाव",
    attendanceBtn: "हजर नोंदवा",
    addStudentBtn: "विद्यार्थी जोडा",
    editBtn: "संपादित करा",
    deleteBtn: "काढा",
    noDataText: "कोणताही डेटा उपलब्ध नाही",
  },
};

// language.js

let systemSettings = { language: "en" }; // default language

// Automatically apply translations using element IDs as keys
function applyLanguageAuto(lang) {
  Object.keys(translations[lang]).forEach((key) => {
    const elById = document.getElementById(key);
    if (elById) elById.innerText = translations[lang][key];

    // Optional: handle elements with class same as key
    const elByClass = document.getElementsByClassName(key);
    for (let el of elByClass) {
      el.innerText = translations[lang][key];
    }
  });
}

// Load language from backend
async function loadSystemLanguage() {
  try {
    const res = await fetch("http://localhost:8080/api/settings/general");
    const data = await res.json();
    systemSettings.language = data.language || "en";
    applyLanguageAuto(systemSettings.language);
  } catch (err) {
    console.error("Error loading system language:", err);
  }
}

// Call on page load
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("generalSettingsForm");
  if (!form) return;

  let savedSettings = {};

  // LOAD SETTINGS
  function loadSettingsForm() {
    fetch("http://localhost:8080/api/settings/general")
      .then((res) => res.json())
      .then((data) => {
        savedSettings = data;

        document.getElementById("instituteName").value =
          data.instituteName || "";
        document.getElementById("timeZone").value = data.timeZone || "IST";
        document.getElementById("dateFormat").value =
          data.dateFormat || "dd/mm/yyyy";
      })
      .catch((err) => console.error("Error loading settings:", err));
  }

  loadSettingsForm();

  // SAVE SETTINGS
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newSettings = {
      instituteName: document.getElementById("instituteName").value,
      timeZone: document.getElementById("timeZone").value,
      dateFormat: document.getElementById("dateFormat").value,
      language: "en", // fixed default
    };

    fetch("http://localhost:8080/api/settings/general", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSettings),
    })
      .then((res) => res.json())
      .then((updated) => {
        savedSettings = updated;
        alert("Settings updated successfully!");
      })
      .catch((err) => console.error("Error saving settings:", err));
  });

  // RESET
  form.addEventListener("reset", function () {
    setTimeout(() => {
      document.getElementById("instituteName").value =
        savedSettings.instituteName;
      document.getElementById("timeZone").value = savedSettings.timeZone;
      document.getElementById("dateFormat").value = savedSettings.dateFormat;
    }, 0);
  });
});

// Initialize form on page load
document.addEventListener("DOMContentLoaded", loadSettingsForm);
