document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;
  
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const form = e.target;
      const data = {
        email: form.email.value,
        password: form.password.value
      };
  
      try {
        const res = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
  
        const result = await res.json();
  
        if (res.ok) {
          localStorage.setItem('token', result.token);
          window.location.href = '/public/user.html';
        } else {
          document.getElementById('msg').textContent = result.error || 'Error al iniciar sesión';
        }
      } catch (err) {
        document.getElementById('msg').textContent = 'Error de conexión con el servidor';
      }
    });
  });
  
