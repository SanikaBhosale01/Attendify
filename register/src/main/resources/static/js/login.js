
        (function() {
            const messageBox = document.getElementById("message");

            document.getElementById("loginForm").addEventListener("submit", function (e) {
                e.preventDefault();

                const role = document.getElementById("role").value;
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value.trim();

                if (!role) {
                    showMessage("Please select a role");
                    return;
                }

                const user = { email, password };

                let url = "";
                if (role === "student") {
                    url = "http://localhost:8080/api/users/login";
                } else if (role === "teacher") {
                    url = "http://localhost:8080/api/teachers/login";
                } else if (role === "admin") {
                    url = "http://localhost:8080/api/admin/login";
                }

                // tiny loading state (optional)
                const btn = e.target.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<span>⏳</span> signing in...';
                btn.disabled = true;

                fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                })
                .then(async res => {
                    const data = await res.json().catch(() => ({}));
                    if (!res.ok) {
                        showMessage(data.message || "Invalid email or password");
                        return null;
                    }
                    return data;
                })
                .then(data => {
                    if (!data) return;

                    console.log("Login Success:", data);
                    localStorage.setItem("loggedUser", JSON.stringify(data));
                    localStorage.setItem("role", role);

                    // show success message
                    showMessage(`✅ welcome! redirecting to ${role} dashboard...`, 'success');
                    
                    // real redirect
                    if (role === "teacher") {
                        window.location.href = "teacher-dashboard.html";
                    } else if (role === "student") {
                        window.location.href = "dashboard.html";
                    } else if (role === "admin") {
                        window.location.href = "admin-dashboard.html";
                    }
                })
                .catch(err => {
                    console.error(err);
                    showMessage("⚠️ server error. try again later.");
                })
                .finally(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });
            });

            document.getElementById("registerBtn").addEventListener("click", function () {
    const role = document.getElementById("role").value;

    if (!role) {
        alert("Please select role first (student/teacher)");
        return;
    }

    if (role === "admin") {
        alert("Admin accounts are created by system administrators only");
        return;
    }

    window.location.href = role === "student"
        ? "register.html"
        : "teacher-register.html";
});


            function showMessage(msg, type = 'error') {
                messageBox.innerText = msg;
                messageBox.className = 'error-msg show';
                if (type === 'success') {
                    messageBox.style.background = 'rgba(74, 222, 128, 0.2)';
                    messageBox.style.color = '#166534';
                    messageBox.style.borderColor = '#86efac';
                } else {
                    messageBox.style.background = 'rgba(252, 165, 165, 0.25)';
                    messageBox.style.color = '#aa1f2e';
                    messageBox.style.borderColor = 'rgba(248, 113, 113, 0.3)';
                }
            }

            // extra: hide message when typing
            document.querySelectorAll('#loginForm input, #loginForm select').forEach(field => {
                field.addEventListener('focus', () => {
                    messageBox.classList.remove('show');
                });
            });

            // initial style (hidden)
            messageBox.style.display = 'none';
        })();
