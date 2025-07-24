// Seleccionamos el navbar
const navbar = document.querySelector('header');

// Agregamos un evento de scroll
window.addEventListener('scroll', function () {
    // Obtenemos la posición actual del scroll
    let scrollPosition = window.scrollY;

    // Si la posición del scroll es mayor a 100px, ocultamos el navbar
    if (scrollPosition > 300) {
        navbar.style.transform = 'translateY(-100%)'; // Mueve el navbar hacia arriba fuera de la pantalla
        navbar.style.opacity = '0'; // Hace que desaparezca visualmente
        navbar.style.transition = 'transform 0.3s ease, opacity 0.3s ease'; // Transición suave
    } else {
        navbar.style.transform = 'translateY(0)'; // Lo devuelve a su posición original
        navbar.style.opacity = '1'; // Lo vuelve visible
    }
});

document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
    };
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
        document.getElementById('msg').textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        // Redirige o muestra mensaje aquí, si quieres.
    } else {
        document.getElementById('msg').textContent = result.error || 'Error en el registro';
    }
});

const dropdownMenus = document.querySelectorAll('.dropdown');

dropdownMenus.forEach((menu) => {
    const parentLi = menu.parentNode;
    parentLi.addEventListener('click', () => {
        menu
            .classList
            .toggle('show');
    });
});

const textLimit = 200; // Establece el límite de caracteres para truncar

// Función para truncar o expandir el texto
function toggleText(section) {
    const textElement = section.querySelector('p');
    const readMoreLink = section.querySelector('.read-more');

    // Verificamos que ambos elementos existan
    if (!textElement || !readMoreLink) 
        return;
    
    const fullText = textElement
        .textContent
        .trim(); // Obtener el texto completo
    const truncatedText = fullText.substring(0, textLimit) + '...'; // Texto truncado

    let isTruncated = true; // Estado inicial: texto truncado

    // Mostrar el texto truncado inicialmente si excede el límite
    if (fullText.length > textLimit) {
        textElement.textContent = truncatedText;
        readMoreLink.style.display = 'inline'; // Mostrar el enlace "Leer más"
    } else {
        readMoreLink.style.display = 'none'; // Si no es necesario truncar, ocultar el enlace
    }

    // Listener para alternar entre mostrar texto completo o truncado
    readMoreLink.addEventListener('click', (e) => {
        e.preventDefault(); // Evita comportamiento predeterminado del enlace

        if (isTruncated) {
            // Si está truncado, mostrar el texto completo
            textElement.textContent = fullText;
            readMoreLink.textContent = 'Leer menos...'; // Cambiar texto del enlace
        } else {
            // Si está expandido, mostrar el texto truncado
            textElement.textContent = truncatedText;
            readMoreLink.textContent = 'Leer más...'; // Cambiar texto del enlace
        }

        // Alternar el estado
        isTruncated = !isTruncated;
    });
}

// Aplicar la función de truncado/desplegado a todas las secciones
const sections = document.querySelectorAll('section');
sections.forEach((section) => toggleText(section));
