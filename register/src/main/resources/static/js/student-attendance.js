const params = new URLSearchParams(window.location.search);
const className = params.get("class");
const sessionId = params.get("sessionId");

let deviceId = null;

// 🔹 Generate unique device ID
async function loadDeviceId() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  deviceId = result.visitorId;

  console.log("Device ID:", deviceId);
}

// Load device ID when page opens
document.addEventListener("DOMContentLoaded", loadDeviceId);

document.getElementById("attendanceForm").addEventListener("submit", e => {
  e.preventDefault();

  const rollNo = document.getElementById("rollNo").value;

  if (!deviceId) {
    document.getElementById("msg").textContent = "Device verification failed ❌";
    return;
  }

  if (!navigator.geolocation) {
    document.getElementById("msg").textContent = "Location not supported ❌";
    return;
  }

  // 🔹 Get current location
  navigator.geolocation.getCurrentPosition(
    position => {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // ✅ Properly formatted form data
      const formData = new URLSearchParams();
      formData.append("rollNo", rollNo);
      formData.append("subject", className);
      formData.append("deviceId", deviceId);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("sessionId", sessionId);

      fetch("https://unregularised-unscourged-eugenie.ngrok-free.dev/api/attendance/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById("msg").textContent = data.message;
      })
      .catch(error => {
        console.error(error);
        document.getElementById("msg").textContent = "Error marking attendance ❌";
      });

    },
    error => {
      console.error(error);
      document.getElementById("msg").textContent = "Location permission denied ❌";
    }
  );
});