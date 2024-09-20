document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = sessionStorage.getItem('authenticated');

    if (isAuthenticated !== 'true') {
        const password = prompt('Enter the password:');
        const correctPassword = "uiuctsa";

        if (password !== correctPassword) {
            alert('Incorrect password. Redirecting to login page.');
            window.location.href = '../index.html';
        } else {
            sessionStorage.setItem('authenticated', 'true');
        }
    }
});