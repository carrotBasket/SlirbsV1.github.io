// User credentials
const validCredentials = {
    'Wesley': 'Weasel135',
    'Ruiqi': 'Salmon555',
    'Max': 'BOB',
    'Ewan': 'Banana',
    'Patrick': 'PatyAdmin@@'
};

// Function to handle login form submission
function handleLogin(event) {
    if (event) {
        event.preventDefault();
    }

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    if (!loginForm || !errorMessage) {
        return; // Not on login page
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate "hacking" delay
    errorMessage.style.display = 'none';
    document.querySelector('button').textContent = 'AUTHENTICATING...';

    setTimeout(() => {
        // Check if credentials are valid
        if (validCredentials[username] === password) {
            // Store authentication status in session storage
            sessionStorage.setItem('authenticated', 'true');
            sessionStorage.setItem('username', username);

            // Redirect to main page
            window.location.href = 'SW.html';
        } else {
            // Show error message
            errorMessage.style.display = 'block';
            document.querySelector('button').textContent = 'AUTHENTICATE';

            // Add "glitch" effect to the terminal
            const terminal = document.querySelector('.terminal');
            terminal.style.animation = 'none';
            setTimeout(() => {
                terminal.style.animation = 'glitch 0.3s';
            }, 10);
        }
    }, 1500); // Delay for effect
}

// Function to check authentication and setup welcome message
function checkAuthentication() {
    const authenticated = sessionStorage.getItem('authenticated');
    const username = sessionStorage.getItem('username');

    if (!authenticated || authenticated !== 'true') {
        // Redirect to login page if not authenticated
        window.location.href = 'login.html';
    } else {
        // Add a welcome message to the page
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerHTML = `<p>Welcome, <strong>${username}</strong>! You have successfully authenticated.</p>`;

        // Add logout button
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';
        logoutButton.className = 'logout-button';
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('authenticated');
            sessionStorage.removeItem('username');
            window.location.href = 'login.html';
        });

        welcomeDiv.appendChild(logoutButton);

        // Insert at the beginning of the body
        document.body.insertBefore(welcomeDiv, document.body.firstChild);
    }
}

// Initialize the appropriate functionality based on the current page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    if (document.getElementById('login-form')) {
        const loginForm = document.getElementById('login-form');
        
        // Add event listener to the login form
        loginForm.addEventListener('submit', handleLogin);
        
        // Add CSS for glitch effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch {
                0% { transform: translate(2px, 0); }
                20% { transform: translate(-2px, 0); }
                40% { transform: translate(2px, 0); }
                60% { transform: translate(-2px, 0); }
                80% { transform: translate(2px, 0); }
                100% { transform: translate(0, 0); }
            }
        `;
        document.head.appendChild(style);
    } else {
        // Check if user is authenticated when on SW.html
        checkAuthentication();
    }
});