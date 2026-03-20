async function fetchWithAuth(url, options = {}) {
    const token = auth.getToken();
    if (!token) {
        window.location.href = '/index.html';
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };

    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
        auth.logout();
        return;
    }
    return response;
}

function renderNavbar() {
    const user = auth.getUser();
    const navHTML = `
        <nav class="navbar">
            <a href="/pages/dashboard.html" class="logo">Railway System</a>
            <ul class="nav-links">
                <li><a href="/pages/dashboard.html">Dashboard</a></li>
                <li><a href="/pages/search.html">Search Trains</a></li>
                <li><a href="/pages/bookings.html">My Bookings</a></li>
            </ul>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span>Welcome, ${user ? user.name : 'Guest'}</span>
                <button onclick="auth.logout()" class="logout-btn">Logout</button>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.form-container') || document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 3000);
}
