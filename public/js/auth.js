const API_URL = '/api';

const auth = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Also set a cookie so server-rendered pages reached via normal links
                // (e.g. /dashboard from the sidebar) can authenticate.
                document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=Lax`;
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: 'Server error' };
        }
    },

    async register(userData) {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            return { success: response.ok, message: data.message };
        } catch (error) {
            return { success: false, message: 'Server error' };
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Clear auth cookie (best-effort; if server sets HttpOnly, this won't remove it).
        document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';
        window.location.href = '/index.html';
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },

    checkAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/index.html';
        }
    },
    
    redirectIfAuthenticated() {
        if (this.isAuthenticated()) {
            const user = this.getUser();
            if (user && user.role === 'admin') {
                window.location.href = '/pages/admin/dashboard.html';
            } else {
                window.location.href = '/pages/dashboard.html';
            }
        }
    }
};
