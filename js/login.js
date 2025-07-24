document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        email: form.email.value,
        password: form.password.value
    };

    const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
        // Aquí guardas el token y rediriges:
        localStorage.setItem('token', result.token);
        window.location.href = '/user.html';
    } else {
        document.getElementById('msg').textContent = result.error || 'Error al iniciar sesión';
    }
});
