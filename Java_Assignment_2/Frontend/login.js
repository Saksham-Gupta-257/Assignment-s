document.addEventListener('DOMContentLoaded', () => {
    // Clear all local storage and session data
    localStorage.clear();

    // Reset the form inputs
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    // Remove any residual alerts or messages
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.remove());
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8080/api/hr/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid credentials!';
    }
});

window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', () => {
    localStorage.removeItem('token');
    window.location.replace('login.html');
});

