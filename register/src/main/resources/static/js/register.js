
        document.getElementById("registerForm").addEventListener("submit", function(e) {
            e.preventDefault();

            const user = {
                name: document.getElementById("name").value,
                rollNo: document.getElementById("rollNo").value,
                className: document.getElementById("className").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                mobilenumber: document.getElementById("mobilenumber").value,
                password: document.getElementById("password").value
            };

            fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById("message").innerText = "Registration Successful!";
                // style the message as success (optional visual enhancement)
                const msgEl = document.getElementById("message");
                msgEl.classList.add('show', 'success');
                setTimeout(() => {
                    window.location.href = "public/login.html";
                }, 1500);
                document.getElementById("registerForm").reset();
            })
            .catch(err => {
                document.getElementById("message").innerText = "Error occurred!";
                document.getElementById("message").classList.add('show');
            });
        });
