const params = new URLSearchParams(window.location.search);
const className = params.get("class");
const msg = document.getElementById("msg");

if (!className) {
  msg.textContent = "Invalid QR Code ❌";
  msg.style.color = "red";
  throw new Error("QR parameter missing");
}

let deviceId = null;

// Generate deviceId using FingerprintJS
async function loadDeviceId() {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    deviceId = result.visitorId;
    console.log("Device ID:", deviceId);
  } catch (err) {
    console.error(err);
    msg.textContent = "Device verification failed ❌";
    msg.style.color = "red";
  }
}

document.addEventListener("DOMContentLoaded", loadDeviceId);

// Submit attendance
document.getElementById("attendanceForm").addEventListener("submit", e => {
  e.preventDefault();
  const rollNo = document.getElementById("rollNo").value.trim();
  if (!rollNo) {
    msg.textContent = "Enter Roll Number ❌";
    msg.style.color = "red";
    return;
  }

  if (!deviceId) {
    msg.textContent = "Device verification failed ❌";
    msg.style.color = "red";
    return;
  }

  const API_BASE = "https://kia-unogled-lionheartedly.ngrok-free.dev";
  const url = `${API_BASE}/api/attendance/mark?rollNo=${encodeURIComponent(rollNo)}&subject=${encodeURIComponent(className)}&deviceId=${encodeURIComponent(deviceId)}`;

  fetch(url, { method: "POST" })
    .then(res => res.json())
    .then(data => {
      msg.textContent = data.message;
      msg.style.color = data.message.includes("success") ? "green" : "red";
      if (data.message.includes("success")) document.getElementById("attendanceForm").reset();
    })
    .catch(err => {
      console.error(err);
      msg.textContent = "Error marking attendance ❌";
      msg.style.color = "red";
    });
});