// user.js

// Comprueba si hay token (puedes guardar el token en localStorage tras login)
const token = localStorage.getItem('token');

if (!token) {
    // Si no hay token, redirige al login
    window.location.href = '/login.html';
} else {
    // Pide los datos de perfil al backend (AJAX/fetch con Authorization: Bearer <token>)
    fetch('http://localhost:4000/api/users/profile', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if (!res.ok) throw new Error('No autorizado');
        return res.json();
    })
    .then(user => {
        document.getElementById('profile').innerHTML = `
            <p><b>Usuario:</b> ${user.username}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Idioma:</b> ${user.locale}</p>
            <p><b>Fecha de registro:</b> ${user.created_at}</p>
        `;
    })
    .catch(() => {
        // Si el token es inválido, redirige al login
        window.location.href = '/login.html';
    });
}

// Lógica para cerrar sesión
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});
